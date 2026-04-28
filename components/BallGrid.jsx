'use client'

const ballSize = 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16'

export default function BallGrid({ reds, blues, labelRed, labelBlue }) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 lg:py-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm lg:text-base tracking-widest text-[var(--color-gold-light)]/70">
          {labelRed}
        </span>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {reds.map((num, i) => (
            <div
              key={`r-${i}`}
              className={`${ballSize} rounded-full flex items-center justify-center
                bg-[var(--color-bg-mid)] border-2 border-[var(--color-gold)]
                shadow-lg shadow-black/30`}
            >
              <span className="text-[var(--color-gold-light)] font-bold text-lg sm:text-xl lg:text-2xl">
                {String(num).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm lg:text-base tracking-widest text-[var(--color-gold-light)]/70">
          {labelBlue}
        </span>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {blues.map((num, i) => (
            <div
              key={`b-${i}`}
              className={`${ballSize} rounded-full flex items-center justify-center
                bg-[var(--color-bg-mid)] border-2 border-[var(--color-gold-light)]
                shadow-lg shadow-black/30`}
            >
              <span className="text-[var(--color-gold-light)] font-bold text-lg sm:text-xl lg:text-2xl">
                {String(num).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
