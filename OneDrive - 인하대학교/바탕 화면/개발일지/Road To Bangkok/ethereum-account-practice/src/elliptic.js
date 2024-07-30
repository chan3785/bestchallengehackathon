const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const privateKey = 'ae67904cc3e189185cac474316d46844ed597a08a2232d9f4add7ea98a569961'

const keyPair = ec.keyFromPrivate(privateKey);

const myPublicKey = keyPair.getPublic().encodeCompressed('hex');
console.log('myPublicKey:::',myPublicKey);