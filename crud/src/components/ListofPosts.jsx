import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePosts, fetchPosts, setUpdatePostId, updatePosts } from '../store/features/postSlice';

const ListofPosts = () => {

  const { posts, loading, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

//    delete post
  const postDelteHandler = (postId)=>{
       dispatch(deletePosts(postId))
  }

//   update post
  const postUpdatehandler = (postId)=>{
       dispatch(setUpdatePostId(postId))
}

  if (loading) {
    return <p className="text-center text-blue-500 text-lg">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-gray-500 text-lg">No posts available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 flex-grow">{post.description}</p>
            <div className="mt-4 flex justify-between">
              <button
              onClick={()=>{postDelteHandler(post.id)}}
               className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                Delete
              </button>

              <button 
              onClick={()=>{postUpdatehandler(post.id)}}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListofPosts;
