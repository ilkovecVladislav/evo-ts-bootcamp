import fs from "fs";
import path from "path";
import { EventEmitter } from "events";

export class DirWatcher {
  dirPath: string;
  delay: number;
  maxFiles: number | null;
  eventEmitter: EventEmitter;
  cache = new Map<string, string>();

  constructor(
    {
      delay,
      pathToDir,
      maxFiles,
    }: { delay: number; pathToDir: string; maxFiles: number | null },
    eventEmitter: EventEmitter
  ) {
    this.dirPath = pathToDir;
    this.delay = delay;
    this.maxFiles = maxFiles;
    this.eventEmitter = eventEmitter;
  }

  watch() {
    setInterval(async () => {
      await fs.readdir(this.dirPath, (error, files) => {
        if (error) {
          return;
        }
        const filteredFiles = files.filter((fileName) =>
          /.+(\.csv)$/.test(fileName)
        );

        filteredFiles.forEach((file) => {
          if (
            (!this.cache.has(file) &&
              this.maxFiles &&
              this.cache.size < this.maxFiles) ||
            (!this.cache.has(file) && !this.maxFiles)
          ) {
            this.cache.set(file, file);
            this.eventEmitter.emit(
              "dirwatcher:changed",
              path.join(this.dirPath, file)
            );
          }
        });
      });
    }, this.delay);
  }
}
