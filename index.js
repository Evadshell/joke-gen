import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/",async (req,res)=>{
    try {
        var cat = [];
        cat.push(req.body.category);
        var cate ="";
        for(var i=0;i< cat.length;i++){
            cate += cat[i]+",";
        }
        cate = cate.slice(0, -1);
        console.log(cate);
        var bl = [];
        bl.push(req.body.blacklist);
        var ble = "?blacklistFlags=";
        for (var i = 0; i < bl.length; i++) {
          ble += bl[i] + ",";
        }
        ble = ble.slice(0, -1);
        console.log(ble);

        const response = await axios.get("https://v2.jokeapi.dev/joke/"+ cate + ble +"&type=single");
        const result = response.data;
        console.log(result.joke);
        
        res.render("index.ejs",{joke : result.joke});
    } catch (error) {
        console.log(error);
    }
})
app.get('/', (req, res) =>{
    res.render("index.ejs")
})
app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})