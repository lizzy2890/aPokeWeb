import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonForm } from '../interfaces/pokemon-form';
import { DataService, Pokemon } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  idAuthor = '1';
  showForm: boolean = false;
  resetSearch : boolean = false;
  pokemons:Pokemon[] = [];
  filteredPokemons:Pokemon[] = [];
  selectedPokemon?: Pokemon; 

  constructor(
    private readonly dataSvc: DataService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.dataSvc.getPokemons()
    .subscribe(pokemons => {
      this.pokemons = [...pokemons];
      this.filteredPokemons = this.pokemons;
    });
  }

  registerPokemon() {
    this.router.navigate(['entry', '' ]);
  }

  editSelectedPokemon(pokemon:Pokemon){
    this.selectedPokemon = pokemon;
    this.router.navigate(['entry', this.selectedPokemon.id ]);
  }

  deletePokemon(idPokemon: string): void {
    this.dataSvc.deletePokemon(idPokemon)
    .subscribe(() => {
      this.getPokemons();
      this.resetFilteredPokemons();
    });      
  }

  setFilteredPokemons(filtered : Pokemon []): void {
    this.filteredPokemons = filtered;
  }

  resetFilteredPokemons(): void {
    this.filteredPokemons = this.pokemons;
    this.resetSearch = true;
    setTimeout(() => {
      this.resetSearch = false;
    }, 500);
  }

}
