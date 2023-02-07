
const saveWallet = (password, mnemonic) => {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    // debugためログ出力
    console.log('address: ' + wallet.address);
    console.log('mnemonic: ' + wallet.mnemonic.phrase);
    console.log('privateKey: ' + wallet.privateKey);
    // passwordをキーにして暗号化してローカルストレージに保存
    const ecryptedPriv = CryptoJS.AES.encrypt(wallet.privateKey, password);
    const ecryptedMnem = CryptoJS.AES.encrypt(wallet.mnemonic.phrase, password);
    localStorage.setItem('privateKey', ecryptedPriv.toString());
    localStorage.setItem('mnemonic', ecryptedMnem.toString());
    // debugのためローカルストレージから取得して復号化
    const ecryptedData = localStorage.getItem('privateKey')
    const decrypted = CryptoJS.AES.decrypt(ecryptedData, password);
    console.log(decrypted.toString(CryptoJS.enc.Utf8));
    return wallet.mnemonic.phrase;
  } catch (err) {
    console.error('Failure to save wallet.');
    console.error(err);
    return null;
  }
}

const makeMnemonic = (password) => {
  const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
  console.log(mnemonic);
  const savedMnemonic = saveWallet(password, mnemonic);
  return savedMnemonic;
}

const importWallet = (password, mnemonic) => {
  const savedMnemonic = saveWallet(password, mnemonic);
  return savedMnemonic;
}
