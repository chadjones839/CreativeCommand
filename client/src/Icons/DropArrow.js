import * as React from "react";

function SvgDropArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M0 7.33L2.829 4.5l9.175 9.339L21.171 4.5 24 7.33 12.004 19.5z" />
    </svg>
  );
}

export default SvgDropArrow;
