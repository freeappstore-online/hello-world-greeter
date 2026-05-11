import { useState, useMemo } from "react";
import type { Greeting } from "../data/greetings";
import { GreetingCard } from "./GreetingCard";

interface BrowseViewProps {
  greetings: Greeting[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  showFavoritesOnly?: boolean;
  onSpeak: (text: string, langId: string) => void;
  isSpeaking: boolean;
  speakingLangId: string | null;
  soundEnabled: boolean;
}

const SCRIPTS = [
  "All",
  "Latin",
  "Cyrillic",
  "Arabic",
  "Devanagari",
  "CJK & East Asian",
  "Other",
];

function getScriptGroup(script: string): string {
  if (script === "Latin" || script.includes("Latin")) return "Latin";
  if (script === "Cyrillic") return "Cyrillic";
  if (script === "Arabic" || script.includes("Arabic")) return "Arabic";
  if (script === "Devanagari") return "Devanagari";
  if (["Hiragana", "Hangul", "Hanzi"].includes(script)) return "CJK & East Asian";
  return "Other";
}

export function BrowseView({
  greetings,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
  onSpeak,
  isSpeaking,
  speakingLangId,
  soundEnabled,
}: BrowseViewProps) {
  const [search, setSearch] = useState("");
  const [scriptFilter, setScriptFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = greetings;

    if (showFavoritesOnly) {
      result = result.filter((g) => favorites.has(g.id));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.language.toLowerCase().includes(q) ||
          g.greeting.toLowerCase().includes(q) ||
          g.region.toLowerCase().includes(q) ||
          (g.pronunciation && g.pronunciation.toLowerCase().includes(q))
      );
    }

    if (scriptFilter !== "All") {
      result = result.filter((g) => getScriptGroup(g.script) === scriptFilter);
    }

    return result;
  }, [greetings, search, scriptFilter, showFavoritesOnly, favorites]);

  return (
    <div>
      <h2
        className="text-2xl font-bold mb-5"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {showFavoritesOnly ? "Favorites ❤️" : "All Greetings 🌍"}
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search languages, greetings, regions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 text-sm outline-none transition-colors"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "0.75rem",
            color: "var(--ink)",
          }}
        />
      </div>

      {/* Script filter */}
      {!showFavoritesOnly && (
        <div className="flex flex-wrap gap-2 mb-6">
          {SCRIPTS.map((s) => (
            <button
              key={s}
              onClick={() => setScriptFilter(s)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                borderRadius: "0.5rem",
                background: scriptFilter === s ? "var(--accent)" : "var(--panel)",
                color: scriptFilter === s ? "#fff" : "var(--muted)",
                border: `1px solid ${scriptFilter === s ? "var(--accent)" : "var(--line)"}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">{showFavoritesOnly ? "💔" : "🔍"}</p>
          <p className="font-semibold mb-1" style={{ color: "var(--ink)" }}>
            {showFavoritesOnly ? "No favorites yet" : "No results found"}
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {showFavoritesOnly
              ? "Tap the heart on any greeting to save it here"
              : "Try a different search or filter"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <GreetingCard
              key={g.id}
              greeting={g}
              isFavorite={favorites.has(g.id)}
              onToggleFavorite={onToggleFavorite}
              onSpeak={onSpeak}
              isSpeaking={isSpeaking && speakingLangId === g.id}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>
      )}

      <p className="text-xs mt-6 text-center" style={{ color: "var(--muted)" }}>
        {filtered.length} greeting{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
