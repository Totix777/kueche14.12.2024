import { collection, getDocs, setDoc, doc, query, where, Timestamp, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const saveDocument = async <T extends { id: string }>(
  collectionName: string,
  item: T,
  date: string
) => {
  try {
    const docRef = doc(db, collectionName, `${date}_${item.id}`);
    await setDoc(docRef, {
      ...item,
      date,
      timestamp: Timestamp.now()
    }, { merge: true }); // Enable merging to preserve existing data
  } catch (error) {
    console.error(`Error saving document to ${collectionName}:`, error);
    throw error;
  }
};

export const saveCollection = async <T extends { id: string }>(
  collectionName: string,
  items: T[],
  date: string
) => {
  try {
    const batch = writeBatch(db);
    
    items.forEach(item => {
      const docRef = doc(db, collectionName, `${date}_${item.id}`);
      batch.set(docRef, {
        ...item,
        date,
        timestamp: Timestamp.now()
      }, { merge: true }); // Enable merging to preserve existing data
    });

    await batch.commit();
  } catch (error) {
    console.error(`Error saving collection ${collectionName}:`, error);
    throw error;
  }
};

export const loadCollection = async <T>(
  collectionName: string,
  date: string
): Promise<T[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      where('date', '==', date)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id.split('_')[1], // Extract the original ID from the document ID
        date: data.date || date // Ensure date is always present
      } as T;
    });
  } catch (error) {
    console.error(`Error loading collection ${collectionName}:`, error);
    return [];
  }
};