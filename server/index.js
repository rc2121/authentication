const express = require('express');
const chalk  = require('chalk');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/UserAuthentication', {});
mongoose.connection.on('error', (error) => {
    console.log(chalk.red('An error occurred while connecting to MongoDB:' + error));
    Process.exit(1);
}).once('open', () => {
    console.log(chalk.green('Successfully connected to MongoDB'));
})

const superRoute = require('./routes/superUser');
const userRoute = require('./routes/user')

app.use('/api', superRoute);
app.use('/api/user', userRoute);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, (error) => {
    if(error)
        console.log(chalk.red('An error occurred while connecting to the server'));
    console.log(chalk.green(`Successfully connected to the server:http://localhost:${port}`));
});
