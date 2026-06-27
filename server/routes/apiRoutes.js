import express from "express";
import ApiKey from "../models/ApiKey.js";
import connectDB, { isDbReady } from "../config/db.js";

const router = express.Router();

let inMemoryApiKeys = [
  {
    _id: "demo-1",
    label: "ElevenLabs - Main Acct",
    key: "sk_eleven_9876543210abcdef",
    provider: "ElevenLabs",
    active: true,
  },
];

const normalizeApiKey = (item) => ({
  id: item._id || item.id,
  label: item.label,
  key: item.key,
  provider: item.provider || "ElevenLabs",
  active: item.active,
});

const getAllApiKeys = async () => {
  if (!isDbReady()) {
    const connected = await connectDB();
    if (!connected) {
      return inMemoryApiKeys.map(normalizeApiKey);
    }
  }

  try {
    const dbKeys = await ApiKey.find({}).sort({ createdAt: -1 });
    return dbKeys.map(normalizeApiKey);
  } catch (error) {
    console.error("Error loading API keys from MongoDB:", error.message);
    return inMemoryApiKeys.map(normalizeApiKey);
  }
};

router.get("/", async (_req, res) => {
  try {
    const data = await getAllApiKeys();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { label, key, provider, active } = req.body;

    if (!label || !key) {
      return res.status(400).json({
        success: false,
        message: "Label and key are required",
      });
    }

    if (!isDbReady()) {
      const connected = await connectDB();
      if (connected) {
        const apiKey = new ApiKey({
          label,
          key,
          provider,
          active,
        });

        await apiKey.save();

        return res.status(201).json({
          success: true,
          message: "API Key Added Successfully",
          data: normalizeApiKey(apiKey),
        });
      }
    }

    if (isDbReady()) {
      const apiKey = new ApiKey({
        label,
        key,
        provider,
        active,
      });

      await apiKey.save();

      return res.status(201).json({
        success: true,
        message: "API Key Added Successfully",
        data: normalizeApiKey(apiKey),
      });
    }

    const newEntry = {
      _id: `memory-${Date.now()}`,
      label,
      key,
      provider: provider || "ElevenLabs",
      active: active ?? true,
    };

    inMemoryApiKeys.unshift(newEntry);

    return res.status(201).json({
      success: true,
      message: "API Key Added Successfully",
      data: normalizeApiKey(newEntry),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbReady()) {
      const deleted = await ApiKey.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "API key not found" });
      }

      return res.json({ success: true, message: "API Key Deleted Successfully" });
    }

    inMemoryApiKeys = inMemoryApiKeys.filter((item) => item._id !== id);
    return res.json({ success: true, message: "API Key Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;