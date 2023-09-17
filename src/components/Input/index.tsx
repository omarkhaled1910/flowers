import React, { forwardRef } from 'react';
import { Input as MaterialInput, InputProps } from '@material-tailwind/react';

const Input = (
  { error = false, label, ...rest }: Omit<InputProps, 'ref'>,
  ref: any
) => {
  return (
    <div className='w-full '>
      <label
        className={` m-1 ${error ? ' text-red-400' : ' text-indigo-900'}  `}
      >
        {label}
      </label>
      <MaterialInput
        inputRef={ref}
        error={error}
        {...rest}
        labelProps={{
          className: ' ',
        }}
        label=''
      />
    </div>
  );
};

const InputWithRef = forwardRef(Input);
export default InputWithRef;
