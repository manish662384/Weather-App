/*-- co-ordinates through html5 --*/
navigator.geolocation.getCurrentPosition(getCoordinates, showError);
var msg = document.getElementById("errorMsg");

function getCoordinates(showPosition){
	if(navigator.geolocation){
		weather(showPosition.coords.latitude, showPosition.coords.longitude);
	}
	else{
		msg.innerHTML = "Geolocation is not supported by this browser.";
	}
}
/*-- Incase the co-ordinates are not fetched through getCurrentPosition() --*/
function showError(error){

	    switch(error.code) {
        case error.PERMISSION_DENIED:
            msg.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            msg.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            msg.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            msg.innerHTML = "An unknown error occurred.";
            break;
        default:
        	msg.innerHTML = "Data Loading ...";
        	break;
    }
}
/*-- main weather function to display weather data after AJAX call --*/	
function weather(lat, long){
	//console.log("Lat: "+ lat + "\nLong: " + long);
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat='+ lat + '&lon='+ long, true);

	xhr.onload = function(){
		if(this.status == 200){
			var outputMsg = JSON.parse(this.responseText);
			//console.log(outputMsg);
			var today = new Date();
			var tempCelsius = outputMsg.main.temp; // by default the temperature is celsius
			setInterval(dateTime, 1000);

			var output = '';			
				output +=
				'<h2 id="cityCountry">'+ outputMsg.name + ', ' + outputMsg.sys.country +'</h2>' +
				'<h5 class="spacing">'+ today.toDateString() +'</h5>' +
				'<h5 id="dynamicTime">'+  +'</h5>' +
				'<h1 id="temp">' + outputMsg.main.temp + String.fromCharCode(176)  + " " + 'C</h1>' +
				'<img id="weather-icon" class="spacing" src="" alt="weather-icon">' +

				/*'<img id= "weather-icon spacing" src="' + outputMsg.weather[0].icon + '" alt="weather-icon">' +*/
				'<h3>' + outputMsg.weather[0].description + '</h3>' ;
						

			document.getElementById("weatherDiv").innerHTML = output;
			temperatureToggle(tempCelsius);
			weatherIcon(outputMsg.weather[0].id);

		}
	}
	xhr.send();

}
/*-- Changing the temperature from celsius to fahrenheit and vice versa through toggle switch button --*/
function temperatureToggle(tempCelsius){
	var tempFahrenheit = parseFloat((tempCelsius * 9/5 + 32).toFixed(1));
	var checkbox = document.querySelector('input[type=checkbox]');

	checkbox.addEventListener('click', function(){
		
		if(checkbox.checked == false)
			document.getElementById("temp").innerHTML = tempFahrenheit + String.fromCharCode(176) + " F";			
		else
			document.getElementById("temp").innerHTML = tempCelsius + String.fromCharCode(176) + " C";			
	});
}
/*-- Displaying the time where seconds is running by calling the function after every interval of 1000ms/1sec --*/
function dateTime(){
	var d = new Date();
	document.getElementById("dynamicTime").innerHTML =  d.toLocaleTimeString();
}
/*-- Displaying the animated weather icons based on weather ids and/or certain weather conditions.
Refer: https://openweathermap.org/weather-conditions. --*/
function weatherIcon(id){
	//console.log(id);
	var today = new Date();
	var icon = document.getElementById("weather-icon");

	if(id >= 200 && id <= 232)
		icon.src = "animated/thunder.svg";	
	else if(id >= 300 && id <= 321)
		icon.src = "animated/rainy-7.svg";	
	else if(id >= 500 && id <= 504)
		icon.src = "animated/rainy-3.svg";
	else if(id >= 511 && id <= 531)
		icon.src = "animated/rainy-6.svg";
	else if(id >= 600 && id <= 622)
		icon.src = "animated/snowy-6.svg";
	else if(id >= 701 && id <= 781)
		icon.src = "animated/thunder.svg";
	else if(id == 800 && today.getHours() >= 6 && today.getHours() <= 18)
		icon.src = "animated/day.svg";
	else if(id == 800 && today.getHours() > 18 && today.getHours() < 6)
		icon.src = "animated/night.svg";
	else if((id == 801 || id == 802) && today.getHours() >= 6 && today.getHours() <= 18)
		icon.src = "animated/cloudy-day-3.svg";
	else if((id == 801 || id == 802) && today.getHours() > 18 && today.getHours() < 6)
		icon.src = "animated/cloudy-night-3.svg";
	else if(id == 803 || id == 804)
		icon.src = "animated/cloudy.svg";	
}
	