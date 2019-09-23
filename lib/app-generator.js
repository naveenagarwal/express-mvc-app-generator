const shell = require('shelljs');
const controllerIndexTemplate = require('../templates/app-template/controller-route-template');
const fs = require('fs');
const util = require('../lib/util-functions');
const {
        configTemplate,
        constantsTemplate,
        dotEnvTemplate,
        loggerTemplate,
        middlewareIndexTemplate,
        modelIndexTemplate,
        packageJSONTemplate,
        readmeTemplate,
        sequelizercTemplate,
        gitIgnoreTemplate,
        srcIndexTemplate,
        testSpecTemplate,
        envDevelopmentTemplate,
        envTestTemplate,
        envStageTemplate,
        envProductionTemplate,
        envUatTemplate,
        libIndexTemplate,
    } = require('../templates/app-template');

class AppGenerator {
    constructor(appName) {
        this.appName = appName;
        this.directoryStructure = [
            'src/app/controllers',
            'src/app/models',
            'src/app/views',
            'src/bin',
            'src/lib',
            'src/config/environments',
            'src/middlewares',
            'src/middlewares',
            'src/migrations',
            'src/seeders',
            'src/test/fixtures',
            'src/test/functional',
            'src/test/integrations',
            'src/test/unit',
        ]

        this.files = [
            ['.sequelizerc', sequelizercTemplate],
            ['README.md', readmeTemplate],
            ['.gitignore', gitIgnoreTemplate],
            ['package.json', packageJSONTemplate],
            ['env.example', dotEnvTemplate],
            ['src/app/models/index.js', modelIndexTemplate],
            ['src/test/spec.js', testSpecTemplate],
            ['src/config/constants.js', constantsTemplate],
            ['src/config/logger.js', loggerTemplate],
            ['src/config/environments/development.js', envDevelopmentTemplate],
            ['src/config/environments/test.js', envTestTemplate],
            ['src/config/environments/stage.js', envStageTemplate],
            ['src/config/environments/production.js', envProductionTemplate],
            ['src/config/environments/uat.js', envUatTemplate],
            ['src/config/config.js', configTemplate],
            ['src/middlewares/index.js', middlewareIndexTemplate],
            ['src/index.js', srcIndexTemplate],
            ['src/lib/index.js', libIndexTemplate]
        ]
    }

    copyTemplate() {
        const cwd = process.cwd();
        const path = cwd + `/${this.appName}`;
        if (fs.existsSync(path)) {
            shell.echo(`Error - Directory with name '${this.appName}' already exists!!!`)
            process.exit(1);
        }
        console.log(path);

        shell.exec(`mkdir ${path}`);
        shell.echo('copying template');
        // create directories
        shell.echo('creating templated directories');
        this.directoryStructure.forEach(dir => shell.exec(`cd ${path} && mkdir -p ${dir}`));
        // create files
        shell.echo('creating templated files');
        this.files.forEach(file => fs.writeFileSync(`${path}/${file[0]}`, file[1]));
    }

    installPackages() {
        console.log('installing packages')
        const path = process.cwd() + `/${this.appName}`;
        shell.exec(`cd ${path} && npm install`);
    }

    intializeModels(models) {
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