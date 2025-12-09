import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { MenuItem, Review, GalleryItem } from '../types';
import { Plus, Trash2, Edit, LogOut, Upload, Image as ImageIcon, Utensils, Star, Mail } from 'lucide-react';

const Admin: React.FC = () => {
  const {
    isAuthenticated, logout, isLoading,
    menuItems, updateMenuItem, addMenuItem, deleteMenuItem,
    reviews, updateReview, addReview, deleteReview,
    galleryItems, addGalleryItem, deleteGalleryItem,
    messages, deleteContactMessage
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'gallery' | 'messages'>('menu');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [sortOption, setSortOption] = useState<'name' | 'price' | 'category' | 'order'>('order');

  const formatDate = (date?: Date | null) => {
    if (!date) return 'Just now';
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-100">Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const [isUploading, setIsUploading] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState(0);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large! Please use an image under 5MB.");
      return;
    }

    setIsUploading(true);
    setGalleryProgress(0);
    try {
      await addGalleryItem({
        id: Date.now().toString(),
        src: '',
        alt: "Uploaded Image"
      }, file, (value) => setGalleryProgress(value));
      e.target.value = '';
    } catch (error) {
      console.error("Gallery upload failed:", error);
      alert("Failed to upload image. Please check your connection and try again.");
    } finally {
      setIsUploading(false);
      setGalleryProgress(0);
    }
  };

  // --- FORMS ---

  const MenuForm = ({ item, onClose }: { item?: MenuItem, onClose: () => void }) => {
    const [formData, setFormData] = useState<MenuItem>(item || {
      id: Date.now().toString(),
      nameEn: '',
      nameJa: '',
      descriptionEn: '',
      descriptionJa: '',
      price: 0,
      priceLarge: 0,
      category: 'curry',
      image: '',
      isFeatured: false,
      sortOrder: 0

    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(item?.image || '');
    const previewRef = useRef<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      return () => {
        if (previewRef.current && previewRef.current.startsWith('blob:')) {
          URL.revokeObjectURL(previewRef.current);
        }
      };
    }, []);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('Image is too large! Please use an image under 5MB.');
        return;
      }
      setImageFile(file);
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previewRef.current);
      }
      const url = URL.createObjectURL(file);
      previewRef.current = url;
      setPreview(url);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      if (imageFile) {
        setUploadProgress(0);
      }
      try {
        if (item) await updateMenuItem(formData, imageFile, (value) => setUploadProgress(value));
        else await addMenuItem(formData, imageFile, (value) => setUploadProgress(value));
        onClose();
      } catch (error) {
        console.error("Failed to save menu item:", error);
        alert("Failed to save menu item. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
        setUploadProgress(null);
        setImageFile(null);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">Name (EN)</label>
            <input required type="text" className="w-full border p-2 rounded" value={formData.nameEn} onChange={e => setFormData({ ...formData, nameEn: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Name (JA)</label>
            <input required type="text" className="w-full border p-2 rounded" value={formData.nameJa} onChange={e => setFormData({ ...formData, nameJa: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">Desc (EN)</label>
            <textarea className="w-full border p-2 rounded" value={formData.descriptionEn} onChange={e => setFormData({ ...formData, descriptionEn: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Desc (JA)</label>
            <textarea className="w-full border p-2 rounded" value={formData.descriptionJa} onChange={e => setFormData({ ...formData, descriptionJa: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">Price (M) (¥)</label>
            <input required type="number" className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Price (L) (¥)</label>
            <input type="number" className="w-full border p-2 rounded" value={formData.priceLarge || ''} placeholder="Optional" onChange={e => setFormData({ ...formData, priceLarge: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Category</label>
            <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })}>
              <option value="curry">Curry</option>
              <option value="naan_rice">Naan/Rice</option>
              <option value="sides">Sides</option>
              <option value="drinks">Drinks</option>
              <option value="sets">Sets</option>
              <option value="dessert">Dessert</option>
              <option value="noodles_momo">Noodles & MoMo</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Sort Order</label>
            <input type="number" className="w-full border p-2 rounded" value={formData.sortOrder || 0} onChange={e => setFormData({ ...formData, sortOrder: Number(e.target.value) })} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured || false}
            onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-gray-300"
          />
          <label htmlFor="isFeatured" className="text-sm font-bold text-stone-700">Chef's Favorite (Featured on Home)</label>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Image</label>
          <div className="flex items-center gap-4">
            {(preview || formData.image) && (
              <img src={preview || formData.image} className="w-16 h-16 object-cover rounded" alt="Preview" />
            )}
            <input type="file" accept="image/*" onChange={handleImageSelect} />
          </div>
          {uploadProgress !== null && (
            <p className="text-xs text-stone-500 mt-1">Uploading {Math.round(uploadProgress * 100)}%</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting} className={`w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isSubmitting ? 'Saving...' : 'Save Item'}
        </button>
      </form>
    );
  };

  const ReviewForm = ({ item, onClose }: { item?: Review, onClose: () => void }) => {
    const [formData, setFormData] = useState<Review>(item || {
      id: Date.now().toString(),
      author: '',
      rating: 5,
      textEn: '',
      textJa: '',
      source: 'Direct'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (item) await updateReview(formData);
        else await addReview(formData);
        onClose();
      } catch (error) {
        console.error("Failed to save review:", error);
        alert("Failed to save review. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1">Author Name</label>
          <input required type="text" className="w-full border p-2 rounded" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">Rating (1-5)</label>
            <input required type="number" min="1" max="5" className="w-full border p-2 rounded" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Review (EN)</label>
          <textarea className="w-full border p-2 rounded" value={formData.textEn} onChange={e => setFormData({ ...formData, textEn: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Review (JA)</label>
          <textarea className="w-full border p-2 rounded" value={formData.textJa} onChange={e => setFormData({ ...formData, textJa: e.target.value })} />
        </div>

        <button type="submit" disabled={isSubmitting} className={`w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isSubmitting ? 'Saving...' : 'Save Review'}
        </button>
      </form >
    );
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-red-950 font-serif">CRM Dashboard</h1>
            <p className="text-stone-500">Manage your website content</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-stone-200 hover:bg-red-100 hover:text-red-800 px-4 py-2 rounded transition">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${activeTab === 'menu' ? 'bg-red-900 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-200'}`}
          >
            <Utensils size={18} /> Menu
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${activeTab === 'reviews' ? 'bg-red-900 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-200'}`}
          >
            <Star size={18} /> Reviews
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${activeTab === 'gallery' ? 'bg-red-900 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-200'}`}
          >
            <ImageIcon size={18} /> Gallery
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${activeTab === 'messages' ? 'bg-red-900 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-200'}`}
          >
            <Mail size={18} /> Messages
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">

          {/* MENU TAB */}
          {activeTab === 'menu' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-700">Menu Items ({menuItems.length})</h2>
                <div className="flex gap-4">
                  <select
                    className="border p-2 rounded bg-white"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="category">Sort by Category</option>
                    <option value="order">Sort by Order</option>
                  </select>
                  <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-amber-700">
                    <Plus size={18} /> Add Item
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-100 border-b-2 border-stone-200 text-left text-stone-600">
                    <tr>
                      <th className="p-3">Image</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Order</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...menuItems]
                      .sort((a, b) => {
                        if (sortOption === 'name') return a.nameEn.localeCompare(b.nameEn);
                        if (sortOption === 'price') return a.price - b.price;
                        if (sortOption === 'category') return a.category.localeCompare(b.category);
                        if (sortOption === 'order') return (a.sortOrder || 0) - (b.sortOrder || 0);
                        return 0;
                      })
                      .map(item => (
                        <tr key={item.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="p-3">
                            {item.image ? (
                              <img src={item.image} alt={item.nameEn} className="w-12 h-12 rounded object-cover bg-stone-200" />
                            ) : (
                              <div className="w-12 h-12 rounded bg-stone-200 flex items-center justify-center text-stone-400">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="font-bold flex items-center gap-2">
                              {item.nameEn}
                              {item.isFeatured && <Star size={14} className="text-amber-500 fill-amber-500" />}
                            </div>
                            <div className="text-xs text-stone-500">{item.nameJa}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full uppercase font-bold">{item.category}</span>
                          </td>
                          <td className="p-3 font-mono">¥{item.price}</td>
                          <td className="p-3 font-mono text-stone-500">{item.sortOrder || 0}</td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                            <button onClick={() => deleteMenuItem(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-700">Reviews ({reviews.length})</h2>
                <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-amber-700">
                  <Plus size={18} /> Add Review
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map(review => (
                  <div key={review.id} className="border p-4 rounded-lg relative group">
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => { setEditingItem(review); setIsModalOpen(true); }} className="p-1 bg-blue-100 text-blue-600 rounded"><Edit size={16} /></button>
                      <button onClick={() => deleteReview(review.id)} className="p-1 bg-red-100 text-red-600 rounded"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-bold">{review.author} <span className="text-amber-500 text-sm">({review.rating}★)</span></div>
                    </div>
                    <p className="text-sm text-stone-500 mt-2 line-clamp-2">{review.textEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-700">Gallery Images ({galleryItems.length})</h2>
                <div className="relative">
                  <input
                    type="file"
                    id="gallery-upload"
                    className="hidden"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleGalleryUpload}
                  />
                  <label
                    htmlFor="gallery-upload"
                    className={`bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-amber-700 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isUploading ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> : <Upload size={18} />}
                    {isUploading ? `Uploading ${Math.round(galleryProgress * 100)}%` : 'Upload Image'}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryItems.map(img => (
                  <div key={img.id} className="relative group aspect-square">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button onClick={() => deleteGalleryItem(img.id)} className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-700">Messages ({messages.length})</h2>
                <p className="text-sm text-stone-500">Visitor inquiries arrive in real time</p>
              </div>
              {messages.length === 0 ? (
                <div className="text-center py-16 text-stone-500 border border-dashed border-stone-200 rounded-lg">
                  <p>No messages yet. Once a visitor uses the contact form, it will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="border border-stone-200 rounded-lg p-4 shadow-sm hover:shadow-md transition relative">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <p className="font-bold text-red-950">{msg.name}</p>
                          <a href={`mailto:${msg.email}`} className="text-sm text-amber-600 hover:underline break-all">{msg.email}</a>
                          <p className="text-xs text-stone-400 mt-1">{formatDate(msg.createdAt)}</p>
                        </div>
                        <button
                          onClick={() => deleteContactMessage(msg.id)}
                          className="self-start flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-full text-sm"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                      <p className="mt-4 text-stone-700 whitespace-pre-line">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} {activeTab === 'menu' ? 'Item' : 'Review'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-500 hover:text-black"><span className="text-2xl">&times;</span></button>
            </div>
            {activeTab === 'menu' && <MenuForm item={editingItem} onClose={() => setIsModalOpen(false)} />}
            {activeTab === 'reviews' && <ReviewForm item={editingItem} onClose={() => setIsModalOpen(false)} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;