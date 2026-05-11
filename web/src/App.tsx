import { useState, useCallback, useEffect } from "react";
import { Shell } from "./components/Shell";
import { HeroGreeting } from "./components/HeroGreeting";
import { BrowseView } from "./components/BrowseView";
import { QuizView } from "./components/QuizView";
import { greetings } from "./data/greetings";

type Page = "home" | "browse" | "quiz" | "favorites";

const STORAGE_KEY = "helloworld_data";

interface AppData {
  favorites: string[];
  quizCorrect: number;
  quizTotal: number;
}

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { favorites: [], quizCorrect: 0, quizTotal: 0 };
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const navItems = [
  { id: "home" as const, label: "Home", icon: "👋" },
  { id: "browse" as const, label: "Browse", icon: "🌍" },
  { id: "quiz" as const, label: "Quiz", icon: "🧠" },
  { id: "favorites" as const, label: "Favorites", icon: "❤️" },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [data, setData] = useState<AppData>(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const favorites = new Set(data.favorites);

  const toggleFavorite = useCallback((id: string) => {
    setData((prev) => {
      const set = new Set(prev.favorites);
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }
      return { ...prev, favorites: Array.from(set) };
    });
  }, []);

  const handleScoreUpdate = useCallback((correct: boolean) => {
    setData((prev) => ({
      ...prev,
      quizCorrect: prev.quizCorrect + (correct ? 1 : 0),
      quizTotal: prev.quizTotal + 1,
    }));
  }, []);

  return (
    <Shell navItems={navItems} activeNav={page} onNavChange={(id) => setPage(id as Page)}>
      {page === "home" && (
        <div>
          <HeroGreeting greetings={greetings} />

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8"
          >
            <div
              className="text-center p-4"
              style={{
                background: "var(--panel)",
                borderRadius: "1.25rem",
                border: "1px solid var(--line)",
              }}
            >
              <p className="text-2xl font-bold" style={{ fontFamily: "Fraunces, serif" }}>
                {greetings.length}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Languages
              </p>
            </div>
            <div
              className="text-center p-4"
              style={{
                background: "var(--panel)",
                borderRadius: "1.25rem",
                border: "1px solid var(--line)",
              }}
            >
              <p className="text-2xl font-bold" style={{ fontFamily: "Fraunces, serif" }}>
                {data.favorites.length}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Favorites
              </p>
            </div>
            <div
              className="text-center p-4"
              style={{
                background: "var(--panel)",
                borderRadius: "1.25rem",
                border: "1px solid var(--line)",
              }}
            >
              <p className="text-2xl font-bold" style={{ fontFamily: "Fraunces, serif" }}>
                {data.quizTotal > 0
                  ? `${Math.round((data.quizCorrect / data.quizTotal) * 100)}%`
                  : "—"}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Quiz Score
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setPage("browse")}
              className="px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "0.75rem",
                color: "var(--ink)",
              }}
            >
              🌍 Browse all greetings
            </button>
            <button
              onClick={() => setPage("quiz")}
              className="px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "0.75rem",
                color: "var(--ink)",
              }}
            >
              🧠 Test your knowledge
            </button>
          </div>

          {/* Random greeting of the day */}
          <div
            className="max-w-md mx-auto p-5 text-center"
            style={{
              background: "var(--panel)",
              borderRadius: "1.25rem",
              border: "1px solid var(--line)",
            }}
          >
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted)" }}>
              💡 Did you know?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
              {greetings[Math.floor(Date.now() / 86400000) % greetings.length].funFact}
            </p>
          </div>
        </div>
      )}

      {page === "browse" && (
        <BrowseView
          greetings={greetings}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {page === "quiz" && (
        <QuizView
          greetings={greetings}
          onScoreUpdate={handleScoreUpdate}
          stats={{ correct: data.quizCorrect, total: data.quizTotal }}
        />
      )}

      {page === "favorites" && (
        <BrowseView
          greetings={greetings}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          showFavoritesOnly
        />
      )}
    </Shell>
  );
}
