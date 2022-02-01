# MinduMoralis
Mindu Descentralized Distance Learning Platform - Moralis Avax Hackathon

## Brief description of the project:
This project consists in a full platform for Content Creators and Info Product Sellers, mainly Courses Teachers and Schools, to sell and manage their content in a custom environment (white label).

## This repo considerations:
It relies on two directories one for Smart Contracts and the oher for UI and Moralis integration.
Both Smart Contracts are deployed on AVAX FUJI Testnet and are available only for trial. So "private data" could be found without any sensitivy impact for the purpose of the hackathon.

## Technycal considerations:
### On-Chain dev
Mindu Coin Token - simple ERC 777 implementation only to allow the experience through the platform as buyer/student. With some MINDUs is possible to buy courses.
MindUniversity - ERC1155 implemantation which manages the NFTs (Course Ownership, Student Registration and Certificate) issues.

Framework and libs:  HardHat and Openzeppelin
Net: AVAX FUJI TESTNET

### Off-Chain dev
UI - built in Quasar/Vuejs for desktop only
Server-side: Moralis DB and Cloud Functions
File Storage: IPFS - moralis node.

## Main further implementations (next issues)
- Smart Contracts (forbid transfer of registration and certificates, NFT COURSE shared ownwership (for partners and course investors).
- Walletconnect implementation
- Mindu Coin Tokenomics implementation
- UI (mobile view, customization for white label)
- IPFS (FILECOIN implemantation)


