//import { key } from './key.js'
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

let consoleInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let key = '';
consoleInterface.question("Enter your API key: ", (prompt) => {
    key = prompt;
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const askQuestion = async () => {
        consoleInterface.question(">> ", async (prompt) => {
            let result = await model.generateContent(prompt);
            let text = await result.response.text();
            console.log(text);
            consoleInterface.close();
            consoleInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            askQuestion();
        });
    }
    
    askQuestion();
});

