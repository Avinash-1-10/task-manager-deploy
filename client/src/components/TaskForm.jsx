import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = ({ onClose, setReload, taskData }) => {
  const [task, setTask] = useState(taskData?.task || "");
  const [category, setCategory] = useState(taskData?.category || "");
  const [priority, setPriority] = useState(taskData?.priority || "");
  const [loading, setLoading] = useState(false);

  // Function to create a new task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Retrieve token from local storage
      const token = localStorage.getItem("taskifyToken");
      // Set up request headers with the token for authorization
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Send a POST request to create a new task
      const response = await axios.post(
        "https://taskify-c5a2.onrender.com/api/v1/task",
        {
          task,
          category,
          priority: +priority,
        },
        config
      );
      // Display success message
      toast.success(response.data.message);
      // Reload tasks
      setReload((prev) => !prev);
      // Close the form after a short delay
      setTimeout(() => {
        // Reset form fields after successful submission
        setTask("");
        setCategory("");
        setPriority("");
        setLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      // Display error message if request fails
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // Function to update an existing task
  const updateTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Retrieve token from local storage
      const token = localStorage.getItem("taskifyToken");
      // Set up request headers with the token for authorization
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Send a PUT request to update the task
      const { data } = await axios.put(
        `https://taskify-c5a2.onrender.com/api/v1/task/${taskData._id}`,
        {
          task,
          category,
          priority: +priority,
        },
        config
      );
      // Display success message
      toast.success(data.message);
      // Reload tasks
      setReload((prev) => !prev);
      // Close the form after a short delay
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      // Display error message if request fails
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={taskData ? updateTask : createTask}
        className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes
          className="absolute top-0 right-0 m-4 cursor-pointer"
          onClick={onClose}
        />
        <div className="mb-4">
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-700"
          >
            Task
          </label>
          <input
            id="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-indigo-600 shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300  rounded-md outline-indigo-600  shadow-sm"
            required
          >
            <option value="">Select category...</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="School">School</option>
            <option value="Health">Health</option>
            <option value="Social">Social</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300  rounded-md outline-indigo-600  shadow-sm"
            required
          >
            <option value="">Select priority...</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`inline-block w-full px-4 py-2 text-center text-white ${
            loading ? "bg-gray-500" : "bg-indigo-600"
          } rounded-md ${
            loading ? "hover:bg-gray-600" : "hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? "loading" : taskData ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ToastContainer autoClose={450} />{" "}
      {/* Toast container for displaying notifications */}
    </div>
  );
};

export default TaskForm;
