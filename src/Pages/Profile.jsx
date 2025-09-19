import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../AuthContext"
import { toast } from "react-toastify"
import { Pencil, User, Phone, MapPin, Mail, Save, X, Check, UserCircle, Shield } from "lucide-react"
import "../CSS/profile.css"

// Regular expression for mobile number: 11 digits, starting with "01"
const MOBILE_REGEX = /^01\d{9}$/

const Profile = () => {
  const { currentUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    gender: "Male",
  })
  const [errors, setErrors] = useState({})

  // Fetch profile from Firestore
  const fetchProfile = async () => {
    if (!currentUser) return

    try {
      const profileRef = doc(db, "Users", currentUser.uid)
      const profileSnap = await getDoc(profileRef)

      if (profileSnap.exists()) {
        const data = profileSnap.data()
        setProfile(data)
        setFormData(data)
      }
    } catch (error) {
      toast.error("Failed to load profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [currentUser])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  // Validate form fields
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required"
    } else if (!MOBILE_REGEX.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 11-digit mobile number starting with 01"
    }
    if (!formData.gender) newErrors.gender = "Gender is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Save or update profile
  const handleSave = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Please correct the errors before saving.")
      return
    }

    setSaving(true)
    try {
      const profileRef = doc(db, "Users", currentUser.uid)
      if (profile) {
        await updateDoc(profileRef, formData)
        toast.success("Profile updated successfully!")
      } else {
        await setDoc(profileRef, { email: currentUser.email, ...formData })
        toast.success("Profile created successfully!")
      }
      setProfile({ email: currentUser.email, ...formData })
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to save profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  // Cancel editing
  const handleCancel = () => {
    setFormData(profile || { name: "", mobile: "", address: "", gender: "Male" })
    setIsEditing(false)
    setErrors({})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-1">{formData.name || "Complete Your Profile"}</h2>
                <p className="text-gray-500 text-sm mb-4">{currentUser?.email}</p>

                <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg py-2 px-3">
                  <Shield className="w-4 h-4" />
                  <span>Verified Account</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Profile Completion</span>
                    <span className="font-medium text-gray-900">{profile ? "100%" : "25%"}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: profile ? "100%" : "25%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-500">Update your personal details here</p>
                </div>
                {profile && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {isEditing || !profile ? (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            Full Name <span className="text-red-500">*</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                            errors.name ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          required
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Mobile Field */}
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            Mobile Number <span className="text-red-500">*</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          placeholder="01XXXXXXXXX"
                          value={formData.mobile}
                          onChange={handleChange}
                          className={`w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                            errors.mobile ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          required
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address Field */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          Address
                        </div>
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 hover:border-gray-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Gender Field */}
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                          errors.gender ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            {profile ? "Save Changes" : "Create Profile"}
                          </>
                        )}
                      </button>

                      {(isEditing || !profile) && (
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {/* Profile Information Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">Full Name</span>
                        </div>
                        <p className="text-gray-600 ml-11">{profile.name || "Not provided"}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">Mobile Number</span>
                        </div>
                        <p className="text-gray-600 ml-11">{profile.mobile || "Not provided"}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">Email Address</span>
                        </div>
                        <p className="text-gray-600 ml-11">{currentUser?.email}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">Gender</span>
                        </div>
                        <p className="text-gray-600 ml-11">{profile.gender}</p>
                      </div>
                    </div>

                    {profile.address && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">Address</span>
                        </div>
                        <p className="text-gray-600 ml-11">{profile.address}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
