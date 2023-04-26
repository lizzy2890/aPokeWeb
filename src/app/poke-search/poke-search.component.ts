import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../services/data.service';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css']
})
export class PokeSearchComponent implements OnInit {

  searchWord: string = '';
  searchedPokemons?: Pokemon[];

  @Input() pokemons?: Pokemon[];
  @Input() resetSearch?: boolean;
  @Output() filteredPokemons = new EventEmitter<Pokemon[]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.resetSearch) {
      this.searchWord = '';
    }
  }

  search(): void {
    if(this.searchWord.length > 3) {
      this.searchedPokemons = this.pokemons?.filter(
        pokemon => pokemon.name.includes(this.searchWord)
        );
      
      if(this.searchedPokemons?.length == 0) {
        // write message no found
      }
      this.filteredPokemons.emit(this.searchedPokemons);     
    }
    else {
      if(this.searchedPokemons != this.pokemons) {
        this.searchedPokemons = this.pokemons;
        this.filteredPokemons.emit(this.searchedPokemons);
      }
    }    
  }
}
