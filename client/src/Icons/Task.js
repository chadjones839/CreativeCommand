import * as React from "react";

function SvgTask(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M22 2v22H2V2h3C6.23 2 7.181.916 8 0h8c.82.916 1.771 2 3 2h3zM11 3a1 1 0 102 0 1 1 0 00-2 0zm9 1h-4l-2 2h-3.897L8 4H4v18h16V4zM7 13.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64C14.859 11.87 13.291 13.95 11.033 18 9.64 16.36 8.711 15.314 7 13.729z" />
    </svg>
  );
}

export default SvgTask;
