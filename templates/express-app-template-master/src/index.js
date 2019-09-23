if (!process.env.ALREADY_SET) require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const middlewares = require('./middlewares')
const { NOT_FOUND_STATUS_CODE } = require('./config/constants');
const controllers = require('./app/controllers');

logger.init();

// your pre-routes-middlewares
app.use(bodyParser.json());
// your routes
app.use('api', controllers);
// your post-routes-middlewares
app.use(middlewares.handleErrors);
// Catch 404 and forward to error handlers
app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.statusCode = NOT_FOUND_STATUS_CODE;
    res.send(err.message);
});

app.get('/', (req, res) => res.json({message: 'Hello World!'}));
app.get('/health', (req, res) => res.json({status: true, message: 'Health OK!'}));

app.listen(port, () => global.logger.info(`Example app listening on port ${port}!`));