const API_BASE = "https://dog.ceo/api";

export async function fetchBreeds() {
  const res = await fetch(`${API_BASE}/breeds/list/all`);
  const data = await res.json();
  return Object.keys(data.message); // Returner kun listen af racer
}

export async function fetchBreedImages(breed) {
  const res = await fetch(`${API_BASE}/breed/${breed}/images`);
  const data = await res.json();
  return data.message; // Returner listen af billeder
}
