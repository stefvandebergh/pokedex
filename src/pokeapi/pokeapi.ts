export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;

    const result = await fetch(url);
    const json =await result.json();
    const locations: Location[] = [] ;
    for (const location of json.results) {
      locations.push({
        name: location.name,
      });
    };
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