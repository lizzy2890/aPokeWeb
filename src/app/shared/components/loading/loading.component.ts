import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  template:  `
    <div class="overlay" *ngIf="isLoading$ | async">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading$ = this.loadingsvc.isLoading$;

  constructor(private loadingsvc: LoadingService) { }

}
