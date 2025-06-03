interface MobileBlockerProps {
  heading?: string
  message?: string
  icon?: string
  className?: string
}

export default function MobileBlocker({
  heading = "Mobile Not Supported",
  message = "Please switch to desktop for the full experience.",
  icon = "🖥️",
  className = "",
}: MobileBlockerProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white lg:hidden ${className}`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 text-center max-w-sm mx-auto">
        {/* Visual Element */}
        <div className="text-6xl mb-6 animate-pulse">{icon}</div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h1>

        {/* Message */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6">{message}</p>

        {/* Additional visual indicator */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📵</span>
          <span>Mobile view unavailable</span>
        </div>
      </div>
    </div>
  )
}
