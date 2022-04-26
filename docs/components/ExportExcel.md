---
nav:
  title: 导出excel
  toc: menu
title: ExportExcel 导出excel
order: 1
---

## ExportExcel 代码演示

Demo:

```tsx
/**
 * desc: 纯前端实现excel下载，可设置宽度，暂时不满足设置excel文本样式。
 */
import React from 'react';
import { ExportExcel } from 'crud-shared';

export default () => {
  const columns = [
    {
      dataIndex: 'first',
      title: '第一列',
    },
    {
      dataIndex: 'two',
      title: '第二列',
    },
    {
      dataIndex: 'three',
      title: '第三列',
    },
  ];

  const dataSource = [
    {
      first: '1排1列',
      two: '1排2列',
      three: '1排3列',
    },
    {
      first: '2排1列',
      two: '2排2列',
      three: '2排3列',
    },
    {
      first: '3排1列',
      two: '3排2列',
      three: '3排3列',
    },
    {
      first: 41,
      two: 42,
      three: 43,
    },
  ];

  return (
    <ExportExcel
      fileName="我是导出文件的名称"
      btnLabel="点我下载"
      dataSource={dataSource}
      columns={columns}
    />
  );
};
```

## API

### ExportExcel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| fileName | 下载 excel 的文件名称，会默认带上下载时间 | string | 表格下载 |  |
| btnLabel | 按钮名称 | string | 导出 |  |
| columns | 表格列的配置描述，具体项见下表 | [ColumnsType](#columns)\[] | - |  |
| dataSource | 数据数组 | object\[] | - |  |

### columns

列描述数据对象，是 columns 中的一项。

| 参数      | 说明                                                       | 类型   | 默认值 | 版本 |
| --------- | ---------------------------------------------------------- | ------ | ------ | ---- |
| dataIndex | 单元格的值对应的 key                                       | string | -      |      |
| title     | 单元格展示的内容，默认左对齐，当值为 number 类型时，右对齐 | string | -      |      |
| width     | 列宽                                                       | number | 10     |      |
