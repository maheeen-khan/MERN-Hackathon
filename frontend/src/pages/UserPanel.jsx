import React, { useEffect, useState } from 'react';
import { MenuOutlined, LineChartOutlined, CheckCircleOutlined, EyeOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Userpanel = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const deleting = async (id) => {
    const token = localStorage.getItem('token'); 

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/api/deleteTask/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Deleted Task:", res.data);
          
          Swal.fire("Deleted!", "Task has been deleted.", "success");
          toast.error("Task Deleted Successfully!");

          // Refresh tasks after delete without reload
          setTasks(prevTasks => prevTasks.filter(task => task._id !== id));

        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/getTasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data); // save all tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Section */}
        <div className="bg-[#5cc8a4] rounded-lg shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="text-xl font-bold"><MenuOutlined /> To Do</h2>


            <span className="text-sm bg-white text-[#5cc8a4]  rounded-full px-2">{todoTasks.length}</span>
          </div>
          <div className="space-y-4 flex-1 overflow-auto">
            {todoTasks.length > 0 ? todoTasks.map(task => (
             <div key={task._id} className="bg-white text-gray-700 rounded-md p-4 shadow-sm flex justify-between items-center">
             {/* Title on the left */}
             <span>{task.title}</span>
           
             {/* Icons on the right */}
             <div className="flex space-x-3">
               <Link to={`/view-task/${task._id}`} style={{ color: '#27667B' }}>
                 <EyeOutlined />
               </Link>
               <Link to={`/update/${task._id}`} style={{ color: '#27667B' }}>
                 <EditOutlined />
               </Link>
               <Link onClick={() => deleting(task._id)} style={{ color: '#27667B' }}>
                 <MinusCircleOutlined />
               </Link>
             </div>
           </div>
           
            )) : (
              <p className="text-white">No tasks</p>
            )}
          </div>
        </div>

        {/* In Progress Section */}
        <div className="bg-blue-400 rounded-lg shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="text-xl font-bold"><LineChartOutlined /> In Progress</h2>
            <span className="text-sm bg-white text-blue-600 rounded-full px-2">{inProgressTasks.length}</span>
          </div>
          <div className="space-y-4 flex-1 overflow-auto">
            {inProgressTasks.length > 0 ? inProgressTasks.map(task => (
              <div key={task._id} className="bg-white text-gray-700 rounded-md p-4 shadow-sm flex justify-between items-center">
              {/* Title on the left */}
              <span>{task.title}</span>
            
              {/* Icons on the right */}
              <div className="flex space-x-3">
                <Link to={`/view-task/${task._id}`} style={{ color: '#27667B' }}>
                  <EyeOutlined />
                </Link>
                <Link to={`/update/${task._id}`} style={{ color: '#27667B' }}>
                  <EditOutlined />
                </Link>
                <Link onClick={() => deleting(task._id)} style={{ color: '#27667B' }}>
                  <MinusCircleOutlined />
                </Link>
              </div>
            </div>
              
            )) : (
              <p className="text-white text-center mt-10">No tasks</p>
            )}
          </div>
        </div>

        {/* Done Section */}
        <div className="bg-[#5cc8a4] rounded-lg shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="text-xl font-bold"><CheckCircleOutlined /> Done</h2>
            <span className="text-sm bg-white text-[#5cc8a4] rounded-full px-2">{doneTasks.length}</span>
          </div>
          <div className="space-y-4 flex-1 overflow-auto">
            {doneTasks.length > 0 ? doneTasks.map(task => (
              <div key={task._id} className="bg-white text-gray-700 rounded-md p-4 shadow-sm flex justify-between items-center">
              {/* Title on the left */}
              <span>{task.title}</span>
            
              {/* Icons on the right */}
              <div className="flex space-x-3">
                <Link to={`/view-task/${task._id}`} style={{ color: '#27667B' }}>
                  <EyeOutlined />
                </Link>
                <Link to={`/update/${task._id}`} style={{ color: '#27667B' }}>
                  <EditOutlined />
                </Link>
                <Link onClick={() => deleting(task._id)} style={{ color: '#27667B' }}>
                  <MinusCircleOutlined />
                </Link>
              </div>
            </div>
            )) : (
              <p className="text-white text-center mt-10">No tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpanel;
