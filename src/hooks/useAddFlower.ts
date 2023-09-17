import { deleteFlowerImage } from '@/Requests/flowers';
import { useCallback, useState } from 'react';

const isNotLocal = (src: string) => src.includes('firebasestorage');
export const useAddFlower = (flowerId?: string, flower?: any) => {
  const [files, setFiles] = useState<any>([]);

  const [items, setItems] = useState(flower?.images || []);
  const handleDrag = useCallback((e: any) => {
    const first = e.active.data.current.sortable.index;
    const second = e.over.data.current.sortable.index;

    setItems((old: any) => {
      const oldArr = [...old];
      oldArr[first] = old[second];
      oldArr[second] = old[first];
      return [...oldArr];
    });
  }, []);
  const handleDeleteImage = useCallback(
    async (src: string) => {
      setItems((old: string[]) => old.filter((img: string) => img !== src));
      if (isNotLocal(src) && flowerId) {
        //handle firebase dlete]
        await deleteFlowerImage(src, flowerId);
        return;
      }
      setFiles((old: string[]) => old.filter((img: string) => img !== src));
    },
    [flowerId]
  );

  return {
    handleDrag,
    items,
    files,
    setFiles,
    setItems,
    handleDeleteImage,
  };
};
