---
nav:
  title: 下拉带远程搜索
  toc: menu
title: SelectSearch 下拉带远程搜索
order: 1
---

## SelectSearch 代码演示

Demo:

```tsx
/**
 * desc: 下拉带远程搜索包装，带防抖处理，传入远程请求函数、查询条件。
 */
import React from 'react';
import { SelectSearch } from 'crud-shared';

const searchKey = 'title';
const fetchList = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const origin = [
        { title: '招商银行', key: 1 },
        { title: '建设银行', key: 2 },
        { title: '中国银行', key: 3 },
      ];
      const searchStr = query[searchKey];
      const list = searchStr ? origin.filter((item) => item.title.includes(searchStr)) : origin;
      resolve({
        code: '0',
        data: { list },
        message: '查询成功',
      });
    }, 2000);
  });
};
const onChange = (value, option) => {
  console.log(value, option, '选中的数据');
};
export default () => {
  return (
    <div>
      <SelectSearch
        fetchList={fetchList}
        searchKey={searchKey}
        onChange={onChange}
        style={{ width: '200px' }}
      />
    </div>
  );
};
```

## API

### SelectSearch 下拉带远程搜索

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| fetchList | 远程请求函数，返回 promise | Promise<{}> | - |  |
| onChange | 值变化时，触发函数 | function(value, option:[OptionType](#optiontype)) | - |  |
| searchKey | 搜索时，自定义指定查询入参的 key | string | title |
| valueKey | 自定义指定选中选项时的 value, 不设置，则值等于页面显示选中的值 | string | - |
| conditionJson | 自定义查询入参 | object | - |  |

### optionType

下拉选项的值类型。

| 参数  | 说明                                               | 类型             | 默认值 | 版本 |
| ----- | -------------------------------------------------- | ---------------- | ------ | ---- |
| title | 下拉选项展示文本，对应 `searchKey` 的值            | string           | -      |      |
| key   | 下拉选项展示文本对应的 value，对应 `valueKey` 的值 | string \| number | -      |      |
