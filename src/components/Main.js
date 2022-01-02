import React from 'react'
import Identicon from 'identicon.js'

const Main = ({ captureFile }) => {
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

            <form>
              <div className='form-group'>
                <label for='image'>Choose an image:</label>
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
                <label for='desc'>Choose Description:</label>
                <input
                  type='text'
                  id='desc'
                  className='form-control'
                  placeholder='Your description'
                  required
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

            {/* Code ... */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Main
