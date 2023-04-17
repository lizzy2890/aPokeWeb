import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myPokemonWeb';
  pokemons = [
    {
      'id': '25',
      'name': 'Pikachu',
      'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png',
      'attack': 112,
      'defense': 96,
      'hp': 111,
      'type': 'electricity',
      'idAuthor': 1
    },
    {
      'id': '7',
      'name':'Squirtle',
      'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/9/9a/latest/20190806023010/Squirtle_en_la_primera_generaci%C3%B3n.png',
      'attack': 94,
      'defense': 121,
      'hp': 127,
      'type': 'water',
      'idAuthor': 2
    },];

    editPokemon(idPokemon: string): void {
      console.log("Edit Pokemon");
    }

    deletePokemon(idPokemon: string): void {
      console.log("Delete Pokemon");
    }

}
