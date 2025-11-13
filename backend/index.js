import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors"
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
import paymentRouter from "./route/paymentRoute.js";
import reviewRouter from "./route/reviewRoute.js";

dotenv.config();

const port = process.env.PORT ;



const app = express();
app.use(express.json())
app.use(cookieParser())
// CORS: allow localhost and deployed domains. Use a whitelist and echo allowed origins.
const allowedOrigins = [
    process.env.CLIENT_URL || "http://localhost:5173",
    "https://virtualcourses-ou5b.onrender.com",
    "https://virtualcourses-1-1n37.onrender.com",
]

app.use(cors({
    origin: function(origin, callback){
        // Allow requests with no origin (e.g., mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true)
        } else {
            return callback(new Error('CORS policy: This origin is not allowed.'))
        }
    },
    credentials: true,
}))

// Set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy to avoid COOP/COEP warnings
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none')
    next()
})


app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/order", paymentRouter)
app.use("/api/review", reviewRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    connectDB();
})
