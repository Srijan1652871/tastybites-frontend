import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

const AddMenuItem = () => {
  const [formdata, setformdata] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    availability: true,
    image: null,
  });

  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const [imagepreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setformdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setformdata((prev) => ({ ...prev, image: file }));
    }
  };

  const validate = () => {
    let errors = {};

    if (formdata.name === "") errors.name = "Item name is required";
    if (formdata.description === "") errors.description = "Description is required";
    if (formdata.category === "") errors.category = "Category is required";
    if (formdata.price === "") errors.price = "Price is required";
    if (formdata.image === null) errors.image = "Image is required";

    seterror(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setisError("");
      setisLoading(true);
      const newFormData = new FormData();
      newFormData.append("name", formdata.name);
      newFormData.append("description", formdata.description);
      newFormData.append("category", formdata.category);
      newFormData.append("price", formdata.price);
      newFormData.append("availability", formdata.availability);
      newFormData.append("image", formdata.image);

      try {
        const token = Cookies.get("token");
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/menu-items/admin`, newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/admin/menu-items");
        }
      } catch (error) {
        const errMessage = error?.response?.data?.message;
        toast.error(errMessage);
        setisError(errMessage);
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">Add menu item</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Item name</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="e.g. Margherita Pizza"
            value={formdata.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
          {error.name && <p className="text-red-500 text-xs mt-1">{error.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            onChange={handleChange}
            name="description"
            placeholder="Short description"
            value={formdata.description}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
          {error.description && (
            <p className="text-red-500 text-xs mt-1">{error.description}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Category</label>
          <select
            onChange={handleChange}
            name="category"
            value={formdata.category}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          >
            <option value="">Select category</option>
            <option value="Starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
          {error.category && <p className="text-red-500 text-xs mt-1">{error.category}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Price</label>
          <input
            type="number"
            onChange={handleChange}
            name="price"
            placeholder="e.g. 349"
            value={formdata.price}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
          {error.price && <p className="text-red-500 text-xs mt-1">{error.price}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={handleChange}
            name="availability"
            checked={formdata.availability}
            id="availability"
          />
          <label htmlFor="availability" className="text-sm text-gray-600">
            In stock
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Item image</label>
          <input
            type="file"
            onChange={handleImageChange}
            name="image"
            accept="image/*"
            className="w-full text-sm"
          />
          {error.image && <p className="text-red-500 text-xs mt-1">{error.image}</p>}
          {imagepreview && (
            <img
              src={imagepreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-md mt-2 border border-gray-200"
            />
          )}
        </div>

        {isError && <p className="text-sm text-red-600">{isError}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Add menu item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;