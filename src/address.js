import bitcoin from 'bitcoinjs-lib';
import {ECPairFactory} from 'ecpair';
import * as ecc from 'tiny-secp256k1';
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
export const btcAddress = generateBTCAddress;
function generateLTCAddress() {
  const LITECOIN = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  };
  const keyPair = ecPair.makeRandom({ network: LITECOIN });
  const {address} = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: LITECOIN,
  });
  var privateWIF = keyPair.toWIF();
  if (keyPair) {
    return {"address": address, "wif": privateWIF};
  }
  return "error";
}
export const ltcAddress = generateLTCAddress;
function generateDOGEAddress() {
  const DOGECOIN = {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'doge',
    bip32: {
      public: 0x02facafd,
      private: 0x02fac398,
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
  };
  const keyPair = ecPair.makeRandom({ network: DOGECOIN });
  const {address} = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: DOGECOIN,
  });
  var privateWIF = keyPair.toWIF();
  if (keyPair) {
    return {"address": address, "wif": privateWIF};
  }
  return "error";
}
export const dogeAddress = generateDOGEAddress;
