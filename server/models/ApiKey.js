import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "API label is required"],
      trim: true,
    },

    key: {
      type: String,
      required: [true, "API key is required"],
      trim: true,
    },

    provider: {
      type: String,
      default: "ElevenLabs",
      trim: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const ApiKey = mongoose.model("ApiKey", apiKeySchema);

export default ApiKey;