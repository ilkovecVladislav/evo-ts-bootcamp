const program = require("commander");
const path = require("path");
const fs = require("fs");
const packageJson = require("../package.json");
const { Caesar } = require("./crypto");

type Options = {
  shift: number;
  action: "encode" | "decode";
  input?: string;
  output?: string;
};

const customParseInt = (value: string) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new program.InvalidOptionArgumentError("Not a number.");
  }

  return parsedValue;
};

program.version(packageJson.version);

program
  .requiredOption(
    "-s, --shift <number>   [required]",
    "Set the shift for decode/encode data",
    customParseInt
  )
  .option("-i, --input <string>", "Specify the file where to get the data from")
  .option("-o, --output <string>", "Specify the file to save the data to")
  .addOption(
    new program.Option(
      "-a, --action  <type>   [required]",
      "Specify what action you want to perform"
    )
      .choices(["decode", "encode"])
      .makeOptionMandatory()
  )
  .action((options: Options) => {
    const { shift, action, input, output } = options;
    const inputSource = input
      ? fs.createReadStream(path.join(__dirname, input), "utf8")
      : process.stdin;
    const outputSource = output
      ? fs.createWriteStream(path.join(__dirname, output), "utf8")
      : process.stdout;

    const caesar = new Caesar(action, shift);

    inputSource
      .pipe(caesar)
      .pipe(outputSource)
      .on("finish", () => console.log("Done"));
  });

program.parse(process.argv);
