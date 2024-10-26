import { Command } from "commander";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

const program = new Command();

program
    .option("-k, --key <key>", "API key")
    .description("Set your API key and chat with gemini 1.5 pro assistant from terminal");

program.parse(process.argv);

const options = program.opts();

if (!options.key) {
    console.error("API key is required. Use -k or --key to provide the key.");
    process.exit(1);
}

const key = options.key;
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const chatSession = model.startChat();

const consoleInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = async () => {
    consoleInterface.question(">> ", async (prompt) => {
        try {
            let result = await chatSession.sendMessage(prompt);
            let text = result.response.text();
            console.log(text);

            askQuestion();
        } catch (error) {
            console.error("An error occurred:", error);
            consoleInterface.close();
        }
    });
};

askQuestion();
