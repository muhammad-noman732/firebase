import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../store/features/recipeSlice';
import { useNavigate } from 'react-router-dom';

const Create = () => {
 
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef(); // for reseting image after successful upload
  const dispatch = useDispatch();
  const navigate = useNavigate()

//   validation schema 
  const validationSchema = Yup.object({
    name: Yup.string().required('Recipe name is required'),
    ingredients: Yup.string().required('Ingredients are required'),
    instruction: Yup.string().required('Instructions are required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string().url('Image URL is required').required('Image is required'),
  });

//    to upload image on cloudinary 
  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    const res = await fetch('https://api.cloudinary.com/v1_1/dfgz4koce/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const url = data.secure_url;
    setImageUrl(url);
    //  set value of image url of image 
    formik.setFieldValue('image', url);
  };

//    formik for state management and erros handling

  const formik = useFormik({
    initialValues: {
      name: '',
      ingredients: '',
      instruction: '',
      category: '',
      image: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const recipeData = {
        ...values,
        ingredients: values.ingredients.split('\n').map(i => i.trim()).filter(Boolean),
        instruction: values.instruction.split('\n').map(i => i.trim()).filter(Boolean),
      };
      const result =  dispatch(createRecipe(recipeData));
             navigate('/')
      if (createRecipe.fulfilled.match(result)) {
        resetForm();
        
        if(inputRef){
            inputRef.current.value = "";
        }
      }
    },
  });

  return (
    
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Recipe</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Recipe Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium mb-1">Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            rows="3"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.ingredients}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ingredients && formik.errors.ingredients && (
            <p className="text-red-500 text-sm">{formik.errors.ingredients}</p>
          )}
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-medium mb-1">Instructions (one per line)</label>
          <textarea
            name="instruction"
            rows="3"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.instruction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.instruction && formik.errors.instruction && (
            <p className="text-red-500 text-sm">{formik.errors.instruction}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 p-2 rounded"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
            <option value="snack">Snack</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name ="image"
            accept="image/*"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={imageHandler}
            onBlur={formik.handleBlur}
            ref ={inputRef}
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default Create;
