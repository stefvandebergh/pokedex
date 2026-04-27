import {cleanInput} from "./repl.js";
import {describe, expect, test} from "vitest";

describe.each([
    {input: "Hello world! This is a test.", expected: ["hello", "world!", "this", "is", "a", "test."]},
    {input: "   Leading and trailing spaces   ", expected: ["leading", "and", "trailing", "spaces"]},
    {input: "Multiple   spaces   between   words", expected: ["multiple", "spaces", "between", "words"]}, 
])("cleanInput", ({input, expected}) => {
    test(`Expected: ${expected}` , () => {
        const actual = cleanInput(input);
    
    expect(actual).toHaveLength(expected.length);
    for (const i in expected){
        expect(actual[i]).toBe(expected[i]);
    }
});
});
