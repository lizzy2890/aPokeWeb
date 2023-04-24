import { Component, OnInit } from '@angular/core';
import { PokemonForm } from './interfaces/pokemon-form';
import { DataService, Pokemon } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myPokemonWeb';
  idAuthor = '1';
  goEdit: boolean =false;
  
  pokemons = [
    {
      'id': '25',
      'name': 'Pikachu',
      'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png',
      'attack': 112,
      'defense': 96,
      'hp': 111,
      'type': 'electricity',
      'idAuthor': 'EVERA'
    },
    {
      'id': '7',
      'name':'Squirtle',
      'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/9/9a/latest/20190806023010/Squirtle_en_la_primera_generaci%C3%B3n.png',
      'attack': 94,
      'defense': 121,
      'hp': 127,
      'type': 'water',
      'idAuthor': 'EVERA'
    },];

    selectedPokemon?: Pokemon; 

    constructor(private readonly dataSvc: DataService) {

    }

    ngOnInit(): void {
      this.dataSvc.getPokemons()
      .subscribe(pokemons => {
        this.pokemons = [...pokemons];

      });
    }

    editSelectedPokemon(pokemon:Pokemon){
      this.selectedPokemon = pokemon;
    }

    savePokemon(pokemonForm: PokemonForm): void {
      if(pokemonForm.actionType == 'add') {
        this.addPokemon(pokemonForm.pokemon);
      }
      else {
        this.editPokemon(pokemonForm.pokemon);
      }
    }

    addPokemon(pokemon: Pokemon): void {
      pokemon.id = '' + (this.pokemons.length +1);
      pokemon.idAuthor = this.idAuthor;

      this.dataSvc.addNewPokemon(pokemon)
      .subscribe(res => {
        this.pokemons.push(res);
      });
    }

    editPokemon(pokemon: Pokemon): void {
      this.dataSvc.updatePokemon(pokemon)
      .subscribe(() => {
        let updatedPokemons = this.pokemons.filter(p => p.id !== pokemon.id);
        updatedPokemons.push(pokemon);
        this.pokemons = [...updatedPokemons];
      });      
    }

    deletePokemon(idPokemon: string): void {
      this.dataSvc.deletePokemon(idPokemon)
      .subscribe(() => {
        let updatedPokemons = this.pokemons.filter(p => p.id !== idPokemon);
        this.pokemons = [...updatedPokemons];
      });
      
    }

}
