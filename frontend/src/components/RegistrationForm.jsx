import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserOutlined, LockOutlined, UserSwitchOutlined, MailOutlined } from '@ant-design/icons';
import '../ComponentsStyleSheet/login-signup.css'

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const registrationForm = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleChange = value => {
        console.log(`selected ${value}`);
    };

    const onFinish = async values => {

        setLoading(true)
        // console.log('Success:', values);
        try {
            const newUser = await axios.post('https://mern-hackathon-production-0923.up.railway.app/register', values)
            console.log(newUser.data)
            toast.success("User registered successfully")
            setTimeout(() => {
                setLoading(false)
                navigate('/')

            }, 2000);
        } catch (error) {
            console.log(error)
            toast.error("User registration failed")
            setLoading(false)
        };
    }

    return (
        <>
            <h1 className='classroom-head text-2xl font-bold text-white text-center bg-[#161179] p-2'>TrackIt</h1>
            <h1 className='text-center mt-[100px] mb-[45px] text-[38px] text-[#161179] font-[Georgia] font-bold'>Sign up <span className='text-[#03C988]'>your Account</span></h1>
            <Form
                name="basic"
                style={{ maxWidth: 400, margin: '0 auto', marginTop: 30 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>


                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: 'Please input username' },
                        { type: "string", min: 3, max: 15, message: "Username must be string & of its length should be 3 to 15" },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>

                
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input password' },
                        { type: "string", min: 6, max: 15, message: "Password length must be 6 to 15" },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <div style={{ textAlign: 'center' }}>

                        <button alt={loading ? "Signing..." : "Sign Up"} className='user-btn' htmlType="submit">

                            <i>S</i>
                            <i>i</i>
                            <i>g</i>
                            <i>n</i>
                            <i>&nbsp;</i>
                            <i>u</i>
                            <i>p</i>

                        </button>

                        <p id="or" class="mx-auto font-bold text-[#161179]"> <span> OR </span></p>

                        <p style={{ marginTop: '20px' }}>Already have an account? <a href="/" className='italic'>Login</a></p>

                    
                    </div>

                </Form.Item>
            </Form>
        </>
    );
};
export default registrationForm;