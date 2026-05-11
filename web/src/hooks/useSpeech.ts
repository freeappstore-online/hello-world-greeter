import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "helloworld_sound";

/** BCP-47 language tags for speech synthesis */
const LANG_MAP: Record<string, string> = {
  en: "en-GB",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  nl: "nl-NL",
  sv: "sv-SE",
  no: "nb-NO",
  da: "da-DK",
  fi: "fi-FI",
  pl: "pl-PL",
  cs: "cs-CZ",
  ro: "ro-RO",
  hu: "hu-HU",
  el: "el-GR",
  ru: "ru-RU",
  uk: "uk-UA",
  ja: "ja-JP",
  zh: "zh-CN",
  ko: "ko-KR",
  hi: "hi-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  th: "th-TH",
  vi: "vi-VN",
  id: "id-ID",
  ms: "ms-MY",
  tl: "fil-PH",
  ar: "ar-SA",
  he: "he-IL",
  fa: "fa-IR",
  tr: "tr-TR",
  sw: "sw-KE",
  zu: "zu-ZA",
  am: "am-ET",
  yo: "yo-NG",
  ga: "ga-IE",
  cy: "cy-GB",
  is: "is-IS",
  ka: "ka-GE",
  hy: "hy-AM",
  mn: "mn-MN",
  ne: "ne-NP",
  si: "si-LK",
  km: "km-KH",
  my: "my-MM",
  ha: "ha-NG",
  mg: "mg-MG",
  eo: "eo",
};

export function useSpeech() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      if (prev) {
        // Turning off — cancel any current speech
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
      }
      return !prev;
    });
  }, []);

  const speak = useCallback(
    (text: string, langId: string) => {
      if (!soundEnabled) return;
      if (!window.speechSynthesis) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Clean up the text — remove punctuation marks that aren't part of the word
      const cleanText = text.replace(/[!¡¿?]/g, "").trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = LANG_MAP[langId] || langId;
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to find a matching voice
      const voices = window.speechSynthesis.getVoices();
      const targetLang = LANG_MAP[langId] || langId;
      const matchingVoice = voices.find(
        (v) => v.lang === targetLang || v.lang.startsWith(targetLang.split("-")[0])
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [soundEnabled]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Preload voices (some browsers need this)
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis?.getVoices();
    };
    loadVoices();
    window.speechSynthesis?.addEventListener?.("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis?.removeEventListener?.("voiceschanged", loadVoices);
    };
  }, []);

  return { soundEnabled, toggleSound, speak, isSpeaking };
}
