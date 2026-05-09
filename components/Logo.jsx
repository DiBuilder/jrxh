export default function Logo({ className = '', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 圆角方形背景 */}
      <rect width="120" height="120" rx="28" fill="#E85D4A" />

      {/* 装饰圆环 */}
      <circle cx="60" cy="52" r="32" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" fill="none" />

      {/* 号码球 - 三个小圆 */}
      <circle cx="42" cy="46" r="8" fill="white" fillOpacity="0.9" />
      <circle cx="60" cy="40" r="8" fill="white" fillOpacity="0.9" />
      <circle cx="78" cy="46" r="8" fill="white" fillOpacity="0.9" />

      {/* 球内数字 */}
      <text x="42" y="49" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E85D4A">8</text>
      <text x="60" y="43" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E85D4A">6</text>
      <text x="78" y="49" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E85D4A">8</text>

      {/* 吉祥文字 */}
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="white"
        fontFamily="PingFang SC, Noto Sans SC, sans-serif"
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
        fillOpacity="0.7"
        fontFamily="PingFang SC, Noto Sans SC, sans-serif"
        letterSpacing="2"
      >
        选号
      </text>
    </svg>
  )
}
