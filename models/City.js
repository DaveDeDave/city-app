import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String
});

export default mongoose.model("City", CitySchema);