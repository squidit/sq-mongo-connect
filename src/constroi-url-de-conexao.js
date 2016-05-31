module.exports = function constroiUrlDeConexao() {
  const estaEmAmbienteDeTeste = (process.env.NODE_ENV === 'test');
  const mongodbName = estaEmAmbienteDeTeste ? `${process.env.MONGODB_NAME}_test` : process.env.MONGODB_NAME;
  const mongodbUrl = `${process.env.MONGODB_URI}${mongodbName}`;

  if (estaEmAmbienteDeTeste) {
    console.info(chalk.blue(`Alterado nome de banco para ${chalk.underline(mongodbName)}`));
  }

  return mongodbUrl;
}
