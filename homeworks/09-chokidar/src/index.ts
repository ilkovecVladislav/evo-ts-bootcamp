import { EventEmitter } from "events";
import { DirWatcher } from "./dirWatcher";
import { Importer } from "./importer";
import { config } from "./config";

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(config, eventEmitter);
const importer = new Importer(eventEmitter);

dirWatcher.watch();
importer.listen();
