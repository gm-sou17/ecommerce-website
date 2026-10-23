import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md"
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import './AdminProductCard.css'

const AdminProductCard = ({
  data,
  fetchdata
}) => {
  const [editProduct, setEditProduct] = useState(false)

  return (
    <>
      <div className="admin-product-card">

        {/* Product Image */}
        <div className="admin-product-image-box">
          <img
            src={data?.productImage?.[0]}
            alt={data?.productName || 'Product'}
            className="admin-product-image"
            loading="lazy"
          />

          <span className="admin-product-badge">
            Product
          </span>
        </div>

        {/* Product Details */}
        <div className="admin-product-details">

          <h2
            className="admin-product-name"
            title={data?.productName}
          >
            {data?.productName}
          </h2>

          <div className="admin-product-bottom">

            <div className="admin-product-price-box">
              <span className="admin-product-price-label">
                Selling Price
              </span>

              <p className="admin-product-price">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
            </div>

            <button
              type="button"
              className="admin-product-edit-btn"
              onClick={() => setEditProduct(true)}
              aria-label={`Edit ${data?.productName || 'product'}`}
              title="Edit Product"
            >
              <MdModeEditOutline />
            </button>

          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </>
  )
}

export default AdminProductCard