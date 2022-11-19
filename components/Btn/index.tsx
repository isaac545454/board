import React from "react";
import Link from "next/link";

export default function index() {
  return (
    <div className="absolute bottom-[10px] right-[50px] z-[99]">
      <Link href="/donate">
        <button className="bg-[#ffb800] w-[80px] h-[80px] rounded-[50%] text-xl transition-[4s] drop-shadow-lg hover:scale-125">
          Apoiar
        </button>
      </Link>
    </div>
  );
}
