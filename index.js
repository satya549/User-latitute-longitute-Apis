import  express  from "express";
import db from "./src/db/connection"
import router from "./src/routes/user";

const app = express();

const port = 3006;


app.use(express.json());
app.use("/", router);

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
})