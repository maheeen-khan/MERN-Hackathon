import React, { useState, useContext } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select
} from 'antd';
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../ComponentsStyleSheet/login-signup.css'

const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const BasicForm = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //   const { totalStudents, incrementStudentCount } = useContext(StudentContext)



    const onFinish = async (values) => {
        
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("No token found, please login again.");
            return;
        }

        setLoading(true);
        console.log("Submitted Values:", values);

        // const backendHostedURL = "https://classroom-production-fd75.up.railway.app"

        try {
            const uploadData = await fetch(`https://mern-hackathon-production-0923.up.railway.app/api/addTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the headers
                },
                body: JSON.stringify(values),
            });

            const data = await uploadData.json();

            setTimeout(() => {
                setLoading(false);
                form.resetFields();
                toast.success("Task added successfully!");
                // incrementStudentCount(); // Increment the count in context

                Swal.fire({
                    title: "Do you want to add more Task?",
                    showDenyButton: true,
                    confirmButtonText: "Yes",
                    denyButtonText: `Not yet`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        // Swal.fire("Saved!", "", "success");
                        navigate('/addtask')
                    } else if (result.isDenied) {
                        // Swal.fire("Changes are not saved", "", "info");
                        navigate('/user-panel')
                    }
                });


            }, 1000);

        } catch (error) {

            toast.error("Failed to add task! ❌");

        }

    };

    return (
        <>

            <div className="cent">
                <Form
                    {...formItemLayout}
                    form={form}
                    variant={'filled'}
                    style={{ margin: '0 auto' }}
                    initialValues={{ variant: 'filled' }}
                    onFinish={onFinish}
                >

                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input title!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select a status!' }]}
                    >
                        <Select placeholder="Select status">
                            <Option value="To Do">To Do</Option>
                            <Option value="In progress">In progress</Option>
                            <Option value="Done">Done</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Assigned To" name="AssignedTo" rules={[{ required: true, message: 'Please input assigned to!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label=" "
                        colon={false}
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <button
                                alt={loading ? 'Adding...' : 'Add Student'}
                                className="user-btn"
                                htmlType="submit"
                            >
                                <i>A</i>
                                <i>d</i>
                                <i>d</i>
                                <i>&nbsp;</i>
                                <i>T</i>
                                <i>a</i>
                                <i>s</i>
                                <i>k</i>
                            </button>
                        </div>
                    </Form.Item>


                </Form>
            </div>
        </>
    );
};
export default BasicForm;