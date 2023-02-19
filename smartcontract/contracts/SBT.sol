// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC5192.sol";

contract SBT is
    Context,
    ERC721Burnable,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);

    uint256 public TOTAL_SUPPLY;
    // Mapping from token ID to locked
    mapping(uint256 => bool) private _locked;

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) ERC721(name, symbol) {
        TOTAL_SUPPLY = totalSupply;
    }

    function locked(uint256 tokenId) external view returns (bool) {
        if (_ownerOf(tokenId) == address(0)) return false;
        return _locked[tokenId];
    }

    function mint(
        address to,
        uint256 tokenId,
        string memory tokenUri
    ) public onlyOwner {
        require(tokenId <= TOTAL_SUPPLY, "tokenId too big");
        require(balanceOf(to) == 0, "Already have");
        require(_locked[tokenId] != true, "Already minted");
        require(bytes(tokenUri).length > 0, "tokenUri should be set");

        _locked[tokenId] = true;
        emit Locked(tokenId);

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    modifier IsTransferAllowed(uint256 tokenId) {
        require(!_locked[tokenId], "Unable to transfer SBT");
        _;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721) IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override(ERC721) IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId, data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721) IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
        // can do mint and burn
        require(from == address(0) || to == address(0), "Unable to transfer SBT");
    }

    function _burn(
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return _interfaceId == type(IERC5192).interfaceId || super.supportsInterface(_interfaceId);
    }
}
