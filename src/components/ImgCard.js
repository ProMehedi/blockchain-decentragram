import React from 'react'
import Identicon from 'identicon.js'

const ImgCard = ({ image, tipImageOwner }) => {
  return (
    <div className='card mb-4'>
      <div className='card-header'>
        <img
          className='mr-2'
          width='30'
          height='30'
          alt='avatar'
          src={`data:image/png;base64,${new Identicon(
            image.author,
            30
          ).toString()}`}
        />
        <small className='text-muted'>{image.author}</small>
      </div>
      <ul id='imageList' className='list-group list-group-flush'>
        <li className='list-group-item'>
          <p className='text-center'>
            <img
              src={`https://ipfs.infura.io/ipfs/${image.hash}`}
              alt={image.description}
              className='img-fluid'
            />
          </p>
          <p>{image.description}</p>
        </li>
        <li className='list-group-item py-2'>
          <small className='float-left mt-1 text-muted'>
            TIPS:{' '}
            {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
          </small>
          <button
            className='btn btn-link btn-sm float-right pt-0'
            name={image.id}
            onClick={(event) => {
              let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
              console.log(event.target.name, tipAmount)
              tipImageOwner(event.target.name, tipAmount)
            }}
          >
            TIP 0.1 ETH
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ImgCard
