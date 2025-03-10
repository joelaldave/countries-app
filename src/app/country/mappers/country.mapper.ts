import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

    static mapRestCountryToCountry( restCountry:RESTCountry):Country {
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No Spanish name',
            capital: restCountry.capital?.join(','),
            population:restCountry.population,
            region: restCountry.region,
            subRegion: restCountry.subregion
        }
    }

    static mapRestCountryArrayToCountryArray( countries: RESTCountry[]): Country[]{
        return countries.map(this.mapRestCountryToCountry)
    }
}