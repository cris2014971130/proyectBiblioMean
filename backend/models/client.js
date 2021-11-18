import mongoose from "mongoose";
const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "roles" },
  registerDate: {type: Date, Default: Date.now},
  dbStatus: {type: Boolean, Default: true},
});

const client = mongoose.model("clients", clientSchema);

export default client