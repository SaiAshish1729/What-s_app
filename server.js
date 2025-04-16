require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require("cors");
const Connection = require('./DB/Connection');
const userRoute = require("./Routes/userRoutes.js")
const messageRoute = require("./Routes/messageRoute.js");
const cookieParser = require('cookie-parser');
const app = express();


const port = process.env.APP_PORT || 5000;
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // replace with your frontend URL
    credentials: true, // if using cookies or Authorization headers
}));
app.use(express.urlencoded({ extended: true }));

Connection();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use("/", userRoute);
app.use("/", messageRoute);

// app.use('*', (req, res) => {
//     res.status(404).json({ message: 'Route not found' });
// });
// https://www.youtube.com/watch?v=KGH6z0Z0GXA
// https://www.youtube.com/watch?v=AdLyWQej0Zg

app.listen(port, () => {
    console.log(`Listning on port http://localhost:${port}`);
});