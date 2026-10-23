import React, { useEffect, useState } from 'react'

import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import './BannerProduct.css'

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5
  ]

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length)
  }

  const preveImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % desktopImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [desktopImages.length])

  return (
    <section className="banner-product-section">
      <div className="banner-product-slider">

        {/* Navigation arrows */}
        <div className="banner-product-navigation">
          <button
            type="button"
            onClick={preveImage}
            className="banner-product-arrow"
            aria-label="Previous banner"
          >
            <FaAngleLeft />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="banner-product-arrow"
            aria-label="Next banner"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* Desktop and tablet banners */}
        <div className="banner-product-track banner-product-desktop">
          {desktopImages.map((imageURL, index) => (
            <div
              className="banner-product-slide"
              key={imageURL}
              style={{
                transform: `translateX(-${currentImage * 100}%)`
              }}
            >
              <img
                src={imageURL}
                alt={`GTSOU promotional banner ${index + 1}`}
                className="banner-product-image"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </div>
          ))}
        </div>

        {/* Mobile banners */}
        <div className="banner-product-track banner-product-mobile">
          {mobileImages.map((imageURL, index) => (
            <div
              className="banner-product-slide"
              key={imageURL}
              style={{
                transform: `translateX(-${currentImage * 100}%)`
              }}
            >
              <img
                src={imageURL}
                alt={`GTSOU mobile promotional banner ${index + 1}`}
                className="banner-product-image"
              />
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="banner-product-dots">
          {desktopImages.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`banner-product-dot ${
                currentImage === index ? 'active' : ''
              }`}
              aria-label={`Go to banner ${index + 1}`}
              aria-current={currentImage === index ? 'true' : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default BannerProduct