import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { PokemonEntryComponent } from './pokemon-entry/pokemon-entry.component';


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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
