const mongoose = require('mongoose');
const chalk = require('chalk');

const constroiUrlDeConexao = function() {
    const estaEmAmbienteDeTeste = (process.env.NODE_ENV === 'test');
    const mongodbName = estaEmAmbienteDeTeste ? `${process.env.MONGODB_NAME}_test` : process.env.MONGODB_NAME;
    const mongodbUrl = `${process.env.MONGODB_URI}${mongodbName}`;

    if (estaEmAmbienteDeTeste) {
      console.info(chalk.blue('Alterado conexão de banco para _test'));
    }

    return mongodbUrl;
}

const conectar = function() {
    const mongodbUrl = constroiUrlDeConexao();
    const mongodbConnectionTimeout = process.env.MONGODB_CONNECTION_TIMEOUT || 30000;
    const mongodbReplicaSet = process.env.MONGODB_REPLICA_SET;

    if (!mongodbUrl) {
      throw new Error(chalk.red('Brô, como que eu vou me conectar sem a variável de '
        + 'ambiente MONGODB_URI. Cria o .env ou exporta no seu ambiente.'));
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

    console.info(chalk.green(`Conectando no servidor ${mongodbUrl}`));
    return mongoose.connect(mongodbUrl, options);
}

module.exports.conectar = conectar;
module.exports.obterMongodbUrl = constroiUrlDeConexao;
