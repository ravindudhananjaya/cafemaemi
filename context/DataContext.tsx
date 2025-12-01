import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { MenuItem, Review, GalleryItem } from '../types';
import { db, storage } from '../src/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

interface DataContextType {
  menuItems: MenuItem[];
  reviews: Review[];
  galleryItems: GalleryItem[];

  // Admin Actions
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;

  updateMenuItem: (item: MenuItem) => Promise<void>;
  addMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;

  updateReview: (review: Review) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  addGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  uploadImage: (base64: string, path: string) => Promise<string>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on load
  useEffect(() => {
    const session = sessionStorage.getItem('cafemaemi_auth');
    if (session === 'true') setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  // Real-time Listeners
  useEffect(() => {
    const unsubMenu = onSnapshot(collection(db, 'menu'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as MenuItem));
      setMenuItems(items);
    });

    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Review));
      setReviews(items);
    });

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as GalleryItem));
      setGalleryItems(items);
    });

    return () => {
      unsubMenu();
      unsubReviews();
      unsubGallery();
    };
  }, []);

  // Actions
  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('cafemaemi_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cafemaemi_auth');
  };

  const uploadImage = async (base64: string, path: string): Promise<string> => {
    // We are now storing Base64 directly in Firestore to avoid CORS issues.
    // The 'path' argument is ignored but kept for interface compatibility.
    return base64;
  };

  const updateMenuItem = async (updatedItem: MenuItem) => {
    if (updatedItem.image && updatedItem.image.startsWith('data:image')) {
      updatedItem.image = await uploadImage(updatedItem.image, `menu/${Date.now()}_${updatedItem.nameEn}`);
    }
    const { id, ...data } = updatedItem;
    await updateDoc(doc(db, 'menu', id), data as any);
  };

  const addMenuItem = async (newItem: MenuItem) => {
    // Upload image if needed
    if (newItem.image && newItem.image.startsWith('data:image')) {
      newItem.image = await uploadImage(newItem.image, `menu/${Date.now()}_${newItem.nameEn}`);
    }
    const { id, ...data } = newItem; // Let Firestore generate ID or use provided
    await addDoc(collection(db, 'menu'), data);
  };

  const deleteMenuItem = async (id: string) => {
    await deleteDoc(doc(db, 'menu', id));
  };

  const updateReview = async (updatedReview: Review) => {
    if (updatedReview.avatar && updatedReview.avatar.startsWith('data:image')) {
      updatedReview.avatar = await uploadImage(updatedReview.avatar, `avatars/${Date.now()}_${updatedReview.author}`);
    }
    const { id, ...data } = updatedReview;
    await updateDoc(doc(db, 'reviews', id), data as any);
  };

  const addReview = async (newReview: Review) => {
    if (newReview.avatar && newReview.avatar.startsWith('data:image')) {
      newReview.avatar = await uploadImage(newReview.avatar, `avatars/${Date.now()}_${newReview.author}`);
    }
    const { id, ...data } = newReview;
    await addDoc(collection(db, 'reviews'), data);
  };

  const deleteReview = async (id: string) => {
    await deleteDoc(doc(db, 'reviews', id));
  };

  const addGalleryItem = async (item: GalleryItem) => {
    if (item.src.startsWith('data:image')) {
      item.src = await uploadImage(item.src, `gallery/${Date.now()}`);
    }
    const { id, ...data } = item;
    await addDoc(collection(db, 'gallery'), data);
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
  };

  return (
    <DataContext.Provider value={{
      menuItems,
      reviews,
      galleryItems,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateMenuItem,
      addMenuItem,
      deleteMenuItem,
      updateReview,
      addReview,
      deleteReview,
      addGalleryItem,
      deleteGalleryItem,
      uploadImage
    }}>
      {children}
    </DataContext.Provider>
  );
};