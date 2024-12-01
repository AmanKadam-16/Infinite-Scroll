// src/App.tsx
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchImages, UnsplashImage } from './services/unsplashService';

const App: React.FC = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreImages = async () => {
    try {
      const newImages = await fetchImages(page);
      
      if (newImages.length === 0) {
        setHasMore(false);
        return;
      }

      setImages(prevImages => [...prevImages, ...newImages]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading more images:', error);
      setHasMore(false);
    }
  };

  // Initial image load
  useEffect(() => {
    loadMoreImages();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6 bg-white shadow-md">
        Unsplash Infinite Scroll
      </h1>
      
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4">
            <p className="text-xl text-gray-600">Loading more images...</p>
          </div>
        }
        endMessage={
          <p className="text-center py-4 text-gray-600">
            No more images to load
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src={image.urls.regular} 
                alt={image.alt_description || 'Unsplash Image'}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-800 font-semibold">
                  {image.user.name}
                </p>
                {image.user.portfolio_url && (
                  <a 
                    href={image.user.portfolio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;