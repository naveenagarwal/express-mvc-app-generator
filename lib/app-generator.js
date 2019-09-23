const shell = require('shelljs');
const controllerIndexTemplate = require('../templates/app-template/controller-route-template');
const fs = require('fs');
const util = require('../lib/util-functions');

class AppGenerator {
    constructor(appName) {
        this.appName = appName;
    }

    copyTemplate() {
        const path = process.cwd() + `/${this.appName}`;
        if (fs.existsSync(path)) {
            shell.echo(`Error - Directory with name '${this.appName}' already exists!!!`)
            process.exit(1);
        }
        const cwd = process.cwd();
        shell.exec(`mkdir ${this.appName}`);
        shell.echo('copying template');
        shell.exec(`cp -a ${cwd}/templates/express-app-template-master/. ${this.appName}`);
    }

    installPackages() {
        console.log('installing packages')
        const cwd = process.cwd();
        shell.exec(`cd ${this.appName} && npm install`);
    }

    intializeModels(models) {
        const cwd = process.cwd();
        shell.exec(`cd ${this.appName}`);
        // shell.exec(`npx sequelize init`);
        models.forEach(model => {
            console.log(`cd ${this.appName} && npx scaffold ${this.stringify(model)}`);
            shell.exec(`cd ${this.appName} && npx scaffold ${this.stringify(model)}`);
        });
        this.copyControllerRouteIndexFile(models);
    }

    stringify(model) {
        return `--name ${model['name']} --attributes ${model['attributes']}`;
    }

    copyControllerRouteIndexFile(models) {
        const controllers = models.map(model => ({ filename: util.getFileName(model["name"]), objectName: util.getObjectName(model["name"]) }) );
        const template = controllerIndexTemplate(controllers);
        const path = `${process.cwd()}/${this.appName}/src/app/controllers/index.js`;
        fs.writeFileSync(path, template);
    }
};

module.exports = AppGenerator;