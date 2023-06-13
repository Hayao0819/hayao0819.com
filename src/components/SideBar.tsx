//import Image from "next/image";
import { useState } from "react";

export default function StateTest() {
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
