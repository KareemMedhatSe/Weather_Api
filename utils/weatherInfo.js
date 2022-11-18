import request from "request";
import {constants} from '../config.js'

export const weatherData =(address,callBack)=>{
    const url = constants.Base_URL+encodeURIComponent(address)+constants.Secret_Key;

    request({url,json:true},(error,{body})=>{
    
    if(error){callBack('cant fetch data',undefined)}
    else{
        callBack(undefined,{
        temperature:body.main.temp,
        description:body.weather[0].description,
        cityName:body.name
        

    })

    
}
    })
}