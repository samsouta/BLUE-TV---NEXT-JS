import Link from 'next/link';
import React from 'react'

const WatchMoreBtn: React.FC = () => {
  return (
    <>
      <Link
        href={'/home'}
      >
        <button className="border hover:scale-95 duration-300 relative group rounded-2xl cursor-pointer text-sky-50  overflow-hidden h-16 w-64 bg-transparent p-2 flex justify-center items-center font-extrabold">
          <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-pink-800"></div>
          <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-pink-400 "></div>
          <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
          <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
          <p className="z-10 merriweather-regula">See more</p>
        </button>

      </Link>
    </>
  );
};

export default WatchMoreBtn;
