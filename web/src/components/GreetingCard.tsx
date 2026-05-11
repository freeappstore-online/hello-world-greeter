import { useState } from "react";
import type { Greeting } from "../data/greetings";
import { SpeakButton } from "./SpeakButton";

interface GreetingCardProps {
  greeting: Greeting;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSpeak: (text: string, langId: string) => void;
  isSpeaking: boolean;
  soundEnabled: boolean;
}

export function GreetingCard({
  greeting,
  isFavorite,
  onToggleFavorite,
  onSpeak,
  isSpeaking,
  soundEnabled,
}: GreetingCardProps) {
  const [showFact, setShowFact] = useState(false);

  return (
    <div
      className="relative overflow-hidden transition-all duration-300"
      style={{
        background: "var(--panel)",
        borderRadius: "1.25rem",
        border: "1px solid var(--line)",
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{greeting.flag}</span>
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
                {greeting.language}
              </h3>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {greeting.region}
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggleFavorite(greeting.id)}
            className="p-1.5 transition-transform duration-200 hover:scale-110"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <span className="text-xl">{isFavorite ? "❤️" : "🤍"}</span>
          </button>
        </div>

        {/* Greeting — tappable to speak */}
        <button
          onClick={() => onSpeak(greeting.greeting, greeting.id)}
          className="w-full py-4 px-4 text-center mb-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{
            background: "var(--paper)",
            borderRadius: "0.75rem",
            border: "1px solid var(--line)",
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "Fraunces, serif", color: "var(--ink)" }}
            >
              {greeting.greeting}
            </p>
            {soundEnabled && (
              <SpeakButton
                onClick={() => onSpeak(greeting.greeting, greeting.id)}
                size="sm"
                isSpeaking={isSpeaking}
              />
            )}
          </div>
          {greeting.pronunciation && (
            <p className="text-sm italic mt-1" style={{ color: "var(--muted)" }}>
              {greeting.pronunciation}
            </p>
          )}
          {soundEnabled && (
            <p className="text-[10px] mt-1.5" style={{ color: "var(--muted)" }}>
              Tap to hear
            </p>
          )}
        </button>

        {/* Script badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-medium px-2.5 py-1"
            style={{
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "0.5rem",
              opacity: 0.9,
            }}
          >
            {greeting.script}
          </span>
        </div>

        {/* Fun fact toggle */}
        <button
          onClick={() => setShowFact(!showFact)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: "var(--accent)" }}
        >
          <span>{showFact ? "▼" : "▶"}</span>
          Fun fact
        </button>

        {showFact && (
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {greeting.funFact}
          </p>
        )}
      </div>
    </div>
  );
}
