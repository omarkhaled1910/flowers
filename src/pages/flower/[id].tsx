import { getSingleFlower } from '@/Requests/flowers';
import Comments from '@/components/Comments';
import ImageSlider from '@/components/ImageSlider';
import { GetServerSideProps } from 'next';
import React from 'react';

const FlowerPreview = ({ flower }: { flower: any }) => {
  return (
    <div className='container'>
      <div className='flex '>
        <div style={{ padding: '20px' }} className=' flex-1 '>
          <ImageSlider images={flower.images} />
        </div>
        <div className='bg-blue-[#f8f8f8] w-full flex-1 rounded-md border p-3'>
          <div className='my-5 flex'>
            <label className='mx-2 text-[#783ca9]'>Name : </label>
            <div className='flex items-center gap-2'>
              <div>{flower.name}</div>
            </div>
          </div>
          <div className='my-5 flex'>
            <label className='mx-2 text-[#783ca9]'>Price : </label>
            <div className='flex items-center gap-2'>
              <div>{flower.price} $</div>
            </div>
          </div>
          <div className='my-5 flex'>
            <label className='mx-2 text-[#783ca9]'>Width : </label>
            <div className='flex items-center gap-2'>
              <div>{flower.width} cm</div>
            </div>
          </div>
          <div className='my-5 flex'>
            <label className='mx-2 text-[#783ca9]'>Height : </label>
            <div className='flex items-center gap-2'>
              <div>{flower.height} cm </div>
            </div>
          </div>
          {flower?.colors.length && (
            <div className='my-5 flex'>
              <label className='mx-2 text-[#783ca9]'>Color : </label>
              <div className='flex items-center gap-2'>
                {flower?.colors?.map((color: any) => (
                  <div
                    style={{ backgroundColor: color.color }}
                    key={color.value}
                    className=' w-[70px] p-1 text-center text-white'
                  >
                    {color.label}
                  </div>
                ))}
              </div>
            </div>
          )}
          {flower?.category.length && (
            <div className='my-5 flex'>
              <label className='mx-2 text-[#783ca9]'> Category : </label>
              <div className='flex gap-2'>
                {flower?.category?.map((category: any) => (
                  <div key={category.value} className=' w-min p-1'>
                    {category.label}
                  </div>
                ))}
              </div>
            </div>
          )}
          {flower?.gender.length && (
            <div className='my-5 flex'>
              <label className='mx-2 text-[#783ca9]'>Gender : </label>
              <div className='flex gap-2'>
                {flower?.gender?.map((gender: any) => (
                  <div key={gender.value} className=' w-min p-1'>
                    {gender.label}
                  </div>
                ))}
              </div>
            </div>
          )}
          {flower.inStock ? (
            <div>
              There is only 3 items left make your order NOW!{' '}
              <label className=' cursor-pointer text-blue-600 underline'>
                Add to cart
              </label>
            </div>
          ) : (
            <div className=''>
              This Item is out of order right now as it gone out of stock
            </div>
          )}
        </div>
      </div>
      <Comments />
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
