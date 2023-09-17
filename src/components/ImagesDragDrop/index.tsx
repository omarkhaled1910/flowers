import React from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from '@heroicons/react/24/outline';
import NextImage from '@/components/NextImage';

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className='relative'>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='relative  h-36 w-full border border-blue-gray-300 '
      >
        <NextImage src={props.id} layout='fill' alt='a' />
      </div>
      <div className='absolute top-3 right-2 z-50 cursor-not-allowed'>
        <TrashIcon
          onClick={async (e) => {
            await props.handleDeleteImage(props.id);
            e.stopPropagation();
          }}
          height={30}
          width={30}
          color='red'
          path='red'
        />
      </div>
    </div>
  );
}

const ImagesDragDrop = ({ onDragEnd, images = [], handleDeleteImage }: any) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className='grid h-80 w-full grid-cols-3 gap-4 overflow-x-auto border border-gray-600  p-10'>
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          {images.map((id: string) => (
            <SortableItem
              handleDeleteImage={handleDeleteImage}
              key={id}
              id={id}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default ImagesDragDrop;
