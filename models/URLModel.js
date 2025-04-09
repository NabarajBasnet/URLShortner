const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    shortId: String,
    expiresAt: Date,
    clicks: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

const URL = mongoose.models.url || mongoose.model('url', URLSchema);

module.exports = URL;

