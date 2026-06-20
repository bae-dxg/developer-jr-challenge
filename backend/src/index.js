import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js'

const app = express();
const PORT = 3000;

//middlewares
app.use(cors());
app.use(express.json());

// api route
app.use('/api', taskRoutes)

app.listen(PORT, () => {
  console.log(`server running in: http://localhost:${PORT}`)
})