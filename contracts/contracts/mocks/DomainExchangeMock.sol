// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IDomainExchange.sol";
import "../interfaces/IVerifiedDomainRegistry.sol";

contract DomainExchangeMock is IDomainExchange {
    
    mapping(uint256 => bool) public listingActive;
    IVerifiedDomainRegistry public verifiedDomainRegistry;

    constructor(
        IVerifiedDomainRegistry _verifiedDomainRegistry
    ) {
        verifiedDomainRegistry = _verifiedDomainRegistry;
    }

    function createListing(bytes32 _domainId, uint256 _listingId) public {
        listingActive[_listingId] = true;
        verifiedDomainRegistry.setDomainListing(_domainId, _listingId);
    }

    function registryRemoveListing(uint256 _listingId) external override {
        listingActive[_listingId] = false;
    }
}
