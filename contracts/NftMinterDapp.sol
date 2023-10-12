// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyNFT is ERC721Enumerable, Ownable {
    // Variables for wallet addresses
    address public liquidityWallet;
    address public treasuryWallet;

    // Royalty percentage
    uint256 public royaltyPercentage = 10;

    // Counter for generating token IDs
    uint256 private tokenIdCounter = 1;

    // Struct to store additional data for each NFT
    struct NFTData {
        string name;
        string fileReference;
        uint256 price;
    }

    // Mapping from token ID to NFT data
    mapping(uint256 => NFTData) public nftData;

    constructor() ERC721("NFTMinterDapp", "TATINFT") Ownable(msg.sender) {
        liquidityWallet = 0x823c3960F1Fb366f8835932C72e34DE7CdCE9F15;
        treasuryWallet = 0xCdC3804Db85fD4A72153d4716Bc838dfF079ab0e;
    }

    function mintNFT(
        string memory _name,
        string memory _fileReference,
        uint256 _price
    ) external payable {
        // Ensure the sender has sent some Ether (price must be greater than zero)
        require(msg.value > 0, "Value must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        require(msg.value >= (_price * royaltyPercentage) / 100, "Value must be equal or bigger than royalty fee");

        // Generate a new tokenId
        uint256 tokenId = tokenIdCounter;
        tokenIdCounter++;

        // Mint the NFT to the sender
        _safeMint(msg.sender, tokenId);

        // Store additional NFT data
        nftData[tokenId] = NFTData({
            name: _name,
            fileReference: _fileReference,
            price: _price
        });

        // Calculate royalties
        uint256 royaltyAmount = msg.value;

        // Transfer royalties to wallets
        (bool liquiditySuccess, ) = payable(liquidityWallet).call{value: (royaltyAmount * 4) / 10}("");
        (bool treasurySuccess, ) = payable(treasuryWallet).call{value: (royaltyAmount * 6) / 10}("");

        // Check if royalty transfers were successful
        require(liquiditySuccess, "Liquidity wallet transfer failed");
        require(treasurySuccess, "Treasury wallet transfer failed");
    }


    // Get NFTs by owner with pagination  
    function getNFTsByOwner(address _owner, uint256 _start, uint256 _limit) external view returns (uint256[] memory, uint256) {  
        uint256 ownedTokenCount = balanceOf(_owner);  
        uint256 end = (_start + _limit > ownedTokenCount) ? ownedTokenCount : _start + _limit;  
        uint256[] memory result = new uint256[](end - _start);  
  
        for (uint256 i = _start; i < end; i++) {  
            result[i - _start] = tokenOfOwnerByIndex(_owner, i);  
        }  
  
        return (result, ownedTokenCount);  
    }  
  
    // Get all NFTs with pagination  
    function getAllNFTs(uint256 _start, uint256 _limit) external view returns (uint256[] memory, uint256) {  
        uint256 totalTokenCount = totalSupply();  
        uint256 end =  (_start + _limit > totalTokenCount) ? totalTokenCount : _start + _limit;  
        uint256[] memory result = new uint256[](end - _start);  
  
        for (uint256 i = _start; i < end; i++) {  
            result[i - _start] = tokenByIndex(i);  
        }  
  
        return (result, totalTokenCount);  
    }  

    // Update royalty percentage
    function setRoyaltyPercentage(uint256 _newRoyaltyPercentage) external onlyOwner {
        royaltyPercentage = _newRoyaltyPercentage;
    }
}