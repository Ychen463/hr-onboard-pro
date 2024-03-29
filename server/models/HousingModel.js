import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the HousingSchema
const HousingSchema = new Schema({
  name: { type: String },
  address: { type: String },
  landlord: {
    fullName: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
  },
  residents: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
  facilityInfo: {
    beds: { type: Number },
    mattresses: { type: Number },
    tables: { type: Number },
    chairs: { type: Number },
  },
});

const Housing = mongoose.model('Housing', HousingSchema);

export default Housing;
