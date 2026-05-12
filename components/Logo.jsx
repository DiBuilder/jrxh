export default function Logo({ className = '', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="吉日选号工具 Logo"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C43B2A" />
          <stop offset="100%" stopColor="#9A2E20" />
        </linearGradient>
        <linearGradient id="logo-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8941F" />
        </linearGradient>
      </defs>

      {/* 圆角方形背景 */}
      <rect width="120" height="120" rx="28" fill="url(#logo-bg)" />

      {/* 装饰圆环 */}
      <circle cx="60" cy="52" r="32" stroke="white" strokeOpacity="0.15" strokeWidth="1.2" fill="none" />
      <circle cx="60" cy="52" r="26" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" fill="none" strokeDasharray="3 5" />

      {/* 号码球 - 三个小圆 */}
      <circle cx="42" cy="46" r="8" fill="white" fillOpacity="0.92" />
      <circle cx="60" cy="40" r="8" fill="white" fillOpacity="0.92" />
      <circle cx="78" cy="46" r="8" fill="white" fillOpacity="0.92" />

      {/* 球内数字 */}
      <text x="42" y="49" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#C43B2A">8</text>
      <text x="60" y="43" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#C43B2A">6</text>
      <text x="78" y="49" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#C43B2A">8</text>

      {/* 吉祥文字 */}
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="white"
        fontFamily="PingFang SC, Noto Serif SC, SimSun, serif"
      >
        吉祥
      </text>

      {/* 底部小字 */}
      <text
        x="60"
        y="100"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fillOpacity="0.65"
        fontFamily="PingFang SC, Noto Serif SC, SimSun, serif"
        letterSpacing="2"
      >
        选号
      </text>
    </svg>
  )
}
