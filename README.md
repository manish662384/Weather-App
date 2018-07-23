Weather-App:

User stories:

1.	I can see the weather in my current location.
2.	I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
3.	I can push a button to toggle between Fahrenheit and Celsius.


This app is used to get the weather in the user's current location by fetching the location co-ordinates through HTML5 geolocation. 
It contains animated weather icons which changes as per the current weather condition. e.g, rainy, snowy, night, day.
It also contains a toggle switch which is used to toggle between the Celsius and Fahrenheit temperatures.
Data is displayed after making AJAX calls to the fcc API: https://fcc-weather-api.glitch.me along with the co-ordinates and fetching the data in JSON format and displaying
in the app in a basic looking UI.
fcc internally uses https://openweathermap.org/weather-conditions weather API. So I referred the same for some weather ids useful 
for displaying different animated weather icons.

The App contains basic data such as temperature, Date and dynamic changing time in seconds, city, country etc.