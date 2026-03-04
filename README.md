# 🎵 Moodify

> **Let your face choose the music.**
> Moodify detects your facial expression in real-time using your webcam and plays a song that matches your mood.

---

## ✨ Features

- 🎭 **Real-time face expression detection** via MediaPipe Face Landmarker (runs fully in-browser, no server needed)
- 🎵 **Mood-based song playback** — detects Happy, Sad, Surprised, or Neutral and fetches a matching track
- 🔐 **JWT authentication** — register & login with email or username
- 🎧 **Full-featured audio player** — play/pause, skip ±10s, progress bar, volume control, playback speed (0.5× – 2×)
- ☁️ **Cloud storage** — songs and album art stored on ImageKit CDN
- 💜 **Glassmorphism UI** — dark frosted-glass design consistent across all pages

---

## 🖥️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 + Vite | UI framework & dev server |
| React Router v7 | Client-side routing |
| @mediapipe/tasks-vision | In-browser face landmark detection |
| Axios | HTTP client |
| SCSS | Styling (glassmorphism design system) |

### Backend
| Tech | Purpose |
|---|---|
| Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JWT + bcryptjs | Authentication & password hashing |
| ImageKit | Cloud storage for songs & posters |
| Multer | File upload handling |
| node-id3 | Reading MP3 metadata (title, album art) |
| Redis (ioredis) | Session / caching layer |
| cookie-parser | Cookie-based auth |

---

## 📁 Project Structure

```
Moodify-Cohort/
├── Frontend/
│   └── src/
│       ├── features/
│       │   ├── auth/           # Login, Register, JWT auth flow
│       │   ├── home/           # Home page, Player, SongContext
│       │   └── Expression/     # Webcam + MediaPipe face detection
│       └── App.jsx
│
└── Backend/
    └── src/
        ├── controllers/        # auth.controller, songs.controller
        ├── models/             # User, Song mongoose schemas
        ├── routes/             # /api/auth, /api/songs
        ├── middlewears/        # JWT auth, Multer upload
        ├── services/           # ImageKit storage service
        └── config/             # DB connection, env config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- ImageKit account
- Redis (local or Upstash)

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Moodify-Cohort.git
cd Moodify-Cohort
```

---

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

REDIS_URL=your_redis_url
```

Start the backend:

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

---

### 3. Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Route | Description |
|---|---|---|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login with email or username |

### Songs — `/api/songs`
| Method | Route | Description |
|---|---|---|
| `POST` | `/` | Upload a song (multipart/form-data, field: `song`, body: `mood`) |
| `GET` | `/?mood=happy` | Fetch a random song by mood |

**Mood values:** `happy` · `sad` · `surprised`

---

## 🎭 How Expression Detection Works

1. MediaPipe `FaceLandmarker` runs in the browser, analysing the live webcam feed
2. On button click, it reads **facial blendshape scores** (muscle movement values 0–1):
   - **Happy** → `mouthSmileLeft > 0.5` AND `mouthSmileRight > 0.5`
   - **Surprised** → `jawOpen > 0.3` AND `browInnerUp > 0.2`
   - **Sad** → `mouthFrownLeft > 0.15` OR `mouthFrownRight > 0.15`
   - **Neutral** → none of the above
3. The detected mood is sent to the backend, which returns a matching song from MongoDB
4. The Player auto-loads and plays the song

---

## 🎨 UI Design

All pages share a consistent **glassmorphism design system**:
- Background: deep navy `#0f172a` with blurred purple ambient blobs
- Cards: `rgba(255,255,255,0.05)` with `backdrop-filter: blur(24px)` frosted glass
- Accent: purple/indigo `#8b5cf6` / `#6366f1`
- Mood-reactive colors on the Player (poster ring, progress bar, play button glow)

---

## 📸 App Flow

```
User opens app
    └── Login / Register
            └── Home Page
                    ├── Mood Scanner (left card)
                    │     └── Webcam feed → click "Detect My Mood"
                    │             └── Expression detected → API call
                    └── Player (right card)
                              └── Song fetched → plays automatically
                                      └── Poster spins while playing 🎵
```

---

## 🧑‍💻 Author

Built with ❤️ during **Sheriyan's Coding School – Cohort 2.0**
