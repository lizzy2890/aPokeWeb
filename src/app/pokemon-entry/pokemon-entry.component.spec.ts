import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { PokemonEntryComponent } from './pokemon-entry.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Pokemon } from '../services/data.service';
import { DataServiceMock } from '../test-helpers/services/data.service.mock';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const listPokemon: Pokemon[] = [
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

const pokemon: Pokemon = {
  'id': '25',
  'name': 'Pikachu',
  'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png',
  'attack': 112,
  'defense': 96,
  'hp': 111,
  'type': 'electricity',
  'idAuthor': '1'
};

describe('PokemonEntryComponent', () => {
  let component: PokemonEntryComponent;
  let fixture: ComponentFixture<PokemonEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ 
        PokemonEntryComponent 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: '25'})
          }
        },
        DataService
        // {
        //   provide: DataService,
        //   useValue: DataServiceMock
        // }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add pokemon', () => {
    const pokemon =   {
      'id': '16',
      'name': 'charmander',
      'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/56/latest/20200307023245/Charmander.png',
      'attack': 116,
      'defense': 93,
      'hp': 118,
      'type': 'fire',
      'idAuthor': '1'
    }
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy1 = spyOn(dataService, 'getPokemons').and.returnValue(of(listPokemon));
    const spy2 = spyOn(dataService, 'addNewPokemon').and.returnValue(of(pokemon));
    const spy3 = spyOn(component, 'backToList').and.callThrough();

    component.addPokemon(pokemon);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should edit pokemon', () => {
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy1 = spyOn(dataService, 'updatePokemon').and.returnValue(of(undefined));
    const spy2 = spyOn(component, 'backToList').and.callThrough();
    component.editPokemon(pokemon);
  
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should get Pokemon Info', () => {
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy1 = spyOn(dataService, 'getPokemon').and.returnValue(of(pokemon));

    component.getPokemonInfo();
    expect(spy1).toHaveBeenCalledWith('25');
    expect(component.pokemon).toEqual(pokemon);
    expect(component.pokemonEntry.get('image')?.value).toEqual(pokemon.image);
  });

  describe('should submit pokemon',() => {
    beforeEach(() => {
      component.pokemonEntry = new FormGroup({
        image: new FormControl('https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png'),
        name: new FormControl('My Pikachu'),
        attack: new FormControl(112),
        defense: new FormControl(96)
      });
    });

    it('should update pokemon', () => {
      component.id = '25';
      component.pokemon = pokemon;
      const spy1 = spyOn(component, 'editPokemon').and.callThrough();

      component.onSubmit();
      expect(spy1).toHaveBeenCalled();  
    });

    it('it should add pokemon', () => {
      component.id = '';
      const spy1 = spyOn(component, 'addPokemon').and.callThrough();

      component.onSubmit();
      expect(spy1).toHaveBeenCalled();
    });
  });



});