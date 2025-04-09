const mongoose = require('mongoose');

const ConnectDatabase = async () => {
    try {
        const connectionString = process.env.DB_CONNECTION_STRING;
        await mongoose.connect(connectionString);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("Error: ", error);
    };
};

module.exports = ConnectDatabase;
