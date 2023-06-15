import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PokemonEntryComponent } from './pokemon-entry/pokemon-entry.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [
    { path: '', component: PokemonListComponent},
    { path: 'entry/:id', component: PokemonEntryComponent},
    { path: '**', component: PagenotfoundComponent} 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

