export const ACCOUNT_FROM_SEED = {
  seed: 'cd1eac3bc52716f3177bc7f9c5d7de10b98c74c6c1ace2c874e0e09f47469023',
  accountHash: 'f068b89fbd03587a1bedb79ead98d1c8f4c2f3181a6eddbc10ae98d0dd874e94',
  xPublicKey:
    'xpub661MyMwAqRbcEzDE55AJUGhMKJJ2nw1hnF1fBoaw2T47DQsJzhLXbygpggTXpkWPVENnzPYbgLRVPtmwjQQAiY9AbHX5Ys4KpLRuFtVNFtC',
  xPrivateKey:
    'xprv9s21ZrQH143K2W8ky3dJ78kcmGTYPUHrR264PRBKU7X8LcYATA2H4BNLqNDYi4mhSiJXRUAttHaJYBynN7iMU2vkJjEG4SK6xVJkymYUEyG',
  publicKey: '03DC13CBBF29765C7745578D9E091280522F37684EF0E400B86B1C409BC454F1F3',
  privateKey: '353ED4C9DB2A13B8EB319618EAF7A61DC5AB74AF79020C9C21D06E768A6D3E24',
};

export const ACCOUNT_1 = {
  accountHash: '019764f079d02768d704f286da630a1d3c7329330596c9561d403bed2d43c0e0c8',
  publicKey: 'MCowBQYDK2VwAyEAl2TwedAnaNcE8obaYwodPHMpMwWWyVYdQDvtLUPA4Mg=',
  privateKey: 'MC4CAQAwBQYDK2VwBCIEIG+yNyAN9sInKfXR2GOH5UN/f5a4bx/VL11lxW58wbRP',
};

export const ACCOUNT_2 = {
  accountHash: '01e5c0f10bcc9197acc0567eb06de9ed6f1bf408194726bd2bcb603692b23b4817',
  publicKey: 'MCowBQYDK2VwAyEA5cDxC8yRl6zAVn6wbentbxv0CBlHJr0ry2A2krI7SBc=',
  privateKey: 'MC4CAQAwBQYDK2VwBCIEIKAsNy6nMQFjyM/h6+zf8bgfDZplwjRzLFYs1WWSf+UH',
};

export const OWNER_1 = {
  accountHash: '3e33bcba4d8d9fb26c5196dcbad26d353235d49a79cd1160ad7f09cd4f94bffe',
  publicKey: '03DC13CBBF29765C7745578D9E091280522F37684EF0E400B86B1C409BC454F1F3',
  privateKey: '353ED4C9DB2A13B8EB319618EAF7A61DC5AB74AF79020C9C21D06E768A6D3E24',
  xpub:
    'xpub661MyMwAqRbcFn97q1KxsbXyXJQ49bzPqcisB2YHoWShkJPXXexd12pdgRTczC6rDhFKNV7PAgMRWqGQtoh9tmgLgFdQGrjciEYKsNwfzt1',
  xprv:
    'xprv9s21ZrQH143K3J4eiynxWTbEyGZZk9GYUPoGNe8gFAuisW4Nz7eNTEW9q9YiMxDa7KtpZM5hoVtUdKYu2dMyw3MsHHpw935RApMzgPZ4Qw2',
};

export const OWNER_2 = {
  accountHash: '608e43c3bb3f44200ec59d71d461d3e5aa4e823c595848a5d280f831ce8de302',
  publicKey: '02FBA9E5705A8860FC1B5563B981A4C2C94AF03FC10916EB7819B183056C43D3B0',
  privateKey: '23E736A7F132E556531EB78A26D23641023FDBB6FADBCACBF93A7C60C979E9D0',
};

export const OWNER_3 = {
  accountHash: 'cd1eac3bc52716f3177bc7f9c5d7de10b98c74c6c1ace2c874e0e09f47469023',
  publicKey: '03DC13CBBF29765C7745578D9E091280522F37684EF0E400B86B1C409BC454F1F3',
  privateKey: '353ED4C9DB2A13B8EB319618EAF7A61DC5AB74AF79020C9C21D06E768A6D3E24',
};

export const GAS_LIMIT = '123';

export const FEE = { gasLimit: '10000000', gasPrice: '10' };

export const INVALID_SHORT_KEYPAIR_KEY = '82A34E';

export const INVALID_LONG_KEYPAIR_PRV = ACCOUNT_FROM_SEED.privateKey + 'F1';

export const INVALID_PRIVATE_KEY_ERROR_MESSAGE = 'Unsupported private key';

export const INVALID_PUBLIC_KEY_ERROR_MESSAGE = 'Unsupported public key:';

export const VALID_ADDRESS = '608e43c3bb3f44200ec59d71d461d3e5aa4e823c595848a5d280f831ce8de302';

export const INVALID_ADDRESS = '608e43c3gg3f44200ec59Y7ZXC461d3e5aa4e823c595848a5d280f831ce8de302';

export const INVALID_ADDRESS_EMPTY = '';

export const INVALID_ADDRESS_EMPTY_W_SPACES = '   ';
