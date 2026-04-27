import { createInterface, ReadLine, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi/pokeapi.js";

export type CLICommand = {
    name:string,
    description:string,
    callback: (state : State) => Promise<void>;
}

export type State = {
    readline: Interface,
    commands: Record<string, CLICommand>,
    pokeapi: PokeAPI,
    nextLocationsURL? :string,
    prevLocationsURL? : string

}

export function initState(): State {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });

    const commands: Record<string, CLICommand> = getCommands();
    return {
        readline,
        commands,
        pokeapi: new PokeAPI(),
        nextLocationsURL: "",
        prevLocationsURL: "",
    };
}