import {Cache} from "../pokecache.js"

export class PokeAPI {
    #cache : Cache;

    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly interval = 3600000; // 1 hour

  constructor() {
    this.#cache = new Cache(PokeAPI.interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;

    if (this.#cache.get<ShallowLocations>(url)) {
        return this.#cache.get<ShallowLocations>(url) as ShallowLocations;
    }


    const result = await fetch(url);
    const json =await result.json();
    const locations: Location[] = [] ;
    for (const location of json.results) {
      locations.push({
        name: location.name,
      });
    };
    this.#cache.add<ShallowLocations>(url, {
        locations,
        next: json.next,
        previous: json.previous
    });
    return {
        locations,
        next: json.next,
        previous: json.previous
    };
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const result = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}/`);
    return await result.json() as Location;
  }
}

export type ShallowLocations = {
  locations : Location[],
  next?: string,
  previous? : string
};

export type Location = {
  name : string,
};