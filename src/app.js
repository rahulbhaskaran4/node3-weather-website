
const express = require('express')
const path = require('path');
const hbs = require('hbs')
const app = express();
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

//Define paths for express config 
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath); 


app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title:"Weather App",
        name:"Hare Krishna"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:"About Krishna",
        name:"Hare Krishna"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'I am a Krishna devotee and i am here for your help',
        title:'Help',
        name:'Hare Krishna'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
       
        if(error) {
            return res.send({ error})
        }
    
        forecast(latitude,longitude,(error,forecastData) => {
            if (error){
                return res.send({error});
            } 
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    
});

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]    
    })
});

app.get('*/help/*',(req,res) => {
    res.render('error',{
        title:'404',
        name:"Hare Krishna",
        errorMessage:'Help article not found.'
    })
});

app.get('*',(req,res) => {
    res.render('error',{
        title:'404',
        name:"Hare Krishna",
        errorMessage:"Page Not Found"
    })
});



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
