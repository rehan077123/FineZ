'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

export default function SellProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    affiliateLink: '',
    affiliateNetwork: 'Amazon Associates',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.price || !formData.affiliateLink) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create FormData for multipart upload
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('price', formData.price);
      uploadData.append('originalPrice', formData.originalPrice || formData.price);
      uploadData.append('category', formData.category);
      uploadData.append('affiliateLink', formData.affiliateLink);
      uploadData.append('affiliateNetwork', formData.affiliateNetwork);
      uploadData.append('type', 'affiliate');
      uploadData.append('verified', 'false');

      if (imageFile) {
        uploadData.append('image', imageFile);
      }

      const response = await fetch('http://localhost:8000/api/vendor/products/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload product');
      }

      const result = await response.json();
      
      setSuccess('Product uploaded successfully! It will appear on the marketplace once verified.');
      setFormData({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Electronics',
        affiliateLink: '',
        affiliateNetwork: 'Amazon Associates',
        image: '',
      });
      setImageFile(null);
      setImagePreview(null);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/vendor/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Sell Your Products</h1>
          <p className="text-slate-600">Upload your affiliate and dropship products to earn commissions</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Success!</h3>
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Product Image * 
            </label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Preview" className="h-40 mx-auto object-contain rounded" />
                  <p className="text-sm text-slate-600">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                  <p className="text-slate-600">Click or drag to upload image</p>
                  <p className="text-xs text-slate-500">PNG, JPG, WebP up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Samsung Galaxy S24 Ultra"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={200}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product features, benefits, and specifications..."
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={2000}
            />
          </div>

          {/* Price Fields */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Current Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 44249"
                step="0.01"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="e.g., 74999"
                step="0.01"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>
              <option value="Health">Health & Beauty</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Affiliate Network */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Affiliate Network *
            </label>
            <select
              name="affiliateNetwork"
              value={formData.affiliateNetwork}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Amazon Associates">Amazon Associates</option>
              <option value="Flipkart Affiliate">Flipkart Affiliate</option>
              <option value="CueLinks">CueLinks</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Affiliate Link */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Affiliate Link *
            </label>
            <input
              type="url"
              name="affiliateLink"
              value={formData.affiliateLink}
              onChange={handleInputChange}
              placeholder="https://www.amazon.in/dp/ASIN?tag=yourtag"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-2">Must be a valid affiliate link with your tracking ID</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Uploading...' : 'Upload Product'}
          </button>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All products will be reviewed by our team before appearing on the marketplace. This ensures quality and authenticity for our users.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
