const TokenFarm = artifacts.require("TokenFarm");
const DaiToken=artifacts.require("DaiToken");
const DappToken=artifacts.require("DappToken")

module.exports =async function(deployer,network,accounts) {
    await deployer.deploy(DaiToken)
    const daiToken=await DaiToken.deployed()

    await deployer.deploy(DappToken)
    const dappToken=await DappToken.deployed()

    await deployer.deploy(TokenFarm,dappToken.address,daiToken.address)
    const tokenFarm=await TokenFarm.deployed()
    //transfer all tokens to the farm (1 million)
    await dappToken.transfer(tokenFarm.address,'1000000000000000000000000')
    //transfer 100 Mock DAI to investor
    await daiToken.transfer(accounts[1], '100000000000000000000')
    
};
