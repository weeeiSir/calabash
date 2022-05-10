import React, { useEffect, useState, Fragment } from 'react';

import { Form, Row, Col, Input, InputNumber, DatePicker, Button, Select } from 'antd';
import SelectSearchGroup from './SelectSearchGroup';
import InputNumberCompact from './InputNumberCompact';
import { getSpan } from '../_utils/func';
import './less/index.less';

const gutter = { md: 6, lg: 24, xl: 48 };

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
    disabled = false,
    onChangeInput = (e) => e.target.value, // 提供联动，自定义逻辑出口
    onChange = (value) => value, // 提供联动，自定义逻辑出口
  } = item;
  switch (type) {
    case 'DatePicker':
      return <DatePicker format={format} style={{ width: '100%' }} />;
    case 'RangePicker':
      return <DatePicker.RangePicker format={format} style={{ width: '100%' }} />;
    case 'Input':
      return <Input onChange={onChangeInput} />;
    case 'InputNumber':
      return <InputNumber style={{ width: '100%' }} />;
    case 'InputNumberCompact':
      return <InputNumberCompact />;
    case 'Select':
      const list = getOptionList(optionFromHttp, key, optionList);
      return (
        <Select onChange={onChange} disabled={disabled}>
          {list.map((v) => (
            <Select.Option key={v.key} value={v.key}>
              {v.title}
            </Select.Option>
          ))}
        </Select>
      );
    case 'SelectSearchGroup':
      const _list = getOptionList(optionFromHttp, key, optionList);
      return <SelectSearchGroup optionList={_list} />;

    default:
      return null;
  }
}

const SearchForm = ({ form, expand = false, queryItems, optionFromHttp = [] }) => {
  const [span, setSpan] = useState(getSpan());
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setSpan(getSpan());
    });
    return () => {
      window.removeEventListener('resize', () => {
        console.log('销毁');
      });
    };
  }, []);

  function RenderForm(_queryItems, isShow) {
    return _queryItems.map((item) => (
      <Col span={span} key={item.key} className={isShow ? '' : 'hidden'}>
        <Form.Item
          label={item.label}
          name={item.key}
          initialValue={item.initialValue}
          rules={item.rules ? item.rules : undefined}
        >
          {GetFormItem(item, optionFromHttp)}
        </Form.Item>
      </Col>
    ));
  }

  const showLength = span === 6 ? 4 : 3;
  return (
    <Form className="search-form" form={form}>
      {!expand && <Row gutter={gutter}>{RenderForm(queryItems, true)}</Row>}
      {expand && (
        <Fragment>
          <Row gutter={gutter}>
            {RenderForm(queryItems.slice(0, showLength), true)}
            {RenderForm(queryItems.slice(showLength, queryItems.length), show)}
          </Row>
          <Row justify="end">
            <Button style={{ marginBottom: '10px' }} type="link" onClick={() => setShow(!show)}>
              {!show ? '更多筛选' : '收起'}
            </Button>
          </Row>
        </Fragment>
      )}
    </Form>
  );
};

export default SearchForm;
