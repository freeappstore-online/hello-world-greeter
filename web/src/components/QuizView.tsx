import { useState, useCallback, useMemo } from "react";
import type { Greeting } from "../data/greetings";

interface QuizViewProps {
  greetings: Greeting[];
  onScoreUpdate: (correct: boolean) => void;
  stats: { correct: number; total: number };
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizView({ greetings, onScoreUpdate, stats }: QuizViewProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = useMemo(() => {
    return shuffleArray(greetings).map((g) => {
      const wrongOptions = shuffleArray(
        greetings.filter((o) => o.id !== g.id)
      ).slice(0, 3);
      const options = shuffleArray([g, ...wrongOptions]);
      return { greeting: g, options };
    });
  }, [greetings]);

  const currentQ = questions[questionIndex % questions.length];

  const handleSelect = useCallback(
    (id: string) => {
      if (showResult) return;
      setSelected(id);
      setShowResult(true);
      onScoreUpdate(id === currentQ.greeting.id);
    },
    [showResult, currentQ, onScoreUpdate]
  );

  const handleNext = useCallback(() => {
    setSelected(null);
    setShowResult(false);
    setQuestionIndex((prev) => prev + 1);
  }, []);

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Quiz Time 🧠
        </h2>
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
          <span>✅ {stats.correct}/{stats.total}</span>
          {stats.total > 0 && <span>{accuracy}%</span>}
        </div>
      </div>

      <div
        className="p-6 mb-6 text-center"
        style={{
          background: "var(--panel)",
          borderRadius: "1.25rem",
          border: "1px solid var(--line)",
        }}
      >
        <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
          Which language says...
        </p>
        <p
          className="text-3xl md:text-4xl font-bold mb-1"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {currentQ.greeting.greeting}
        </p>
        {currentQ.greeting.pronunciation && (
          <p className="text-sm italic" style={{ color: "var(--muted)" }}>
            {currentQ.greeting.pronunciation}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentQ.options.map((opt) => {
          let bg = "var(--panel)";
          let borderColor = "var(--line)";

          if (showResult) {
            if (opt.id === currentQ.greeting.id) {
              bg = "var(--success)";
              borderColor = "var(--success)";
            } else if (opt.id === selected) {
              bg = "var(--error)";
              borderColor = "var(--error)";
            }
          }

          const isCorrectOrSelected =
            showResult && (opt.id === currentQ.greeting.id || opt.id === selected);

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className="flex items-center gap-3 p-4 text-left transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: bg,
                borderRadius: "1.25rem",
                border: `2px solid ${borderColor}`,
                color: isCorrectOrSelected ? "#fff" : "var(--ink)",
              }}
            >
              <span className="text-2xl">{opt.flag}</span>
              <div>
                <p className="font-semibold text-sm">{opt.language}</p>
                <p
                  className="text-xs"
                  style={{
                    color: isCorrectOrSelected ? "rgba(255,255,255,0.8)" : "var(--muted)",
                  }}
                >
                  {opt.region}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="text-center">
          <p
            className="text-lg font-semibold mb-3"
            style={{
              color: selected === currentQ.greeting.id ? "var(--success)" : "var(--error)",
            }}
          >
            {selected === currentQ.greeting.id
              ? "🎉 Correct!"
              : `❌ It was ${currentQ.greeting.language}`}
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            {currentQ.greeting.funFact}
          </p>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "0.75rem",
            }}
          >
            Next question →
          </button>
        </div>
      )}
    </div>
  );
}
