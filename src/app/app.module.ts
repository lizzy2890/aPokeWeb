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
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonFormComponent,
    PokeSearchComponent,
    PokemonEntryComponent,
    PokemonListComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingModule,
    AppRoutingModule
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
