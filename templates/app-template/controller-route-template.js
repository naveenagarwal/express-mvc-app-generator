const utils = require('../../lib/util-functions');

module.exports = (controllers) =>  `
const router = require('express').Router();

${
    controllers.map((controller) => {
        const objectName = utils.getObjectName(controller);
        return `const ${objectName} = require('./app/controllers/${controller}-controller.js');
router.use('/${controller}', ${objectName});`;
    }).join('\n')
}

module.exports = router;
`;