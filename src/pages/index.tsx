import { collection, getDocs } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import * as React from 'react';

import FlowersContainer from '@/components/flowersContainer/FlowersContainer';

import { db } from '../../firebase';
import Stats from '@/components/Stats';

export default function HomePage({ flowers }: { flowers: any[] }) {
  return (
    <main className='relative  h-full'>
      <section className='my-5 bg-white px-10'>
        <h2 className='my-10 text-center text-blue-gray-900'>
          Welcome ! Check Our Latest Collection
        </h2>
        <FlowersContainer flowers={flowers} />
        <Stats />
      </section>
    </main>
  );
}

const getAllFlowers = async () => {
  const items: any[] = [];
  const querySnapshot = await getDocs(collection(db, 'flowers'));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getAllFlowers();
    return {
      props: {
        flowers: data,
      },
    };
  } catch (error) {
    return {
      props: {
        flowers: null,
      },
    };
  }
};
