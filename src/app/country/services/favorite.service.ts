import { Injectable, signal } from '@angular/core';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private readonly localStorageKey = 'favoritesCountries';
  favoriteCountries = signal<Country[]>(this.getFavoritesCountriesFromToLocalStorage())


  toggleFavorite( country :  Country ){
    this.favoriteCountries.update( currentCountries => {
      if (currentCountries.some( item => item.cca2 === country.cca2)) {
        return currentCountries.filter( item => item.cca2 !== country.cca2);
      }else{
        return [ ...currentCountries, country]
      }
    })
    this.saveFavoriteCountryToLocalStorage();
  }

  isFavorite ( country : Country){
    return this.favoriteCountries().some( item => item.cca2 === country.cca2)
  }

  saveFavoriteCountryToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.favoriteCountries()))
  }

  getFavoritesCountriesFromToLocalStorage() {
    const countriesString = localStorage.getItem(this.localStorageKey);
    if (countriesString) {
      try {
        const countries: Country[] = JSON.parse(countriesString);
        return countries
      } catch (error) {
        return []
      }
    }
    return []
  }

}
