import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import AddFlower from '@/components/AddFlower';
import { getSingleFlower } from '@/Requests/flowers';
import { FormProvider, useForm } from 'react-hook-form';
import ImagesDragDrop from '@/components/ImagesDragDrop';
import UploadImages from '@/components/UploadImages';
import { useAddFlower } from '@/hooks/useAddFlower';

const EditFlower = ({ flower }: any) => {
  const { query } = useRouter();
  const { handleDrag, items, files, setFiles, setItems, handleDeleteImage } =
    useAddFlower(query.id as string, flower);

  const methods = useForm({ defaultValues: flower });

  return (
    <div className='flex gap-10'>
      <FormProvider {...methods}>
        <AddFlower files={files} id={query.id as string} />
        <div className='flex w-full flex-col'>
          <ImagesDragDrop
            handleDeleteImage={handleDeleteImage}
            images={items}
            onDragEnd={handleDrag}
          />
          <UploadImages files={files} setFiles={setFiles} onChange={setItems} />
        </div>
      </FormProvider>
    </div>
  );
};

export default EditFlower;

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
