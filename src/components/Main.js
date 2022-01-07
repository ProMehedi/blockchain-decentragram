import React from 'react'
import Identicon from 'identicon.js'

const Main = ({ captureFile, uploadImage, desc, setDesc, images }) => {
  return (
    <div className='container-fluid mt-5'>
      <div className='row'>
        <main
          role='main'
          className='col-lg-12 ml-auto mr-auto'
          style={{ maxWidth: '500px' }}
        >
          <div className='content mr-auto ml-auto'>
            <p>&nbsp;</p>
            <h1 className='mb-4'>Share Image!</h1>

            <form onSubmit={uploadImage}>
              <div className='form-group'>
                <label htmlFor='image'>Choose an image:</label>
                <input
                  type='file'
                  accept='.jpg, .png, .bmp, .gif'
                  id='image'
                  className='form-control-file'
                  required
                  onChange={captureFile}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='desc'>Choose Description:</label>
                <input
                  type='text'
                  id='desc'
                  className='form-control'
                  placeholder='Your description'
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-block btn-lg'
              >
                Upload!
              </button>
            </form>

            <p>&nbsp;</p>

            {images &&
              images.map((image, index) => (
                <div className='card mb-4' key={index}>
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
                      <p class='text-center'>
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
                        {window.web3.utils.fromWei(
                          image.tipAmount.toString(),
                          'Ether'
                        )}{' '}
                        ETH
                      </small>
                      <button
                        className='btn btn-link btn-sm float-right pt-0'
                        name={image.id}
                        onClick={(event) => {
                          let tipAmount = window.web3.utils.toWei(
                            '0.1',
                            'Ether'
                          )
                          console.log(event.target.name, tipAmount)
                          this.props.tipImageOwner(event.target.name, tipAmount)
                        }}
                      >
                        TIP 0.1 ETH
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Main
