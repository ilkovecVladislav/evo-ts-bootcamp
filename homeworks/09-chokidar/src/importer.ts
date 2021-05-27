import fs from "fs";
const csv = require("csvtojson");
const { EventEmitter } = require("events");

class Importer {
  eventEmitter;
  constructor(eventEmitter: typeof EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  listen() {
    this.eventEmitter.on("dirwatcher:changed", (filePath: string) =>
      csv()
        .fromFile(filePath)
        .then((jsonObj: string) => {
          console.log(jsonObj);
        })
    );
  }

  async import(path: string) {
    try {
      const file = await fs.promises.readFile(path, "utf8");
      return csv().fromString(file);
    } catch (error) {
      console.log(error);
    }
  }

  importSync(path: string) {
    const file = fs.readFileSync(path, "utf8");
    return csv().fromString(file);
  }
}

exports.Importer = Importer;
export {};
