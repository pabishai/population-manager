import { Schema, model } from "mongoose";

const LocationSchema = new Schema({
  code: {
    type: Number,
    required: true
  },
  total: {
    type: Number
  },
  male: {
    type: Number,
    required: true
  },
  female: {
    type: Number,
    required: true
  },
  subLocations: [{ type: Schema.Types.ObjectId, ref: "Location" }]
});

LocationSchema.pre("save", function(next) {
  this.total = this.male + this.female;
  next();
});

export default model("Location", LocationSchema);
