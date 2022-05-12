import React, { Component } from 'react';
import { Select } from 'antd';
import { optionWithChild } from '../types/common';
const { Option, OptGroup } = Select;

export interface SelectSearchGroupProps {
  optionList?: optionWithChild[];
  onChange?: (value: string) => string;
}
const SelectSearchGroup = ({ optionList = [], onChange }: SelectSearchGroupProps) => {
  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="filterKey"
      filterOption={(input, option: any) => {
        // if (typeof option.props.children === 'object'){
        //     return null
        // }
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      onChange={onChange}
    >
      {optionList.map((item) => {
        if (item.children) {
          return (
            <OptGroup label={item.title} key={item.title}>
              {item.children.map((child) => (
                <Option value={child.key} key={child.title}>
                  {child.title}
                </Option>
              ))}
            </OptGroup>
          );
        } else {
          return (
            <Option value={item.key} key={item.title}>
              {item.title}
            </Option>
          );
        }
      })}
    </Select>
  );
};

export default SelectSearchGroup;
