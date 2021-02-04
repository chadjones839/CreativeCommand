import * as React from "react";

function SvgPulse(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M10.043 18.153c-.291-1.201-1.262-5.528-1.262-5.528A1.001 1.001 0 018 13H5a1 1 0 010-2h2.279l.772-2.316c.154-.461.521-.683.886-.683.402 0 .803.269.917.782.217.98.958 4.404.958 4.404s1.077-7.229 1.229-8.325a.963.963 0 01.973-.859c.417 0 .834.255.952.779l1.249 6.598c.186-.235.473-.38.785-.38h3a1 1 0 010 2h-2.279l-.772 2.316c-.317.95-1.48 1.027-1.761-.098-.293-1.173-1.094-5-1.094-5s-.962 6.786-1.115 7.885c-.08.573-.524.889-.972.889-.411.001-.825-.264-.964-.839zM2 12c0 5.514 4.486 10 10 10s10-4.486 10-10S17.514 2 12 2 2 6.486 2 12zm22 0c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" />
    </svg>
  );
}

export default SvgPulse;