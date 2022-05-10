import React from 'react';
import { InputNumber, Input } from 'antd';
export interface InputNumberCompactProps {
  onChange?: (value: number[]) => number[] | undefined;
  value?: number[];
}
function InputNumberCompact({ onChange, value }: InputNumberCompactProps) {
  const handleChangeValue = (inputValue, flag) => {
    if (value && onChange) {
      if (flag === 'start') {
        onChange([inputValue, value[1]]);
      }
      if (flag === 'end') {
        onChange([value[0], inputValue]);
      }
    }
  };
  return (
    <Input.Group compact>
      <InputNumber
        style={{ width: '40%', textAlign: 'center' }}
        onChange={(value) => handleChangeValue(value, 'start')}
      />
      <Input
        style={{ width: '20%', borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
        placeholder="~"
        disabled
      />
      <InputNumber
        style={{ width: '40%', textAlign: 'center', borderLeft: 0 }}
        onChange={(value) => handleChangeValue(value, 'end')}
      />
    </Input.Group>
  );
}

export default InputNumberCompact;
