const API_BASE = "https://dog.ceo/api";

export async function fetchBreeds() {
  const res = await fetch(`${API_BASE}/breeds/list/all`);
  const data = await res.json();
  const breedsWithSubBreeds = [];

  Object.entries(data.message).forEach(([breed, subBreeds]) => {
    if (subBreeds.length > 0) {
      subBreeds.forEach((subBreed) => {
        breedsWithSubBreeds.push(`${subBreed} ${breed}`);
      });
    } else {
      breedsWithSubBreeds.push(breed);
    }
  });

  return breedsWithSubBreeds;
}

export async function fetchBreedImages(breed) {
  const breedPath = breed.includes(" ")
    ? breed.split(" ").reverse().join("/")
    : breed;
  const res = await fetch(`${API_BASE}/breed/${breedPath}/images`);
  const data = await res.json();
  return data.message;
}

export async function fetchRandomImages() {
  const res = await fetch(`${API_BASE}/breeds/image/random/6`);
  const data = await res.json();
  return data.message;
}