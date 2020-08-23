const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //provide || 3000 for local or in case process.env.PORT doesn't provide us anything

const publicDirectoryClass = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory, express will first look through this, if doesn't find anything will keep going
app.use(express.static(publicDirectoryClass))

app.get('', (req, res) =>{
    //first arg is name of view to render, second arg is an object containing the values we want the view to be able to access
    res.render('index', {
        title: 'Weather app',
        name: 'Chris Cho'
    })
})

app.get('/about', (req, res) =>{
    //first arg is name of view to render, second arg is an object containing the values we want the view to be able to access
    res.render('about',{
        title:'About Me',
        name: 'Chris Cho'
    })
})

app.get('/help', (req, res) =>{
    //first arg is name of view to render, second arg is an object containing the values we want the view to be able to access
    res.render('help', {
        title:'Help Page',
        message:'What ya need help with?',
        name: 'Chris Cho'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'please provided an address'
        })
    }

    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                title: 'Forecast',
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//to match any page that starts with /help/...
app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Help article not found',
        name:'Chris Cho'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title:'404 Error',
        errorMessage: 'Page not found',
        name:'Chris Cho'
    })
})

//to start the server, we specify a port, e.g. 3000 on our local machine
//when running on heroku, heroku will use a dynamic port so we need to use process.env.PORT as this is what heroku will use. 
app.listen(port, () =>{
    console.log('Server is up on port 3000') //this message can only be seen in the console
})