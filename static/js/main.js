// Handle Button click
const btn = document.querySelector('#submitBtn')
btn.addEventListener('click',(e)=>{
    // Make render area empty
    document.querySelector('#result_render_area').innerHTML = ""
    // collect city name from form
    city = document.querySelector('#city').value.trim()
    // if city name is not entered by the  user
    if (!city) {    
        display_error('Please enter city name')

    } else {

        btn.innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

        get_weather_information(city)
        .then((res)=>res.json())
        .then((res)=>{
            // If Request is failed
            if(res.status === "failed"){
                display_error(res.message)
            }
            // If request is success
            if (res.status === "success") {
                render_response(res)
            }
            // set button inner html
            btn.innerHTML = "Submit"
        })
    }
})

// Function to render 200 response
const render_response = (response) => {
    const res_div = document.querySelector('#result_render_area')
    res_div.innerHTML = `
    <div class="card">
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>City Name : </strong>${response.city_name}</li>
        <li class="list-group-item"><strong>Current Temp : </strong>${response.current_temp}&deg;</li>
        <li class="list-group-item"><strong>Min Temp : </strong>${response.min_temp}&deg;</li>
        <li class="list-group-item"><strong>Max Temp : </strong>${response.max_temp}&deg;</li>
        <li class="list-group-item"><strong>Humidity : </strong>${response.humidity}</li>
        <li class="list-group-item"><strong>Description : </strong>${response.description}, Feels like ${response.feels_like}&deg;</li> 
        </ul>
    </div>`
}

// Function to get weather information
const get_weather_information = async (city_name) =>{
    // Settup Request for Fetch API
    const response = await fetch(`/weather/${city_name}`)
    return response
}

// Function to display_error
const display_error = (err) => {
    const alert_area = document.querySelector('#alert_area')
    alert_area.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>${err}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`
                                    // Auto hide error after 5 seconds
    setTimeout(() => { 
        alert_area.innerHTML = ""
    },5000);
}

