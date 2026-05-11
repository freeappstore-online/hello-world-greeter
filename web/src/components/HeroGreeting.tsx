import { useState, useEffect, useCallback } from "react";
import type { Greeting } from "../data/greetings";
import { SpeakButton } from "./SpeakButton";

interface HeroGreetingProps {
  greetings: Greeting[];
  onSpeak: (text: string, langId: string) => void;
  isSpeaking: boolean;
  soundEnabled: boolean;
}

export function HeroGreeting({ greetings, onSpeak, isSpeaking, soundEnabled }: HeroGreetingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextGreeting = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
      setIsAnimating(false);
    }, 300);
  }, [greetings.length]);

  useEffect(() => {
    const interval = setInterval(nextGreeting, 3000);
    return () => clearInterval(interval);
  }, [nextGreeting]);

  const current = greetings[currentIndex];

  const handleTapGreeting = () => {
    onSpeak(current.greeting, current.id);
  };

  return (
    <div className="text-center py-8 md:py-12">
      <p className="text-sm font-medium mb-3" style={{ color: "var(--muted)" }}>
        Say hello in {greetings.length} languages
      </p>

      <div
        className="inline-block transition-all duration-300"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? "translateY(-12px)" : "translateY(0)",
        }}
      >
        <span className="text-5xl md:text-6xl block mb-3">{current.flag}</span>

        {/* Tappable greeting */}
        <button
          onClick={handleTapGreeting}
          className="transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{ background: "transparent", border: "none" }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-2"
            style={{ fontFamily: "Fraunces, serif", color: "var(--ink)" }}
          >
            {current.greeting}
          </h2>
        </button>

        <div className="flex items-center justify-center gap-2">
          {current.pronunciation && (
            <p className="text-lg italic" style={{ color: "var(--muted)" }}>
              {current.pronunciation}
            </p>
          )}
          {soundEnabled && (
            <SpeakButton
              onClick={handleTapGreeting}
              size="md"
              isSpeaking={isSpeaking}
            />
          )}
        </div>

        <p className="text-sm font-medium mt-1" style={{ color: "var(--accent)" }}>
          {current.language}
        </p>

        {soundEnabled && (
          <p className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>
            Tap the greeting to hear it
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={nextGreeting}
          className="px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "0.75rem",
          }}
        >
          Next greeting ✨
        </button>
      </div>
    </div>
  );
}
