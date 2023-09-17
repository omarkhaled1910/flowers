/* eslint-disable import/no-anonymous-default-export */
import chroma from 'chroma-js';
import React, { forwardRef } from 'react';

import Select, { GroupBase, OptionsOrGroups } from 'react-select';

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

type NewType = any;

export default forwardRef(
  ({ options, label, ...rest }: any & { label: string }, ref) => (
    <>
      <label className='my-2 '>{label}</label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={
          options as unknown as OptionsOrGroups<string, GroupBase<string>>
        }
        {...rest}
        styles={options?.[0]?.color && colourStyles}
        ref={ref as React.Ref<NewType>}
      />
    </>
  )
);
