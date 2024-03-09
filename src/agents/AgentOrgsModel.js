"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentOrgModel = exports.AgentOrgSchema = exports.AgentOrganizationCollection = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AgentUsersModel_1 = require("./AgentUsersModel");
const AgentOrgsInternalModel_1 = require("./AgentOrgsInternalModel");
const AgentCustomerModel_1 = require("./AgentCustomerModel");
exports.AgentOrganizationCollection = 'AgentOrgs';
exports.AgentOrgSchema = new mongoose_1.Schema({
    // shipmantra internal details
    internalDetails: { type: mongoose_1.Schema.Types.ObjectId, ref: AgentOrgsInternalModel_1.AgentOrganizationInternalCollection, required: true },
    // company details
    companyDetails: {
        companyLegalName: { type: String, required: true },
        gstin: { type: String, required: true },
        pan: { type: String, required: true },
    },
    orgUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: AgentUsersModel_1.AgentUserCollection, required: true },],
    // bank a/c details
    bankDetails: {
        acNo: { type: String },
        acName: { type: String },
        bankName: { type: String },
        ifscCode: { type: String }
    },
    // store (my app) config
    storeDetails: {
        storeURL: { type: String, unique: true },
        storeBanners: [{ imgUrl: { type: String }, active: { type: Boolean } }],
        storeLogoURL: { type: String },
        storeThemeColors: {
            primary: { type: String },
            secondary: { type: String }
        }
    },
    // working hours for my app
    operationHours: {
        workingHours: {
            startTime: { type: String },
            endTime: { type: String }
        },
        pickupHours: {
            startTime: { type: String },
            endTime: { type: String }
        },
        deliveryHours: {
            startTime: { type: String },
            endTime: { type: String }
        }
    },
    // shipmantra network - customers
    linkedCustomers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: AgentCustomerModel_1.AgentCustomerCollection, required: true }],
    // shipmantra network - agents
    linkedAgents: [{ agentOrgId: { type: String } }],
    // shipmantra network - logistics service providers
    linkedMidmileProviders: [{ lspOrgId: { type: String } }],
    // shipmantra network - direct shipping partners
    linkedShippingProviders: [{ dspOrgId: { type: String } }]
}, {
    collection: exports.AgentOrganizationCollection,
    timestamps: true
});
exports.AgentOrgModel = mongoose_1.default.model(exports.AgentOrganizationCollection, exports.AgentOrgSchema);
