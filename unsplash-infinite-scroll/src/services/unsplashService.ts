// src/services/unsplashService.ts
import { createApi } from 'unsplash-js';

// Create Unsplash instance
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
});

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
    portfolio_url?: string;
  };
}

export const fetchImages = async (page: number, perPage: number = 10): Promise<UnsplashImage[]> => {
  try {
    const response = await unsplash.photos.list({
      page,
      perPage,
    });

    if (response.type === 'success') {
      return response.response.results as UnsplashImage[];
    }
    
    throw new Error('Failed to fetch images');
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};