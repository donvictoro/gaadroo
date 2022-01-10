import bitcoin from 'bitcoinjs-lib';
import fetch from 'node-fetch';
import {txHexOPRETURNBTC, txHexOPRETURNLTC, txHexOPRETURNDOGE} from "./transactions.js";
import {txHex1To2OPRETURNBTC, txHex1To2OPRETURNLTC, txHex1To2OPRETURNDOGE} from "./transactions.js";
async function reqTXHex(getTXDataUrl, fromAddress, wif, toAddress, opReturnData, txId, amountMinusFee, txType, changeAddress, network) {
  try {
    const response = await fetch(getTXDataUrl);
    const body = await response.json();
    if (body) {
      var inputIndex = 0;
      body.data.outputs.map(output => {
        if (output.address == fromAddress) {
          inputIndex = output.output_no;
        }
      });
      var txHex = body.data.tx_hex;
      var generatedTXHex = null;
      if (txType == "mint") {
        if (network == "BTC") {
          generatedTXHex = txHexOPRETURNBTC(wif, toAddress, opReturnData, txId, inputIndex, amountMinusFee, txHex);
        } else if (network == "LTC") {
          generatedTXHex = txHexOPRETURNLTC(wif, toAddress, opReturnData, txId, inputIndex, amountMinusFee, txHex);
        } else if (network == "DOGE") {
          generatedTXHex = txHexOPRETURNDOGE(wif, toAddress, opReturnData, txId, inputIndex, amountMinusFee, txHex);
        } else {
          return "tx error";
        }
      } else if (txType == "mintWithChange") {
        if (network == "BTC") {
          generatedTXHex = txHex1To2OPRETURNBTC(wif, toAddress, opReturnData, txId, inputIndex, amountMinusFee, txHex, changeAddress);
        } else if (network == "LTC") {
          generatedTXHex = txHex1To2OPRETURNLTC(wif, toAddress, opReturnData, txId, inputIndex, amountMinusFee, txHex, changeAddress);
        } else if (network == "DOGE") {
          generatedTXHex = txHex1To2OPRETURNDOGE(wif, toAddress, opReturnData, txId, inputIndex, amountMinusFee, txHex, changeAddress);
        } else {
          return "tx error";
        }
      }
      return generatedTXHex;
    } else {
      return "response error";
    }
  }
  catch (err) {
      return err;
  }
}
async function reqUnspentTX(fromAddress, wif, toAddress, opReturnData, txType, changeAddress, network) {
  try {
      const unspentTXUrl = "https://chain.so/api/v2/get_tx_unspent/"+network+"/"+fromAddress;
      const response = await fetch(unspentTXUrl);
      const body = await response.json();
      if (body) {
      const txId = body.data.txs[0].txid;
      const unspentAmount = body.data.txs[0].value;
      var fee = 0;
      if (network == "BTC") {
        fee = 0.00002;
      } else if (network == "LTC") {
        fee = 0.00004;
      } else if (network == "DOGE") {
        fee = 1;
      } else {
        return "fee error";
      }
      const amountMinusFee = (unspentAmount - fee) * 100000000;
      var getTXDataUrl = "https://chain.so/api/v2/get_tx/"+network+"/"+txId;
      const generatedTXHex = await reqTXHex(getTXDataUrl, fromAddress, wif, toAddress, opReturnData, txId, amountMinusFee, txType, changeAddress, network);
      return generatedTXHex;
    } else {
      return "response error";
    }
  }
  catch (err) {
      return err;
  }
}
function mintArtist(debitAddress, debitPassword, artistAddress, name, url, desc, founder, network) {
  const opReturnString = "n" + name + "/u" + url + "/d" + desc +  "/f" + founder;
  const txHex = reqUnspentTX(debitAddress, debitPassword, artistAddress, opReturnString, "mint", null, network);
  return txHex;
}
export const artist = mintArtist;
function mintProduct(artistAddress, artistPassword, productAddress, item, size, weight, usage, desc, color1, c2, c3, c4, material1, m2, m3, m4, supply, network) {
  const opReturnString = "p1:" + item + "/" + size + "/" + weight + "/" + usage + "/" + desc + "/" + color1 + "/" + c2 + "/" + c3 + "/" + c4  + "/" + material1 + "/" + m2 + "/" + m3 + "/" + m4 + "/" + supply;
  const txHex = reqUnspentTX(artistAddress, artistPassword, productAddress, opReturnString, "mint", null, network);
  return txHex;
}
export const product = mintProduct;
function mintPiece(productAddress, productPassword, pieceAddress, artistRegTX, productRegTX, unixStartTime, unixLifeTime, minCost, itemNumber, network) {
  var shajs = require('sha.js');
  const artistRegTXHash = new shajs.sha256().update(artistRegTX).digest('hex');
  const productRegTXHash = new shajs.sha256().update(productRegTX).digest('hex');
  const pieceAddressHash = new shajs.sha256().update(pieceAddress).digest('hex');
  const controlSum = artistRegTXHash + productRegTXHash + pieceAddressHash;
  const controlSumHash = new shajs.sha256().update(controlSum).digest('hex');
  var md5 = require('md5');
  const controlSumHashMD5 = md5(controlSumHash);
  const opReturnString = "GPR1.0:" + controlSumHashMD5 + "/" + unixStartTime + "/" + unixLifeTime + "/" + minCost +  "/" + itemNumber;
  const txHex = reqUnspentTX(productAddress, productPassword, pieceAddress, opReturnString, "mintWithChange", null, network);
  return txHex;
}
export const piece = mintPiece;
