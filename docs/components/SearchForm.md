---
nav:
  title: 导出excel
  toc: menu
title: SearchForm 搜索条件
order: 3
---

## SearchForm 代码演示

Demo:

```tsx
/**
 * desc: 打包表头查询模块，可设置展开折叠。
 */
import React, { useEffect, useState, useRef } from 'react';
import { SearchForm } from 'crud-shared';
import { Form, Row, Button } from 'antd';
import moment from 'moment';

let unmounted = false;
const queryItems = [
  {
    label: '账号',
    key: 'account',
    type: 'Input',
    initialValue: '',
  },
  {
    label: '金额',
    key: 'money',
    type: 'InputNumber',
    initialValue: '',
  },
  {
    label: '状态',
    key: 'status',
    type: 'Select',
    initialValue: '',
    optionList: [
      { title: '全部', key: -1 },
      { title: '未处理', key: 0 },
      { title: '处理中', key: 1 },
      { title: '已处理', key: 2 },
      { title: '作废', key: 998 },
      { title: '无须处理', key: 999 },
    ],
  },
  {
    label: '银行名称',
    key: 'colleBankType',
    type: 'Select',
    initialValue: '',
    optionList: [],
  },
  {
    label: '交易时间',
    key: 'time',
    type: 'RangePicker',
    initialValue: [moment().subtract(2, 'days'), moment()],
  },
];

const fetchList = async () => {
  if (unmounted) return;
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: [
          { title: '招商银行', key: 1 },
          { title: '建设银行', key: 2 },
        ],
      });
    }, 2000);
  });
  return result;
};

export default () => {
  const [form] = Form.useForm(); // antd3.x 使用Form.create()(Components)写法  ->  再从props中获取form
  const [bankList, setBankList] = useState([]);
  useEffect(async () => {
    try {
      const { list } = await fetchList();
      setBankList(list);
    } catch (error) {}
    return () => (unmounted = false);
  }, []);
  const optionFromHttp = [
    {
      key: 'colleBankType',
      optionList: bankList,
    },
  ];

  const search = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const reset = () => {
    form.resetFields();
    console.log(form.getFieldsValue());
  };

  return (
    <div>
      <SearchForm expand form={form} queryItems={queryItems} optionFromHttp={optionFromHttp} />
      <Row justify="end">
        <Button type="primary" onClick={search}>
          搜索
        </Button>
        <Button type="" style={{ marginLeft: '12px' }} onClick={reset}>
          重置
        </Button>
      </Row>
    </div>
  );
};
```

## API

### SearchForm 查询组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| form | Form 实例，用于管理所有数据状态，用法同 `antd 4.x` | FormInstance | - |  |
| queryItems | Form 表单项配置 | [queryItemsType](#queryitems)\[] |  |
| optionFromHttp | 远程获取的 Form 表单项下拉选项值 | [optionFromHttpType](#optionfromhttp)\[] | - |  |
| expand | 是否折叠，为 true 时，默认展示一排，点展开，展示所有表单项 | boolean | false |  |

### queryItems

Form.Item 表单里的控件配置。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 表单项文本 | string | - |  |
| key | 表单项对应的字段名 | string | - |  |
| type | 表单项控件类型，目前支持 7 种： `DatePicker`， `RangePicker`（时间范围），`Input`，`InputNumber`，`InputNumberCompact`（数字范围），`Select`，`SelectSearchGroup`（下拉选项分组） | string | - |  |
| initialValue | 表单项初始值 | string \| number \| array | - |  |
| optionList | 下拉选项的 option 值，适用于 type 为 `Select`或`SelectSearchGroup`的控件 | [optionListType](#optionlist)\[] | - |  |

### optionList

下拉选项的值。

| 参数  | 说明                         | 类型             | 默认值 | 版本 |
| ----- | ---------------------------- | ---------------- | ------ | ---- |
| title | 下拉选项展示文本             | string           | -      |      |
| key   | 下拉选项展示文本对应的 value | string \| number | -      |      |

### optionFromHttp

远程获取的 Form 表单项下拉选项值。

| 参数       | 说明                 | 类型                             | 默认值 | 版本 |
| ---------- | -------------------- | -------------------------------- | ------ | ---- |
| key        | 表单项对应的字段名   | string                           | -      |      |
| optionList | 下拉选项的 option 值 | [optionListType](#optionlist)\[] | -      |      |
