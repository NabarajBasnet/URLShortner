const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const { nanoid } = require('nanoid');
const URL = require('./models/URLModel');
const ConnectDatabase = require('./config/connectDb');
ConnectDatabase();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { shortUrl: null })
});

app.post('/shorten', async (req, res) => {
    await ConnectDatabase();
    const { longUrl } = req.body;
    const shortId = nanoid(6);
    const shortUrl = `${req.protocol}://${req.get('host')}/r/${shortId}`;
    const now = new Date()
    const expiresAt = new Date(now.setMonth(now.getMonth() + 5));

    const payload = { longUrl, shortUrl, shortId, expiresAt };
    const newUrl = await new URL(payload);
    const savedUrl = await newUrl.save();
    res.render('index', { shortUrl: shortUrl });

});

app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.get('/contactus', (req, res) => {
    res.render('contactus');
});

app.post('/contactus', (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact Form Submitted:", name, email, message);
    res.send("Thank you for reaching out! We’ll get back to you soon.");
});

app.get('/privacy', (req, res) => {
    res.render('privacy');
});

app.get('/terms', (req, res) => {
    res.render('terms');
});

app.get('/security', (req, res) => {
    res.render('security');
});

app.get('/clickcount', (req, res) => {
    res.render('clickcount', { data: null });
});

app.post('/shortedUrl', async (req, res) => {
    const { shortedUrl } = req.body;
    await ConnectDatabase();
    const found = await URL.findOne({ shortUrl: shortedUrl });
    res.render('clickcount', { data: found });
});

app.get('/r/:shortId', async (req, res) => {
    const { shortId } = req.params;

    try {
        const found = await URL.findOne({ shortId });

        if (!found) {
            res.render('error', { message: 'Short URL not found' });
            return res.status(404).send("Short URL not found");
        };

        const now = new Date();
        if (now > found.expiresAt) {
            res.render('error', { message: 'This link has expired' });
            return res.status(410).send("This link has expired.");
        };

        found.clicks = (found.clicks || 0) + 1;
        await found.save();

        return res.redirect(found.longUrl);

    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).send("Something went wrong!");
    };
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
