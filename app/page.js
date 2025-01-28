"use client";

import { useEffect, useState } from "react";
import { fetchBreeds, fetchBreedImages } from "./lib/dogApi";

export default function Home() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadBreeds() {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    }
    loadBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      async function loadImages() {
        const breedImages = await fetchBreedImages(selectedBreed);
        setImages(breedImages);
      }
      loadImages();
    }
  }, [selectedBreed]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Dog Breed Viewer</h1>
      <div className="mb-4">
        <label htmlFor="breed-select" className="block text-sm font-medium mb-2 text-white-800">
          Vælg en hunderace:
        </label>
        <select
          id="breed-select"
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 bg-white"
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="">-- Vælg en race --</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed} className="text-gray-800">
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${selectedBreed}`} className="rounded-lg shadow-lg" />
        ))}
      </div>

      {images.length > 0 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
        >
          Til top
        </button>
      )}
    </div>
  );
}