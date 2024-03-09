import mongoose, { Schema, Types } from 'mongoose';


export interface AgentOrganizationInternalInterface extends mongoose.Document {
  accountActive: boolean,
  storeActive: boolean,
  multiHubActive: boolean,
  bankVerified: boolean,
  companyVerified: boolean,
}

export const AgentOrganizationInternalCollection = 'AgentOrgsInternal';

export const AgentOrgInternalSchema = new Schema<AgentOrganizationInternalInterface>({
  accountActive: {type: Boolean},
  storeActive: {type: Boolean},
  multiHubActive: {type: Boolean},
  bankVerified: {type: Boolean},
  companyVerified: {type: Boolean},
}, {
  collection: AgentOrganizationInternalCollection,
  timestamps: true
});


export const AgentOrgsInternalModel = mongoose.model<AgentOrganizationInternalInterface>(AgentOrganizationInternalCollection, AgentOrgInternalSchema);