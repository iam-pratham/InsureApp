import React from 'react';

interface SpinnerProps {
  size?: number;
  color?: string;
  label?: string;
}

/**
 * Premium SVG ring spinner — no jarring flashes.
 * Drop-in replacement for any loading state.
 */
const Spinner: React.FC<SpinnerProps> = ({
  size = 44,
  color = '#6366f1',
  label = 'Loading...',
}) => {
  const r = (size / 2) * 0.75;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      role="status"
      aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className="spinner-ring"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeOpacity={0.15}
          strokeWidth={size * 0.085}
        />
        {/* Animated arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={size * 0.085}
          strokeDasharray={`${circumference * 0.7} ${circumference * 0.3}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    </div>
  );
};

export default Spinner;
