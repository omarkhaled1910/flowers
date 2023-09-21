import React from 'react';

import AddFlower from '@/components/AddFlower';
import { FormProvider, useForm } from 'react-hook-form';
import ImagesDragDrop from '@/components/ImagesDragDrop';
import UploadImages from '@/components/UploadImages';
import { useAddFlower } from '@/hooks/useAddFlower';

const defaultValues = {
  height: '',
  width: '',
  name: '',
  gender: [],
  category: [],
  colors: [],
  inStock: false,
  price: null,
};
const CreateFlower = () => {
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleDrag, items, files, setFiles, setItems, handleDeleteImage } =
    useAddFlower();


  return (
    <div className='flex gap-10'>
      <FormProvider {...methods}>
        <AddFlower files={files} />
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

export default CreateFlower;
