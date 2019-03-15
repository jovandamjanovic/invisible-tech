const fetch = require('node-fetch')
const apiKey = "718c808cef29673216fafed8844ca0b9"

const apiURLBuilder = apiKey => zipcode => `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`
const buildURLFromZipCode = apiURLBuilder(apiKey)

const inputs = [
  {location: "New York", postalCode: 10001},
  {location: "Beverly Hills", postalCode: 90210}
]

const updateCityWithApiData = async city => {
  const cityData = await fetch(buildURLFromZipCode(city.postalCode))
  const dataBody = await cityData.json()
  city.currentWeather = dataBody.weather[0].main
  city.currentTime = new Date(dataBody.dt*1000)
  return city
}

const runProgram = async () => {
  const cities = await Promise.all(inputs.map(updateCityWithApiData))
  console.log(cities)
}

runProgram()