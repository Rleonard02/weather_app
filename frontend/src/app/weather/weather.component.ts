import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.city.trim()) {
      this.errorMessage = 'Please enter a city name.';
      this.weatherData = null;
      return;
    }

    this.isLoading = true;
    this.weatherService.getWeather(this.city.trim()).subscribe(
      (data) => {
        this.weatherData = data;
        this.errorMessage = '';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage =
          error.error.detail || 'Error fetching weather data';
        this.weatherData = null;
        this.isLoading = false;
      }
    );
  }

  getIconUrl(iconPath: string): string {
    return 'https:' + iconPath;
  }
}
