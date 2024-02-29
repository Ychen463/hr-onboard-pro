import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
  lastModifiedDatetime: { type: Date },
});

const facilityReportSchema = new Schema({
  housing: { type: Schema.Types.ObjectId, ref: 'Housing' },
  title: { type: String },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
  createdDatetime: { type: Date },
  status: { type: String, enum: ['Open', 'InProgress', 'Closed'] },
  comments: [commentSchema],
});

const FacilityReport = mongoose.model('FacilityReport', facilityReportSchema);

export default FacilityReport;
