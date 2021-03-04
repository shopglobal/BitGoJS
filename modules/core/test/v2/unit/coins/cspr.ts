import { Promise as BluebirdPromise } from 'bluebird'; 
import { Cspr as CsprAccountLib, register } from '@bitgo/account-lib';
import { TestBitGo } from '../../../lib/test_bitgo';
import { Tcspr } from '../../../../src/v2/coins';
import { Cspr } from '../../../../src/v2/coins';
import { Transaction } from '@bitgo/account-lib/dist/src/coin/cspr/transaction';

const co = BluebirdPromise.coroutine;

describe('Casper', function () {
  const coinName = 'tcspr';
  let bitgo;
  let basecoin;

  before(function() {
    bitgo = new TestBitGo({
      env: 'mock'
    });
    bitgo.initializeTestVars();
    basecoin = bitgo.coin(coinName);
  });

  it('should instantiate the coin', function () {
    let localBasecoin = bitgo.coin('tcspr');
    localBasecoin.should.be.an.instanceof(Tcspr);

    localBasecoin = bitgo.coin('cspr');
    localBasecoin.should.be.an.instanceof(Cspr);
  });

  it('should return tcspr', function () {
    basecoin.getChain().should.equal('tcspr');
  });

  it('should return full name', function () {
    basecoin.getFullName().should.equal('Testnet Casper');
  });

  describe('Keypairs:', () => {
    it('should generate a keypair from random seed', function () {
      const keyPair = basecoin.generateKeyPair();
      keyPair.should.have.property('pub');
      keyPair.should.have.property('prv');
    });

    it('should generate a keypair from a seed', function () {
      const seedText = '80350b4208d381fbfe2276a326603049fe500731c46d3c9936b5ce036b51377f';
      const seed = Buffer.from(seedText, 'hex');
      const keyPair = basecoin.generateKeyPair(seed);

      keyPair.pub.should.equal('xpub661MyMwAqRbcFnJi3mvSpYNYyXUcjq7spqHg9GhpcWqs3wF4S8forUeJ3K8XfpUumpY4mLhaGPWAxAJETCnJM56w5f25g6kvLh5Bxb3ZEbD');
      keyPair.prv.should.equal('xprv9s21ZrQH143K3JEEwkPSTQRpRVe8LNQ2TcN5LtJD4BJtB8uutbMZJgKpC3EPHMPGn97Y9aXFYeFegFsPdZXu6BF5XB7yXhZDUE5d6keTHyV');
    });

    it('should validate a public key', function() {
      const keyPair = basecoin.generateKeyPair();
      keyPair.should.have.property('pub');
      keyPair.should.have.property('prv');

      basecoin.isValidPub(keyPair.pub).should.equal(true);
    });

    it('should validate a private key', function() {
      const keyPair = basecoin.generateKeyPair();
      keyPair.should.have.property('pub');
      keyPair.should.have.property('prv');

      basecoin.isValidPrv(keyPair.prv).should.equal(true);
    });

    it('Should supplement wallet generation', co(function *() {
      const details = yield basecoin.supplementGenerateWallet({});
      details.should.have.property('rootPrivateKey');
      basecoin.isValidPrv(details.rootPrivateKey).should.equal(true);
    }));

    it('Should supplement wallet generation with provided private key', co(function *() {
      const rootPrivateKey = 'e0c5c347fc67a46aa5104ece454882315fe5d70af286dbd3d2e04227ebd2927d';
      const details = yield basecoin.supplementGenerateWallet({ rootPrivateKey });
      details.should.have.property('rootPrivateKey');
      details.rootPrivateKey.should.equal(rootPrivateKey);
    }));
  });

  describe('Sign Transaction', () => {
    const factory = register(coinName, CsprAccountLib.TransactionBuilderFactory);
    const sourceKeyPair = new CsprAccountLib.KeyPair().getKeys();
    const targetKeyPair = new CsprAccountLib.KeyPair().getKeys();
    it('should be performed', async () => {
      const bitgoKeyPair = new CsprAccountLib.KeyPair().getKeys();
      const builder = factory.getTransferBuilder();
      builder
        .fee({ gasLimit: '10000', gasPrice: '10' })
        .source({ address: sourceKeyPair.pub })
        .to(targetKeyPair.pub)
        .amount('25000000')
        .transferId(123);

      const tx = (await builder.build()) as Transaction;
      tx.casperTx.approvals.length.should.equals(0);

      const params = {
        txPrebuild: {
          txJson: tx.toBroadcastFormat(),
        },
        prv: sourceKeyPair.prv,
      };

      let signedTransaction = await basecoin.signTransaction(params, () => {});
      signedTransaction.should.have.property('halfSigned');

      const halfSignedTxJson = JSON.parse(signedTransaction.halfSigned.txJson);
      halfSignedTxJson.deploy.approvals.length.should.equals(1);
      halfSignedTxJson.deploy.approvals[0].signer.toUpperCase().should.equals('02' + sourceKeyPair.pub.toUpperCase());

      params.txPrebuild.txJson = signedTransaction.halfSigned.txJson;
      params.prv = bitgoKeyPair.prv;
      signedTransaction = await basecoin.signTransaction(params, () => {});
      signedTransaction.should.not.have.property('halfSigned');
      signedTransaction.should.have.property('txJson');

      const twiceSignedTxJson = JSON.parse(signedTransaction.txJson);
      twiceSignedTxJson.deploy.approvals.length.should.equals(2);
      twiceSignedTxJson.deploy.approvals[0].signer.toUpperCase().should.equals('02' + sourceKeyPair.pub.toUpperCase());
      twiceSignedTxJson.deploy.approvals[1].signer.toUpperCase().should.equals('02' + bitgoKeyPair.pub.toUpperCase());
    });

    it('should be rejected if invalid key', async () => {
      const sourceKeyPair = new CsprAccountLib.KeyPair().getKeys();
      const targetKeyPair = new CsprAccountLib.KeyPair().getKeys();
      const invalidPrivateKey = 'AAAAA';
      const builder = factory.getTransferBuilder();
      builder
        .fee({ gasLimit: '10000', gasPrice: '10' })
        .source({ address: sourceKeyPair.pub })
        .to(targetKeyPair.pub)
        .amount('25000000')
        .transferId(123);

      const tx = (await builder.build()) as Transaction;
      tx.casperTx.approvals.length.should.equals(0);

      const params = {
        txPrebuild: {
          txJson: tx.toBroadcastFormat(),
        },
        prv: invalidPrivateKey,
      };

      await basecoin.signTransaction(params, () => {}).should.be.rejected();
    });
  });
});
