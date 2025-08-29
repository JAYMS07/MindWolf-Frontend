import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./usercontext";

import { PawPrint } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 401) {
          setUserInfo(null);
          // Optionally, show a message or redirect to login
          return null;
        }
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
          return data;
        } else {
          setUserInfo(null);
          return null;
        }
      })
      .catch(() => setUserInfo(null));
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => setUserInfo(null));
  }

  const username = userInfo?.username;

  return (
    <div>
    <header className="sticky top-0 z-50 bg-white shadow-md " >
      <div className="wolf  ">
        <Link to="/" className="logo">
          MindWolf
          <PawPrint className="w-8 h-8 text-[#BB5A3A] " />
        </Link>
     
      <nav>
        {username && (
          <>
            <Link to="/create">Create A Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}{" "}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
       </div> 
      <div className="tagline">"Bold thoughts under the moonlight"</div>
      
    </header>
    
    </div>

  );
}
