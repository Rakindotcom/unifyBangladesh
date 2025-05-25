import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { Pencil, User } from "lucide-react";

// Regular expression for mobile number: 11 digits, starting with "01"
const MOBILE_REGEX = /^01\d{9}$/;

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    gender: "Male",
  });
  const [errors, setErrors] = useState({});

  // Fetch profile from Firestore
  const fetchProfile = async () => {
    if (!currentUser) return;

    try {
      const profileRef = doc(db, "Users", currentUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setProfile(data);
        setFormData(data);
      }
    } catch (error) {
      toast.error("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!MOBILE_REGEX.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 11-digit mobile number starting with 01";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save or update profile
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors before saving.");
      return;
    }

    setSaving(true);
    try {
      const profileRef = doc(db, "Users", currentUser.uid);
      if (profile) {
        await updateDoc(profileRef, formData);
        toast.success("Profile updated successfully!");
      } else {
        await setDoc(profileRef, { email: currentUser.email, ...formData });
        toast.success("Profile created successfully!");
      }
      setProfile({ email: currentUser.email, ...formData });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(profile || { name: "", mobile: "", address: "", gender: "Male" });
    setIsEditing(false);
    setErrors({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        <p className="text-gray-600 text-lg ml-3">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 px-4 sm:px-6 font-inter">
      <div className="bg-white shadow-2xl rounded-2xl p-8 border bg-gradient-to-br from-orange-200 to-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-orange-800">My Profile</h2>
          {profile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
              aria-label="Edit profile"
            >
              <Pencil className="w-5 h-5 mr-2" /> Edit Profile
            </button>
          )}
        </div>

        <div className="flex items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mr-4">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{formData.name || "No name set"}</p>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>

        {isEditing || !profile ? (
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                required
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="01XXXXXXXXX"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                required
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
              />
              {errors.mobile && (
                <p id="mobile-error" className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
                aria-describedby={errors.gender ? "gender-error" : undefined}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p id="gender-error" className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2 flex space-x-4 mt-4">
              <button
                type="submit"
                disabled={saving}
                className={`flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : profile ? (
                  "Save Changes"
                ) : (
                  "Create Profile"
                )}
              </button>
              {(isEditing || !profile) && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
                  aria-label="Cancel editing"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-gray-700">
            <p className="flex justify-between">
              <strong className="font-medium">Mobile:</strong>
              <span>{profile.mobile || "Not provided"}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-medium">Address:</strong>
              <span>{profile.address || "Not provided"}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-medium">Gender:</strong>
              <span>{profile.gender}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;