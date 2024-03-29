const mongoose = require('mongoose')
const chalk = require('chalk')
const constroiUrlDeConexao = require('./constroi-url-de-conexao');
const {
  MONGODB_CONNECTION_TIMEOUT,
  MONGODB_QUERY_TIMEOUT_IN_MS,
  NODE_ENV
} = process.env

const itIsNotTestEnvironment = (NODE_ENV !== 'test')
module.exports = function () {
  const mongodbUrl = constroiUrlDeConexao()

  if (!mongodbUrl) {
    throw new Error(chalk.red('Brô, como que eu vou me conectar sem a variável de ambiente MONGODB_URI. Cria o .env ou exporta no seu ambiente.'))
  }

  // mongoose.Promise = global.Promise;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  if (MONGODB_QUERY_TIMEOUT_IN_MS) options.serverSelectionTimeoutMS = MONGODB_QUERY_TIMEOUT_IN_MS

  if (itIsNotTestEnvironment) {
    console.log(chalk.green(`Conectando no servidor ${mongodbUrl}`));
  }

  return mongoose.connect(mongodbUrl, options)
    .then(() => {
      if (itIsNotTestEnvironment) {
        console.log(chalk.green(`Conectado ao servidor ${mongodbUrl} com sucesso!`));
      }
      return Promise.resolve();
    })
    .then(null, err => {
      console.error(err.message, err)
      return Promise.reject(err);
    });
};
