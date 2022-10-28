import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import Main from './main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

<<<<<<< HEAD
  async loadBlockchainData(){
    const web3=window.web3
    const accounts=await web3.eth.getAccounts()
    this.setState({accounts:accounts[0]})
    const networkId= await web3.eth.net.getId()
    console.log(networkId)

    //creat a js version smart contract, need abi, address
    
  // Load DaiToken
=======
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
<<<<<<< HEAD
      let balance=await daiToken.methods.balanceOf(this.state.account).call()
      console.log("balance: "+balance)
      this.setState({ daiTokenBalance: balance.toString() })
      
=======
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

<<<<<<< HEAD
    //load DApp token
    const dappTokenData = DappToken.networks[networkId]
    if(daiTokenData){
      const dappToken=new web3.eth.Contract(DappToken.abi,dappTokenData.address)
      this.setState({dappToken})
      let dappTokenBalance =await dappToken.methods.balanceOf(this.state.account).call()
      this.setState({dappTokenBalance:dappTokenBalance.toString()})
      console.log('dappTokenBalance'+dappTokenBalance)
      console.log('dappTokenBalance.toString()'+dappTokenBalance.toString())
    }
    else{
      window.alert('DaiToken contract not deployed to detected network')
    }

       //load Token Farm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData){
      const tokenFarm=new web3.eth.Contract(TokenFarm.abi,tokenFarmData.address)
      this.setState({tokenFarm})
      let stakingBalance =await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({stakingBalance:stakingBalance.toString()})
      console.log('stakingBalance'+stakingBalance)
      console.log('stakingBalance.toString()'+stakingBalance.toString())
    }
    else{
      window.alert('TokenFarm contract not deployed to detected network')
    }
    this.setState({loading:false})
  }

  
=======
    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    } else {
      window.alert('DappToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
<<<<<<< HEAD
      console.log("window.ethereum.enable")
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      console.log("window.web3.currentProvider enable")
=======
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
<<<<<<< HEAD
  
  stakeTokens =(amount) => {
    this.setState({ loading: true })
     var approvement=this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount)
     if (approvement){
       approvement.send({ from: this.state.account }).on('transactionHash', async (hash) => {
         await this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
         this.setState({ loading: false })
      })
    })
     }
    console.log(amount)
    console.log("daiTokenBalance："+this.state.daiTokenBalance)
    console.log("stakingBalance："+this.state.stakingBalance)
  
=======

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
<<<<<<< HEAD
    console.log("unstakeTokens succeed!")
  }


  constructor(props) {
    super(props)
    this.state = {
      account: "0x9E1cA5Ec630E21B5a8140E867ea4A9c81cdD548C",
      daiToken:{},
      dappToken:{},
      tokenFarm:{},
      daiTokenBalance:'0',
      dappTokenBalance:'0',
      stakingBalance:'0',
      loading:true
=======
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
    }
  }

  render() {
    let content
<<<<<<< HEAD
    if(this.state.loading){
      content = <p id='loader' className='text-center'>Loading...</p>
      
    }
    else{
      content=<Main 
      daiTokenBalance={this.state.daiTokenBalance}
      dappTokenBalance={this.state.dappTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      />
    }
=======
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        daiTokenBalance={this.state.daiTokenBalance}
        dappTokenBalance={this.state.dappTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

<<<<<<< HEAD
                  {content}
=======
                {content}
>>>>>>> 7d86e7f1c4f737ad39dd97b4c01915f8603b5588

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
