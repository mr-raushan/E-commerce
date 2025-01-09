import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Home() {
  // Your code here...

  return (
    <div className="bg-gradient-to-r from-black to-blue-900 h-screen text-white  ">
      <div className="container mx-auto">
        {/* Navbar  */}
        <div>
          <Navbar />
        </div>

        {/* Main Content */}
        <section className="flex items-center justify-center flex-col py-20">
          <h1 className="text-3xl font-bold text-orange-600  sm:text-4xl">
            CourseHaven
          </h1>
          <p className="max-w-screen-lg mx-auto p-6 text-gray-300 text-sm">
            Welcome to CourseHaven, a platform where you can learn and share
            knowledge.
          </p>
          <div className="flex items-center gap-6 mt-2">
            <button className="bg-green-600 py-2 px-4 hover:bg-transparent hover:border border-white rounded-md transition-all duration-300 ease-in-out hover:scale-105">
              Explore Courses
            </button>
            <button className="bg-transparent border border-white hover:bg-green-700 py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:scale-105 ">
              Course Videos
            </button>
          </div>
        </section>
        {/* cart slider wala section  */}
        <div></div>

        <hr />
        {/* Footer */}
        <div className="my-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
