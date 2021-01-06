import * as React from "react";

function SvgCompany(props) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M24 24H2V0h14v8h8v16zM8 19H5v4h3v-4zm5 0h-3v4h3v-4zm8 0h-3v4h3v-4zM6 14H4v2h2v-2zm8 0h-2v2h2v-2zm-4 0H8v2h2v-2zm9 0h-2v2h2v-2zm3 0h-2v2h2v-2zM6 10H4v2h2v-2zm8 0h-2v2h2v-2zm-4 0H8v2h2v-2zm9 0h-2v2h2v-2zm3 0h-2v2h2v-2zM6 6H4v2h2V6zm8 0h-2v2h2V6zm-4 0H8v2h2V6zM6 2H4v2h2V2zm8 0h-2v2h2V2zm-4 0H8v2h2V2z" />
    </svg>
  );
}

export default SvgCompany;
