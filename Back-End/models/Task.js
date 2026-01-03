import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    priority: {
      type: Date,
      required: true,
    },
    user_id: {
        type: Object.user_id,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
