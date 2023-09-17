/* eslint-disable no-console */
import {
  arrayRemove,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { query, limit } from 'firebase/firestore';

import { db } from '../../firebase';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { deleteDoc, updateDoc } from 'firebase/firestore';

const storage = getStorage();

export const getSingleFlower = async (id = '') => {
  const docRef = doc(db, 'flowers', id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getFlowersCount = async () => {
  const coll = collection(db, 'flowers');
  const snapshot = await getCountFromServer(coll);

  return snapshot.data().count;
};
export const getAllFlowers = async (limitNumber: number, start?: any) => {
  const items: any[] = [];

  const q = start
    ? query(
        collection(db, 'flowers'),
        orderBy('name'),
        startAfter(start),
        limit(limitNumber)
      )
    : query(collection(db, 'flowers'), orderBy('name'), limit(limitNumber));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      items.push({ ...doc.data(), id: doc.id });
    });

    return items;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const deleteFlower = async (id: string) => {
  await deleteDoc(doc(collection(db, 'flowers'), id));
};

export const deleteFlowerImage = async (src: string, flowerId: string) => {
  const urlParts = src?.split('?alt=media');

  // Extract the path to the file
  const pathToFile = decodeURIComponent(urlParts[0].split('/o/')[1]);

  // Now, you have the path to the file

  const desertRef = ref(storage, pathToFile);
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      const flowerRef = doc(collection(db, 'flowers'), flowerId);
      updateDoc(flowerRef, { images: arrayRemove(src) });
    })
    .catch((error) => {
      console.log(error);
      // Uh-oh, an error occurred!
    });
};
