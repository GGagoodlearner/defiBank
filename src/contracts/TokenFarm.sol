<<<<<<< HEAD
//SPDX-License-Identifier:MIT
pragma solidity >=0.5.0 <0.9.0;
import "./DaiToken.sol";
import "./DappToken.sol";


contract TokenFarm{
    string public name="Dapp Token Farm";
    address public owner;
    DaiToken public daiToken;
    DappToken public dappToken;
    address[]  public stakers;
    mapping(address=>uint) public  stakingBalance;
    mapping(address=>bool) public  isStaking;
    mapping(address=>bool) public  hasStaked;
    
    constructor(DappToken _dappToken, DaiToken _daiToken) public{
        dappToken=_dappToken;
        daiToken=_daiToken;
        owner= msg.sender;
    }
    // stakes token (deposite), where the invest put the dai, and earn reward
    function stakeTokens(uint256 _amount) public{
        require(_amount>0, "amount cannot be 0");

        //transfer Mock Dai Tokens to this contract for staking
        if (daiToken.transferFrom(msg.sender, address(this), _amount)){
            // update the stateBalance
        stakingBalance[msg.sender]=stakingBalance[msg.sender] + _amount;
           //add user to stakers if there is no such a one
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        // if the skater is already hasStaked, just update staking status
        isStaking[msg.sender]=true;
        hasStaked[msg.sender]=true;
        }
    }
    // unstaking tokens (withdraw)
    function unstakeTokens() public{
        //Fetch balance
        uint balance=stakingBalance[msg.sender];
        require(balance>0, "balance cannot be 0");
        //Transfer Mock Dai Tokens to sender
        daiToken.transfer(msg.sender,balance);
        //reset staking balance
        stakingBalance[msg.sender]=0;
        //update staking status
        isStaking[msg.sender]=false;
    }

    //issuing tokens (earn interest) call by the owner
    function issueTokens() public{
        //only the owner can call this function
        require(msg.sender==owner,"caller must be the owner");

        // Issue tokens to all stakers

        for(uint i=0; i<stakers.length;i++){
            address receipent=stakers[i];
            uint balance=stakingBalance[receipent];
            if (balance>0){
                dappToken.transfer(receipent,balance);

            }
        }
    }


}
=======
pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
