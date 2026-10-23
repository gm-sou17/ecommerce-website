import React from 'react'
import { CgClose } from 'react-icons/cg'
import './DisplayImage.css'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
  <div className="display-image-overlay">
  <div className="display-image-modal">
    <button
      type="button"
      className="display-image-close"
      onClick={onClose}
      aria-label="Close image preview"
    >
      <CgClose />
    </button>

    <div className="display-image-content">
      <img
        src={imgUrl}
        alt="Product preview"
        className="display-image-photo"
      />
    </div>
  </div>
</div>
  )
}

export default DisplayImage
