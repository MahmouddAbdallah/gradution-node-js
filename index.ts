import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import connectDB from './src/config/connectDB';
import authRouter from './src/routes/auth'
import blogRouter from './src/routes/blogRouting'
import userRouting from './src/routes/userRouting'
import verifyRouter from './src/routes/verifyme'
import cors from 'cors'
// create app
const app = express();

//config dotenv
dotenv.config({ path: './.env' })
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}


//middlewares 
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))
//routing 
app.use('/auth', authRouter)
app.use('/api', verifyRouter)
app.use('/api', blogRouter)
app.use('/api', blogRouter)
app.use('/api', userRouting)


//not found 
app.use("*", (req, res) => {
    res.status(404).json({ message: "This URL is not founded!" })
})


//connect to db
connectDB(process.env.DATABASE_URL as string)
// listen app
const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log('http://localhost:' + port)
})