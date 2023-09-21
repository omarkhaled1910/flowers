import React, { useState } from 'react';

import Button from '@/components/buttons/Button';

import { useFlower } from '@/hooks/useUploadFlower';
import { uploadImageToStorage } from '@/utils/uploadImage';
import { Controller, useFormContext } from 'react-hook-form';
import InputWithRef from '@/components/Input';
import { Checkbox } from '@material-tailwind/react';
import MultiSelect from '@/components/MultiSelect';
import { categories, colourOptions, genders } from '@/constants';
import Loader from '@/components/Loader/Loader';

const AddFlower = ({ id, files }: { id?: string; files?: any }) => {
  const { createFlower, updateFlower } = useFlower();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: any) => {
    if (values) {
      setIsSubmitting(true);
      const images: any = [];
      Promise.all(
        files?.map((file: Blob) =>
          uploadImageToStorage(file, (url) => images.push(url))
        )
      )
        .then(async () => {
          const newFlower = {
            ...values,
            images: [...images],
          };
          id
            ? await updateFlower(newFlower, id)
            : await createFlower(newFlower);
        })
        .finally(() => setIsSubmitting(false));
    }
  };
  const {
    handleSubmit,
    formState: { isValidating, isLoading },
  } = useFormContext();
  return (
    <form className='w-full max-w-lg'>
      {isSubmitting && <Loader overlay />}
      <div className='-mx-3 mb-6 flex flex-wrap'>
        <div className='w-full px-3'>
          <Controller
            render={({ field, fieldState: { error }, formState }) => (
              <InputWithRef
                error={!!error}
                label='Name'
                placeholder='Roses'
                {...field}
              />
            )}
            name='name'
            rules={{ required: true }}
          />
        </div>
      </div>
      <div className='-mx-3 mb-6 flex flex-wrap'>
        <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
          <Controller
            render={({ field, fieldState: { error }, formState }) => (
              <InputWithRef
                error={!!error}
                {...field}
                label='Height'
                placeholder='in cms'
              />
            )}
            rules={{ required: true }}
            name='height'
          />

          {false && (
            <p className='text-xs italic text-red-500'>
              Please fill out this field.
            </p>
          )}
        </div>
        <div className='w-full px-3 md:w-1/2'>
          <Controller
            render={({ field, fieldState: { error }, formState }) => (
              <InputWithRef
                error={!!error}
                label='Width'
                placeholder='in cms'
                {...field}
              />
            )}
            name='width'
            rules={{ required: true }}
          />
        </div>
        <div className='my-5 flex  w-full items-center justify-between gap-10 '>
          <div className='w-full  px-3 md:w-1/2'>
            <Controller
              render={({ field, fieldState: { error }, formState }) => (
                <InputWithRef
                  error={!!error}
                  label='Price'
                  placeholder='2000'
                  {...field}
                />
              )}
              name='price'
              rules={{ required: true }}
            />
          </div>
          <div className=' w-full'>
            <Controller
              render={({ field, fieldState: { error }, formState }) => (
                <Checkbox
                  {...field}
                  checked={field.value || false}
                  inputRef={field.ref}
                  label='in stock'
                />
              )}
              name='inStock'
            />
          </div>
        </div>

        <div className='my-3 w-full'>
          <Controller
            render={({ field, fieldState: { error }, formState }) => (
              <MultiSelect
                {...field}
                label='Category'
                {...field}
                onchange={field.onChange}
                options={categories as unknown as HTMLOptionsCollection}
              />
            )}
            name='category'
          />
        </div>
        <div className='my-3 w-full'>
          <Controller
            render={({ field, fieldState: { error }, formState }) => (
              <MultiSelect
                {...field}
                label='Gender'
                {...field}
                onchange={field.onChange}
                options={genders as any}
              />
            )}
            name='gender'
            rules={{ required: true }}
          />
        </div>
        <div className='my-3 w-full'>
          <Controller
            render={({ field, fieldState: { error }, formState }) => (
              <MultiSelect
                {...field}
                label='Colors'
                {...field}
                onchange={field.onChange}
                options={colourOptions as unknown as HTMLOptionsCollection}
              />
            )}
            name='colors'
            rules={{ required: true }}
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        className='flex w-full justify-center  align-middle'
      >
        {id ? 'Edit' : 'Save'}
      </Button>
    </form>
  );
};

export default AddFlower;
