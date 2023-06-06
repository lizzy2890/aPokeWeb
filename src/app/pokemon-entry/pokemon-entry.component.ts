import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonForm } from '../interfaces/pokemon-form';
import { Pokemon } from '../services/data.service';

@Component({
  selector: 'app-pokemon-entry',
  templateUrl: './pokemon-entry.component.html',
  styleUrls: ['./pokemon-entry.component.css']
})
export class PokemonEntryComponent implements OnInit {
  pokemonEntry!:FormGroup;
  min_nameLength!: number;
  pokemon!: Pokemon;
  
  @Input() editablePokemon?: Pokemon;
  @Output() pokemonSave = new EventEmitter<PokemonForm>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private readonly fb: FormBuilder) {
    this.min_nameLength = 3;
    this.pokemonEntry = this.initFields();
   }

  ngOnChanges(): void {
    if(this.editablePokemon) {
      this.pokemonEntry.patchValue({
        image: this.editablePokemon.image,
        name: this.editablePokemon.name,
        attack: this.editablePokemon.attack,
        defense: this.editablePokemon.defense
      });

    }
  }

   ngOnInit(): void {
    
  }

  onSubmit(): void {
    let pokeInfo = {} as PokemonForm;
    console.log('Form ->',  this.pokemonEntry.value);
    if(this.editablePokemon) {

      pokeInfo  = {
        "pokemon": this.pokemonEntry.value,
        "actionType": 'edit'
      };
      
      pokeInfo.pokemon.id = this.editablePokemon.id;
      pokeInfo.pokemon.hp = this.editablePokemon.hp;
      pokeInfo.pokemon.type = this.editablePokemon.type;
      pokeInfo.pokemon.idAuthor = this.editablePokemon.idAuthor;

    }
    else {
      pokeInfo = {
        "pokemon": this.pokemonEntry.value,
        "actionType": 'add'
      };

    }
    this.pokemonSave.emit(pokeInfo as PokemonForm);
  }

  initFields(): FormGroup {
    return this.fb.group({
      image: ['',[Validators.required]],
      name: ['',[Validators.required, Validators.minLength(this.min_nameLength)]],
      attack: [0,[Validators.required]],
      defense: [0,[Validators.required]]    
    });
  }

  clearForm(): void {
    this.pokemonEntry.setValue({
      image: '',
      name: '',
      attack: 0,
      defense: 0
    });
  }

  closeForm(): void {
    this.hideForm.emit(true);
    this.clearForm();
  }

}
