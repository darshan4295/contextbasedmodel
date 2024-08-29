"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Employee Handbook");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          href="https://celestialsys.com/"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          <Image
            className="rounded-xl"
            src="/logo.png"
            alt="Llama Logo"
            width={200}
            height={90}
            priority
          />
        </a>
      </div>

      <div className="relative flex items-center gap-2">
        <label className="text-gray-700 dark:text-gray-300">Search in:</label>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex w-full justify-between items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >
            {selectedOption}
            <svg
              className={`w-5 h-5 ml-2 transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg dark:bg-zinc-800 dark:border-neutral-700">
              <button
                onClick={() => handleOptionClick("Employee Handbook")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-zinc-700"
              >
                Employee Handbook
              </button>
              <button
                onClick={() => handleOptionClick("Scraped Data")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-zinc-700"
              >
                Scraped Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
