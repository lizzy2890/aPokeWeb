import { Pokemon } from "../services/data.service";

export interface PokemonForm {
    pokemon: Pokemon;
    actionType: string;
}