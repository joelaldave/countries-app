import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, signal } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { FavoriteButtonComponent } from "../../../components/favorite-button/favorite-button.component";
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe, FavoriteButtonComponent],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent { 

  favoriteService = inject(FavoriteService);
  
  country = input.required<Country>();

  isFavorite = linkedSignal<boolean>( () => this.favoriteService.isFavorite(this.country()))
  

  onClick(){
    this.favoriteService.toggleFavorite(this.country());
  }
}
