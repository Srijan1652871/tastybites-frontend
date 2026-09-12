import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Save, Loader2, ArrowLeft, Image as ImageIcon, X } from "lucide-react";

const UpdateMenuItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    availability: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/menu-items/${id}`
        );
        const item = response.data.data;
        setFormData({
          name: item.name,
          description: item.description || "",
          price: item.price,
          category: item.category,
          availability: item.availability,
        });
        if (item.image?.url) {
          setImagePreview(item.image.url);
        }
      } catch (error) {
        toast.error("Failed to load menu item");
        navigate("/admin/menu-items");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Item name is required";
    if (!formData.category) errs.category = "Category is required";
    if (!formData.price) errs.price = "Price is required";
    else if (isNaN(formData.price) || Number(formData.price) <= 0) errs.price = "Valid price is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("availability", formData.availability);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/menu-items/admin/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/menu-items");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-amber-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">Edit Menu Item</h1>
          <p className="text-gray-500 text-sm mt-1">Update details for "{formData.name}"</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <h2 className="text-base font-bold text-[#1a1a2e] border-b border-gray-100 pb-3">Basic Information</h2>
              
              <div>
                <label className="form-label">Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="form-label">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="form-input resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="Starter">Starter</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Chef's Special">Chef's Special</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <h2 className="text-base font-bold text-[#1a1a2e] border-b border-gray-100 pb-3">Item Image</h2>
              
              <div className="relative">
                {imagePreview ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-rose-500 transition-colors backdrop-blur-sm"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-amber-400 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-amber-600">Upload new image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
                {errors.image && <p className="text-red-500 text-xs mt-2 text-center">{errors.image}</p>}
                <p className="text-xs text-center text-gray-500 mt-3">Leave unchanged to keep current image</p>
              </div>
            </div>

            {/* Status & Submit */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <h2 className="text-base font-bold text-[#1a1a2e] border-b border-gray-100 pb-3">Status & Save</h2>
              
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
                <div>
                  <p className="text-sm font-medium text-[#1a1a2e]">Available in Stock</p>
                  <p className="text-xs text-gray-500">Uncheck to mark as Sold Out</p>
                </div>
              </label>

              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary w-full justify-center py-3 mt-2"
              >
                {isSaving ? (
                  <><Loader2 className="animate-spin" size={18} /> Saving Changes...</>
                ) : (
                  <><Save size={18} /> Save Changes</>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/admin/menu-items")}
                className="w-full py-3 text-sm font-medium text-gray-500 hover:text-[#1a1a2e] transition-colors"
              >
                Cancel & Go Back
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenuItem;