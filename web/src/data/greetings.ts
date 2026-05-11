export interface Greeting {
  id: string;
  language: string;
  greeting: string;
  pronunciation?: string;
  flag: string;
  region: string;
  script: string;
  funFact: string;
}

export const greetings: Greeting[] = [
  { id: "en", language: "English", greeting: "Hello!", flag: "🇬🇧", region: "Global", script: "Latin", funFact: "\"Hello\" became popular after the telephone was invented — Thomas Edison suggested it as a phone greeting." },
  { id: "es", language: "Spanish", greeting: "¡Hola!", flag: "🇪🇸", region: "Spain & Latin America", script: "Latin", funFact: "Spanish is spoken in 20 countries, making it one of the most geographically widespread languages." },
  { id: "fr", language: "French", greeting: "Bonjour!", flag: "🇫🇷", region: "France & Francophone", script: "Latin", funFact: "\"Bonjour\" literally means \"good day\" — it's considered rude in France not to say it when entering a shop." },
  { id: "de", language: "German", greeting: "Hallo!", flag: "🇩🇪", region: "Central Europe", script: "Latin", funFact: "German has three grammatical genders and can create incredibly long compound words." },
  { id: "it", language: "Italian", greeting: "Ciao!", flag: "🇮🇹", region: "Italy", script: "Latin", funFact: "\"Ciao\" comes from Venetian dialect meaning \"I am your slave\" — a humble greeting that went global." },
  { id: "pt", language: "Portuguese", greeting: "Olá!", flag: "🇵🇹", region: "Portugal & Brazil", script: "Latin", funFact: "Portuguese is the most spoken language in the Southern Hemisphere, largely thanks to Brazil." },
  { id: "nl", language: "Dutch", greeting: "Hallo!", flag: "🇳🇱", region: "Netherlands & Belgium", script: "Latin", funFact: "Dutch gave English words like \"cookie,\" \"boss,\" and \"Santa Claus\" (from Sinterklaas)." },
  { id: "sv", language: "Swedish", greeting: "Hej!", flag: "🇸🇪", region: "Scandinavia", script: "Latin", funFact: "Sweden has a word \"lagom\" meaning \"just the right amount\" — there's no English equivalent." },
  { id: "no", language: "Norwegian", greeting: "Hei!", flag: "🇳🇴", region: "Scandinavia", script: "Latin", funFact: "Norway has two official written forms: Bokmål and Nynorsk." },
  { id: "da", language: "Danish", greeting: "Hej!", flag: "🇩🇰", region: "Scandinavia", script: "Latin", funFact: "Danish has a concept called \"hygge\" — a feeling of cozy contentment that's untranslatable." },
  { id: "fi", language: "Finnish", greeting: "Hei!", flag: "🇫🇮", region: "Finland", script: "Latin", funFact: "Finnish is not related to Swedish or other Scandinavian languages — it's part of the Uralic family." },
  { id: "pl", language: "Polish", greeting: "Cześć!", pronunciation: "Cheshch", flag: "🇵🇱", region: "Eastern Europe", script: "Latin", funFact: "Polish has 7 grammatical cases and some of the longest consonant clusters in any language." },
  { id: "cs", language: "Czech", greeting: "Ahoj!", flag: "🇨🇿", region: "Central Europe", script: "Latin", funFact: "The Czech word \"robot\" was invented by Karel Čapek in 1920 and adopted worldwide." },
  { id: "ro", language: "Romanian", greeting: "Salut!", flag: "🇷🇴", region: "Eastern Europe", script: "Latin", funFact: "Romanian is the closest living language to Latin, more so than Italian or Spanish." },
  { id: "hu", language: "Hungarian", greeting: "Szia!", pronunciation: "See-ya", flag: "🇭🇺", region: "Central Europe", script: "Latin", funFact: "Hungarian is unrelated to its neighboring languages — it's from the Uralic family, like Finnish." },
  { id: "el", language: "Greek", greeting: "Γεια σου!", pronunciation: "Ya soo", flag: "🇬🇷", region: "Greece & Cyprus", script: "Greek", funFact: "Greek has been spoken for over 3,400 years, making it one of the oldest recorded languages." },
  { id: "ru", language: "Russian", greeting: "Привет!", pronunciation: "Privet", flag: "🇷🇺", region: "Russia & Eastern Europe", script: "Cyrillic", funFact: "Russian is the most widely spoken Slavic language and was the first language spoken in space." },
  { id: "uk", language: "Ukrainian", greeting: "Привіт!", pronunciation: "Pryvit", flag: "🇺🇦", region: "Ukraine", script: "Cyrillic", funFact: "Ukrainian was voted the second most beautiful language in the world at a Paris linguistic contest." },
  { id: "ja", language: "Japanese", greeting: "こんにちは!", pronunciation: "Konnichiwa", flag: "🇯🇵", region: "Japan", script: "Hiragana", funFact: "Japanese uses three writing systems simultaneously: Hiragana, Katakana, and Kanji." },
  { id: "zh", language: "Chinese (Mandarin)", greeting: "你好!", pronunciation: "Nǐ hǎo", flag: "🇨🇳", region: "China & East Asia", script: "Hanzi", funFact: "Mandarin has 4 tones — saying \"ma\" in different tones can mean mother, hemp, horse, or scold." },
  { id: "ko", language: "Korean", greeting: "안녕하세요!", pronunciation: "Annyeonghaseyo", flag: "🇰🇷", region: "Korea", script: "Hangul", funFact: "Hangul was scientifically designed by King Sejong in 1443 — it's considered one of the most logical alphabets." },
  { id: "hi", language: "Hindi", greeting: "नमस्ते!", pronunciation: "Namaste", flag: "🇮🇳", region: "India", script: "Devanagari", funFact: "\"Namaste\" means \"I bow to the divine in you\" — it's both a greeting and a spiritual gesture." },
  { id: "bn", language: "Bengali", greeting: "নমস্কার!", pronunciation: "Nomoshkar", flag: "🇧🇩", region: "Bangladesh & India", script: "Bengali", funFact: "Bengali is the 7th most spoken language in the world with over 230 million speakers." },
  { id: "ta", language: "Tamil", greeting: "வணக்கம்!", pronunciation: "Vanakkam", flag: "🇮🇳", region: "South India & Sri Lanka", script: "Tamil", funFact: "Tamil is one of the longest-surviving classical languages, with literature dating back over 2,000 years." },
  { id: "th", language: "Thai", greeting: "สวัสดี!", pronunciation: "Sawasdee", flag: "🇹🇭", region: "Thailand", script: "Thai", funFact: "Thai has 5 tones and 44 consonants — the script has no spaces between words." },
  { id: "vi", language: "Vietnamese", greeting: "Xin chào!", pronunciation: "Sin chow", flag: "🇻🇳", region: "Vietnam", script: "Latin (modified)", funFact: "Vietnamese uses Latin script with extra diacritics — it has 6 tones that change word meanings." },
  { id: "id", language: "Indonesian", greeting: "Halo!", flag: "🇮🇩", region: "Indonesia", script: "Latin", funFact: "Indonesian was created as a unifying language for over 700 languages spoken across 17,000 islands." },
  { id: "ms", language: "Malay", greeting: "Hai!", flag: "🇲🇾", region: "Malaysia & Southeast Asia", script: "Latin", funFact: "Malay and Indonesian are mutually intelligible — they're essentially the same language with different standards." },
  { id: "tl", language: "Filipino", greeting: "Kumusta!", flag: "🇵🇭", region: "Philippines", script: "Latin", funFact: "\"Kumusta\" comes from the Spanish \"¿Cómo está?\" — showing centuries of Spanish influence." },
  { id: "ar", language: "Arabic", greeting: "!مرحبا", pronunciation: "Marhaba", flag: "🇸🇦", region: "Middle East & North Africa", script: "Arabic", funFact: "Arabic is written right-to-left and has influenced many languages including Spanish, Portuguese, and Swahili." },
  { id: "he", language: "Hebrew", greeting: "!שלום", pronunciation: "Shalom", flag: "🇮🇱", region: "Israel", script: "Hebrew", funFact: "Hebrew was revived as a spoken language in the 19th century after centuries of being used only in religion." },
  { id: "fa", language: "Persian", greeting: "!سلام", pronunciation: "Salaam", flag: "🇮🇷", region: "Iran & Central Asia", script: "Arabic (modified)", funFact: "Persian has barely changed in 1,000 years — modern Iranians can still read medieval poetry." },
  { id: "tr", language: "Turkish", greeting: "Merhaba!", flag: "🇹🇷", region: "Turkey & Central Asia", script: "Latin", funFact: "Turkish switched from Arabic to Latin script in 1928 — the whole country had to relearn reading overnight." },
  { id: "sw", language: "Swahili", greeting: "Jambo!", flag: "🇰🇪", region: "East Africa", script: "Latin", funFact: "\"Hakuna Matata\" is real Swahili — it genuinely means \"no worries\" in Kenya and Tanzania." },
  { id: "zu", language: "Zulu", greeting: "Sawubona!", flag: "🇿🇦", region: "South Africa", script: "Latin", funFact: "\"Sawubona\" means \"I see you\" — it's a profound acknowledgment of someone's existence." },
  { id: "am", language: "Amharic", greeting: "ሰላም!", pronunciation: "Selam", flag: "🇪🇹", region: "Ethiopia", script: "Ge'ez", funFact: "Amharic uses the ancient Ge'ez script with 231 characters — each representing a consonant-vowel combo." },
  { id: "yo", language: "Yoruba", greeting: "Bawo ni!", flag: "🇳🇬", region: "West Africa", script: "Latin", funFact: "Yoruba is a tonal language with 3 tones and is one of the largest languages in Africa." },
  { id: "ga", language: "Irish", greeting: "Dia duit!", pronunciation: "Dee-a gwit", flag: "🇮🇪", region: "Ireland", script: "Latin", funFact: "\"Dia duit\" literally means \"God be with you\" — the response is \"Dia is Muire duit\" (God and Mary be with you)." },
  { id: "cy", language: "Welsh", greeting: "Helo!", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", region: "Wales", script: "Latin", funFact: "Welsh has been spoken continuously for over 1,500 years and is experiencing a revival." },
  { id: "is", language: "Icelandic", greeting: "Halló!", flag: "🇮🇸", region: "Iceland", script: "Latin", funFact: "Icelandic has changed so little that modern speakers can read 800-year-old Viking sagas." },
  { id: "ka", language: "Georgian", greeting: "გამარჯობა!", pronunciation: "Gamarjoba", flag: "🇬🇪", region: "Georgia", script: "Georgian", funFact: "Georgian has its own unique alphabet with 33 letters — one of only 14 scripts still in use today." },
  { id: "hy", language: "Armenian", greeting: "Բարև!", pronunciation: "Barev", flag: "🇦🇲", region: "Armenia", script: "Armenian", funFact: "The Armenian alphabet was created in 405 AD and has remained virtually unchanged since." },
  { id: "mn", language: "Mongolian", greeting: "Сайн уу!", pronunciation: "Sain uu", flag: "🇲🇳", region: "Mongolia", script: "Cyrillic", funFact: "Mongolia is reviving its traditional vertical script, which is written top-to-bottom, left-to-right." },
  { id: "ne", language: "Nepali", greeting: "नमस्ते!", pronunciation: "Namaste", flag: "🇳🇵", region: "Nepal", script: "Devanagari", funFact: "Nepal is the only country with a non-rectangular flag — and Nepali is its sole official language." },
  { id: "si", language: "Sinhala", greeting: "ආයුබෝවන්!", pronunciation: "Ayubowan", flag: "🇱🇰", region: "Sri Lanka", script: "Sinhala", funFact: "\"Ayubowan\" means \"may you live long\" — one of the most heartfelt greetings in any language." },
  { id: "km", language: "Khmer", greeting: "សួស្តី!", pronunciation: "Suosdey", flag: "🇰🇭", region: "Cambodia", script: "Khmer", funFact: "Khmer has the largest alphabet in the world with 74 letters according to Guinness World Records." },
  { id: "my", language: "Burmese", greeting: "မင်္ဂလာပါ!", pronunciation: "Mingalaba", flag: "🇲🇲", region: "Myanmar", script: "Burmese", funFact: "Burmese script is famously round because it was originally written on palm leaves that would tear with straight lines." },
  { id: "ha", language: "Hausa", greeting: "Sannu!", flag: "🇳🇬", region: "West Africa", script: "Latin", funFact: "Hausa is the most widely spoken language in West Africa with over 70 million speakers." },
  { id: "mg", language: "Malagasy", greeting: "Manao ahoana!", flag: "🇲🇬", region: "Madagascar", script: "Latin", funFact: "Malagasy is related to Indonesian languages — ancient sailors crossed the Indian Ocean to settle Madagascar." },
  { id: "eo", language: "Esperanto", greeting: "Saluton!", flag: "🟢", region: "Worldwide", script: "Latin", funFact: "Esperanto was created in 1887 as a universal second language — it has up to 2 million speakers today." },
];
