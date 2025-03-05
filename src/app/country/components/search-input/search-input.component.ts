import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  placeholder = input.required<string>();
  
  initialValue= input<string>();

  value = output<string>();

  inputValue = linkedSignal<string>( () => this.initialValue() ?? '')

  debounceEffect = effect( (onCleanup)=> {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout( timeout );
    })
  })
 }
