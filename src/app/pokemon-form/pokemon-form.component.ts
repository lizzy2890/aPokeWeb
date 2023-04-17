import { Component, OnInit } from '@angular/core';

interface Pokemon {
  'id': string;
  'image': string;
  'name': string;
  'attack': number;
  'defense': number;
  'hp': number;
  'type': string;
  'idAuthor': number;
}

interface PokemonForm {
  'image': string;
  'name': string;
  'attack': number;
  'defense': number;
}

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  model = {
    "image": "no_url",
    "name": "un_name",
    "attack": 0,
    "defense": 0
  }  

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(values: any): void {
    console.log('Form values', values);
  }

}
