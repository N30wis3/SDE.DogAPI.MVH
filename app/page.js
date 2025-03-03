"use client";

import { useEffect, useState } from "react";
import { fetchBreeds, fetchBreedImages, fetchRandomImages } from "./lib/dogApi";


export default function Home() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("random");
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadBreeds() {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    }
    loadBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed === "random") {
      async function loadRandomImages() {
        const randomImages = await fetchRandomImages();
        setImages(randomImages);
      }
      loadRandomImages();
    } else if (selectedBreed) {
      async function loadImages() {
        const breedImages = await fetchBreedImages(selectedBreed);
        setImages(breedImages);
      }
      loadImages();
    }
  }, [selectedBreed]);

  const fetchNewRandomImages = async () => {
    const randomImages = await fetchRandomImages();
    setImages(randomImages);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const extractBreedNameFromUrl = (url) => {
    const parts = url.split("/");
    const breedIndex = parts.indexOf("breeds") + 1;
    if (breedIndex && breedIndex < parts.length) {
      return parts[breedIndex].replace(/-/g, " ").split(" ")[0];
    }
    return "Unknown";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Dog Breed Viewer</h1>
      <div className="mb-4">
        <label htmlFor="breed-select" className="block text-sm font-medium mb-2 text-White-800">
          Vælg en hunderace:
        </label>
        <select
          id="breed-select"
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 bg-white"
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="random">Random</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed} className="text-gray-800">
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={image}
              alt={selectedBreed === "random" ? "Random Dog" : selectedBreed}
              className="rounded-lg shadow-lg max-w-full"
            />
            {selectedBreed === "random" && (
              <p className="mt-2 text-sm font-medium text-white-600">
                {extractBreedNameFromUrl(image)}
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedBreed === "random" && images.length > 0 && (
        <button
          onClick={fetchNewRandomImages}
          className="fixed bottom-16 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >
          New Random Dogs
        </button>
      )}

      {images.length > 0 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
        >
          To the top
        </button>
      )}
    </div>
  );
}
