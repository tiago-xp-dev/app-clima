const apikey =  ""
const unitsMetric = 'metric'
const lang = 'pt_br'


async function getCurrentWeather(lat, lon) {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey + '&units=' + unitsMetric + '&lang='+ lang , {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    let responseJson = await response.json()
    return responseJson
}

async function get5DayForescast(lat, lon) {
    let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apikey + '&units=' + unitsMetric + '&lang='+ lang + '&cnt='+ 10, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    let responseJson = await response.json()

    return responseJson
}

export const OpenWeatherAPI = { getCurrentWeather, get5DayForescast }
