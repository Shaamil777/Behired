  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema(
    {
      firstname: { type: String, trim: true },
      lastname: { type: String, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: false, default: null },
      googleId: { type: String, default: null },
      role:{type:String,default:"user"},
      plan: { type: String, default: "free" },
      isActive: { type: Boolean, default: true },
      startedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );

  export default mongoose.model("User", userSchema);
