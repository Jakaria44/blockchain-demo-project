// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target; // ammount to send;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }


    mapping( uint256 => Campaign) public campaigns;
    // Campaign[] public campaignss;
    uint256 numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target, 
        uint256 _deadline,
        string memory _image
    ) public returns (uint256){
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "deadline must be in the future ");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns-1;
    }

    function donateToCampaign(uint _id) public payable {   // id of the campaign
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value : amount}("");
        if(sent){
            campaign.amountCollected += amount;

        }
    }

    function getDonators(uint _id) public view returns(address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations) ;
    }

    function getCampaigns() public view returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); // now it consists of number of campaign structs, {}, {}, like this.abi

        for(uint i = 0; i < numberOfCampaigns; i++){
            allCampaigns[i] = campaigns[i]; 
        }

        return allCampaigns;
    }

}