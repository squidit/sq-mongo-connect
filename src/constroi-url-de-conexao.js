const chalk = require('chalk');

function obtemUri(mongodbName) {
  return `${process.env.MONGODB_URI}${mongodbName}`;
}

module.exports = function constroiUrlDeConexao() {
  const nomeOriginal = process.env.MONGODB_NAME;
  const estaEmAmbienteDeTeste = (process.env.NODE_ENV === 'test');

  if (estaEmAmbienteDeTeste) {
    const mongodbName = `${nomeOriginal.replace(/_test$/, '')}_test`;
    console.info(chalk.blue(`Alterado nome de banco para ${chalk.underline(mongodbName)}`));
    return obtemUri(mongodbName);
  }

  return obtemUri(nomeOriginal);
}
