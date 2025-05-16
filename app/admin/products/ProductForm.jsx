'use client';
import Image from 'next/image';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

const ProductForm = ({ onSubmit, defaultValues = {}, categories = [] }) => {

  const { register, handleSubmit,setValue,watch, formState:{errors},} = useForm({ 
    defaultValues: {
      name: "",
      price: "",
      description: "",
      categoryId: "",
      imageUrl: "",
      ...defaultValues,}, });

  const imageUrl = watch("imageUrl")



  useEffect(() => {
    if (defaultValues &&
    Object.keys(defaultValues).length > 0) {
      setValue("name", defaultValues.name || "");
      setValue("price", defaultValues.price || "");
      setValue("description", defaultValues.description || "");
      setValue("categoryId", defaultValues.categoryId || "");
      setValue("imageUrl",defaultValues.imageUrl || "");
    }
  }, []);

  


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Product Name</label>
        <input
          {...register("name",{required:true})}
          type="text"
          id="name"
          className="input-field"
           placeholder="Enter product name"
        />
        {errors.name && <p className="text-red-500">Product name is required</p>}
      </div>
      
      <div>
        <label htmlFor="price" className="block">Price</label>
        <input 
          {...register("price", {required:true})}
          type="number"
          id="price"
          className="input-field"
           placeholder="Enter product price"
        />
         {errors.price && <p className="text-red-500">Price is required</p>}
      </div>

      <div>
  <label htmlFor="description" className="block">Description</label>
  <textarea
    {...register("description",{required:true})}
    id="description"
    className="input-field"
    placeholder="Enter product description"
  />
    {errors.description && <p className="text-red-500">Description is required</p>}
</div>
      
      <div>
        <label htmlFor="categoryId" className="block">Category</label>
        <select {...register("categoryId",{required:true})} id="categoryId" className="input-field">
          {/* Map over categories here */}
          <option value="">Select Category</option>
          {categories.map((Category) => (
            <option key={Category.id} value={Category.id}>
              {Category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-500">Category is required</p>}
      </div>
      
      <div>
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
               const url = res?.[0]?.url || res?.[0]?.fileUrl || res?.[0]?.ufsUrl;
                if (url) {         
                setValue("imageUrl", url);  // ✅ Update form field
                  }
              }}
          onUploadError={(err) => alert(`Upload error: ${err.message}`)}
        />
        {imageUrl && (
          <Image src={imageUrl} alt="Uploaded Product Image" width={400} height={300}  className="mt-2"/>
        )}
        <input type="hidden" {...register("imageUrl")} />
      </div>

      
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded mt-4">Save Product</button>
    </form>
  );
};

export default ProductForm;
