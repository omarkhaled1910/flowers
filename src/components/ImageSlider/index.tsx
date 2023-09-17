import NextImage from '@/components/NextImage';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Carousel } from '@material-tailwind/react';

export default function ImageSlider({ images }: { images: string[] }) {
  return (
    <Carousel
      prevArrow={({ loop, handlePrev, firstIndex }) => {
        return (
          <button
            onClick={handlePrev}
            disabled={!loop && firstIndex}
            className='!absolute top-2/4 left-4 grid h-12 max-h-[48px] w-12 max-w-[48px] -translate-y-2/4 select-none place-items-center rounded-full text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          >
            <ChevronLeftIcon
              color='#0369a1'
              strokeWidth={3}
              className='-ml-1 h-7 w-7'
            />
          </button>
        );
      }}
      nextArrow={({ loop, handleNext, lastIndex }) => (
        <button
          onClick={handleNext}
          disabled={!loop && lastIndex}
          className='!absolute top-2/4 right-4 grid h-12 max-h-[48px] w-12 max-w-[48px] -translate-y-2/4 select-none place-items-center rounded-full text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        >
          <ChevronRightIcon
            color='#0369a1'
            strokeWidth={3}
            className='ml-1 h-7 w-7'
          />
        </button>
      )}
      className='rounded-xl border bg-blue-gray-100 p-[-3]'
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
          {images.map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images?.map((img, i) => (
        <NextImage
          key={i}
          alt={`image ${i}`}
          className='h-full w-full object-cover  '
          src={img}
          width={650}
          height={500}
          imgClassName='max-w-[100%]   object-scale-down h-full'
        />
      ))}
    </Carousel>
  );
}
