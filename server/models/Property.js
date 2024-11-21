import mongoose from 'mongoose';

const { Schema } = mongoose;

const AccountTableDataSchema = new Schema({
  label: { type: String, required: true },
  actual: { type: Number, required: true },
  assessed: { type: Number, required: true },
}, {
  _id: false, // This line ensures that MongoDB doesn't create an id for subdocuments
});

const TenantSchema = new Schema({
  name: { type: String, required: true },
  moveInDate: { type: String, required: true }, // Assuming date is stored as a string
  rent: { type: Number, required: true },
  leaseDuration: { type: Number, required: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  waterSubmeter: {
    serialNumber: { type: String, required: true },
    installationDate: { type: String, required: true },
    lastReading: { type: Number, required: true },
  },
}, {
  _id: false, // This line ensures that MongoDB doesn't create an id for subdocuments
});

const UnitSchema = new Schema({
  unitNumber: { type: String, required: true },
  size: { type: String, required: true },
  rent: { type: Number, required: true },
  tenant: { type: String, required: true },
}, {
  _id: false, // This line ensures that MongoDB doesn't create an id for subdocuments
});

const PropertySchema = new Schema({
  propertyAddress: { type: String, required: true, index: true }, // Index on propertyAddress
  accountNumber: { type: String, required: true },
  totalAccountValue: { type: String, required: true },
  accountTableData: [AccountTableDataSchema],
  tenants: [TenantSchema],
  units: [UnitSchema],
}, {
  timestamps: true,
  collection: 'Properties' // Explicitly set the collection name
});

const Property = mongoose.model('Property', PropertySchema);

export default Property;