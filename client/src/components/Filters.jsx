import React from "react";
import { IoMdAdd } from "react-icons/io";

const Filters = ({
  setCategoryFilter,
  setSearchTerm,
  setSortOrder,
  categoryFilter,
  searchTerm,
  sortOrder,
  setShowForm,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 gap-5">
      {/* Filter by Category */}
      <div>
        <label htmlFor="category" className="mr-2">
          Filter by Category:
        </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-2 py-1 border rounded-md"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
          <option value="Health">Health</option>
          <option value="Social">Social</option>
        </select>
      </div>

      {/* Search Task */}
      <div>
        <input
          type="text"
          placeholder="Search Task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 border rounded-md"
        />
      </div>

      {/* Sort by Priority */}
      <div>
        <label htmlFor="sortOrder" className="mr-2">
          Sort by Priority:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-2 py-1 border rounded-md"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Add New Task Button */}
      <div
        className="flex justify-center gap-1 items-center bg-indigo-600 px-2 py-1 text-white rounded-md cursor-pointer"
        onClick={() => setShowForm(true)}
      >
        <IoMdAdd className="text-lg" />
        Add New
      </div>
    </div>
  );
};

export default Filters;
