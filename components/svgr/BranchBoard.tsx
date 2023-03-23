import React, { SVGProps } from "react";

type customProps = {
  top: string
  bottom: string
}
const SvgBranchBoard = (props: SVGProps<SVGSVGElement> & customProps) => (
  <svg
    viewBox="0 0 80 160"
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
      d="M-48-320h80v160h-80z"
      transform="translate(48 320)"
    />
    <path
      d="M696 910.063c0-3.983-2.282-7.613-5.871-9.34A31.73 31.73 0 0 1 672 872c0-17.661 14.339-32 32-32s32 14.339 32 32c0 12.675-7.385 23.638-18.083 28.819a10.258 10.258 0 0 0-5.81 9.244c-.107 3.688-.107 8.186-.107 11.874 0 3.983 2.282 7.613 5.871 9.34A31.73 31.73 0 0 1 736 960c0 17.661-14.339 32-32 32s-32-14.339-32-32c0-12.675 7.385-23.638 18.083-28.819a10.258 10.258 0 0 0 5.81-9.244c.107-3.688.107-8.186.107-11.874Z"
      style={{
        fill: "#7c1f0e",
      }}
      transform="translate(-664 -836)"
    />
    <circle
      cx={728.5}
      cy={984.5}
      r={24.5}
      style={{
        fill: "#d1d1d1",
      }}
      transform="matrix(1 0 0 .9898 -688.5 -850.204)"
    />
    <circle
      cx={728.5}
      cy={984.5}
      r={24.5}
      style={{
        fill: "#d1d1d1",
      }}
      transform="matrix(.9796 0 0 .9796 -673.633 -928.408)"
    />
    <path
      d="M768 952v16M776 960l-16 .25"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeOpacity: 0.45,
        strokeWidth: 1,
      }}
      transform="translate(-727.75 -836)"
    />
    <path
      d="M768 952v16M776 960l-16 .25"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeOpacity: 0.45,
        strokeWidth: 1,
      }}
      transform="translate(-728 -924)"
    />
    <text
      x={684.463}
      y={962.865}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: 8,
      }}
      transform="translate(-664 -836)"
    >
      {props.bottom}
    </text>
    <text
      x={691.131}
      y={962.865}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: 8,
      }}
      transform="translate(-664 -924)"
    >
      {props.top}
    </text>
  </svg>
);
export default SvgBranchBoard;
