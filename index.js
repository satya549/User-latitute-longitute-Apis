import  express  from "express";
import db from "./src/db/connection"

const app = express();

const port = 3006;



app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
})