import { Component, OnInit } from '@angular/core';
import { PokemonForm } from './interfaces/pokemon-form';
import { DataService, Pokemon } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
  constructor() {}

  ngOnInit(): void {}

}
