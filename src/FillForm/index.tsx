import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Radio,
  Switch,
  Slider,
  Rate,
  Checkbox,
  ConfigProvider,
} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import SelectSearch from '../SelectSearch';

function getOptionList(optionFromHttp, key, optionList) {
  const exit = optionFromHttp.filter((ele) => ele.key === key);
  const result = exit.length ? exit[0].optionList : optionList;
  return result;
}

function GetFormItem(item, optionFromHttp) {
  const {
    key,
    type,
    optionList,
    format,
    onChange = (value) => value, // 提供联动，自定义逻辑出口
    fetchList,
    searchKey,
    conditionJson,
    props = {},
  } = item;
  switch (type) {
    case 'DatePicker':
      return <DatePicker format={format} style={{ width: '100%' }} {...props} />;
    case 'Input':
      return <Input onChange={(e) => onChange(e.target.value)} {...props} />;
    case 'Input.TextArea':
      return <Input.TextArea onChange={(e) => onChange(e.target.value)} {...props} />;
    case 'Input.Password':
      return <Input.Password onChange={(e) => onChange(e.target.value)} {...props} />;
    case 'InputNumber':
      return <InputNumber style={{ width: '100%' }} {...props} />;
    case 'Select': {
      const list = getOptionList(optionFromHttp, key, optionList);
      return (
        <Select
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
          onChange={onChange}
          {...props}
        >
          {list.map((v) => (
            <Select.Option key={v.key} value={v.key}>
              {v.title}
            </Select.Option>
          ))}
        </Select>
      );
    }
    case 'SelectSearch': {
      return (
        <SelectSearch
          onChange={onChange}
          fetchList={fetchList}
          searchKey={searchKey}
          conditionJson={conditionJson}
          {...props}
        />
      );
    }
    case 'Radio': {
      const list = getOptionList(optionFromHttp, key, optionList);
      return (
        <Radio.Group onChange={onChange} {...props}>
          {list.map((v) => (
            <Radio key={v.key} value={v.key}>
              {v.title}
            </Radio>
          ))}
        </Radio.Group>
      );
    }
    case 'Switch':
      return <Switch />;
    case 'Rate': {
      return <Rate />;
    }
    case 'Checkbox': {
      const list = getOptionList(optionFromHttp, key, optionList);
      return (
        <Checkbox.Group onChange={onChange} {...props}>
          {list.map((v) => (
            <Checkbox key={v.key} value={v.key}>
              {v.title}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
    }
    default:
      return null;
  }
}
function FillForm({ form, renderItems, optionFromHttp = [], span = 8, onValuesChange }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} onValuesChange={onValuesChange}>
        <Row gutter={24}>
          {renderItems.map(
            (item) =>
              !item.hidden && (
                <Col span={item.span ? item.span : span} key={item.key}>
                  <Form.Item
                    label={item.label}
                    name={item.key}
                    initialValue={item.initialValue}
                    rules={item.rules ? item.rules : undefined}
                  >
                    {GetFormItem(item, optionFromHttp)}
                  </Form.Item>
                </Col>
              ),
          )}
        </Row>
      </Form>
    </ConfigProvider>
  );
}

export default FillForm;
