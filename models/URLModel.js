const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    clickCount: { type: Number, default: 0 }
},
    { timestamps: true }
);

const URL = mongoose.models.url || mongoose.model('url', URLSchema);

module.exports = URL;

