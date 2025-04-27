import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    Input,
    Select
} from 'antd';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;
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

const UpdateTask = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);  // To track loading state for fetching data
    const navigate = useNavigate();
    const { id } = useParams();

    const onFinish = async (values) => {
        const token = localStorage.getItem('token'); // retrieve token after login
        setLoading(true);
console.log(id);

        const updateTask = async (values) => {
          try {
              const updateData = await axios.patch(
                  `http://localhost:3000/api/updateTask/${id}`,
                  values,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              
              console.log("Update Response:", updateData);  // Debug: Log response data
              
              toast.success("Task has been updated");
              setTimeout(() => {
                  setLoading(false);
                  navigate('/user-panel');
              }, 1000);
          } catch (err) {
              toast.error("Error updating task");
              console.log("Error:", err);
              setLoading(false);
          }
      }
  
      updateTask(values);
    };

    const getTask = async () => {
        const token = localStorage.getItem('token'); // retrieve token after login
        try {
            const uploadData = await axios.get(
                `http://localhost:3000/api/getTask/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            form.setFieldsValue(uploadData.data); // setting the form values
            setFetching(false); // Stop loading spinner once data is fetched
        } catch (error) {
            toast.error("Error fetching task details");
            console.log("Error:", error);
            setFetching(false); // Stop loading spinner in case of error
        }
    }

    useEffect(() => {
        getTask();
    }, [])

    return (
        <>
            {fetching ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h3>Loading...</h3>
                </div>
            ) : (
                <Form
                    className='update-form'
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
                                alt={loading ? 'Updating...' : 'Update Student'}
                                className="user-btn"
                                htmlType="submit"
                            >
                                <i>U</i>
                                <i>p</i>
                                <i>d</i>
                                <i>a</i>
                                <i>t</i>
                                <i>e</i>
                                <i>&nbsp;</i>
                                <i>T</i>
                                <i>a</i>
                                <i>s</i>
                                <i>k</i>
                            </button>
                        </div>
                    </Form.Item>

                </Form>
            )}
        </>
    );
};

export default UpdateTask;
