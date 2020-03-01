const express = require('express')
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express config 
const index = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve 
app.use(express.static(index))

app.get('', (req, res) => {
    res.render(
        'index',
        {
            title: 'Weather App',
            name: 'Mohamed Ahmed'
        }
    )
})

app.get(
    '/about',
    (req, response) => {
        response.render(
            'about',
            {
                title: 'About Me',
                name: "Mohamed Ahmed"
            }
        )
    }
)

app.get(
    '/help',
    (req, response) => {
        response.render(
            'help',
            {
                title: 'Help Page',
                helpText: 'This is some helpful text!',
                name: "Mohamed Ahmed"
            }
        )
    }
)

app.get(
    '/weather',
    (req, response) => {
        if (!req.query.address) {
            return response.send({
                error: 'You Must Provide an address term'
            })
        }

        geocode(
            req.query.address,
            (error, { long, lat, location } = {}) => {
                if (error) {
                    return response.send({ error })
                }

                forecast(
                    long,
                    lat,
                    (error, forecastData) => {
                        if (error) {
                            return response.send({ error })
                        }

                        response.send(
                            {
                                forecast: forecastData,
                                location,
                                address: req.query.address
                            }
                        )
                    }
                )
            }
        )
    }
)

app.get(
    '/products',
    (req, response) => {
        if (!req.query.search) {
            return response.send({
                error: 'You Must Provide a search term'
            })
        }
        console.log(req.query.search)
        response.send(
            {
                products: []
            }
        )
    }
)

app.get(
    '*',
    (req, response) => {
        response.render(
            '404',
            {
                title: "404",
                name: "Mohamed Ahmed",
                errMsg: "Page Not Found",
            }
        )
    }
)

app.listen(
    3000,
    console.log('Server is running on port 3000')
)