import React from 'react'
import Web3 from 'web3'
import ipfsClient from 'ipfs-http-client'
import './App.css'
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
import { ScaleLoader } from 'react-spinners'

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [account, setAccount] = React.useState('')
  const [decentragram, setDecentragram] = React.useState(null)
  const [imageCount, setImageCount] = React.useState(0)
  const [image, setImage] = React.useState('')
  const [images, setImages] = React.useState([])
  const [desc, setDesc] = React.useState('')

  React.useEffect(() => {
    loadWeb3()
    loadBlockChain()
  }, [])

  React.useEffect(() => {
    getImages()
  }, [imageCount, decentragram])

  const captureFile = (event) => {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setImage(Buffer(reader.result))
    }
  }

  const uploadImage = (event) => {
    event.preventDefault()
    setUploading(true)

    try {
      // Adding image to IPFS
      ipfs.add(image, (error, result) => {
        if (error) {
          console.error(error)
          return
        }

        decentragram.methods
          .uploadImage(result[0].hash, desc)
          .send({ from: account })
          .on('transactionHash', (hash) => {
            console.log('transaction hash:', hash)
            setUploading(false)
          })
      })
    } catch (error) {
      console.error(error.message)
      setUploading(false)
    }
  }

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

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if (networkData) {
      const contractData = new web3.eth.Contract(
        Decentragram.abi,
        networkData.address
      )
      setDecentragram(contractData)

      const _imageCount = await contractData.methods.imageCount().call()
      setImageCount(Number(_imageCount.toString()))

      setLoading(false)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  const getImages = async () => {
    const _images = []
    for (let i = 1; i <= imageCount; i++) {
      const _image = await decentragram.methods.images(i).call()
      _images.push(_image)
    }

    // Show highest tipped image first
    const sortedImages = _images.sort((a, b) => b.tipAmount - a.tipAmount)
    setImages(sortedImages)
  }

  const tipImageOwner = async (id, amount) => {
    setLoading(true)

    try {
      decentragram.methods
        .tipImageOwner(id)
        .send({ from: account, value: amount })
        .on('transactionHash', (hash) => {
          console.log('transaction hash:', hash)
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id='loader'>
          <ScaleLoader color='#0669ad' />
        </div>
      ) : (
        <Main
          captureFile={captureFile}
          uploadImage={uploadImage}
          desc={desc}
          setDesc={setDesc}
          images={images}
          loading={uploading}
          tipImageOwner={tipImageOwner}
        />
      )}
    </div>
  )
}

export default App
