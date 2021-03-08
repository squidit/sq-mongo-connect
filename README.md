## mongo-connect
> Unifica criação da conexão com o mongo nas api's da Squid.

### Usando
`require('squid-mongo-connect');`

### Promises
Substitui as *promieses* utilizadas pelo mongoose para a **Promise nativa do node**.

### Configurações
Use o .env ou exporte para as variáveis de ambiente:

- MONGODB_URI
- MONGODB_NAME
- MONGODB_CONNECTION_TIMEOUT *default 30000*

#### Exemplo .env:
```sh
MONGODB_URI=mongodb://localhost:27017/
MONGODB_NAME=squid
```
