import { Schema, model, models } from "mongoose";

/* Creating a new schema for the task model. */
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Title must be less than 50 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", taskSchema);
