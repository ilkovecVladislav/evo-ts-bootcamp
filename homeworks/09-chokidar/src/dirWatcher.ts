const fs = require("fs");
const path = require("path");
const { EventEmitter } = require("events");

class DirWatcher {
  dirPath: string;
  delay: number;
  maxFiles: number | null;
  eventEmitter: typeof EventEmitter;
  cache = new Map<string, string>();

  constructor(
    {
      delay,
      pathToDir,
      maxFiles,
    }: { delay: number; pathToDir: string; maxFiles: number | null },
    eventEmitter: typeof EventEmitter
  ) {
    this.dirPath = pathToDir;
    this.delay = delay;
    this.maxFiles = maxFiles;
    this.eventEmitter = eventEmitter;
  }

  watch() {
    setInterval(async () => {
      await fs.readdir(this.dirPath, (error: Error, files: string[]) => {
        if (error) {
          return;
        }
        files.forEach((file) => {
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

exports.DirWatcher = DirWatcher;
export {};
