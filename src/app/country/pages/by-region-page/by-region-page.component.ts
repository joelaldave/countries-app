import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

function validateQUeryParams(queryParams: string):Region {

  queryParams = queryParams.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europa: 'Europe',
    oceania: 'Oceania',
    antartic: 'Antarctic',
  }

  return validRegions[queryParams] ?? 'Americas'
}


@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);

  favoriteService = inject(FavoriteService);

  activeRoute = inject(ActivatedRoute);

  router = inject(Router)

  queryParams = this.activeRoute.snapshot.queryParamMap.get('region') ?? ''

  selectedRegion = linkedSignal<Region>(() => validateQUeryParams(this.queryParams))


  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      })
      return this.countryService.searchCountryByRegion(request.region)

    }
  })

}
