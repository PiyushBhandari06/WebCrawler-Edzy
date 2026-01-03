import mongoose from "mongoose";

const OutgoingLinkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["internal", "external"],
      required: true,
    },
  },
  { _id: false }
);

const PageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  html: {
    type: String,
    required: true,
  },

  outgoingLinks: {
    type: [OutgoingLinkSchema],
    default: [],
  },

  incomingLinks: {
    type: [String], // URLs of pages linking to this page
    default: [],
  },

  crawledAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Page", PageSchema);
