import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import connectDB from './src/config/connectDB';
import authRouter from './src/routes/auth'
import blogRouter from './src/routes/blogRouting'
import userRouting from './src/routes/userRouting'
import verifyRouter from './src/routes/verifyme'
import bioRouter from './src/routes/bioRouting'
import appointmentRouter from './src/routes/appointmentRouting'
import certificationRouter from './src/routes/certificationRouting'
import notificationRouter from './src/routes/notificationRouting'
import storeRouter from './src/routes/storeRouting'
import searchRouter from './src/routes/searchRouting'
import waterRouter from './src/routes/waterRouting'
import chatRouter from './src/routes/chatRouting'
import foodNoteRouter from './src/routes/foodNoteRouting'
import communityRouter from './src/routes/communityRouting'
import logout from './src/routes/logout'
import http from 'http'
import cors from 'cors'
import socketIO from './src/middlewares/socketIO';
import path from 'path'

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
app.use('/api', appointmentRouter)
app.use('/api', bioRouter)
app.use('/api', certificationRouter)
app.use('/api', notificationRouter)
app.use('/api', storeRouter)
app.use('/api', searchRouter)
app.use('/api', chatRouter)
app.use('/api', waterRouter)
app.use('/api', foodNoteRouter)
app.use('/api', communityRouter)
app.use('/api', logout)

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});
//not found 
app.use("*", (req, res) => {
    res.status(404).json({ message: "This URL is not founded!" })
})


//connect to db
connectDB(process.env.DATABASE_URL as string)
// listen app
const port = process.env.PORT || 5001
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`server run at ${port}`);
})
socketIO(server)