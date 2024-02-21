/**
 * Ao contrário do Partial, faz todas as propriedades
 * de um tipo se tornarem obrigatórias, removendo o "?".
 * Ref: https://stackoverflow.com/a/54983188/2826279
 */
declare type Full<T> = {
  [P in keyof T]-?: T[P];
};
