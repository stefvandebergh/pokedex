import { State } from "./state.js";

export async function commandMap(state: State) {
    try {
        const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
        locations.locations.forEach((location) => {
        console.log(location.name);
        });
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
    }
    catch (error) {
        console.error("An error occurred while fetching locations:", error);
    };

}


export async function commandMapBack(state: State) {
    if (state.prevLocationsURL === "" || state.prevLocationsURL === null) {
        console.log("You're on the first page");
        return;
    }
    try {
        const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        locations.locations.forEach((location) => {
        console.log(location.name);
        });
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
    }
    catch (error) {
        console.error("An error occurred while fetching locations:", error);
    };
}