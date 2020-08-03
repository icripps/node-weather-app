const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const foreCast = require('./utils/forecast')
const geoCode = require('./utils/geocode')
const port = process.env.port || 3000


// Define Paths for directories
const publicDirectory = path.join(__dirname, '../public')
const viewsTemplate = path.join(__dirname, '../templates/views')
const partialsTemplate = path.join(__dirname, '../templates/partials')

// Set up handlebars engines
app.set('view engine', 'hbs')
app.set('views', viewsTemplate)
hbs.registerPartials(partialsTemplate)


//Static directory
app.use(express.static(publicDirectory))


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        header: 'we are the best!',
        name: 'Ikeda cripps'
    })
})



app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Ikeda Cripps'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help Page',
        name: 'Ikeda Cripps',
        email: 'Ikedacrippso@hotmail.com'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        console.log(address)
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        foreCast(latitude, longitude, (Ferror, foreCastdata) => {
            if (Ferror) {
                return res.send({
                    error: Ferror
                })
            }
            return res.send({
                location: location,
                foreCast: foreCastdata,
                address: address

            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        error: 'The Help Page cannot be found',
        name: 'ikeda cripps'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        error: 'The Page cannot be found',
        name: 'ikeda cripps'
    })
})

app.listen(port, console.log('running on port ' + port))