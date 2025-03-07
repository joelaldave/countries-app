import { ChangeDetectionStrategy, Component, inject, signal, resource, linkedSignal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  favoriteService = inject(FavoriteService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(()=> this.queryParam);

  countryResource = rxResource({
    request: () =>({ query : this.query() }),
    loader: ({ request}) => {
      if( !request.query ) return of([]);

      this.router.navigate(['country/by-capital'],{
        queryParams: {
          query: request.query
        }
      })

      return this.countryService.searchByCapital( request.query )
      
    }
  })

  toggleFavorite( country : Country){
    this.favoriteService.toggleFavorite(country);
  }

  // countryResource = resource({
  //   request: () =>({ query : this.query() }),  
  //   loader: async({ request}) => {
  //     if( !request.query ) return [];  

  //     return await firstValueFrom(this.countryService.searchByCapital( request.query ))
      
  //   }
  // })




  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([])

  // onSearch(value: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);
  //   this.countryService.searchByCapital(value).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err)=> {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(`No se encontró un País con esta capital ${value}`)
  //     },
  //   })
  // }

}
