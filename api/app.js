const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

//routes
const indexRouter = require('./routes/index.js');
const applyRouter = require('./routes/applyJob.js');
        
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/',indexRouter);
app.use('/applying', applyRouter);

app.listen(3000, () => {
    console.log("On port 3000");
});