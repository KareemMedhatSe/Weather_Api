import request from "request";
import express from 'express';
import hbs from'hbs';
import path from'path';
import { weatherData } from "./utils/weatherInfo.js";
import url from 'url';

const app=express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir=path.join(__dirname,'./public')
const partials=path.join(__dirname,'./components/partials')
const views=path.join(__dirname,'./components/views')

app.use(express.static(publicDir))
app.get('',(req,res)=>{res.render('index', {
    title:'Weather App'
})})
app.get('/weather',(req,res)=>{const address=req.query.address;
    if(!address){res.send({error:'please enter the city'})}
    else{
     weatherData(address,(error,{temperature,description,cityName})=>{
        if(error){return res.send({error})}
        console.log(temperature,description,cityName);
        res.send({temperature,description,cityName})
     })}
    })

app.get('*',(req,res)=>{res.render('404', {
    title: "page not found"
})})

app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)


const port=process.env.PORT || 3000;
app.listen(port,()=>{console.log('server is up and running on port : '+port)}) 
