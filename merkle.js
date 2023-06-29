// 作法參考 : https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 存放白名單地址
const whiteList = [
  '0xc0b84B2d5Cb42B13c561B252455651E3215dB400', // 錢包地址1
  '0x78405E58974CdA82a7eac5273E4b4B13e3107c11', // 錢包地址2
  '0x4DdA7EC279035959131072ff07c4FBDA3A433F22', // 錢包地址3
  '0x6d1B3A1020375327cF183576B035d5AF18268433', // 錢包地址4
];

const leaves = whiteList.map((addr) => keccak256(addr.toLowerCase()));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot().toString('hex');

console.log('----------------------------------------------------');
console.log('請將這段貼到合約的 setWhiteMint 中的 merkleRoot 參數');
console.log('0x' + root);

console.log('----------------------------------------------------');
console.log('下面是合約的 whiteMint 中的 merkleProof 時使用，一個地址對應一個 merkleProof');
whiteList.forEach(function (addr) {
  const goodAddress = keccak256(addr.toLowerCase());
  var hexProf = tree.getHexProof(goodAddress);
  console.log(`【${addr}】此地址若要 mint，merkleProof請帶入下面這段`);
  console.log(JSON.stringify(hexProf));
  console.log('----------------------------------------------------');
});