# 🤖 Noma Tipp-Trainer

**Noma** steht für **No**ah und **Ma**rkus – ein spielerischer 10-Finger-Tipp-Trainer, der als gemeinsames Projekt entstanden ist.

🌐 **Live**: [profmarkusthu.github.io/noma-tipp-trainer](https://profmarkusthu.github.io/noma-tipp-trainer/)

---

## 🎮 Spielprinzip

Buchstaben-Blöcke kommen von rechts auf den Roboter-Spieler zu. Tippe die richtige Taste (oder Tastenfolge), um den Block zu zerstören – bevor er den Roboter trifft! Du hast 3 Leben. Je schneller du tippst, desto mehr Blöcke kommen.

- **Einzelne Zeichen**: `f`, `j`
- **Wiederholungen**: `ff`, `jjj`, `ffff` – je nach Lektion
- **Wörter**: `das`, `die`, `und` – im Fortgeschrittenen-Modus

---

## 📚 Lektionen

| # | Tasten | Blöcke | Besonderheit |
|---|--------|--------|--------------|
| 1 | f, j | 30 | Nur 2 Tasten, bis zu 4x Wiederholung |
| 2 | f, j, d, k | 35 | 4 Tasten |
| 3 | f, j, d, k, s, l | 40 | Vollständige Grundstellung |
| 4 | + a, ö, e, i | 45 | Vokale |
| 5 | + r, t, n, u, m | 50 | Obere Reihe |
| 6 | + g, h, c, v, b | 50 | Untere Reihe |
| 7 | Wortmodus | 30 | Echte deutsche Wörter |

---

## 🛠️ Technik

- **Frontend**: React 19 + TypeScript + Vite 6
- **State**: Zustand (mit localStorage-Persistenz)
- **Rendering**: HTML Canvas (60fps, delta-time)
- **Tests**: Vitest (44 Tests)
- **Deployment**: GitHub Actions → GitHub Pages

### Projektstruktur

```
src/
├── components/
│   ├── game/         # Canvas-Rendering
│   ├── screens/      # Menu, Lektionen, Spiel, Ergebnis
│   └── ui/           # Button, KeyCap, VirtualKeyboard
├── engine/           # Game-Loop, Physics, Spawn, Kollision
├── config/           # Lektionen, Tastatur-Layout, Settings
├── store/            # Zustand-Stores (Game, Progress, Lesson)
├── themes/           # Theme-System
└── types/            # TypeScript-Interfaces
```

---

## 📖 Dokumentation

- [Architektur (arch.md)](arch.md) – Technische Architektur, Game Loop, State Management
- [Anforderungen (srs.md)](srs.md) – Software Requirements Specification

---

## 💾 Fortschritt speichern

Im Lektionen-Menü gibt es einen **Export**-Button, der deinen Fortschritt als `noma-fortschritt.json` herunterlädt. Mit dem **Import**-Button kannst du eine gespeicherte Datei wieder laden – z.B. um auf einem anderen Gerät weiterzumachen.

---

## 🚀 Lokal starten

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:5173
npm test         # Tests laufen lassen
npm run build    # Produktions-Build
```

---

## 👨‍👦 Über Noma

Dieses Projekt wurde von Markus und Noah gemeinsam entwickelt. Noah lernt das 10-Finger-Tippen, Markus hat den Trainer dafür gebaut.
