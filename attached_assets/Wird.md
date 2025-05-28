
# ==Wird | Poster Application==

## Overview

**Wird | Poster Application** is a professional and automated Quran verse posting system for Mastodon.  
The app enables users to connect their Mastodon account once, and from there, the backend takes over — posting one verse from the Quran daily at 5:00 AM, forever.

---

## User Experience Flow (Frontend)

1. **Splash Screen**  
   The app starts with a visually stunning splash screen to establish branding and trust.

2. **Terms and Conditions Page**  
   Users are shown:
   - **Terms and Conditions**
   - **Privacy Policy**

3. **Mastodon account Setup**  
   - User is prompted to enter their **Mastodon instance**.
   - On clicking **"Next"**, the app:
     - Stores the Mastodon instance securely in **Firebase**.
     - start a full Oauth loging to the user account and accepte to give us the premesions to read and write the posts 

     - Redirects the user to the **Main Dashboard Page** After checing everything is done correctly.

4. **Main Dashboard Page**  
   This is the persistent UI page for the user after setup:
   - Displays the **User’s Mastodon instance**.
   - A bordered info box showing **“Number of Days Posted”** — auto-updated daily via backend logic.

 - A bordered info box showing **“A count down for the new post time ”** — auto-updated daily via backend logic.

 -  displayes  **“the username"**

---

## Backend Logic (Python with  Mastodon + Firebase)

- **Daily Task at 5:00 AM** (Scheduled via `schedule` or a CRON job):
  - Loads Quran verses from a structured `verses.json` file.
  - Posts one verse each day in order from:
    - **First verse of Surah Al-Baqarah**
    - ... to the **last verse of Surah An-Nas**.
    - **Loops infinitely ♾️**

- **Post Format Example**:
  ```
  ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ
  [Surah Al-Fatiha, Verse 2]
  ```

- **Persistent Data**:
  - Firebase stores:
    - Mastodon instance
    - Start date
    - Posted count per user
  - Backend keeps track of verse index per page and loops it on completion.

---


## Technologies Used

### Frontend:
- **React native** —.
- **React Three Fiber** — declarative 3D rendering using Three.js
- **Drei** — helpers for cameras, lighting, controls
- **GSAP (GreenSock)** — professional-grade animations
- **Tailwind CSS** — modern styling framework
- **Framer Motion** — motion design and smooth transitions
- **ShadCN/UI** — accessible and customizable UI components

### Backend:
- **Python**
  - Flask or FastAPI
  - Mastodon tookens 
  - Firebase Admin SDK
  - `schedule` / CRON job for 5:00 AM automation
- **Firebase**:
  - Realtime Database / Firestore for storing Mastodon instance and logs



## JSON Format (`verses.json`)

```json
[
    {
        "Name": "الفاتحة",
        "English_Name": "The Opening",
        "Number": 1,
        "Number_Verses": 7,
        "Number_Words": 29,
        "Number_Letters": 139,
        "Descent": "مكية",
        "Surah": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (2) الرَّحْمَنِ الرَّحِيمِ (3) مَالِكِ يَوْمِ الدِّينِ (4) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (5) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (6) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (7)",
        "getElementById": "surah_number_1",
        "Surah_English": "[All] praise is [due] to Allah, Lord of the worlds (2) The Entirely Merciful, the Especially Merciful (3) Sovereign of the Day of Recompense (4) It is You we worship and You we ask for help (5) Guide us to the straight path (6) The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray (7)",
        "Name_Translation": "Al-Fatihah",
        "Descent_English": "meccan",
        "Array_Verses": [
            {
                "id": 1,
                "ar": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
                "en": "In the name of Allah, the Entirely Merciful, the Especially Merciful"
            }
        ]
    }
]
```


## Example Daily Task Logic (Pseudocode)

```python
def post_daily_verse():
    page_id = get_page_id_from_firebase()
    verse = get_next_verse_for_page(page_id)
    message = f"{verse['text']}\n[Surah {verse['surah']}, Verse {verse['verse']}]"
    post_to_facebook(page_id, message)
    update_firebase_log(page_id)
```

---

## Vision

This application will:
- **Never stop posting.**
- **Serve spiritual content daily automatically.**
- Help millions by keeping their audience engaged with Allah’s words every morning.

---


## About  
**Wird** is an open-source initiative designed to automate the sharing of Quranic verses on Mastodon accounts, fostering spiritual engagement with minimal effort. Inspired by the concept of *Sadaqah Jariyah* (ongoing charity), Wird empowers account administrators to consistently share divine wisdom, ensuring their audience starts each day with a reminder from the Quran. Built by a global community of Muslim developers, this project aims to bridge technology and faith, making religious content accessible to millions worldwide.  

---

## How It Works  

### For Users:  
1. **Connect Your Mastodon account**:  
   - Enter your Mastodon instance once. 
    - Authentic your mastodon account.
   - Wird securely stores this information using Firebase.  
2. **Automated Daily Posts**:  
   - At 5:00 AM every day, Helal posts a Quranic verse to your account.  
   - Verses cycle sequentially from Surah Al-Baqarah to Surah An-Nas, looping infinitely.  
3. **Track Progress**:  
   - The dashboard displays the number of days verses have been posted.  

### For Developers:  
1. **Backend Automation**:  
   - A Python-based scheduler (CRON or `schedule`) triggers daily tasks.  
   - Verses are fetched from `verses.json`, formatted, and posted via the Mastodon.  
   - Firebase tracks each page’s progress (e.g., current verse index).  
2. **Extensible Structure**:  
   - The `verses.json` file is modular, allowing contributors to add translations, tafsir, or new languages.  
   - Developers can enhance features like analytics, multi-platform support, or UI customization.  

---

## Download the APK  
Wird is available as a **Android APK** for seamless installation. Download the latest release here:  
🔗 [Download Wird APK](#) *(Replace with actual download link)*  

---

## For Developers: Contributing & Source Code  

### Source Code  
Wird is proudly open-source under the **Apache License**. Explore, fork, and contribute to the repositories:   
- **Source code**: [GitHub Link](#)
- **Mobile App (APK)**: [GitHub Link](#) *(Android build pipeline and APK generation)*  

### How to Contribute:  
1. **Report Issues**: Submit bugs or feature requests via GitHub Issues.  
2. **Improve Verses**: Add translations, correct transliterations, or enhance metadata in `verses.json`.  
3. **Enhance Features**: Build new UI components, optimize scheduling logic, or integrate additional social platforms.  
4. **Documentation**: Improve setup guides, tutorials, or translate documentation into other languages.  

### Local Setup:  
1. Clone the repositories:  
   ```bash  
   git clone [src-repo-url]  
   git clone [mobile-repo-url]  # For APK development  
   ```  
2. Install dependencies and configure Firebase/API keys (see repo-specific `README.md`).  
3. Run the backend scheduler, frontend dev server, or build the APK using Android Studio.  

---

## Vision  
Wird aspires to:  
- **Automate Spirituality**: Deliver Quranic content daily without manual intervention.  
- **Scale Generously**: Serve millions of accounts and users globally.  
- **Empower Communities**: Enable mosques, educators, and individuals to share Islamic knowledge effortlessly.  

---

## License  
Wird is a *Sadaqah Jariyah* project — free, open-source, and community-driven. Licensed under **Apache**, it welcomes all contributions to sustain this eternal charity.  

--- 

*“Whoever guides someone to goodness will have a reward like one who did it.”*  
**— Sahih Muslim 1893**  

Join us in spreading light, one verse at a time. 🌙💻  
``` 

