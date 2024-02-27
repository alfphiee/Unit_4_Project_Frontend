import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout({ setIsAuth }) {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth_logout/`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          {
            withCredentials: true
          }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        setIsAuth(false)
        navigate("/");
      } catch (e) {
        console.log("Logout error", e);
      }
    })();
  }, []);
  return <div></div>;
}