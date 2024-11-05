import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllHeroes = async () => {
  try {
    const response = await axios.get(`${API_URL}/superheroes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching superheroes:", error);
    throw error;
  }
}

export const createHero = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create-hero`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating hero:", error);
    throw error;
  };
};

export const getHeroById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/superhero/${id}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export const updateHeroById = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:5000/superheroes/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error updating superhero");
  }
};
 
export const deleteHeroById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/superheroes/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Superhero not found");
    }
    throw new Error("Error deleting superhero");
  }
};