import express from "express";
import imageRoute from "./routes/imageRoutes";

const app = express()
const port = 3000

app.use(imageRoute)

app.listen(port, () => {
  console.log(`server at port: ${port}`)
})

export default app