import React from "react";

const Work = () => {
  return (
    <div className="w-full bg-[#191825] text-[#ccd6f6] md:h-screen">
      <div className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center p-4 text-center">
        <div>
          <h1 className="inline border-b-4 border-[#30E3CA] text-4xl font-bold">
            Work
          </h1>
          <p className="pt-8">Check out some of my recent work</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="content-div group container mx-auto flex items-center justify-center rounded-md shadow-lg shadow-[#040C16]">
            <div>
              <span></span>
              <div>
                <a href="/">
                  <button></button>
                </a>
                <a href="/">
                  <button></button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
