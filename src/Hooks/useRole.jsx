import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function useRole() {
 
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
 
   
   

    const fetchRole=async()=>{
      const res=await axiosSecure.get("/users-role");
      return res.data.role;
    }

    const { data:role=null, isLoading:loading } = useQuery({
    queryKey: ['role',user?.email],
    queryFn: fetchRole,
    enabled: !!user?.email,
  })

   

  return { role, loading };
}
