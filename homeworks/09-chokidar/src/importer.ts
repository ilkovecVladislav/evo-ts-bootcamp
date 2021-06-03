import fs from "fs";
import csv from "csvtojson";
import { EventEmitter } from "events";

export class Importer {
  eventEmitter: EventEmitter;
  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  listen() {
    this.eventEmitter.on("dirwatcher:changed", (filePath: string) =>
      csv()
        .fromFile(filePath)
        .then((jsonObj: unknown[]) => {
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
