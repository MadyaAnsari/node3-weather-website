const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather-app',
        name: 'madya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Madya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        Helptext: 'this is some helpful text',
        title: 'Help Page',
        name: 'Madya'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    } 
        
            geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
               if (error) {
                  return res.send({ error })
               }
         
               forecast(latitude, longitude, (error,forecastData) => {
                  if (error) {
                     return res.send({ error })
                  }
            
                 res.send({
                     forecast: forecastData,
                     location,
                     address: req.query.address
                 })
                })
            })
    
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send({
       products: []
    })
})

//'app.get' function to set route as first argument then user req(/help..) in response(res.send fntn is used)

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Madya',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Madya',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {  
    console.log('Server is up on port ' + port)
})
  
 //'app.listen' this starts the server, 3000 is development port
