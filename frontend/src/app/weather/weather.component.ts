import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  cities: string[] = []; // To store selected cities
  weatherData: any[] = []; // To store weather data for multiple cities
  city: string = ''; // Currently typed city in input
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.city.trim()) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    this.isLoading = true;
    this.weatherService.getWeather(this.city.trim()).subscribe(
      (data) => {
        const weatherInfo = {
          city: data.location,
          temp: `${data.temperature_c} °C`,
          condition: data.condition,
          icon: this.getIcon(data.condition), // Get the weather icon dynamically
          details: {
            humidity: data.humidity,
            windSpeed: data.wind_kph,
            feelsLike: `${data.feelslike_c} °C`
          }
        };

        this.weatherData.push(weatherInfo);
        this.cities.push(this.city.trim()); // Add selected city to cities array
        this.city = ''; // Reset city input
        this.errorMessage = '';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching weather data';
        this.isLoading = false;
      }
    );
  }

  removeCity(cityToRemove: string) {
    this.weatherData = this.weatherData.filter(city => city.city !== cityToRemove);
    this.cities = this.cities.filter(city => city !== cityToRemove);
  }

  getIcon(condition: string): string {
    if (condition.toLowerCase().includes('clear')) {
      return 'assets/sun.svg'; // Replace with your sun icon path
    } else if (condition.toLowerCase().includes('cloud')) {
      return 'assets/cloud.svg'; // Replace with your cloud icon path
    } else if (condition.toLowerCase().includes('rain')) {
      return 'assets/rain.svg'; // Replace with your rain icon path
    }
    return 'assets/default.svg'; // Default weather icon
  }
}
