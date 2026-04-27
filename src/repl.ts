import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from "./command.js"
import { State } from "./state.js";

export function cleanInput(input:string): string[] {
    return input.split(" ").filter(word => word.trim() !== "").map(word => word.toLowerCase());
}



export async function startREPL(state: State) {
    const rl = state.readline;
    rl.prompt();

    rl.on("line", async (line) => {
        const command = cleanInput(line)[0];
        const input = cleanInput(line).slice(1);
        if (input.length === 0 && command.length == 0) {
            rl.prompt();
            return;
        }
        
        if (command in state.commands){
            const functionCommand = state.commands[command].callback;
            await functionCommand(state);
        }
        else {
            console.log("Unknown command")
        }

        rl.prompt();
    });
}
