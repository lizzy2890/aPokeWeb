import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PokemonForm } from '../interfaces/pokemon-form';
import { DataService, Pokemon } from '../services/data.service';

@Component({
  selector: 'app-pokemon-entry',
  templateUrl: './pokemon-entry.component.html',
  styleUrls: ['./pokemon-entry.component.css']
})
export class PokemonEntryComponent implements OnInit {
  idAuthor = '1';
  id!: string;  
  min_nameLength!: number;
  pokemonEntry!:FormGroup;
  pokemon!: Pokemon;

  constructor(
    private readonly dataSvc: DataService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router) 
    {
      this.min_nameLength = 3;
    }

   ngOnInit(): void {
    this.pokemonEntry = this.initFields();
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      if(this.id.length > 0)
      {
        this.dataSvc.getPokemon(this.id)
        .subscribe( pokemon => {
          this.pokemon = pokemon;
          this.pokemonEntry.patchValue({
            image: pokemon.image,
            name: pokemon.name,
            attack: pokemon.attack,
            defense: pokemon.defense
          });
        });
      }
    });
  }

  addPokemon(pokemon: Pokemon): void {
    pokemon.idAuthor = this.idAuthor;

    this.dataSvc.getPokemons()
    .subscribe(
      pokemons => {
        //set Id, look for a better way
        let numPokemons = pokemons.length;
        pokemon.id = `${numPokemons + 1}`;

        this.dataSvc.addNewPokemon(pokemon)
        .subscribe(res => {
          this.backToList();
        });
      });
  }

  editPokemon(pokemon: Pokemon): void {
    this.dataSvc.updatePokemon(pokemon)
    .subscribe(() => {
      this.backToList();
    });      
  }

  onSubmit(): void {
    let pokeInfo = {} as Pokemon;
    pokeInfo = this.pokemonEntry.value;

    if(this.id.length > 0) {
      pokeInfo.id = this.pokemon.id;
      pokeInfo.hp = this.pokemon.hp;
      pokeInfo.type = this.pokemon.type;
      pokeInfo.idAuthor = this.pokemon.idAuthor;

      this.editPokemon(pokeInfo);
    }
    else {
      this.addPokemon(pokeInfo);
    }
  } 

  initFields(): FormGroup {
    return this.fb.group({
      image: ['',[Validators.required]],
      name: ['',[Validators.required, Validators.minLength(this.min_nameLength)]],
      attack: [0,[Validators.required]],
      defense: [0,[Validators.required]]    
    });
  }

  backToList(): void {
    this.router.navigate(['']);
  }
}
