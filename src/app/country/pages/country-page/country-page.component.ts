import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";
@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent { 

  // id = toSignal(
  //   inject(ActivatedRoute).params.pipe(
  //     map((params) => params['code'])
  //   ));
  countryService = inject(CountryService);

  countryCode = inject(ActivatedRoute).snapshot.params['code']

  countryResource = rxResource({
    request: ()=> ({ code: this.countryCode}),
    loader: ({request})=>{
      return this.countryService.searchCountryByAlphaCode(request.code)
    }
  })

  }
