import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />

      {/* <div className="upword">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 18.75 7.5-7.5 7.5 7.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </p>
      </div> */}

      <div className="footer">
        <p>
          {" "}
          © 2025 <span className="text-[#364037] text-2xl ">MindWolf</span>.
          All rights reserved.
        </p>
      </div>
    </main>
  );
}
