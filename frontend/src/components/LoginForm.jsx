import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserOutlined, LockOutlined, UserSwitchOutlined, } from '@ant-design/icons';
import '../index.css'; // Tailwind base
import '../ComponentsStyleSheet/login-signup.css'


const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const LoginForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
   
    const onFinish = async values => {

        setLoading(true)


        try {

            const newUser = await axios.post('http://localhost:3000/login', values);
            console.log(newUser.data)

            // Save the token to local storage
            localStorage.setItem('token', newUser.data.token);

                        
            toast.success("User logged in successfully")


            setTimeout(() => {
                setLoading(false)
                    navigate('/user-panel');
               
            }, 2000);

        } catch (error) {
            console.log(error)
            toast.error("User does not exist")
            setLoading(false)
        };
    }
    return (
        <>
            <h1 className='classroom-head text-2xl font-bold text-white text-center bg-[#161179] p-2'>Employee Management System</h1>

            <h1 className='text-center mt-[100px] mb-[45px] text-[38px] text-[#161179] font-[Georgia] font-bold' >Login <span className='text-[#03C988]'>to your Account</span></h1>
            <Form
                name="basic"
                style={{ maxWidth: 400, margin: '0 auto', marginTop: 30 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item

                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox className="custom-checkbox">Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <div style={{ textAlign: 'center' }} >

                        <button alt={loading ? "Logining..." : "Login"} className='user-btn' htmlType="submit">

                            <i>L</i>
                            <i>o</i>
                            <i>g</i>
                            <i>&nbsp;</i>
                            <i>i</i>
                            <i>n</i>

                        </button>

                        <p id="or" class="mx-auto font-bold text-[#161179]"> <span> OR </span></p>

                        <p style={{ marginTop: '20px' }}>Don't have an account? <a href="/register" className='italic'>Sign up</a></p>
                       
                    </div>

                </Form.Item>
            </Form>
        </>
    );
};
export default LoginForm;