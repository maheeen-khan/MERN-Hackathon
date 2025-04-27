import React, { useContext } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, UserAddOutlined, CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AddTaskPage from '../pages/AddTaskPage';

const MyLayout = ({ children }) => {
  const location = useLocation(); // Get the current path
  // const { totalStudents} = useContext(StudentContext);
  const navigate = useNavigate();
  // Logout functionality

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire('Logged out!', 'You have been successfully logged out.', 'success').then(() => {
          navigate('/'); // Redirect to the login page
          localStorage.removeItem('token');
          localStorage.removeItem('role');

        });
      }
    });
  };


  const items = [
    { key: "1", label: <Link to="/addTask"><UserAddOutlined /> Add Task</Link> },
    { key: "2", label: <Link to="/user-panel"><SearchOutlined /> Search</Link> },
    // {key: '4', label: "Total Students : "+ totalStudents},
    {
      key: '3', label: <button alt={"Logout"} className='logout user-btn pb-2' onClick={logout}>

        <i>L</i>
        <i>o</i>
        <i>g</i>
        <i>o</i>
        <i>u</i>
        <i>t</i>

      </button>
    },
  ];

  // Map pathname to Menu keys
  // const getSelectedKeys = () => {
  //   if (location.pathname === "/addTask") return ["1"];
  //   if (location.pathname === "/") return ["2"];
  //   if (location.pathname === "/") return ["3"];
  //   return [];
  // };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#161179',
        }}
      >
        <div className="demo-logo" />
        <h1 className='logo text-white text-2xl font-bold lg:me-96 md:me-56 sm:me-40'>TrackIt</h1>

        {/* <div style={{ marginLeft: 'auto' }}> */}

        <Menu
          theme="dark"
          mode="horizontal"
          className='menu'
          defaultSelectedKeys={['2']} // Dynamically update selected key
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: '#161179',
          }}
        />

        {/* </div> */}
      </Header>
      <Content
        style={{
          padding: '0 18px',
          marginTop: '27px',
        }}
      >

        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          color: 'grey'
        }}
      >
        TrackIt <span style={{ color: 'red' }}>©{new Date().getFullYear()}</span> Created by Maheen Khan
      </Footer>
    </Layout>
  );
};
export default MyLayout;