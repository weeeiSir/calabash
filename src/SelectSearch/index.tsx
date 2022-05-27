import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useAxios } from '../hooks/httpHooks';
interface SelectSearchProps {
  fetchList: () => void;
  searchKey: string;
  valueKey?: string;
  conditionJson?: object;
  onChange: (value: string[], record?: object) => string;
  props?: object;
}
function SelectSearch({
  fetchList,
  searchKey = 'title',
  valueKey = searchKey,
  onChange,
  conditionJson = {},
  ...props
}: SelectSearchProps) {
  const [renderList, setRenderList] = useState<any[]>([]);
  const { loading, run } = useAxios(fetchList, {
    onSuccess: (data) => {
      console.log(data);
      setRenderList(
        (data.list || []).map((item) => ({
          ...item,
          title: item[searchKey],
          key: item[valueKey],
        })),
      );
    },
  });
  const handleChange = (value) => {
    onChange(
      value,
      renderList.find((item) => item[searchKey] === value),
    );
  };
  const onSearch = debounce((value) => {
    run({
      current: 1,
      pageSize: 30,
      ...conditionJson,
      [searchKey]: value,
    });
  }, 800);
  useEffect(() => {
    onSearch();
  }, []);
  return (
    <Select
      showSearch
      allowClear
      placeholder="请选择"
      notFoundContent={loading ? <Spin size="small" /> : null}
      onChange={handleChange}
      onSearch={onSearch}
      filterOption={false}
      {...props}
    >
      {!loading &&
        renderList.map((item) => (
          <Select.Option key={item[valueKey]} value={item[valueKey]}>
            {item[searchKey]}
          </Select.Option>
        ))}
    </Select>
  );
}

export default SelectSearch;
