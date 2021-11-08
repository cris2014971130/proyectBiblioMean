import mongoose from "mongoose";
const providerSchema = new mongoose.Schema({
  name: String,
  address: String,
  registerDate: {type: Date, Default: Date.now},
});

const provider = mongoose.model("providers", providerSchema);

export default provider