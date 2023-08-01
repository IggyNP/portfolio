import React from "react";
import { useRouter } from "next/router";

const LocaleBtn = () => {
  const router = useRouter();
  const { pathname, locale } = router;

  const handleChangeLanguage = (e) => {
    const currentUrl = window.location.href.split("#");
    let pathExtra = currentUrl.length > 1 ? "#" + currentUrl.at(-1) : "";
    router.push(`${pathname}${pathExtra}`, null, {
      locale: `${e.target.value}`,
    });
  };

  return (
    <div>
      <select
        className="mx-4 flex cursor-pointer items-center border-none bg-transparent px-1 align-middle transition duration-150 ease-in-out hover:scale-125 focus:outline-none"
        onChange={handleChangeLanguage}
        defaultValue={locale}
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};

export default LocaleBtn;
