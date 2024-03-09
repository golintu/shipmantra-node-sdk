import mongoose, { Schema, Types } from 'mongoose';
import { AgentOrganizationCollection, AgentOrganizationInterface } from './AgentOrgsModel';


export enum agentUserRole {
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
}

export interface AgentUserInterface extends mongoose.Document {
  agentOrg: AgentOrganizationInterface | Types.ObjectId;
  uid: string,
  userRole: string,
  modules: string[]
}

export const AgentUserCollection = 'AgentUsers';

export const AgentUserSchema = new Schema<AgentUserInterface>({
  agentOrg: { type: Schema.Types.ObjectId, ref: AgentOrganizationCollection, required: true },
  uid: {
    type: String,
    required: true
  },
  userRole: { type: String, enum: Object.values(agentUserRole), default: agentUserRole.ADMIN, required: true },
  modules: [String]
}, {
  collection: AgentUserCollection,
  timestamps: true
});

export const AgentUserModel = mongoose.model<AgentUserInterface>(AgentUserCollection, AgentUserSchema);