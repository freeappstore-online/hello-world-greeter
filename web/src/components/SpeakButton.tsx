interface SpeakButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  isSpeaking?: boolean;
}

export function SpeakButton({ onClick, size = "md", isSpeaking }: SpeakButtonProps) {
  const sizeClasses = {
    sm: "text-base p-1",
    md: "text-xl p-1.5",
    lg: "text-2xl p-2",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`${sizeClasses[size]} transition-all duration-200 hover:scale-110 active:scale-95`}
      style={{
        borderRadius: "0.5rem",
        background: isSpeaking ? "var(--accent)" : "transparent",
        lineHeight: 1,
      }}
      aria-label="Listen to pronunciation"
      title="Listen to pronunciation"
    >
      <span
        className="inline-block"
        style={{
          animation: isSpeaking ? "pulse-speak 0.8s ease-in-out infinite" : "none",
        }}
      >
        {isSpeaking ? "🔊" : "🔈"}
      </span>
    </button>
  );
}
