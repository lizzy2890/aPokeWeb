import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { PokemonEntryComponent } from './pokemon-entry/pokemon-entry.component';
import { LoadingModule } from './shared/components/loading/loading.module';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PokemonFormComponent,
    PokeSearchComponent,
    PokemonEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
