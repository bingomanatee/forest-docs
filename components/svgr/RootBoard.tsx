import * as React from "react";
import { SVGProps } from "react";
const SvgRootBoard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    {...props}
  >
    <path
      style={{
        fill: "none",
      }}
      d="M672 1144h64v16h-64z"
      transform="translate(-672 -1144)"
    />
    <path
      d="M727.085 1141.98c.469.18.74.67.647 1.17-.093.49-.525.85-1.028.85h-45.408c-.503 0-.935-.36-1.028-.85-.093-.5.178-.99.647-1.17 7.387-2.88 15.085-8.43 15.085-13.98h16c0 5.55 7.698 11.1 15.085 13.98Z"
      style={{
        fill: "#7c1f0e",
      }}
      transform="translate(-672 -1128)"
    />
  </svg>
);
export default SvgRootBoard;
