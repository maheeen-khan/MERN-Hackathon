import React, { useState, useEffect } from 'react';
import ViewCard from '../components/ViewCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadTask = () => {
  const [taskData, setTaskData] = useState(null);
  const { id } = useParams();

  const getTask = async () => {
    const token = localStorage.getItem('token'); // retrieve token after login
    try {
      const response = await axios.get(`http://localhost:3000/api/getTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTaskData(response.data);  // Set the task data here
    } catch (error) {
      console.log("Error in getting task data!", error);
    }
  }

  useEffect(() => {
    getTask();
  }, [id]);  // Add id as dependency so it fetches data when the ID changes

  return (
    <>
      <div className="cont" style={{ position: 'relative' }}>
        {taskData === null ?  // Check if taskData is null instead of checking length
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          :
          <ViewCard
            title={taskData.title}
            description={taskData.description}
            status={taskData.status}
            AssignedTo={taskData.AssignedTo}
            createdAt={taskData.createdAt}
            updatedAt={taskData.updatedAt}
          />
        }
      </div>
    </>
  );
}

export default ReadTask;
