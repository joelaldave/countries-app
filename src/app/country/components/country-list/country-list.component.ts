import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteButtonComponent } from "../favorite-button/favorite-button.component";
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [DecimalPipe, RouterLink, FavoriteButtonComponent],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent { 

  favoriteService = inject(FavoriteService)

  countries = input.required<Country[]>()

  errorMessage = input<string|unknown|null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
  toggleFavorite = output<Country>();
}
