/*
 * Importa a lib uuid de forma inline para não obrigar os demais repositórios
 * a instalarem o pacote "react-native-get-random-values" e "uuid".
 */
// @ts-ignore
let UUID: typeof import('uuid');
/* istanbul ignore next */
try {
  if (require('react-native-get-random-values') && require('uuid')) {
    require('react-native-get-random-values');
    UUID = require('uuid');
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

const generateUUID4 = () => UUID.v4();

export default {
  generateUUID4,
};
