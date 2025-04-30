import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, setUpdatePostId, updatePosts } from '../store/features/postSlice';


const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fileRef = useRef();  // for refrence of image

  const{ error  ,   updatePostId  , posts} = useSelector(state => state.posts);

//   here find the post to update 

     const postToupdate = posts.find( post => post.id === updatePostId);
     console.log("posts: ", posts); 
     console.log("postToupdate: ", postToupdate); // Check if postToupdate is defined and has the expected structure

     useEffect(()=>{
            if(postToupdate){
                setImage(postToupdate.image);
                setTitle(postToupdate.title);
                setDescription(postToupdate.description);
            }
            else{
                setImage(null);
                setTitle("");
                setDescription("");
            }
     },[postToupdate])

    
//    submit the post first upload image to cloudinary and get the url and store the url in db 
  const postSubmitHandler = async (e) => {
       e.preventDefault();

       if (!image && !postToupdate.image) {
        alert('Please select an image');
        return;
      }
    
     setLoading(true);
 
    try {

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', image); 
      formData.append('upload_preset', 'my-uploads');

      const res = await fetch('https://api.cloudinary.com/v1_1/dfgz4koce/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log("data of image upload to cloudinary " , data);
      
      const imageUrl = data.secure_url; // get the URL from response

    //   store in db and then in state
      const postData = {
        title,
        description,
        image: imageUrl,
        timestamp : new Date().toISOString()
      };

      if(postToupdate){
         dispatch(updatePosts({postId : updatePostId , postData}));
         dispatch(setUpdatePostId(null)) // clear the post
      }
      else{
        dispatch(createPost(postData));
      }
   
      //  Reset form
        setTitle('');
        setDescription('');
    //   reset image 
       if(fileRef){
        fileRef.current.value = null
       }

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={postSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Create New Post</h2>

        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
            rows="4"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            // onChange={e=> imageHandler(e)}
            className="text-sm text-gray-600"
            ref={fileRef}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200 disabled:bg-gray-400"
          disabled={loading}
        >
          {updatePostId ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
