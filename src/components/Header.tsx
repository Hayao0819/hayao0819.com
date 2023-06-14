//import Image from "next/image";
import { ReactNode, useState } from "react";

interface Props{
  children : ReactNode
}

export default function Header() {
  return (
    <>
      <SideBar>
        <StateText />
        <MenuItem />
      </SideBar>
    </>
  );
}

function StateText() {
  const [isOpened, changeState] = useState(false);

  const toggleMenu = () => {
    changeState(!isOpened);
  };

  return (
    <>
      <p onClick={toggleMenu}>state = {isOpened ? "true" : "false"}</p>
    </>
  );
}

function SideBar( {children}: Props ) {
  return (
    <header className="text-center">
      <aside className="h-screen w-64 flex-col items-center bg-gray-900 px-4">
        <div className="text-white">{children}</div>
      </aside>
    </header>
  );
}

interface Item {
  link: URL
  label: string
}

function MenuItem({link, label}: Item) {
  return(
    <div className="select-none">
      <a href={link}></a>
    </div>
  );
}
