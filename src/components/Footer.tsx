// const Footer = (
//   <footer>
//     <p>山田ハヤオ</p>
//   </footer>
// );

// Always use named component export to avoid refreshed loading
import React from "react";

const Footer = (): JSX.Element => {
  return (
    <footer>
      <p>山田ハヤオ</p>
    </footer>
  );
}

export default Footer;
