module.exports = (controllers) =>  `
const router = require('express').Router();

${
    controllers.map((controller) => {
        return `const ${controller["objectName"]} = require('./${controller["filename"]}-controller.js');
router.use('/${controller["filename"]}', ${controller["objectName"]});`;
    }).join('\n\n')
}

module.exports = router;
`;