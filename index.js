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


    res.render('success', { shortUrl: shortUrl });
    console.log("Short URL: ", shortUrl);

});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
