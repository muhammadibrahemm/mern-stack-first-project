require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require("./router/auth-route");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, PATCH, DELETE, PATCH, HEAD",
    credential:true
}

app.use(cors(corsOptions))

// defining the middleware
app.use(express.json());


// defining routes for website
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
// defining admin route
app.use("/api/admin",adminRoute)

const PORT = 8700;
app.use(errorMiddleware);
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`server is started on ${PORT}`);  
    })
})





