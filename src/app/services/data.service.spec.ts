import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { DataService, Pokemon } from './data.service';

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

describe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });

    service = TestBed.inject(DataService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterAll(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addNewPokemon', () =>{
    service.addNewPokemon(pokemon).subscribe((resp: Pokemon) => {
      expect(resp).toEqual(pokemon);
    });

    const req = httpTestingController.expectOne(`${environment.api}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(pokemon);
    req.flush(pokemon);

  });
  
  it('getPokemons retun a list of pokemons', () => {
    service.getPokemons().subscribe((resp: Pokemon[]) => {
      expect(resp).toEqual(listPokemon);
    });

    const req = httpTestingController.expectOne(`${environment.api}/?idAuthor=1`);
    expect(req.request.method).toBe('GET');
    req.flush(listPokemon);
  });

  it('getPokemon retun a pokemon', () => {
    service.getPokemon("1").subscribe((resp: Pokemon) => {
      expect(resp).toEqual(pokemon);
    });

    const req = httpTestingController.expectOne(`${environment.api}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);

  });

  it('updatePokemon retun a pokemon updated', () => {
    const updatePokemon: Pokemon = {
      'id': '25',
      'name': 'Pikachu',
      'image': 'https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20211019135841/Pikachu_GO.png',
      'attack': 112,
      'defense': 100,
      'hp': 100,
      'type': 'electricity',
      'idAuthor': '1'
    };

    const nullPokemon = null;

    service.updatePokemon(updatePokemon).subscribe((resp: void) =>{
      expect(resp).toBeNull();
    });

    const req = httpTestingController.expectOne(`${environment.api}/${updatePokemon.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updatePokemon);

    // const expectedResponse = new HttpResponse(void 0);
    // req.event(expectedResponse);
  });
  
  it('deletePokemon', () => {
    service.deletePokemon('25').subscribe((resp: void) =>{
      expect(resp).toBeNull();
    });

    const req = httpTestingController.expectOne(`${environment.api}/25`);
    expect(req.request.method).toBe('DELETE');

  });
});