import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { db } from '../../firebase';

export const useFlower = () => {
  const { push } = useRouter();
  const createFlower = async (flower: any) => {
    const docRef = await addDoc(collection(db, 'flowers'), flower);
    push(`/dashboard/${docRef.id}`);
  };
  const updateFlower = async (flower: any, id: string) => {
    const flowerRef = doc(collection(db, 'flowers'), id);
    // Set the 'capital' field of the city
    await updateDoc(flowerRef, { ...flower, inStock: flower.inStock || false });

    push(`/dashboard/flowers`);
  };

  return { createFlower, updateFlower };
};
