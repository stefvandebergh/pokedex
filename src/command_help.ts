import { getCommands} from "./command.js"
import { State, CLICommand } from "./state.js";

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!\nUsage:\n\n");


    for (const command in state.commands){
        console.log(`${state.commands[command].name}: ${state.commands[command].description}`);
    }
}