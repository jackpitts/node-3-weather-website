const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageTwo = document.querySelector("#message-2")
const forecast = document.querySelector("#forecast-data")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault() // Do not refresh the page on submit

    const location = search.value // extracts input value

    forecast.querySelector("#loading").textContent = "Loading..."
    messageTwo.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecast.querySelector("#error").textContent = data.error
            } else {
                forecast.querySelector("#description").textContent = data.forecast.description
                forecast.querySelector("#temperature").textContent = "It is currently " + data.forecast.temperature + " degrees."
                forecast.querySelector("#precip").textContent = "There is " + data.forecast.precip + "% chance of rain."
                forecast.querySelector("#humidity").textContent = "Humidity is at " + data.forecast.humidity + "%."
                forecast.querySelector("#wind").textContent = "Wind speed is at " + data.forecast.wind_speed + "km/h."
                forecast.querySelector("#loading").textContent = ""
            }
        })
    })

})