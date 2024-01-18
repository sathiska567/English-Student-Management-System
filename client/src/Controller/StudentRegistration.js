import React from 'react';
import { Select, Space } from 'antd';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const options = [
  {
    label: 'China',
    value: 'china',
    emoji: '🇨🇳',
  },
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
  },
  {
    label: 'Japan',
    value: 'japan',
    emoji: '🇯🇵',
  },
  {
    label: 'Korea',
    value: 'korea',
    emoji: '🇰🇷',
  },
];
const App = () => (
  <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="select one country"
    defaultValue={['china']}
    onChange={handleChange}
    optionLabelProp="label"
    options={options}
    optionRender={(option) => (
      <Space>
        <span role="img" aria-label={option.data.label}>
          {option.data.emoji}
        </span>
        {option.data.desc}
      </Space>
    )}
  />
);
export default App;