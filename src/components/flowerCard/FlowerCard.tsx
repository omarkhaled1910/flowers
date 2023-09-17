import React from 'react';

import NextImage from '@/components/NextImage';
import { Parisienne } from 'next/font/google';
const ubt = Parisienne({
  weight: '400',
  style: ['normal'],
  preload: false,
});
const FlowerCard = ({ src, onHover, isHovered, id, flower }: any) => {
  return (
    <div
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(0)}
      className='relative h-80 w-80  cursor-pointer rounded-md shadow-lg transition-all duration-150 hover:scale-110 '
    >
      <NextImage
        layout='fill'
        alt=''
        className='h-full w-full object-cover'
        imgClassName=' h-full w-full'
        src={src}
      />{' '}
      {isHovered && (
        <div className='absolute bottom-0 flex h-auto w-full justify-between gap-2 rounded-sm bg-black p-3 opacity-70 shadow-md  '>
          {/* <div>
            <div className=' text-blue-700 !opacity-100'>
              height: {flower.height}
            </div>
            <div className=' text-blue-700 !opacity-100'>
              width: {flower.width}
            </div>
          </div>
          <div>
            <div className=' text-blue-700 !opacity-100'>views:188</div>
            <div className=' text-blue-700 !opacity-100'>likes:18</div>
          </div> */}
          <div style={ubt.style} className=' text-2xl text-white'>
            {flower?.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowerCard;
