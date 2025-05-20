import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    gender: "male",
  });

  const fetchProfile = async () => {
    if (!currentUser) return;

    const profileRef = doc(db, "Users", currentUser.uid);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      setProfile(profileSnap.data());
      setFormData(profileSnap.data());
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.gender) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const profileRef = doc(db, "Users", currentUser.uid);
      if (profile) {
        await updateDoc(profileRef, formData);
        toast.success("Profile updated successfully");
      } else {
        await setDoc(profileRef, {
          email: currentUser.email,
          ...formData,
        });
        toast.success("Profile created successfully");
      }

      setProfile({ email: currentUser.email, ...formData });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error saving profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  const genderIcon = formData.gender === "female" ? "👩" : "👨";

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 border mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#800000]">My Profile</h2>
          {profile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-sm text-[#800000] hover:underline"
            >
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </button>
          )}
        </div>

        <div className="flex items-center mb-6">
          <div className="text-5xl mr-4">{genderIcon}</div>
          <div>
            <p className="text-lg font-semibold">{formData.name}</p>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>

        {isEditing || !profile ? (
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#800000] hover:bg-[#660000] text-white py-2 rounded-lg"
            >
              {profile ? "Save Changes" : "Create Profile"}
            </button>
          </form>
        ) : (
          <div className="space-y-2 text-gray-700">
            <p><strong>Mobile:</strong> {profile.mobile}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
