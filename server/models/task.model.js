import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    // User who owns the task
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: String,
      required: [true, "task is required"],
    },
    // Priority of the task (1-3)
    priority: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    // Category of the task (Work, Personal, School, Health, Social)
    category: {
      type: String,
      required: true,
      enum: ["Work", "Personal", "School", "Health", "Social"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
