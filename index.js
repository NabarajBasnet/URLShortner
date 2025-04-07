const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const { nanoid } = require('nanoid');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { shortUrl: null })
});

app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const shortId = nanoid(6);
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

    res.render('index', { shortUrl: shortUrl });
    console.log("Short URL: ", shortUrl);

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

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
