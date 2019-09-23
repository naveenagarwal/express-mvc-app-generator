const _ = require('lodash');
const pluralize = require('pluralize')

class UtilFunctions {
    getDefaultConfig() {
        return {
            "models-path": cwd + '/models',
            "controllers-path": cwd + '/app/controllers',
            "services-path": cwd + '/lib/services'
        }
    }

    getFileName(name, suffix='') {
        return name.replace(/\.?([A-Z]+)/g, function (x,y){ return "-" + y.toLowerCase() }).replace(/^-/, "") +
            suffix;
    }

    getObjectName(name) {
        return name.replace(/\.?([A-Z]+)/, function (x,y){ return "-" + y.toLowerCase() }).replace(/^-/, "");
    }

    getModelName(name) {
        return pluralize.singular(_.upperFirst(_.camelCase(name)));
    }

}

module.exports = new UtilFunctions;