const fs = require('fs')
const utils = require('../lib/util-functions');

class SchemaReader {

    constructor(filePath) {
        this.schema = JSON.parse(fs.readFileSync(filePath));
    }

    modelDefinitions() {
        return this.tables().map(table => this.getModelDefition(table));
    }

    tables() {
        return this.schema["tables"];
    }

    getModelDefition(table) {
        // console.log(table);
        return {
            "attributes" : table["attributes"].map(attribute => `${attribute['name']}:${attribute['type']}`).join(','),
            "name" : utils.getModelName(table['name'])
        }
    }
}

module.exports = SchemaReader;