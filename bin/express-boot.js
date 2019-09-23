#! /usr/bin/env node

console.log("Generating Express Application.");

const fs = require("fs");
const shell = require('shelljs');
const commandLineArgs = require('command-line-args');

const AppGenerator = require('../lib/app-generator');
const SchemaReader = require('../lib/schema-reader');

const cwd = process.cwd();
// read command line options
const optionDefinitions = [
    { name: 'name', alias: 'n', type: String },
    { name: 'schema', alias: 'e', type: String }
  ];
const options = commandLineArgs(optionDefinitions);

// read command
console.log(options);
// copy template dir
const appGenerator = new AppGenerator(options.name)
appGenerator.copyTemplate();
// run npm install
appGenerator.installPackages();
// read ERD
const schemaReadererd = new SchemaReader(options.schema);
// create model commands
models = schemaReadererd.modelDefinitions()
// invoke express-scaffold
appGenerator.intializeModels(models);

console.log('Run the following commands to run the app.');
console.log('1. `npx sequelize-cli db:create`');
console.log('2. `npx sequelize-cli db:migrate`');
console.log('3. `nodemon index.js`');
console.log('Done. Exiting!!!');
process.exit(0);













// run sequelize cli model generaiton command
const sequelizeCommand = `npx sequelize-cli model:generate ${options.force ? '--force' : '' } --name ${options.name} --attributes ${options.attributes.join(',')}`

console.log(`executing:\n${sequelizeCommand}`);
shell.exec(sequelizeCommand);
console.log('sequelize default commands executed');

// creating controllers and services
console.log('------------ Createing controllers and services-------------');

// create if controller or services directories don't exists
shell.exec(`mkdir -p ${config['services-path'] }`);
shell.exec(`mkdir -p ${config['controllers-path'] }`);

// paths variables
const servicesPath = config['services-path'].replace(cwd, '');
const modelsPath = config['models-path'].replace(cwd, '');

// create base service
const baseServiceFilePath = config['services-path'] + '/base-service.js';
if (!fs.existsSync(baseServiceFilePath)) {
    fs.writeFileSync(baseServiceFilePath, baseServiceTemplate(modelsPath));
    console.log('Created base service : ' + baseServiceFilePath);
}

// create name service
const serviceFilename = getFileName(options.name, "-service.js");
const serviceFilePath = config['services-path'] + `/${serviceFilename}`;
if (!fs.existsSync(serviceFilePath) || options.force) {
    fs.writeFileSync(serviceFilePath, servicesTemplates(options.name, servicesPath ,modelsPath, getObjectName));
    console.log('Created model service: ' + serviceFilePath);
}

// create name controller
const controllerFilename = getFileName(options.name, "-controller.js");
const controllerFilePath = config['controllers-path'] + `/${controllerFilename}`;
if (!fs.existsSync(controllerFilePath) || options.force) {
    fs.writeFileSync(controllerFilePath, controllersTemplate(options.name, servicesPath, getFileName, getObjectName));
    console.log('Created controller: ' + controllerFilePath);
}