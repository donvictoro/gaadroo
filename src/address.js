const bitcoin = require('bitcoinjs-lib');
const {ECPairFactory} = require('ecpair');
const ecc = require('tiny-secp256k1');
const ecPair = ECPairFactory(ecc);
function generateBTCAddress() {
  const keyPair = ecPair.makeRandom();
  const {address} = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const privateWIF = keyPair.toWIF();
  if (keyPair) {
    return {"address": address, "wif": privateWIF};
  }
  return "error";
}
exports.btcAddress = generateBTCAddress();
function test() {
  return "123yea";
}
exports.test = test();
