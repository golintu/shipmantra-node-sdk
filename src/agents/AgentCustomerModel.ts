import mongoose, { Schema, Types } from 'mongoose';
import { AgentOrganizationCollection, AgentOrganizationInterface } from './AgentOrgsModel';
import { AgentUserCollection, AgentUserInterface } from './AgentUsersModel';

export enum customerType {
  businessCustomer = 'BUSINESS_CUSTOMER',
  aggregatorCustomer = 'AGGREGATOR_CUSTOMER'
}

// agent store specific data
interface AgentCustomerAgentDataInterface{
  creditLimit: number,
  allowCredit: boolean,
  enabledServices: string[],
  customerWalletId: string,
  metaData: {
    createdAt: Date,
    createdBy: AgentUserInterface | Types.ObjectId,
  }
}

const AgentCustomerAgentDataSchema = new Schema<AgentCustomerAgentDataInterface>({
  creditLimit: {type: Number},
  allowCredit: {type: Boolean},
  enabledServices: [{type: String}],
  customerWalletId: {type: String},
  metaData: {
    createdAt: {type: Date},
    createdBy: { type: Schema.Types.ObjectId, ref: AgentUserCollection, required: true },
  }
})


// agent customer root doc
export interface AgentCustomerInterface extends mongoose.Document {
  uid: string,
  type: customerType,
  agentData: Record<string, AgentCustomerAgentDataInterface>;
}

export const AgentCustomerCollection = 'AgentCustomers';

export const AgentCustomerSchema = new Schema<AgentCustomerInterface>({
  uid: {
    type: String,
    required: true
  },
  type: { type: String, enum: Object.values(customerType), required: true },
  agentData: {
    type: Map,
    of: AgentCustomerAgentDataSchema
  }
}, {
  collection: AgentCustomerCollection,
  timestamps: true
});

export const AgentCustomerModel = mongoose.model<AgentCustomerInterface>(AgentCustomerCollection, AgentCustomerSchema);