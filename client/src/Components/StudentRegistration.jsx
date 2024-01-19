import React, { useState } from 'react';
import { Radio, Select, Space } from 'antd';
import axios from 'axios';

const StudentRegistration = () => {
  const [size, setSize] = useState('middle');
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const [registrationValues,setRegistrationValues] = useState([]);


const options = [];

for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

const handleChange = async(value) => {
    console.log(`Selected: ${value}`);  
    setRegistrationValues(value)
  };


const studentDataRegistration = async () => {
       
  try {
        console.log(registrationValues);
        const response = await axios.post('http://localhost:8080/api/v1/registration/studentRecords', {courseLevel:registrationValues})
     } catch (error) {
           
     }
}



  return (
    <>

      <br />
      <br />
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >

        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{
            width: '50%',
          }}
          options={options}
        />

      </Space>
      
      <button onClick={studentDataRegistration}>submit</button>


    </>
  );
};
export default StudentRegistration;