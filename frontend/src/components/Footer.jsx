import logo from "../../public/logo.webp";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col items-center md:items-start">
        <div className="flex items-center gap-2 cursor-pointer ">
          <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-orange-500 text-2xl font-bold">CourseHaven</h1>
        </div>
        <div className="mt-3 ml-2 md:ml-8">
          <p className="mb-2 text-lg ">Follow us</p>
          <div className="flex items-center gap-2">
            <FaFacebook className="text-2xl cursor-pointer hover:bg-blue-400 duration-300 transition-all ease-in-out " />
            <FaInstagram className="text-2xl cursor-pointer hover:bg-pink-600 duration-300 transition-all ease-in-out" />
            <FaTwitter className="text-2xl cursor-pointer hover:bg-blue-600 duration-300 transition-all ease-in-out" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-xl font-bold ">Company</h2>
        <ul className="list-none text-sm text-gray-200 cursor-pointer w-fit  my-2">
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            About us
          </li>
          <li className="hover:text-orange-600 hover:font-bold hover:border-b hover:border-orange-600 mb-2">
            Careers
          </li>
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            Press
          </li>
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            Blog
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">copyrights &#169; 2024</h2>
        <ul className="list-none text-gray-200 text-sm cursor-pointer w-fit my-2">
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            Terms & Conditions
          </li>
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            Privacy & Policy
          </li>
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            Refund & Cancellation
          </li>
          <li className="hover:text-orange-600 hover:border-b hover:font-bold hover:border-orange-600 mb-2">
            mail us
          </li>
        </ul>
      </div>
    </footer>
  );
}
