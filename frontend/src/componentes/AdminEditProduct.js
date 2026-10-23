import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import './AdminEditProduct.css';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
  }) => {

  const [data,setData] = useState({
    ...productData,
    productName : productData?.productName,
    brandName : productData?.brandName,
    category : productData?.category,
    productImage : productData?.productImage || [],
    description : productData?.description,
    price : productData?.price,
    sellingPrice : productData?.sellingPrice
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")
  const [uploadingImage,setUploadingImage] = useState(false)


  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  const handleUploadProduct = async(e) => {
    const file = e.target.files?.[0]
    e.target.value = ''

    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.')
      return
    }

    setUploadingImage(true)
    try {
      const uploadedImage = await uploadImage(file)
      if (!uploadedImage?.url) {
        toast.error('Image upload failed. Please try again.')
        return
      }

      setData((preve)=>({
        ...preve,
        productImage : [ ...preve.productImage, uploadedImage.url]
      }))
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Unable to upload image.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const response = await fetch(SummaryApi.updateProduct.url,{
      method : SummaryApi.updateProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchdata()
    }


    if(responseData.error){
      toast.error(responseData?.message)
    }
  

  }

  return createPortal((
    <div className='admin-edit-overlay'>
    <div className='admin-edit-modal' role='dialog' aria-modal='true' aria-labelledby='admin-edit-title'>

       <div className='admin-edit-header'>
         <div>
           <h2 id='admin-edit-title'>Edit Product</h2>
           <p>Update product details and images.</p>
         </div>
         <button type='button' className='admin-edit-close' onClick={onClose} aria-label='Close edit product'>
           <CgClose/>
         </button>
         </div>

       <form className='admin-edit-form' onSubmit={handleSubmit}>
         <label htmlFor='productName'>Product Name :</label>
         <input 
           type='text' 
           id='productName' 
           placeholder='enter product name' 
           name='productName'
           value={data.productName} 
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />


         <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
         <input 
           type='text' 
           id='brandName' 
           placeholder='enter brand name' 
           value={data.brandName} 
           name='brandName'
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />

           <label htmlFor='category' className='mt-3'>Category :</label>
           <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
               <option value={""}>Select Category</option>
               {
                 productCategory.map((el,index)=>{
                   return(
                     <option value={el.value} key={el.value+index}>{el.label}</option>
                   )
                 })
               }
           </select>

           <label htmlFor='productImage' className='mt-3'>Product Image :</label>
           <label htmlFor='uploadImageInput'>
           <div className='admin-edit-upload'>
                     <div className='admin-edit-upload-content'>
                       <span className='admin-edit-upload-icon'><FaCloudUploadAlt/></span>
                       <strong>{uploadingImage ? 'Uploading image...' : 'Upload Product Image'}</strong>
                       <span>Choose an image from your device</span>
                       <input type='file' id='uploadImageInput' accept='image/*' className='hidden' onChange={handleUploadProduct} disabled={uploadingImage}/>
                     </div>
           </div>
           </label> 
           <div>
               {
                 data?.productImage[0] ? (
                     <div className='admin-edit-image-gallery'>
                         {
                           data.productImage.map((el,index)=>{
                             return(
                               <div className='admin-edit-image-item' key={`${el}-${index}`}>
                                   <img 
                                     src={el} 
                                     alt={`${data.productName || 'Product'} preview ${index + 1}`} 
                                     onClick={()=>{
                                       setOpenFullScreenImage(true)
                                       setFullScreenImage(el)
                                     }}/>

                                     <button type='button' className='admin-edit-image-delete' aria-label={`Delete image ${index + 1}`} onClick={()=>handleDeleteProductImage(index)}>
                                       <MdDelete/>  
                                     </button>
                               </div>
                               
                             )
                           })
                         }
                     </div>
                 ) : (
                   <p className='admin-edit-image-warning'>Please upload at least one product image.</p>
                 )
               }
               
           </div>

           <label htmlFor='price' className='mt-3'>Price :</label>
           <input 
             type='number' 
             id='price' 
             placeholder='enter price' 
             value={data.price} 
             name='price'
             onChange={handleOnChange}
             className='p-2 bg-slate-100 border rounded'
             required
           />


           <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
           <input 
             type='number' 
             id='sellingPrice' 
             placeholder='enter selling price' 
             value={data.sellingPrice} 
             name='sellingPrice'
             onChange={handleOnChange}
             className='p-2 bg-slate-100 border rounded'
             required
           />

           <label htmlFor='description' className='mt-3'>Description :</label>
           <textarea 
             className='h-28 bg-slate-100 border resize-none p-1' 
             placeholder='enter product description' 
             rows={3} 
             onChange={handleOnChange} 
             name='description'
             value={data.description}
           >
           </textarea>





           <button className='admin-edit-submit' disabled={uploadingImage}>{uploadingImage ? 'Uploading image...' : 'Update Product'}</button>
       </form> 



   
    </div>



    {/***display image full screen */}
    {
     openFullScreenImage && (
       <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
     )
    }
     

 </div>
  ), document.body)
}

export default AdminEditProduct