import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Pokemon } from "src/app/services/data.service";

@Injectable()
export class DataServiceMock {
    private listPokemon: Pokemon[] = [
        {
          'id': '25',
          'name': 'Pikachu',
          'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png',
          'attack': 112,
          'defense': 96,
          'hp': 111,
          'type': 'electricity',
          'idAuthor': '1'
        },
        {
          'id': '7',
          'name':'Squirtle',
          'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/9/9a/latest/20190806023010/Squirtle_en_la_primera_generaci%C3%B3n.png',
          'attack': 94,
          'defense': 121,
          'hp': 127,
          'type': 'water',
          'idAuthor': '1'
        }
      ];
      
      private pokemon: Pokemon = {
        'id': '25',
        'name': 'Pikachu',
        'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png',
        'attack': 112,
        'defense': 96,
        'hp': 111,
        'type': 'electricity',
        'idAuthor': '1'
      };
    constructor() {}
    addNewPokemon(newPokemon: Pokemon) {
        return of(this.pokemon);
    }

    getPokemons() {
        return of(this.listPokemon);
    }

    getPokemon(id: string) {
        return of(this.pokemon);
    }

    updatePokemon(pokemon: Pokemon) {
        return of(undefined);
    }

    deletePokemon(id: string) {
        return of(undefined);
    }
}