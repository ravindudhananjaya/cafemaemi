import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { MenuItem, Review, GalleryItem, ContactMessage } from '../types';
import { db, storage } from '../src/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

interface DataContextType {
  menuItems: MenuItem[];
  reviews: Review[];
  galleryItems: GalleryItem[];
  messages: ContactMessage[];

  // Admin Actions
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;

  updateMenuItem: (item: MenuItem, imageFile?: File | null, onProgress?: (value: number) => void) => Promise<void>;
  addMenuItem: (item: MenuItem, imageFile?: File | null, onProgress?: (value: number) => void) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;

  updateReview: (review: Review, avatarFile?: File | null, onProgress?: (value: number) => void) => Promise<void>;
  addReview: (review: Review, avatarFile?: File | null, onProgress?: (value: number) => void) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  addGalleryItem: (item: GalleryItem, file?: File | null, onProgress?: (value: number) => void) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  uploadImage: (fileOrData: File | string, path: string, onProgress?: (value: number) => void) => Promise<string>;

  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt'>) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;
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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
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

    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(messagesQuery, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as ContactMessage & { createdAt?: Timestamp };
        return {
          ...data,
          id: docSnap.id,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null
        } as ContactMessage;
      });
      setMessages(items);
    });

    return () => {
      unsubMenu();
      unsubReviews();
      unsubGallery();
      unsubMessages();
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

  const uploadImage = async (fileOrData: File | string, path: string, onProgress?: (value: number) => void): Promise<string> => {
    const storageRef = ref(storage, path);
    try {
      if (typeof fileOrData === 'string') {
        await uploadString(storageRef, fileOrData, 'data_url');
        return await getDownloadURL(storageRef);
      }

      return await new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, fileOrData);
        uploadTask.on('state_changed', (snapshot) => {
          if (onProgress && snapshot.totalBytes) {
            onProgress(snapshot.bytesTransferred / snapshot.totalBytes);
          }
        }, reject, async () => {
          resolve(await getDownloadURL(uploadTask.snapshot.ref));
        });
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const updateMenuItem = async (updatedItem: MenuItem, imageFile?: File | null, onProgress?: (value: number) => void) => {
    if (imageFile) {
      updatedItem.image = await uploadImage(imageFile, `menu/${Date.now()}_${updatedItem.nameEn}`, onProgress);
    } else if (updatedItem.image && updatedItem.image.startsWith('data:image')) {
      updatedItem.image = await uploadImage(updatedItem.image, `menu/${Date.now()}_${updatedItem.nameEn}`, onProgress);
    }
    const { id, ...data } = updatedItem;
    await updateDoc(doc(db, 'menu', id), data as any);
  };

  const addMenuItem = async (newItem: MenuItem, imageFile?: File | null, onProgress?: (value: number) => void) => {
    if (imageFile) {
      newItem.image = await uploadImage(imageFile, `menu/${Date.now()}_${newItem.nameEn}`, onProgress);
    } else if (newItem.image && newItem.image.startsWith('data:image')) {
      newItem.image = await uploadImage(newItem.image, `menu/${Date.now()}_${newItem.nameEn}`, onProgress);
    }
    const { id, ...data } = newItem; // Let Firestore generate ID or use provided
    await addDoc(collection(db, 'menu'), data);
  };

  const deleteMenuItem = async (id: string) => {
    await deleteDoc(doc(db, 'menu', id));
  };

  const updateReview = async (updatedReview: Review, avatarFile?: File | null, onProgress?: (value: number) => void) => {
    if (avatarFile) {
      updatedReview.avatar = await uploadImage(avatarFile, `avatars/${Date.now()}_${updatedReview.author}`, onProgress);
    } else if (updatedReview.avatar && updatedReview.avatar.startsWith('data:image')) {
      updatedReview.avatar = await uploadImage(updatedReview.avatar, `avatars/${Date.now()}_${updatedReview.author}`, onProgress);
    }
    const { id, ...data } = updatedReview;
    await updateDoc(doc(db, 'reviews', id), data as any);
  };

  const addReview = async (newReview: Review, avatarFile?: File | null, onProgress?: (value: number) => void) => {
    if (avatarFile) {
      newReview.avatar = await uploadImage(avatarFile, `avatars/${Date.now()}_${newReview.author}`, onProgress);
    } else if (newReview.avatar && newReview.avatar.startsWith('data:image')) {
      newReview.avatar = await uploadImage(newReview.avatar, `avatars/${Date.now()}_${newReview.author}`, onProgress);
    }
    const { id, ...data } = newReview;
    await addDoc(collection(db, 'reviews'), data);
  };

  const deleteReview = async (id: string) => {
    await deleteDoc(doc(db, 'reviews', id));
  };

  const addGalleryItem = async (item: GalleryItem, file?: File | null, onProgress?: (value: number) => void) => {
    if (file) {
      item.src = await uploadImage(file, `gallery/${Date.now()}`, onProgress);
    } else if (item.src && item.src.startsWith('data:image')) {
      item.src = await uploadImage(item.src, `gallery/${Date.now()}`, onProgress);
    }
    const { id, ...data } = item;
    await addDoc(collection(db, 'gallery'), data);
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
  };

  const addContactMessage = async (message: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, 'messages'), {
      ...message,
      createdAt: serverTimestamp()
    });
  };

  const deleteContactMessage = async (id: string) => {
    await deleteDoc(doc(db, 'messages', id));
  };

  return (
    <DataContext.Provider value={{
      menuItems,
      reviews,
      galleryItems,
      messages,
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
      uploadImage,
      addContactMessage,
      deleteContactMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};