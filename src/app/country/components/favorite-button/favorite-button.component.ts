import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  imports: [],
  templateUrl: './favorite-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent { 
  isFavorite = input<boolean>(false);
  toggleFavorite = output<void>();

  onClick(){
    this.toggleFavorite.emit()
  }
}
