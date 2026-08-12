import React from 'react'

/** Soft abstract blob used behind hero / section art, echoing the logo's organic leaf shapes. */
export const Blob: React.FC<{
  className?: string
  tone?: 'purple' | 'teal' | 'green'
  style?: React.CSSProperties
}> = ({ className = '', tone = 'purple', style }) => {
  const fill =
    tone === 'purple' ? '#7A32A7' : tone === 'teal' ? '#31728B' : '#689F25'
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={fill}
        d="M52.8,-58.3C67.4,-47.9,77.6,-30.6,80.6,-11.9C83.6,6.8,79.4,26.9,67.9,41.9C56.5,56.9,37.9,66.8,18.2,71.6C-1.5,76.4,-22.3,76,-39.9,67.5C-57.4,59,-71.7,42.3,-77.3,22.9C-82.9,3.5,-79.7,-18.6,-68.7,-35.6C-57.7,-52.7,-38.8,-64.7,-19.1,-67.6C0.7,-70.6,21.2,-64.5,38.9,-56.6C52.8,-58.3,52.8,-58.3,52.8,-58.3Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/** Small floating leaf accent used for ambient motion in section corners. */
export const FloatingLeaf: React.FC<{ className?: string; tone?: 'purple' | 'teal' | 'green'; delay?: string }> = ({
  className = '',
  tone = 'green',
  delay = '0s',
}) => {
  const fill = tone === 'purple' ? '#7A32A7' : tone === 'teal' ? '#31728B' : '#689F25'
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={{ animationDelay: delay }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={fill}
        opacity="0.5"
        d="M20 2C10 6 4 16 6 26c1 6 6 10 12 12 2-8 2-16 0-24-1-4 1-8 2-12z"
      />
    </svg>
  )
}

/** The signature element: a branching line that grows on scroll, with leaf-dot accents echoing the ψ-tree logo. */
export const GrowingBranch: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 640"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path
        d="M60 0 C 60 60, 40 70, 42 120 C 44 170, 66 175, 64 230 C 62 285, 38 290, 40 340 C 42 390, 68 400, 66 450 C 64 500, 40 510, 42 560 C 44 600, 60 610, 60 640"
        fill="none"
        stroke="#8F5CAF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      {[
        { cy: 110, cx: 30, tone: '#689F25', r: 5 },
        { cy: 118, cx: 58, tone: '#31728B', r: 4 },
        { cy: 225, cx: 78, tone: '#31728B', r: 5 },
        { cy: 232, cx: 50, tone: '#689F25', r: 4 },
        { cy: 335, cx: 26, tone: '#689F25', r: 5 },
        { cy: 342, cx: 56, tone: '#7A32A7', r: 4 },
        { cy: 445, cx: 80, tone: '#31728B', r: 5 },
        { cy: 452, cx: 52, tone: '#689F25', r: 4 },
        { cy: 555, cx: 28, tone: '#7A32A7', r: 5 },
      ].map((leaf, i) => (
        <circle key={i} cx={leaf.cx} cy={leaf.cy} r={leaf.r} fill={leaf.tone} opacity={0.65} />
      ))}
    </svg>
  )
}
