# Task Manager Application

A simple task manager application built with React.js for the frontend and Node.js/Express.js for the backend.

## Technologies Used

- Frontend:

  - React.js
  - React Hooks
  - React Router
  - Tailwind CSS

- Backend:
  - Node.js
  - Express.js
  - MongoDB (for data storage)
  - JSON Web Token (JWT) for authentication
  - Axios for HTTP requests

## Installation

### Frontend

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-manager.git
```

2. Navigate to the frontend directory:

```bash
cd task-manager/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. The application should now be running on http://localhost:5173 in your browser.

### Backend

1. Navigate to the backend directory:

```bash
cd ../backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Create a `.env` file in the backend directory.
   - Define the following environment variables:
     - `PORT` - Port number for the server (default: 8000)
     - `MONGO_URI` - MongoDB connection URI

4. Start the server:

```bash
npm run dev
```

5. The backend server should now be running on the specified port.

## Features

- **View Tasks**: View all tasks with filtering, sorting, and searching options.
- **Add Task**: Add a new task with a title, category, and priority.
- **Edit Task**: Modify existing tasks.
- **Delete Task**: Remove tasks from the list.

## Usage

1. Open the application in your browser.
2. Log in with your email and password, or register if you're a new user.
3. Once logged in, you'll see a list of tasks with options to filter, sort, and search.
4. To add a new task, click on the "Add New" button and fill in the details in the form.
5. To edit or delete a task, click on the corresponding buttons in the task list.
