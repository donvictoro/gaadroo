import bitcoin from 'bitcoinjs-lib';
import {ECPairFactory} from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ecPair = ECPairFactory(ecc);
const validator = (pubkey, msghash, signature) => ecPair.fromPublicKey(pubkey).verify(msghash, signature);

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
const lITECOIN = {
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
const dOGECOIN = {
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

function createOPRETURNBTCTX(wif, toAddress, mintingOpReturnData, inputTXID, inputIndex, amountMinusFee, utxoBuffer) {
  const alice = ecPair.fromWIF(wif);
  const psbt = new bitcoin.Psbt();
  psbt.setVersion(2);
  psbt.setLocktime(0);
  psbt.addInput({
    hash: inputTXID,
    index: inputIndex, // crucial parameter
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(utxoBuffer,'hex'),
  });
  const data = Buffer.from(mintingOpReturnData, 'utf8');
  const embed = bitcoin.payments.embed({ data: [data] });
  psbt.addOutput({
    script: embed.output,
    value: 0,
  });
  amountMinusFee = parseInt(amountMinusFee);
  const changeAmount = amountMinusFee;
  psbt.addOutput({
    address: toAddress,
    value: changeAmount,
  });
  psbt.signInput(0, alice);
  psbt.validateSignaturesOfInput(0);
  psbt.finalizeAllInputs();
  const finalTXHexString = psbt.extractTransaction().toHex();
  return finalTXHexString;
}
export const txHexOPRETURNBTC = createOPRETURNBTCTX;
function create1to2OPRETURNBTCTX(wif, nfpAddress, mintingOpReturnData, inputTXID, inputIndex, amountMinusFee, utxoBuffer, changeAddress) {
  const alice = ecPair.fromWIF(wif);
  const psbt = new bitcoin.Psbt();
  psbt.setVersion(2);
  psbt.setLocktime(0);
  psbt.addInput({
    hash: inputTXID,
    index: inputIndex, // crucial parameter
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(utxoBuffer,'hex'),
  });
  const data = Buffer.from(mintingOpReturnData, 'utf8');
  console.log(mintingOpReturnData);
  const embed = bitcoin.payments.embed({ data: [data] });
  psbt.addOutput({
    script: embed.output,
    value: 0,
  });
  amountMinusFee = parseInt(amountMinusFee);
  const changeAmount = amountMinusFee - 100;
  psbt.addOutput({
    address: nfpAddress,
    value: 100,
  });
  psbt.addOutput({
    address: changeAddress,
    value: changeAmount,
  });
  psbt.signInput(0, alice);
  psbt.validateSignaturesOfInput(0, validator);
  psbt.finalizeAllInputs();
  const finalTXHexString = psbt.extractTransaction().toHex();
  return finalTXHexString;
}
export const txHex1To2OPRETURNBTC = create1to2OPRETURNBTCTX;

function createOPRETURNLTCTX(wif, toAddress, mintingOpReturnData, inputTXID, inputIndex, amountMinusFee, utxoBuffer) {
  const alice = ecPair.fromWIF(wif, lITECOIN);
  const psbt = new bitcoin.Psbt({ network: LITECOIN });
  psbt.setVersion(2);
  psbt.setLocktime(0);
  psbt.addInput({
    hash: inputTXID,
    index: inputIndex, // crucial parameter
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(utxoBuffer,'hex'),
  });
  const data = Buffer.from(mintingOpReturnData, 'utf8');
  const embed = bitcoin.payments.embed({ data: [data] });
  psbt.addOutput({
    script: embed.output,
    value: 0,
  });
  amountMinusFee = parseInt(amountMinusFee);
  const changeAmount = amountMinusFee;
  psbt.addOutput({
    address: toAddress,
    value: changeAmount,
  });
  psbt.signInput(0, alice);
  psbt.validateSignaturesOfInput(0, validator);
  psbt.finalizeAllInputs();
  const finalTXHexString = psbt.extractTransaction().toHex();
  return finalTXHexString;
}
export const txHexOPRETURNLTC = createOPRETURNLTCTX;
function create1to2OPRETURNLTCTX(wif, nfpAddress, mintingOpReturnData, inputTXID, inputIndex, amountMinusFee, utxoBuffer, changeAddress) {
  const alice = ecPair.fromWIF(wif, lITECOIN);
  const psbt = new bitcoin.Psbt({ network: LITECOIN });
  psbt.setVersion(2);
  psbt.setLocktime(0);
  psbt.addInput({
    hash: inputTXID,
    index: inputIndex, // crucial parameter
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(utxoBuffer,'hex'),
  });
  const data = Buffer.from(mintingOpReturnData, 'utf8');
  const embed = bitcoin.payments.embed({ data: [data] });
  psbt.addOutput({
    script: embed.output,
    value: 0,
  });
  amountMinusFee = parseInt(amountMinusFee);
  const changeAmount = amountMinusFee - 100;
  psbt.addOutput({
    address: nfpAddress,
    value: 100,
  });
  psbt.addOutput({
    address: changeAddress,
    value: changeAmount,
  });
  psbt.signInput(0, alice);
  psbt.validateSignaturesOfInput(0, validator);
  psbt.finalizeAllInputs();
  const finalTXHexString = psbt.extractTransaction().toHex();
  return finalTXHexString;
}
export const txHex1To2OPRETURNLTC = create1to2OPRETURNLTCTX;

function createOPRETURNDOGETX(wif, toAddress, mintingOpReturnData, inputTXID, inputIndex, amountMinusFee, utxoBuffer) {
  const alice = ecPair.fromWIF(wif, dOGECOIN);
  const psbt = new bitcoin.Psbt({ network: DOGECOIN });
  psbt.setVersion(2);
  psbt.setLocktime(0);
  psbt.addInput({
    hash: inputTXID,
    index: inputIndex, // crucial parameter
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(utxoBuffer,'hex'),
  });
  const data = Buffer.from(mintingOpReturnData, 'utf8');
  const embed = bitcoin.payments.embed({ data: [data] });
  psbt.addOutput({
    script: embed.output,
    value: 0,
  });
  amountMinusFee = parseInt(amountMinusFee);
  const changeAmount = amountMinusFee;
  psbt.addOutput({
    address: toAddress,
    value: changeAmount,
  });
  psbt.signInput(0, alice);
  psbt.validateSignaturesOfInput(0, validator);
  psbt.finalizeAllInputs();
  const finalTXHexString = psbt.extractTransaction().toHex();
  return finalTXHexString;
}
export const txHexOPRETURNDOGE = createOPRETURNDOGETX;
function create1to2OPRETURNDOGETX(wif, nfpAddress, mintingOpReturnData, inputTXID, inputIndex, amountMinusFee, utxoBuffer, changeAddress) {
  const alice = ecPair.fromWIF(wif, dOGECOIN);
  const psbt = new bitcoin.Psbt({ network: DOGECOIN });
  psbt.setVersion(2);
  psbt.setLocktime(0);
  psbt.addInput({
    hash: inputTXID,
    index: inputIndex, // crucial parameter
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(utxoBuffer,'hex'),
  });
  const data = Buffer.from(mintingOpReturnData, 'utf8');
  const embed = bitcoin.payments.embed({ data: [data] });
  psbt.addOutput({
    script: embed.output,
    value: 0,
  });
  amountMinusFee = parseInt(amountMinusFee);
  const changeAmount = amountMinusFee - 100;
  psbt.addOutput({
    address: nfpAddress,
    value: 100,
  });
  psbt.addOutput({
    address: changeAddress,
    value: changeAmount,
  });
  psbt.signInput(0, alice);
  psbt.validateSignaturesOfInput(0, validator);
  psbt.finalizeAllInputs();
  const finalTXHexString = psbt.extractTransaction().toHex();
  return finalTXHexString;
}
export const txHex1To2OPRETURNDOGE = create1to2OPRETURNDOGETX;
