---
nav:
  title: 表单填写
  toc: menu
title: FillForm 表单填写
order: 4
---

## FillForm 代码演示

Demo:

```tsx
/**
 * desc: 表单填写，集成了Input，InputNumber，DatePicker，Select，Radio，Switch，Rate，Checkbox等控件，以配置的形式去驱动表单提交，通过onValuesChange或控件的onChange事件可实现自定义联动。
 */
import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Button } from 'antd';
import { FillForm } from 'crud-shared';

let unmounted = false;
const originItems = [
  {
    label: '账号',
    key: 'account',
    type: 'Input',
    initialValue: '',
    rules: [
      {
        required: true,
        message: '请输入账号',
      },
    ],
  },
  {
    label: '是否启用账号',
    key: 'isUsed',
    type: 'Radio',
    initialValue: '',
    optionList: [
      { title: '是', key: 1 },
      { title: '否', key: 0 },
    ],
    rules: [
      {
        required: true,
        message: '请选择状态',
      },
    ],
    span: 24,
  },
  {
    label: '启用时段',
    key: 'transferTime',
    type: 'Checkbox',
    initialValue: '',
    optionList: [
      { title: '8:00', key: 1 },
      { title: '9:00', key: 2 },
      { title: '21:00', key: 3 },
      { title: '22:00', key: 4 },
    ],
    span: 24,
  },
  {
    label: '信用评分',
    key: 'rate',
    type: 'Rate',
    initialValue: '',
    span: 24,
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
      { title: '未处理', key: 0 },
      { title: '处理中', key: 1 },
      { title: '已处理', key: 2 },
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
    type: 'DatePicker',
    initialValue: '',
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
  const [renderItems, setRenderItems] = useState(originItems);
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

  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues);
    const { isUsed } = changedValues;
    const originKey = ['transferTime', 'rate'];
    if (isUsed === 0) {
      form.setFieldsValue({ money: null });
      const temp = renderItems.map((item) => ({
        ...item,
        hidden: originKey.includes(item.key),
      }));
      setRenderItems(temp);
    }
    if (isUsed === 1) {
      form.setFieldsValue({ money: 1000 });
      const temp = renderItems.map((item) => ({
        ...item,
        hidden: false,
      }));
      setRenderItems(temp);
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <div>
      <FillForm
        form={form}
        renderItems={renderItems}
        optionFromHttp={optionFromHttp}
        onValuesChange={onValuesChange}
      />
      <Row justify="end">
        <Button type="primary" onClick={onSubmit}>
          提交
        </Button>
      </Row>
    </div>
  );
};
```

## API

### FillForm 表单填写

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| form | Form 实例，用于管理所有数据状态，用法同 `antd 4.x` | FormInstance | - |  |
| renderItems | Form 表单项配置 | [renderItemsType](#renderitems)\[] |  |
| optionFromHttp | 远程获取的 Form 表单项 option 选项值 | [optionFromHttpType](#optionfromhttp)\[] | - |  |
| span | 表单项栅格占位格数 | number | 8 |  |
| onValuesChange | 表单字段值更新时触发回调事件 | function(changedValues, allValues) |  |  |

### renderItems

Form.Item 表单里的控件配置。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 表单项文本 | string | - |  |
| key | 表单项对应的字段名 | string | - |  |
| type | 表单项控件类型，目前支持 11 种：`Input`，`Input.TextArea`，`Input.Password`，`InputNumber`，`DatePicker`，`Select`，`Radio`，`Switch`，`Rate`，`Checkbox`，`SelectSearch`（下拉带远程搜索） | string | - |  |
| initialValue | 表单项初始值 | string \| number \| array | - |  |
| rules | 表单项校验规则，设置字段的校验逻辑，规则同`antd 4.x` |  | - |  |
| hidden | 动态控制表单项展示，隐藏 | boolean | false |  |
| optionList | 下拉选项的 option 值，适用于 type 为 `Select`、`Checkbox`、`Radio`的控件 | [optionListType](#optionlist)\[] | - |  |
| searchKey | 搜索 key，适用于 type 为 `SelectSearch`的控件 | string | - |  |
| conditionJson | 搜索自定义查询入参，适用于 type 为 `SelectSearch`的控件 | string | - |  |
| props | 为控件添加自定义属性 | object | - |  |
| onChange | 值变化时，触发函数 | function(value, option:[OptionType](./select-search#optiontype) \| null) | - |  |

### optionList

下拉选项的值。

| 参数  | 说明                         | 类型             | 默认值 | 版本 |
| ----- | ---------------------------- | ---------------- | ------ | ---- |
| title | 下拉选项展示文本             | string           | -      |      |
| key   | 下拉选项展示文本对应的 value | string \| number | -      |      |

### optionFromHttp

远程获取的 Form 表单项 option 选项值。

| 参数       | 说明                 | 类型                             | 默认值 | 版本 |
| ---------- | -------------------- | -------------------------------- | ------ | ---- |
| key        | 表单项对应的字段名   | string                           | -      |      |
| optionList | 下拉选项的 option 值 | [optionListType](#optionlist)\[] | -      |      |
