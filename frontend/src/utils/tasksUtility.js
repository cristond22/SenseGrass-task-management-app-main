import axios from "axios";

const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  

// Create a task
const createTask = async (taskData) => {
    try {
        let token = getCookieValue('token')
        console.log("token value ", token)
      const response = await axios.post('http://localhost:5000/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true 
      });

      return response.data;
    } catch (error) {

      console.error(error.response.data);
      return null;
    }
  };
  
  // Get all tasks
  const getAllTasks = async (sortBy, filterBy) => {
    try {
        let token = getCookieValue('token')
      const response = await axios.get('http://localhost:5000/tasks', {
        params: {
          sortBy, 
          filterBy, 
        },
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true 

      });
      return response.data;
    } catch (error) {
      console.error(error.response.data); 
      return null;
    }
  };
  
  // Get a task by id
  const getTaskById = async (id) => {
    try {
        let token = getCookieValue('token')
      const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true 

      });
      return response.data;
    } catch (error) {
      console.error(error.response.data); 
      return null;
    }
  };
  
  // Update a task by id
  const updateTaskById = async (id, taskData) => {
    try {
        let token = getCookieValue('token')
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true 

      });
      return response.data;
    } catch (error) {
      console.error(error.response.data); 
      return null;
    }
  };
  
  // Delete a task by id
  const deleteTaskById = async (id) => {
    try {
      let token = getCookieValue('token')
      const response = await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true 

      });
      return response.data;
    } catch (error) {
    console.log("deleletting")

      console.error(error.response.data);
      return null;
    }
  };
  

  export {getCookieValue, createTask, updateTaskById, deleteTaskById, getAllTasks, getTaskById}