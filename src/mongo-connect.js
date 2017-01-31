const mongoose = require('mongoose');
const chalk = require('chalk');
const constroiUrlDeConexao = require('./constroi-url-de-conexao');
const itIsNotTestEnvironment = (process.env.NODE_ENV !== 'test');

module.exports = function () {
  const mongodbUrl = constroiUrlDeConexao();
  const mongodbConnectionTimeout = process.env.MONGODB_CONNECTION_TIMEOUT || 30000;
  const mongodbReplicaSet = process.env.MONGODB_REPLICA_SET;

  if (!mongodbUrl) {
    throw new Error(chalk.red('Brô, como que eu vou me conectar sem a variável de ambiente MONGODB_URI. Cria o .env ou exporta no seu ambiente.'));
  }

  mongoose.Promise = global.Promise;

  const options = {
    server: {
      auto_reconnect: true,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: mongodbConnectionTimeout,
      },
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: mongodbConnectionTimeout,
      },
    },
  };

  if (mongodbReplicaSet) {
    options.replset.rs_name = mongodbReplicaSet;
  }

  if (itIsNotTestEnvironment) {
    console.info(chalk.green(`Conectando no servidor ${mongodbUrl}`));
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
