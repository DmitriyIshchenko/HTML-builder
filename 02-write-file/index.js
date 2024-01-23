const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

fs.appendFile(path.join(__dirname, "text.txt"), "", (err) => {
  if (err) console.error(err);
});
stdout.write("Enter text: \n");
stdin.on("data", (text) => {
  if (text.toString().trim().toLowerCase() === "exit") process.exit();
  fs.appendFile(path.join(__dirname, "text.txt"), text, (err) => {
    if (err) console.error(err);
  });
});

process.on("SIGINT", () => process.exit());
process.on("exit", () => console.log("\nBye!"));