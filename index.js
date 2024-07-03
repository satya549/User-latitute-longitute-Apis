import  express  from "express";
import db from "./src/db/connection.js"
import router from "./src/routes/user.js";

const app = express();

const port = 3006;


app.use(express.json());   
app.use("/", router);

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
})