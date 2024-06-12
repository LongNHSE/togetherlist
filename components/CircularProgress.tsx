'use client';
import React from 'react';

const cleanPercentage = (percentage: number): number => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

interface CircleProps {
  colour: string;
  pct?: number;
  radius: number;
}

const Circle = ({ colour, pct = 0, radius }: CircleProps) => {
  const r = radius;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={r + 10} // Add padding to the center of the circle
      cy={r + 10} // Add padding to the center of the circle
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={'1rem'}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};
interface TextProps {
  percentage: number;
  radius: number;
}

const Text = ({ percentage, radius }: TextProps) => {
  return (
    <text
      x={radius + 10} // Use the radius to calculate the x coordinate
      y={radius + 10} // Use the radius to calculate the y coordinate
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={'1em'}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

interface CircularProgressProps {
  percentage: number;
  colour: string;
  label: string;
  size?: number;
}

const CircularProgress = ({
  percentage,
  colour,
  label,
  size = 40,
}: CircularProgressProps) => {
  const pct = cleanPercentage(percentage);
  const r = size; // Use the size prop to set the radius
  return (
    <div className="w-fit flex flex-col gap-2">
      <svg width={2 * r + 20} height={2 * r + 20}>
        <g transform={`rotate(-90 ${r + 10} ${r + 10})`}>
          <Circle colour="lightgray" pct={100} radius={r} />
          <Circle colour={colour} pct={pct} radius={r} />
        </g>
        <Text percentage={pct} radius={r} />
      </svg>
      <div className="text-center  text-black font-bold">{label}</div>
    </div>
  );
};

export default CircularProgress;
