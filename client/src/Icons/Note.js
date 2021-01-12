import * as React from "react";

function SvgNote(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M6 12h10v1H6v-1zm7.816-3H6v1h9.047a6.547 6.547 0 01-1.231-1zM19 10.975v2.569C19 17.65 13 16 13 16s1.518 6-2.638 6H3V2h9.5a6.501 6.501 0 011.316-2H1v24h10.189C14.352 24 21 16.777 21 14.386V10.5a6.475 6.475 0 01-2 .475zM6 7h6.5a6.472 6.472 0 01-.319-1H6v1zm17-2.5C23 6.985 20.983 9 18.5 9S14 6.985 14 4.5 16.017 0 18.5 0 23 2.015 23 4.5zM21 4h-2V2h-1v2h-2v1h2v2h1V5h2V4z" />
    </svg>
  );
}

export default SvgNote;
