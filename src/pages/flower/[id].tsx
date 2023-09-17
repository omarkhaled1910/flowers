import { getSingleFlower } from '@/Requests/flowers';
import ImageSlider from '@/components/ImageSlider';
import { GetServerSideProps } from 'next';
import React from 'react';

const FlowerPreview = ({ flower }: { flower: any }) => {
  return (
    <div className='container'>
      <div style={{ padding: '20px' }} className=' h-[500px] w-[650px]'>
        <ImageSlider images={flower.images} />
      </div>
    </div>
  );
};

export default FlowerPreview;

export const getServerSideProps: GetServerSideProps = async (req) => {
  const id = req?.query?.id;

  try {
    const data = await getSingleFlower(Array.isArray(id) ? id[0] : id);

    return {
      props: {
        flower: data,
      },
    };
  } catch (error) {
    return {
      props: {
        flower: null,
      },
    };
  }
};
