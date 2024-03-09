import mongoose, { Schema, Types } from 'mongoose';
import { AgentUserCollection, AgentUserInterface } from './AgentUsersModel';
import { AgentOrganizationInternalCollection, AgentOrganizationInternalInterface } from './AgentOrgsInternalModel';
import { AgentCustomerCollection, AgentCustomerInterface } from './AgentCustomerModel';


export interface AgentOrganizationInterface extends mongoose.Document {
  // shipmantra internal details
  internalDetails:  AgentOrganizationInternalInterface | Types.ObjectId,
  // company details
  companyDetails:{
    companyLegalName: string,
    gstin: string,
    pan: string,
  },
  orgUsers: AgentUserInterface[] | Types.ObjectId[],
  // bank a/c details
  bankDetails: {
    acNo: string,
    acName: string,
    bankName: string,
    ifscCode: string
  },
  // store (my app) config
  storeDetails: {
    storeURL: string,
    storeBanners: {imgUrl:string, active:boolean}[],
    storeLogoURL: string,
    storeThemeColors: {
      primary: string,
      secondary: string
    }
  },
  // working hours for my app
  operationHours: {
    workingHours: {
      startTime: string,
      endTime: string
    },
    pickupHours: {
      startTime: string,
      endTime: string
    },
    deliveryHours: {
      startTime: string,
      endTime: string
    }
  },
  // shipmantra network - customers
  linkedCustomers: {
    customerType: AgentCustomerInterface | Types.ObjectId,
    uid: string,
  }[],
  // shipmantra network - agents
  linkedAgents: {
    agentOrgId: string
  }[],
  // shipmantra network - logistics service providers
  linkedMidmileProviders: {
    lspOrgId: string
  }[],
  // shipmantra network - direct shipping partners
  linkedShippingProviders: {
    dspOrgId: string,
    hyp: true
  }[]

}

export const AgentOrganizationCollection = 'AgentOrgs';

export const AgentOrgSchema = new Schema<AgentOrganizationInterface>({
  // shipmantra internal details
  internalDetails:  { type: Schema.Types.ObjectId, ref: AgentOrganizationInternalCollection, required: true },
  // company details
  companyDetails:{
    companyLegalName: {type: String, required: true},
    gstin: {type: String, required: true},
    pan: {type: String, required: true},
  },
  orgUsers: [{ type: Schema.Types.ObjectId, ref: AgentUserCollection, required: true },],
  // bank a/c details
  bankDetails: {
    acNo: {type: String},
    acName: {type: String},
    bankName: {type: String},
    ifscCode: {type: String}
  },
  // store (my app) config
  storeDetails: {
    storeURL: {type: String, unique: true},
    storeBanners: [{imgUrl: {type: String}, active: {type: Boolean}}],
    storeLogoURL: {type: String},
    storeThemeColors: {
      primary: {type: String},
      secondary: {type: String}
    }
  },
  // working hours for my app
  operationHours: {
    workingHours: {
      startTime: {type: String},
      endTime: {type: String}
    },
    pickupHours: {
      startTime: {type: String},
      endTime: {type: String}
    },
    deliveryHours: {
      startTime: {type: String},
      endTime: {type: String}
    }
  },
  // shipmantra network - customers
  linkedCustomers: [{ type: Schema.Types.ObjectId, ref: AgentCustomerCollection, required: true }],
  // shipmantra network - agents
  linkedAgents: [{agentOrgId: {type: String}}],
  // shipmantra network - logistics service providers
  linkedMidmileProviders: [{lspOrgId: {type: String}}],
  // shipmantra network - direct shipping partners
  linkedShippingProviders: [{dspOrgId: {type: String}}]
}, {
  collection: AgentOrganizationCollection,
  timestamps: true
});

export const AgentOrgModel = mongoose.model<AgentOrganizationInterface>(AgentOrganizationCollection, AgentOrgSchema);