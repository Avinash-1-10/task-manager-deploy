import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Styles for different categories
const categoryStyles = {
  Work: "text-blue-600",
  Personal: "text-green-600",
  School: "text-yellow-600",
  Health: "text-pink-600",
  Social: "text-purple-600",
};

// Styles for different priorities
const priorityStyles = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-red-200 text-red-800",
};

// Available priorities
const priorities = ["Low", "Medium", "High"];

const TaskRow = ({ task, handleDelete, handleUpdate }) => {
  // Get category style based on task category
  const categoryStyle = categoryStyles[task.category] || "";
  // Get priority style based on task priority
  const priorityStyle = priorityStyles[priorities[task.priority - 1]];

  return (
    <>
      <tr key={task.id}>
        {/* Task */}
        <td className="px-6 py-4 whitespace-nowrap">{task.task}</td>
        {/* Category */}
        <td className={`px-6 py-4 whitespace-nowrap ${categoryStyle}`}>
          {task.category}
        </td>
        {/* Priority */}
        <td className="px-6 py-4 whitespace-nowrap">
          <button className={`px-2 py-[3px] rounded-md text-xs ${priorityStyle}`}>
            {priorities[task.priority - 1]}
          </button>
        </td>
        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap">
          {/* Edit Button */}
          <button
            className="text-blue-600 hover:text-blue-900 mr-2"
            onClick={() => handleUpdate(task)}
          >
            <FaEdit />
          </button>
          {/* Delete Button */}
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDelete(task._id)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TaskRow;
