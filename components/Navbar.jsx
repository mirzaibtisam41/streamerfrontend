import React from "react";

const Navbar = () => {
  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img style={{ width: "200px" }} src="/logo.png" />
        </a>
        <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
         
        </nav>
        <button class="inline-flex items-center text-white bg-purple-600 border-0 py-1 px-3 focus:outline-none hover:bg-purple-500 rounded text-base mt-4 md:mt-0">
          Feedback
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
