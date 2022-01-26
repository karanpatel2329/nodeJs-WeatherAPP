const express = require('express');
const path = require('path')
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3030


const geocoding = require('./utils/geocode');
const forecast = require('./utils/forecast');
staticPath = path.join(__dirname,"../public")
viewPath = path.join(__dirname,"../templates/views")
partialsPath = path.join(__dirname,"../templates/partials")

//setup for static File
app.use(express.static(staticPath))

//setup view engine and view location
app.set('view engine','hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath);


app.get('',(req,res)=>{
    res.render('index',{
        name:"Karan",
        title:"Weather App"
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Karan"
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Karan"
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        name:'Karan',
        content:'404 Help Not Found'
    })
});

app.get('/weather',async(req,res)=>{
     if(!req.query.address){
        return res.send({
            error:"Address Required Please Provide It."
        });
    }
    geocoding(req.query.address,(error,{longi,lati,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(longi,lati,(error,forecastData)=>{
            if(error){
                return res.send(error);
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query
            })
        });
    });
    
});

app.get('*',(req,res)=>{
    res.render('404Page',{
        name:'Karan',
        content:'404 Page Not Found'
    })
})


app.listen(port,()=>{
    console.log('Server Up and Running at '+port);
});