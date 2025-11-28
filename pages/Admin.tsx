import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { MenuItem, Review, GalleryItem } from '../types';
import { Plus, Trash2, Edit, LogOut, Upload, Image as ImageIcon, Utensils, Star } from 'lucide-react';

const Admin: React.FC = () => {
  const {
    isAuthenticated, logout,
    menuItems, updateMenuItem, addMenuItem, deleteMenuItem,
    reviews, updateReview, addReview, deleteReview,
    galleryItems, addGalleryItem, deleteGalleryItem
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'gallery'>('menu');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Check size (simple check for demo, 2MB limit recommendation)
        if (file.size > 2 * 1024 * 1024) {
          alert("Image is too large! Please use an image under 2MB for local storage performance.");
          return;
        }
        const base64 = await convertToBase64(file);
        callback(base64);
      } catch (err) {
        console.error("Error uploading image", err);
      }
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
      category: 'curry',
      image: '',
      spicyLevel: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (item) updateMenuItem(formData);
      else addMenuItem(formData);
      onClose();
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">Price (¥)</label>
            <input required type="number" className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Category</label>
            <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })}>
              <option value="curry">Curry</option>
              <option value="naan">Naan</option>
              <option value="tandoori">Tandoori</option>
              <option value="sides">Sides</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Spice Level (0-5)</label>
            <input type="number" min="0" max="5" className="w-full border p-2 rounded" value={formData.spicyLevel || 0} onChange={e => setFormData({ ...formData, spicyLevel: Number(e.target.value) })} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Image</label>
          <div className="flex items-center gap-4">
            {formData.image && <img src={formData.image} className="w-16 h-16 object-cover rounded" alt="Preview" />}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (b64) => setFormData({ ...formData, image: b64 }))} />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Save Item</button>
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
      source: 'Direct',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (item) updateReview(formData);
      else addReview(formData);
      onClose();
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
        <div>
          <label className="block text-xs font-bold mb-1">Avatar Image</label>
          <div className="flex items-center gap-4">
            {formData.avatar && <img src={formData.avatar} className="w-16 h-16 object-cover rounded-full" alt="Avatar Preview" />}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (b64) => setFormData({ ...formData, avatar: b64 }))} />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Save Review</button>
      </form>
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
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">

          {/* MENU TAB */}
          {activeTab === 'menu' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-700">Menu Items ({menuItems.length})</h2>
                <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-amber-700">
                  <Plus size={18} /> Add Item
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-100 border-b-2 border-stone-200 text-left text-stone-600">
                    <tr>
                      <th className="p-3">Image</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id} className="border-b border-stone-100 hover:bg-stone-50">
                        <td className="p-3">
                          <img src={item.image} alt={item.nameEn} className="w-12 h-12 rounded object-cover bg-stone-200" />
                        </td>
                        <td className="p-3">
                          <div className="font-bold">{item.nameEn}</div>
                          <div className="text-xs text-stone-500">{item.nameJa}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full uppercase font-bold">{item.category}</span>
                        </td>
                        <td className="p-3 font-mono">¥{item.price}</td>
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
                    <div className="font-bold">{review.author} <span className="text-amber-500 text-sm">({review.rating}★)</span></div>
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
                    onChange={(e) => handleImageUpload(e, (b64) => addGalleryItem({ id: Date.now().toString(), src: b64, alt: "Uploaded Image" }))}
                  />
                  <label htmlFor="gallery-upload" className="bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-amber-700 cursor-pointer">
                    <Upload size={18} /> Upload Image
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