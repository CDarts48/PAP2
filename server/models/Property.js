import mongoose from 'mongoose';
const { Schema } = mongoose;

const AccountTableDataSchema = new Schema({
  label: String,
  actual: Number,
  assessed: Number,
}, {
  _id: false, // This line ensures that MongoDB doesn't create an id for subdocuments
});

const TenantSchema = new Schema({
  name: String,
  moveInDate: String, // Assuming date is stored as a string
  rent: Number,
  leaseDuration: Number,
  contactInfo: Schema.Types.Mixed, // Assuming contactInfo is a mixed type
  waterSubmeter: Schema.Types.Mixed, // Assuming waterSubmeter is a mixed type
}, {
  _id: false, // This line ensures that MongoDB doesn't create an id for subdocuments
});

const UnitSchema = new Schema({
  unitNumber: String,
  size: String,
  rent: Number,
  tenant: String,
}, {
  _id: false, // This line ensures that MongoDB doesn't create an id for subdocuments
});

const PropertySchema = new Schema({
  propertyAddress: {
    type: String,
    required: true,
    index: true, // Single field index
  },
  propertyType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Industrial', 'Land'],
  },
  city: {
    type: String,
    index: true, // Single field index
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  purchasePrice: {
    type: Number,
  },
  purchaseDate: {
    type: Date,
  },
  assessedValue: {
    value: {
      type: Number,
    },
    accountTableData: [AccountTableDataSchema],
  },
  assessmentDate: {
    type: Date,
  },
  rentalIncome: {
    type: Number,
  },
  propertySize: {
    type: Number,
  },
  sizeUnit: {
    type: String,
    enum: ['sqft', 'sqm', 'acre', 'hectare'],
    default: 'sqft',
  },
  yearBuilt: {
    type: Number,
  },
  description: {
    type: String,
  },
  amenities: {
    type: Schema.Types.Mixed,
  },
  propertyManager: {
    type: String,
  },
  tenants: [TenantSchema], // Adding tenants array
  units: [UnitSchema], // Adding units array
}, {
  timestamps: true,
});

// Compound index on city and state
PropertySchema.index({ city: 1, state: 1 });

const Property = mongoose.model('Properties', PropertySchema);

export default Property;