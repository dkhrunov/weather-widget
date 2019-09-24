$( document ).ready(function() {

	weather = {
		code200: '<i class="wi wi-day-storm-showers"></i>',
		code201: '<i class="wi wi-day-storm-showers"></i>',
		code202: '<i class="wi wi-day-storm-showers"></i>',
		code230: '<i class="wi wi-day-thunderstorm"></i>',
		code231: '<i class="wi wi-day-thunderstorm"></i>',
		code232: '<i class="wi wi-day-thunderstorm"></i>',
		code233: '<i class="wi wi-day-thunderstorm"></i>',
		code300: '<i class="wi wi-day-rain-mix"></i>',
		code301: '<i class="wi wi-day-rain-mix"></i>',
		code302: '<i class="wi wi-day-rain-mix"></i>',
		code500: '<i class="wi wi-day-rain"></i>',
		code501: '<i class="wi wi-day-rain"></i>',
		code502: '<i class="wi wi-day-rain"></i>',
		code511: '<i class="wi wi-day-rain"></i>',
		code520: '<i class="wi wi-day-showers"></i>',
		code521: '<i class="wi wi-day-showers"></i>',
		code522: '<i class="wi wi-day-showers"></i>',
		code600: '<i class="wi wi-snow"></i>',
		code601: '<i class="wi wi-snow"></i>',
		code602: '<i class="wi wi-snow"></i>',
		code610: '<i class="wi wi-day-rain-mix"></i>',
		code611: '<i class="wi wi-day-sleet"></i>',
		code612: '<i class="wi wi-day-sleet"></i>',
		code621: '<i class="wi wi-day-snow"></i>',
		code622: '<i class="wi wi-day-snow"></i>',
		code623: '<i class="wi wi-day-snow-wind"></i>',
		code700: '<i class="wi wi-smoke"></i>',
		code711: '<i class="wi wi-smoke"></i>',
		code721: '<i class="wi wi-day-haze"></i>',
		code731: '<i class="wi wi-sandstorm"></i>',
		code741: '<i class="wi wi-fog"></i>',
		code751: '<i class="wi wi-fog"></i>',
		code800: '<i class="wi wi-day-sunny"></i>',
		code801: '<i class="wi wi-day-sunny-overcast"></i>',
		code802: '<i class="wi wi-day-sunny-overcast"></i>',
		code803: '<i class="wi wi-day-cloudy"></i>',
		code804: '<i class="wi wi-cloudy"></i>',
		code900: '<i class="wi wi-rain"></i>',
	}
	
	const findWeatherIcon = (code) => weather[code] ? weather[code] : console.log("Not founded!");
	const getWeekDay = (date) => {
		let weekDaysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return weekDaysName[date.getDay()];
	}
	
	// Сделать ОДИН ЗАПРОС ДЛЯ ЭКОНОМИИ ТРАФИКА И ВРЕМЕНИ

	fetch("https://api.weatherbit.io/v2.0/current?city=Penza&country=RU&key=YOUR_API_KEY_HERE")
	.then(res => res.json())
	.then(function(response) {
		let data = response.data[0];
		console.log(data);

		let codeIcon = 'code' + data.weather.code;
		console.log(codeIcon);
		$('.weather__icon').html(findWeatherIcon(codeIcon));

		$('.weather__current').html(Math.round(data.temp) + '<sup>o</sup><br><span class="weather__day">Now</span>');
	})
	.catch(error => console.error('Ошибка:', error));

	fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=Penza&country=RU&days=7&key=YOUR_API_KEY_HERE")
	.then(res => res.json())
	.then(function(response) {
		let data = response.data;
		// console.log(data);

		$.each( $('.forecast'), function(i, val) {

			$.each( $(val).find("[data-day]"), function(i, val) {
				let day = $(val).attr("data-day");
				let codeIcon = 'code' + data[day].weather.code;
				let date = new Date(data[day].datetime);
				
				$(val).find(".forecast__day").text(getWeekDay(date));
				$(val).find(".forecast__icon").html(findWeatherIcon(codeIcon));
				$(val).find(".forecast__temprature-max").html(Math.round(data[day].max_temp) + '<sup>o</sup>');
				$(val).find(".forecast__temprature-min").html(Math.round(data[day].min_temp) + '<sup>o</sup>');
			})
			
		});
	})
	.catch(error => console.error('Ошибка:', error));

});
