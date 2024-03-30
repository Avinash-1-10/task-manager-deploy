import React, { useState } from "react";
import TaskRow from "./TaskRow";
import TaskForm from "./TaskForm";
import Filters from "./Filters";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskTable = ({ tasks, setReload }) => {
  // State variables for filtering, sorting, and controlling forms
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [taskData, setTaskData] = useState(null);

  // Filter tasks based on category and search term
  const filteredTasks = tasks.filter((task) => {
    if (categoryFilter === "All" || task.category === categoryFilter) {
      return task.task.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  // Sort filtered tasks based on priority and sort order
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === "desc") {
      return b.priority - a.priority;
    } else {
      return a.priority - b.priority;
    }
  });

  // Function to handle task deletion
  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("taskifyToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/task/${taskId}`,
        config
      );
      toast.success(data.message);
      setReload((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // Function to handle task update
  const handleUpdate = (task) => {
    setTaskData(task);
    setShowUpdateForm(true);
  };

  return (
    <>
      {/* Task creation form */}
      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} setReload={setReload} />
      )}

      {/* Task table */}
      <div className="overflow-x-auto m-1 md:m-10">
        {/* Filtering options */}
        <Filters
          setCategoryFilter={setCategoryFilter}
          setSearchTerm={setSearchTerm}
          setSortOrder={setSortOrder}
          categoryFilter={categoryFilter}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          setShowForm={setShowForm}
        />

        {/* Task table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTasks.map((task) => (
              <TaskRow
                task={task}
                key={task._id}
                setReload={setReload}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>

        {/* Display message if no tasks found */}
        {sortedTasks.length === 0 && (
          <p className="text-center my-5 text-lg font-semibold">
            No Task found
          </p>
        )}
      </div>

      {/* Task update form */}
      {showUpdateForm && taskData && (
        <TaskForm
          onClose={() => setShowUpdateForm(false)}
          setReload={setReload}
          taskData={taskData}
        />
      )}

      {/* Toast notifications container */}
      <ToastContainer />
    </>
  );
};

export default TaskTable;
