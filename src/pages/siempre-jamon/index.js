import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import siempreJamon from "public/images/siempre-jamon.png";

const index = () => {
  return (
    <div>
      <Navbar showSocials={false} />
      <div className="w-full py-20">
        <div className="relative h-[50vh] w-screen">
          <div className="absolute left-0 top-0 z-10 h-[50vh] w-full bg-black/70" />
          <Image
            className="absolute z-0"
            fill
            style={{ objectFit: "cover" }}
            src={siempreJamon}
            alt="/"
          />
          <div className="absolute left-[50%] right-[50%] top-[85%] z-10 w-full translate-x-[-45%] translate-y-[-45%] p-2 text-white">
            <h2 className="py-2">Siempre Jamón</h2>
            <h3>Next.js / Tailwind</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
