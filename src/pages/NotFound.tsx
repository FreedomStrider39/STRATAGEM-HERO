import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0c0c] text-white">
      <div className="text-center p-8 border-2 border-red-500/50 bg-red-500/10">
        <h1 className="text-6xl font-black mb-4 text-red-500 italic">404</h1>
        <p className="text-xl mb-8 tracking-widest">STRATAGEM NOT FOUND</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors"
        >
          RETURN TO MISSION
        </Link>
      </div>
    </div>
  );
};

export default NotFound;