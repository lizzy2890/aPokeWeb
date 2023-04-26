import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import {HttpClientModule } from '@angular/common/http';
import { PokeSearchComponent } from './poke-search/poke-search.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonFormComponent,
    PokeSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
