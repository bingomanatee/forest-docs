import * as React from "react";
import { SVGProps } from "react";
const SvgBranchRightBoard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 172 172"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5,
    }}
    {...props}
  >
    <path
      style={{
        fill: "none",
      }}
      d="M495 222h160v170H495z"
      transform="matrix(1.075 0 0 1.01176 -532.125 -224.612)"
    />
    <path
      d="M804.861 936.292a12.114 12.114 0 0 0-2.796 12.77A31.582 31.582 0 0 1 804 960c0 17.661-14.339 32-32 32s-32-14.339-32-32 14.339-32 32-32c2.942 0 5.792.398 8.499 1.143a12.103 12.103 0 0 0 11.804-3.101c8.629-8.609 25.13-25.11 33.749-33.729a12.115 12.115 0 0 0 3.104-11.818A31.42 31.42 0 0 1 828 872c0-17.661 14.339-32 32-32s32 14.339 32 32-14.339 32-32 32c-3.843 0-7.528-.679-10.942-1.923a12.103 12.103 0 0 0-12.756 2.794c-8.331 8.311-23.12 23.1-31.441 31.421Z"
      style={{
        fill: "#7c1f0e",
      }}
      transform="translate(-730 -829.998)"
    />
    <circle
      cx={728.5}
      cy={984.5}
      r={24.5}
      style={{
        fill: "#d1d1d1",
      }}
      transform="matrix(1 0 0 .9898 -686 -844.702)"
    />
    <path
      d="M768 952v16M776 960l-16 .25"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeOpacity: 0.45,
        strokeWidth: 1,
      }}
      transform="translate(-725.25 -830.498)"
    />
    <text
      x={684.463}
      y={962.865}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: 8,
      }}
      transform="translate(-661.5 -830.498)"
    >
      {"bottom text"}
    </text>
    <circle
      cx={728.5}
      cy={984.5}
      r={24.5}
      style={{
        fill: "#d1d1d1",
      }}
      transform="translate(-583.633 -922.405) scale(.97959)"
    />
    <path
      d="M768 952v16M776 960l-16 .25"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeOpacity: 0.45,
        strokeWidth: 1,
      }}
      transform="translate(-638 -917.997)"
    />
    <text
      x={691.131}
      y={962.865}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: 8,
      }}
      transform="translate(-574 -917.997)"
    >
      {"top text"}
    </text>
  </svg>
);
export default SvgBranchRightBoard;
