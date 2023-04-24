import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Pokemon {
  'id': string;
  'image': string;
  'name': string;
  'attack': number;
  'defense': number;
  'hp': number;
  'type': string;
  'idAuthor': string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private readonly API = environment.api;
  constructor(private readonly http: HttpClient) { }

  addNewPokemon(newPokemon: Pokemon): Observable<Pokemon>{
    const body = newPokemon;
    return this.http.post<Pokemon>(this.API, body);
  }

  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(`${this.API}/?idAuthor=1`);
  }

  updatePokemon(pokemon: Pokemon): Observable<void>{
    const body = pokemon;
    return this.http.put<void>(`${this.API}/${pokemon.id}`, body)
  }

  deletePokemon(id: string): Observable<void>{
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
