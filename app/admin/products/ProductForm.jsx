'use client';
import Image from 'next/image';
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

const ProductForm = ({ onSubmit, defaultValues = {}, categories = [] }) => {

  const { register, handleSubmit,setValue,reset} = useForm({ defaultValues });
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl || "");


  useEffect(() => {
    if(imageUrl){
    setValue("imageUrl", imageUrl);
    }
  }, [imageUrl, setValue]);


  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name || "");
      setValue("price", defaultValues.price || "");
      setValue("description", defaultValues.description || "");
      setValue("categoryId", defaultValues.categoryId || "");
      setImageUrl(defaultValues.imageUrl || "");
    }
  }, [defaultValues, setValue]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Product Name</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="input-field"
           placeholder="Enter product name"
        />
      </div>
      
      <div>
        <label htmlFor="price" className="block">Price</label>
        <input 
          {...register("price")}
          type="number"
          id="price"
          className="input-field"
           placeholder="Enter product price"
        />
      </div>

      <div>
  <label htmlFor="description" className="block">Description</label>
  <textarea
    {...register("description")}
    id="description"
    className="input-field"
    placeholder="Enter product description"
  />
</div>
      
      <div>
        <label htmlFor="categoryId" className="block">Category</label>
        <select {...register("categoryId")} id="categoryId" className="input-field">
          {/* Map over categories here */}
          <option value="">Select Category</option>
          {categories.map((Category) => (
            <option key={Category.id} value={Category.id}>
              {Category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
               const url = res?.[0]?.url;
                if (url) {
                setImageUrl(url);          
                setValue("imageUrl", url);  // ✅ Update form field
                  }
              }}
          onUploadError={(err) => alert(`Upload error: ${err.message}`)}
        />
        {imageUrl && (
          <Image src={imageUrl} alt="Uploaded Product Image" width={400} height={300} />

        )}
      </div>
      
      <input type="hidden" {...register("imageUrl")} />
      
      <button type="submit" className="btn-primary">Save Product</button>
    </form>
  );
};

export default ProductForm;
