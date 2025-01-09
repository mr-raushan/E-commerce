import { Link } from "react-router-dom";
import logo from "../../public/logo.webp";

export default function Navbar() {
  return (
    <header className=" flex justify-between items-center p-4 ">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
        <h1 className="font-bold text-orange-500 text-2xl ">CourseHaven</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="bg-transparent text-white py-2 px-4 border border-white rounded-md transition-all duration-300 ease-in-out hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-transparent text-white py-2 px-4 border border-white rounded-md transition-all duration-300 ease-in-out hover:scale-105"
        >
          SignUp
        </Link>
      </div>
    </header>
  );
}
