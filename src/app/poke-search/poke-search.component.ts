import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Pokemon } from '../services/data.service';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css']
})
export class PokeSearchComponent implements OnInit, AfterViewInit {

  searchWord: string = '';
  searchedPokemons?: Pokemon[];
  found: boolean = true;
  messgeNotFound: string = 'We don\'t have registered that pokemon. It could be you discovered a new one?!!!';
  showEraseAll: boolean = false;
  camouflage: boolean = false;
  
  @Input() pokemons?: Pokemon[];
  @Input() resetSearch?: boolean;
  @Output() filteredPokemons = new EventEmitter<Pokemon[]>();
  @ViewChild('searchBox') searchBox!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.resetSearch) {
      this.searchWord = '';
    }
  }

  ngAfterViewInit(): void {
    this.searchBox.nativeElement.addEventListener("focusout",
    (e: UIEvent) =>{
        if(e.target) {
          var element = e.target as HTMLElement;
          this.camouflage = true;
        }
    });

    document.addEventListener('focusin',
    (event) => {
      const targetElement = event.target as HTMLElement;
      if(targetElement.id && (targetElement.id === 'searchText' || targetElement.id === 'clearText')) {
        this.showEraseAll = true;
        this.camouflage = false;
      } else {
        this.showEraseAll = false;
      }
    });
    //missing case: when comming back to searchbox from outside and click in where x is, it'll show it and erase the word  
  }

  onSubmit(): void {
    this.searchedPokemons = this.pokemons?.filter(
      pokemon => pokemon.name.includes(this.searchWord)
      );
    
    if(this.searchedPokemons?.length == 0) {
      this.found = false;
    }
    else {
      this.found = true;
    }

    this.filteredPokemons.emit(this.searchedPokemons); 
  }

  resetSearchWord(): void {
    this.searchWord = '';
  }
}
