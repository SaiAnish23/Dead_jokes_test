import express from 'express'
import axios from 'axios';
import bodyParser from 'body-parser';
import { getjokes,getjoke,createJoke } from './database.js';
const port=process.env.PORT;
const app=express();
const API_URL="https://v2.jokeapi.dev/joke/";

app.use(bodyParser.urlencoded({extended:true}));
app.use((err,req,res,next)=>{
    console.error(err,stack)
    res.status(500).send('something broke')
})
app.listen(port,()=>{
    console.log("listening ");
})

//various routes

app.get("/",async(req,res)=>
{
   var category=req.query.type;
   var langcode=req.query.lang;
    try{
        const result=await axios.get(API_URL+category+"?lang="+langcode);
        
        res.render("index.ejs",{
            question:result.data.setup,
            joke: result.data.delivery,
            category:category
        });
    }
    catch(error)
    {
        console.log(error);
    }
});

app.post("/getselected",async(req,res)=>
{var category=req.body.type;
    var langcode=req.body.lang;
    res.redirect(`/?type=${category}&lang=${langcode}`)
});

//personal jokes collection

app.post("/submit",async(req,res)=>{
const {title,contents}=req.body;
const note = await createJoke(title,contents);
res.render("index.ejs",{
    myjoke:note
});
});
app.post("/getall",async(req,res)=>{
    const notes = await getjokes()
    console.log(notes);
    res.render("index.ejs",{
        myjoke:notes
    });
})
 
