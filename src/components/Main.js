import React from 'react'
import ImgCard from './ImgCard'
import { ScaleLoader } from 'react-spinners'

const Main = ({ captureFile, uploadImage, desc, setDesc, images, loading }) => {
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
                disabled={loading}
                className='btn btn-primary btn-block btn-lg'
              >
                {loading ? (
                  <>
                    <span className='mr-2'>Uploading!</span>
                    <ScaleLoader color='#fff' height={15} width={2} />
                  </>
                ) : (
                  'Upload!'
                )}
              </button>
            </form>

            <p>&nbsp;</p>

            {images &&
              images.map((image, index) => (
                <ImgCard key={index} image={image} />
              ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Main
