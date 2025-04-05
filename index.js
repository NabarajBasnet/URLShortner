const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;




app.listen(() => {
    console.log(`Server listening at port ${PORT}`);
});
