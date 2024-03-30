import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskTable from "../components/TaskTable";

const TaskList = () => {
  // State variables for tasks, loading state, error, and reload flag
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      // Fetch token and user data from localStorage
      const token = localStorage.getItem("taskifyToken");
      const user = JSON.parse(localStorage.getItem("taskifyUser"));

      // Set authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch tasks for the current user from the server
      const response = await axios.get(
        `https://taskify-c5a2.onrender.com/api/v1/task/user/${user._id}`,
        config
      );

      // Set tasks state with the fetched data
      setTasks(response.data.data);
      // Set loading state to false
      setLoading(false);
    } catch (error) {
      // Set error state if there's an error during fetching tasks
      setError(error.message);
      // Set loading state to false
      setLoading(false);
    }
  };

  // useEffect hook to fetch tasks when the component mounts or reload flag changes
  useEffect(() => {
    fetchTasks();
  }, [reload]);

  // Render loading message if data is loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render TaskTable component with tasks data and setReload function
  return (
    <div>
      <TaskTable tasks={tasks} setReload={setReload} />
    </div>
  );
};

export default TaskList;
