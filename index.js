const container = document.querySelector('.container')
const weatherBox = document.querySelector('.weather-box')
const weatherDetailsBox = document.querySelector('.weather-details')

const search = document.querySelector('.search-box button')

const error = document.querySelector('.errorDisplay')
const imgError = document.querySelector('.errorDisplay img')
const text = document.querySelector('.errorDisplay p')

search.addEventListener('click', () => {
    const apiKey = '23555783b42eaecce00da138c5e4134b'
    const city = document.querySelector('.search-box input').value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const degree = '<sup>&deg;c</sup>';
    const percent = '<sup>&incare;</sup>';
    const windUnit = '<sup>km/h</sup>';

    fetch(url)
        .then(res => res.json())
        .then(json => {
            // console.log(json);

            if (json.cod == '404') {
                container.style.height = '50vmin';
                weatherBox.classList.remove('active')
                weatherDetailsBox.classList.remove('active')
                error.classList.add('active')
                //image form: https://www.flaticon.com/
                imgError.src = 'image/not-found.png'
                text.innerHTML = json.message
                return;
            } else if (json.cod == '400') {
                container.style.height = '50vmin';
                weatherBox.classList.remove('active')
                weatherDetailsBox.classList.remove('active')
                error.classList.add('active')
                //image form: https://www.flaticon.com/
                imgError.src = 'image/nothing.png'
                text.innerHTML = json.message
            } else {
                container.style.height = '80vmin';
                weatherBox.classList.add('active')
                weatherDetailsBox.classList.add('active')
                error.classList.remove('active')
            }

            const cityDisplay = document.querySelector('.city')

            const img = document.querySelector('.weather-box img')
            const temp = document.querySelector('.temp')
            const main = document.querySelector('.main')
            const description = document.querySelector('.description')

            const feelsLike = document.querySelector('#feels-like')
            const humidity = document.querySelector('#humidity')
            const wind = document.querySelector('#wind')
            const tempMin = document.querySelector('#temp-min')
            const tempMax = document.querySelector('#temp-max')

            cityDisplay.innerHTML = city;

            temp.innerHTML = Math.round(json.main.temp) + degree;
            main.innerHTML = json.weather[0].main
            description.innerHTML = json.weather[0].description

            feelsLike.innerHTML = Math.round(json.main.feels_like) + degree;
            humidity.innerHTML = json.main.humidity + percent;
            wind.innerHTML = json.wind.speed + windUnit;
            tempMin.innerHTML = Math.round(json.main.temp_min) + degree
            tempMax.innerHTML = Math.round(json.main.temp_max) + degree

            //image
            if (json.weather[0].main == 'Clouds') {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img/clouds.png'
            } else if (json.weather[0].main == 'Rain') {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img/rain.png'
            } else if (json.weather[0].main == 'Drizzle') {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img/drizzle.png'
            } else if (json.weather[0].main == 'Snow') {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img/snow.png'
            } else if (json.weather[0].main == 'Clear') {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img/clear.png'
            } else if (json.weather[0].main == 'Thunderstorm') {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img/storm.png'
            } else {
                //image form: https://www.flaticon.com/
                img.src = 'image/weather-img'
            }
        })

})
