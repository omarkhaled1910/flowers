import { ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { useFormContext } from 'react-hook-form';
function UploadImages({ files, setFiles, onChange }: any) {
  const { setValue } = useFormContext();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { accept: ['image/*'] },
    onDrop: (acceptedFiles) => {
      setFiles((old: any) => [
        ...old,
        ...acceptedFiles.map((file) => {
          onChange((old: any) => [...old, URL.createObjectURL(file)]);
          return {
            ...file,
            preview: URL.createObjectURL(file),
          };
        }),
      ]);
    },
  });

  // const thumbs = files.map((file: any) => (
  //   <div key={file?.name}>
  //     <div>
  //       <NextImage src={file?.preview} alt='' width={90} height={90} />
  //     </div>
  //   </div>
  // ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file?.preview));
  }, [files]);

  console.log(files);

  return (
    <section className='border-blue container mt-5 cursor-pointer border p-10'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className=' flex !flex-col items-center justify-center gap-3'>
          <div>Drag 'n' drop some Images here, or click to select files </div>
          <ArrowUpOnSquareStackIcon style={{ width: '100px' }} />
        </div>
      </div>
      {/* <div className='flex h-auto items-center gap-3 pt-5'>{thumbs}</div> */}
    </section>
  );
}

export default UploadImages;