import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./dbConnection";
import router from "./routes/routes";
import errorHandler from "./controllers/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
}));

// logger
app.use((req, res, next)=>{
  console.log("url: ", req.path)
  console.log("params: ", req.params)
  console.log("body: ", req.body)
  next();
})

// routes
app.use('/api/v1',router);

// error handler
app.use(errorHandler);


// app.use("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});