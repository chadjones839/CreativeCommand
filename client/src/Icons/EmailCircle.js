import * as React from "react";

function SvgEmailCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M12 2.02c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 12.55L6.008 8h11.983L12 12.57zm0 1.288L6 9.229V16h12V9.229l-6 4.629z" />
    </svg>
  );
}

export default SvgEmailCircle;
