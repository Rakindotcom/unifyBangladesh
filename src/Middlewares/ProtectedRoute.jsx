// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // your firebase setup
import { toast } from "react-toastify";

export default function ProtectedRoute({ requiredRole }) {
  const [userStatus, setUserStatus] = useState("loading"); // loading | unauthorized | authorized
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserStatus("unauthorized");
        toast.error("You must be logged in to access this page.");
        return;
      }

      if(requiredRole==='any') {
        setCurrentUser(user);
        setUserStatus("authorized");
        return;
      }

      const userDoc = await getDoc(doc(db, "Users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (userData?.role === requiredRole) {
        setCurrentUser(user);
        setUserStatus("authorized");
      } else {
        setUserStatus("unauthorized");
        toast.error("You do not have permission to access this page.");
      }
    });

    return () => unsubscribe();
  }, [requiredRole]);

  if (userStatus === "loading") return <div>Loading...</div>;
  if (userStatus === "unauthorized") return <Navigate to="/not-authorized" />;

  return <Outlet />;
}
