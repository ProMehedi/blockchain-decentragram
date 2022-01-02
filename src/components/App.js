import React from 'react'
import Web3 from 'web3'
import Identicon from 'identicon.js'
import './App.css'
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [account, setAccount] = React.useState('')
  const [decentragram, setDecentragram] = React.useState(null)
  const [imageCount, setImageCount] = React.useState(0)

  React.useEffect(() => {
    loadWeb3()
    loadBlockChain()
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  }

  const loadBlockChain = async () => {
    setLoading(true)
    const accounts = await window.web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await window.web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if (networkData) {
      const contractData = new window.web3.eth.Contract(
        Decentragram.abi,
        networkData.address
      )
      setDecentragram(contractData)
      setImageCount(await contractData.methods.getImageCount().call())
      setLoading(false)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id='loader' className='text-center mt-5'>
          <p>Loading...</p>
        </div>
      ) : (
        <Main
        // Code...
        />
      )}
    </div>
  )
}

export default App
