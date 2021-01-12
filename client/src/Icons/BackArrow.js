import * as React from "react";

function SvgBackArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M3 12L21 0v24z" />
    </svg>
  );
}

export default SvgBackArrow;
