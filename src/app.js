const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")



// Generate the application
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// Setup handlebars engine and views location
app.set("view engine", "hbs") 
app.set("views", viewsPath) 
hbs.registerPartials(partialsPath) 

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        msg: "Type an address, get the weather!",
        name: "Jacopo"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Jacopo"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        msg: "This is some helpful text.",
        title: "Help",
        name: "Jacopo"
    })
})

// Weather page

app.get("/weather", (req, res) => { 
    if (!req.query.address){
        return res.send({
            error: "Inserire un indirizzo!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, name} = {} /*Default value to avoid crash*/) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                name,
                forecast: forecastData,
                address: req.query.address
            })
        })
    }) 
})


app.get("/products", (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "Devi inserire un indirizzo!"
        })
    }
    console.log(req.query.search) 
    res.send({
        products: []
    })
})

// Match every request inside help

app.get("/help/*", (req, res) => {
    res.render("404page", {
        title: "404",
        name: "Jacopo",
        errorMessage: "Nessun articolo trovato!"
    })
})

// Match every request   

app.get("*", (req, res) => {
    res.render("404page", {
        title: "404",
        name: "Jacopo",
        errorMessage: "My 404 page"
    })
})

// Start the server

app.listen(port, () => { 
    console.log("Server is up on port 3000." + port)
})