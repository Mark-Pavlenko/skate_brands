## DAO NFT
ERC-721 NON-FUNGIBLE TOKEN for DAO.

Contract inherits `@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol`

### Contract name
NFT.sol

### State variables
- TOTAL_SUPPLY: uint256 public  
- currentTokenId: Counters.Counter private
- baseTokenURI: string public

※baseTokenURI: https://{domain}/v1//v1/file-download/nft/

### Constructor
#### Parameters
- name: string
- symbol: string
- totalSupply: uint256
- baseTokenURI: string

#### Processing Details
```
ERC721(Parameters.name, Parameters.symbol)
baseTokenURI = Parameters.baseTokenURI
TOTAL_SUPPLY = Parameters.totalSupply

_setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
_setupRole(MINTER_ROLE, _msgSender());
_setupRole(PAUSER_ROLE, _msgSender());
```

### Method: mint 
Method restriction: public

#### Parameters
- recipient: address 
- tokenIdStart: uint256 
- tokenIdEnd: uint256

#### Processing Details
1. Check MINTER_ROLE, if has not role, throw `No permission` error
2. If tokenIdEnd > maxSupply, throw `tokenIdEnd too big` error.
3. If tokenIdStart <= currentTokenId.current(), throw `Already minted` error.
4. If tokenIdEnd <= currentTokenId.current(), throw `Already minted` error.
5. If tokenIdStart != currentTokenId.current() + 1, throw `tokenIdStart should set {currentTokenId.current() + 1}` error.
6. Loop start: tokenIdStart to end: tokenIdEnd
- currentTokenId.increment()
- uint256 newTokenId = currentTokenId.current();
- _safeMint(recipient, newTokenId)

### Method: tokenURI 
Method: function tokenURI(uint256 tokenId) public view virtual override returns (string memory) 

#### Parameters
- tokenId: uint256
#### Processing Details
return baseTokenURI + tokenId + ".json"


※reference url: https://docs.opensea.io/docs/4-setting-a-price-and-supply-limit-for-your-contract
