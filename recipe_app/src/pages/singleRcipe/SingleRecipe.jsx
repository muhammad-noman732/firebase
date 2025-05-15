import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRecipe } from '../../store/features/recipeSlice';
import { useParams, NavLink } from 'react-router-dom';

const SingleRecipe = () => {
  const [instruction, setInstruction] = useState(false);
  const [ingredients, setIngredients] = useState(true); // default to ingredients

  const { loading, error, singleRecipe } = useSelector(state => state.recipe);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleRecipe(id));
  }, [id, dispatch]);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <NavLink
        to="/"
        className="inline-block mb-6 text-blue-600 hover:underline text-lg"
      >
        ← Back to Home
      </NavLink>

      {singleRecipe && (
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-6">
          {/* Left Side: Image & Title */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {singleRecipe.name}
            </h2>
            <img
              src={singleRecipe.image}
              alt={singleRecipe.name}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-md text-gray-600">
              <span className="font-semibold">Category:</span> {singleRecipe.category}
            </p>
          </div>

          {/* Right Side: Buttons & Content */}
          <div>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => {
                  setIngredients(true);
                  setInstruction(false);
                }}
                className={`px-4 py-2 rounded-md border ${
                  ingredients
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => {
                  setInstruction(true);
                  setIngredients(false);
                }}
                className={`px-4 py-2 rounded-md border ${
                  instruction
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Instructions
              </button>
            </div>

            <div className="text-gray-800 space-y-2">
              {ingredients &&
                singleRecipe.ingredients?.map((item, index) => (
                  <p key={index}>• {item}</p>
                ))}
              {instruction &&
                singleRecipe.instruction?.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
