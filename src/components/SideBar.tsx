//import Image from "next/image";
import { useState } from "react";

export default function StateTest() {
  const [isOpened, changeState] = useState(false);

  const toggleMenu = () => {
    changeState(!isOpened);
  };

  if (isOpened) {
    return (
      <>
        <p onClick={toggleMenu}>state = true</p>
      </>
    );
  } else {
    return (
      <>
        <p onClick={toggleMenu}>state = false</p>
      </>
    );
  }
}
