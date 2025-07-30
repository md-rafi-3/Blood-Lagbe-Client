import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

export default function useRole() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  useEffect(() => {
   
    if (!user?.email || !axiosSecure) return;

    axiosSecure.get(`/users-role`)
      .then((res) => {
        // console.log("✅ Role response:", res.data);
        setRole(res.data.role || ""); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching role:", err);
        setLoading(false);
      });
  }, [axiosSecure, user?.email]); 

  return { role, loading };
}
