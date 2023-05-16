const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault() // Do not refresh the page on submit

    const location = search.value // extracts input value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.name
                messageTwo.textContent = data.forecast
            }
        })
    })

})