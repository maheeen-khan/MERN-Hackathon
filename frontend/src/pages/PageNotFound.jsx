import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {

    const nav = useNavigate()
    return (
        <>
         <h1 className='classroom-head text-2xl font-bold text-white text-center bg-[#161179] p-2'>Employee Management System</h1>
        <Result
        className='mt-3'
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
        <Button className='log' onClick={() => nav('/')}>Back Home</Button>
    }
      />
      </>
    )
};
export default PageNotFound;