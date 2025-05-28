import fs from 'fs';
import path from 'path';
import { Verse } from '@shared/schema';
import { storage } from './storage';

// Simplified version of the Quran verses structure
interface QuranVerse {
  id: number;
  ar: string;
  en: string;
}

interface QuranSurah {
  Number: number;
  Name: string;
  Name_Translation: string;
  Array_Verses: QuranVerse[];
}

// This would be populated with the full Quran data
const quranData: QuranSurah[] = [
  {
    "Number": 1,
    "Name": "الفاتحة",
    "Name_Translation": "Al-Fatihah",
    "Array_Verses": [
      {
        "id": 1,
        "ar": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
        "en": "In the name of Allah, the Entirely Merciful, the Especially Merciful"
      },
      {
        "id": 2,
        "ar": "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ",
        "en": "[All] praise is [due] to Allah, Lord of the worlds"
      },
      {
        "id": 3,
        "ar": "ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
        "en": "The Entirely Merciful, the Especially Merciful"
      },
      {
        "id": 4,
        "ar": "مَٰلِكِ يَوۡمِ ٱلدِّينِ",
        "en": "Sovereign of the Day of Recompense"
      },
      {
        "id": 5,
        "ar": "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ",
        "en": "It is You we worship and You we ask for help"
      },
      {
        "id": 6,
        "ar": "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ",
        "en": "Guide us to the straight path"
      },
      {
        "id": 7,
        "ar": "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ",
        "en": "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray"
      }
    ]
  },
  {
    "Number": 2,
    "Name": "البقرة",
    "Name_Translation": "Al-Baqarah",
    "Array_Verses": [
      {
        "id": 1,
        "ar": "الٓمٓ",
        "en": "Alif, Lam, Meem"
      },
      {
        "id": 2,
        "ar": "ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ",
        "en": "This is the Book about which there is no doubt, a guidance for those conscious of Allah"
      },
      {
        "id": 3,
        "ar": "ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ",
        "en": "Who believe in the unseen, establish prayer, and spend out of what We have provided for them"
      }
    ]
  }
];

export async function initializeVerses(): Promise<void> {
  // Check if verses are already initialized
  const count = await storage.getTotalVerseCount();
  if (count > 0) {
    console.log(`Verses database already contains ${count} verses.`);
    return;
  }

  console.log('Initializing Quran verses database...');

  // Process each surah and verse
  for (const surah of quranData) {
    for (const verse of surah.Array_Verses) {
      await storage.createVerse({
        surahNumber: surah.Number,
        surahName: surah.Name,
        surahNameEnglish: surah.Name_Translation,
        verseNumber: verse.id,
        verseText: verse.ar,
        verseTextEnglish: verse.en,
      });
    }
  }

  const totalVerses = await storage.getTotalVerseCount();
  console.log(`Successfully initialized ${totalVerses} Quran verses.`);
}

export async function getVerseByIndex(index: number): Promise<Verse | undefined> {
  return storage.getVerseByIndex(index);
}

export async function formatVerseForPosting(verse: Verse): Promise<string> {
  return `${verse.verseText}\n[Surah ${verse.surahNameEnglish}, Verse ${verse.verseNumber}]`;
}

export async function createVerse(verseData: any): Promise<Verse> {
  return storage.createVerse(verseData);
}
