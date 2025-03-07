import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-favorite-country-page',
  imports: [CountryListComponent],
  templateUrl: './favorite-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCountryPageComponent { 

  favoriteService = inject(FavoriteService);



}
