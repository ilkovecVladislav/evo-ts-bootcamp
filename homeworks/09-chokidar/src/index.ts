const { EventEmitter } = require("events");
const { DirWatcher } = require("./dirWatcher");
const { Importer } = require("./importer");
const { config } = require("./config");

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(config, eventEmitter);
const importer = new Importer(eventEmitter);

dirWatcher.watch();
importer.listen();
