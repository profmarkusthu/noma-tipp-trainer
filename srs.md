# Software Requirements Specification (SRS)
## 10-Finger-Schreibtrainer Web-App

---

## 1. Überblick

Der Schreibtrainer ist eine interaktive Web-Anwendung zum Erlernen des 10-Finger-Schreibsystems auf der QWERTZ-Tastatur. Das Spiel kombiniert Gamification (Score, Sterne, Fortschritt) mit progressiven Lektionen, um Tippgeschwindigkeit und Genauigkeit zu trainieren.

---

## 2. Funktionale Anforderungen

### 2.1 Spielmechanik

#### 2.1.1 Game Scene (Oberes Canvas)
- **Spielfeld:** Ein 1024×600px großes Canvas-Element zeigt das Spiel
- **Hintergrund:** Einstellbar pro Theme (Standard: himmelblau)
- **Plattform:** Braune Plattform unten, auf der der Spieler steht
- **Spieler (Männchen):**
  - Startet links in der Mitte der Plattform
  - Läuft nach rechts wenn Blöcke zerstört werden
  - Animierter Charakter mit Run/Idle/Die-Animationen
  - Sprite-basiert (8 Frames für Run-Animation)

#### 2.1.2 Buchstabenblöcke
- **Spawning:** Blöcke entstehen rechts vom Canvas-Rand
- **Bewegung:** Bewegen sich nach links mit spielabhängiger Geschwindigkeit
- **Anzeige:** Große, lesbare Buchstaben zentral im Block
- **Zerstörung:** Wenn richtige Taste gedrückt → Block zerspringt mit Animation
- **Maximale Anzahl:** ~20 gleichzeitig auf dem Screen
- **Spawn-Rate:** ~1.5 Blöcke pro Sekunde

#### 2.1.3 Verfolgender Ball
- **Startposition:** Links außerhalb des Canvas
- **Bewegung:** Bewegt sich konstant nach rechts
- **Geschwindigkeit:** Startet bei Lektions-minSpeed, steigt mit Schwierigkeit
- **Kollision:** Wenn Ball den Spieler erreicht → Game Over
- **Visuals:** Gelber Ball, 24×24px
- **Catch-Abstand:** Konfigurierbar pro Lektion (Standard: 400px von Spieler)

#### 2.1.4 Zieltaste-Highlighting
- **Aktuelle Ziel-Taste:** Von oben nach unten:
  1. Nächster Block wählen
  2. Erste Taste des Wortes/Buchstabens extrahieren
  3. Diese Taste gelb hervorheben in virtueller Tastatur
- **Fingerfarbung:** Alle Tasten haben Unterleisten in der zugehörigen Fingerfarbe
- **Feedback bei falscher Taste:** Rote Hervorhebung mit Shake-Animation

#### 2.1.5 Scoring
- **Punkte pro Block:** +10 Punkte für korrekt zerstörten Block
- **Keine Strafen:** Falsche Tasten ziehen keine Punkte ab
- **Score wird gespeichert:** Bestes Ergebnis pro Lektion

### 2.2 Lektionen

#### 2.2.1 Lektions-System
- **Lektion 1: Grundstellung**
  - Tasten: a, s, d, f, j, k, l, ö
  - Buchstaben-Modus (keine Wörter)
  - Min-Speed: 80px/s, Max: 150px/s
  - Erforderlicher Score: 20 Punkte
  - Sterne-Schwellen: 20/35/50 Punkte

- **Lektion 2: Mit E, I, R, T erweitern**
  - Tasten: a, s, d, f, e, i, r, t, j, k, l, ö
  - Buchstaben-Modus
  - Min-Speed: 85px/s, Max: 160px/s
  - Erforderlicher Score: 25 Punkte
  - Sterne-Schwellen: 25/40/60 Punkte

- **Lektion 3: Mit N, M, U, O abschließen**
  - Tasten: a, s, d, f, e, i, r, t, n, m, u, o, j, k, l, ö
  - Buchstaben-Modus
  - Min-Speed: 90px/s, Max: 170px/s
  - Erforderlicher Score: 30 Punkte
  - Sterne-Schwellen: 30/50/70 Punkte

- **Lektion 4: Wörter tippen**
  - Wort-Liste: "das", "die", "der", "und", "ist", etc.
  - Wort-Modus (ganze Wörter statt einzelne Buchstaben)
  - Min-Speed: 70px/s, Max: 140px/s
  - Erforderlicher Score: 15 Punkte
  - Sterne-Schwellen: 15/25/40 Punkte

#### 2.2.2 Lektions-Progressions-Logik
- Lektionen können in beliebiger Reihenfolge gespielt werden
- Best-Score und Stern-Rating pro Lektion
- Versuche-Zähler pro Lektion
- Completion-Datum wird gespeichert

#### 2.2.3 Wort-Modus
- Blöcke enthalten ganze Wörter statt einzelner Buchstaben
- Ziel-Taste ist der erste Buchstabe des Wortes
- Nach zerstörtem Block wird das nächste Wort automatisch Ziel
- Wichtig: Case-insensitive Vergleich (a == A)

### 2.3 Schwierigkeitssystem

#### 2.3.1 Dynamische Geschwindigkeit
- **Startgeschwindigkeit:** minSpeed der Lektion
- **Steigerung:** +Increment nach jedem korrekten Block
- **Maximum:** maxSpeed darf nicht überschritten werden
- **Anwendung:** Gilt für Block-Bewegungsgeschwindigkeit UND Ball-Geschwindigkeit

#### 2.3.2 Difficulty Progression
```
Score:    0    10    20    30    40    50...
Speed:   80   82    84    86    88    90... (für Lektion 1)
```

### 2.4 Benutzeroberfläche

#### 2.4.1 Menü-Screen
- Titel: "🎮 Schreibtrainer"
- Zwei Hauptbuttons: "Spielen" und "Lektionen"
- Kurze Anleitung der Spielmechanik
- Gradient-Hintergrund für visuellen Appeal

#### 2.4.2 Lektions-Auswahl-Screen
- Übersicht aller 4 Lektionen als Karten
- Pro Lektion angezeigt:
  - Titel und Beschreibung
  - Best Score
  - Versuche-Zähler
  - Sterne-Rating (⭐⭐⭐ oder "Nicht versucht")
- "Spielen"-Button für jede Lektion
- "Zurück"-Button

#### 2.4.3 Spiel-Screen
- Oben: Lektions-Titel + "Zurück"-Button
- Mittelteil: GameCanvas (1024×600)
- Unten: Virtuelle QWERTZ-Tastatur mit:
  - Alle Tasten visuell dargestellt
  - Ziel-Taste gelb hervorgehoben
  - Jede Taste mit Finger-Farbe gekennzeichnet
  - Legende: 10-Finger-Farben erklären
- HUD im Canvas:
  - Linkoben: "Score: XXX"
  - Mitte-oben: "Blocks: X/Y"
  - Game-Over Overlay bei Kollision
  - Level-Complete Overlay bei allen Blöcken zerstört

#### 2.4.4 Virtuelle Tastatur
- Alle 4 Reihen der QWERTZ-Tastatur
- Jede Taste ist 40×40px
- Border + Abgerundete Ecken
- Graue Hintergrundfarbe (standard)
- **Ziel-Taste:** Gelbe Hervorhebung mit Glow-Effekt
- **Gerade gedrückte Taste:** Leicht verkleinert (pressed effect)
- **Falsch gedrückte Taste:** Rot mit Shake-Animation (300ms)

### 2.5 Tastatur-Layout & 10-Finger-System

#### 2.5.1 Fingerzuordnung
```
Linke Hand:                  Rechte Hand:
Kleinfinger → A,Ä           Zeigefinger → H,J
Ringfinger → S              Mittelfinger → I,K
Mittelfinger → D            Ringfinger → L,Ö
Zeigefinger → F,G           Kleinfinger → Ä,Z,Ü

Beide Daumen → Leertaste
```

#### 2.5.2 Farb-Code pro Finger
| Finger | Farbe |
|--------|-------|
| Links Kleinfinger | Rot (#FF6B6B) |
| Links Ringfinger | Orange (#FF9F43) |
| Links Mittelfinger | Blau (#54A0FF) |
| Links Zeigefinger | Lila (#5F27CD) |
| Beide Daumen | Grau (#C8D6E5) |
| Rechts Zeigefinger | Türkis (#00D2D3) |
| Rechts Mittelfinger | Blau-Grün (#01CBC6) |
| Rechts Ringfinger | Grün (#10AC84) |
| Rechts Kleinfinger | Dunkelorange (#EE5A24) |

#### 2.5.3 Tastatur-Layout (QWERTZ)
- Reihe 1: 1234567890ß
- Reihe 2: QWERTZUIOPÜ
- Reihe 3: ASDFGHJKLÖÄ (Grundstellung)
- Reihe 4: YXCVBNM

---

## 3. Non-Funktionale Anforderungen

### 3.1 Performance
- **Framerate:** 60fps Target für smooth visuals
- **Delta-Time:** Alle Physics verwendet Delta-Time → Framerate-unabhängig
- **Canvas Rendering:** Direkt via Canvas API, keine React Components im Game-Loop
- **Update Frequenz:** Game-Engine 60fps, React State ~10fps
- **Max Delta Clamp:** 50ms um "Death Spiral" zu vermeiden

### 3.2 Zuverlässigkeit
- **Fehlerbehandlung:** Bei fehlenden Sprites wird platzhaltermäßig gemalt
- **Offline-Fähigkeit:** Ganze App funktioniert offline (nach Initial Load)
- **Browser-Kompatibilität:** Modern Browsers mit Canvas + ES2020 Support

### 3.3 Usability
- **Responsive Design:** Mobile-friendly Layout (wird gut auf Tablets sichtbar)
- **Klare Rückmeldung:** Visuelles Feedback bei korrekten/falschen Eingaben
- **Progression:** Verbesserungsmöglichkeiten deutlich (Sterne, Scores)
- **Intuitive Steuerung:** Nur Tastatureingaben, keine Maus nötig

### 3.4 Wartbarkeit
- **TypeScript Strict Mode:** Vollständige Typ-Sicherheit
- **Separation of Concerns:** Game-Engine unabhängig von React
- **Modular:** Themes, Lektionen, Systeme sind einfach austauschbar
- **Testing:** Unit Tests für Engine, Component Tests für UI

### 3.5 Sicherheit
- **Keine sensiblen Daten:** Game nutzt nur localStorage (Fortschritt lokal)
- **No User Tracking:** Keine externen Analytics
- **XSS-Safe:** Keine dynamische innerHTML, nur React/Canvas

---

## 4. Daten-Persistenz

### 4.1 localStorage Structure
```json
{
  "schreibtrainer-progress": {
    "state": {
      "completedLessons": {
        "lesson-01": {
          "lessonId": "lesson-01",
          "bestScore": 52,
          "stars": 3,
          "attempts": 4,
          "completedAt": "2024-01-15T10:30:00Z",
          "wpm": null
        }
      },
      "activeThemeId": "default"
    }
  }
}
```

### 4.2 Daten-Regeln
- Best Score wird nicht überschrieben mit schlechteren Ergebnissen
- Stern-Rating wird nur aufgewertet, nicht abgewertet
- Attempts wird immer inkrementiert
- Local Storage wird automatisch via Zustand persist Middleware gespeichert

---

## 5. Technische Architektur

### 5.1 Tech Stack
- **Frontend:** React 19 + TypeScript 5.6
- **Build Tool:** Vite 6 + esbuild
- **State Management:** Zustand 5 (mit persist middleware)
- **Game Engine:** Vanilla TypeScript (keine externe Library)
- **Canvas Rendering:** HTML5 Canvas API
- **Testing:** Vitest 2 + React Testing Library 16
- **Package Manager:** npm

### 5.2 Browser APIs Used
- `requestAnimationFrame` - Game Loop
- `Canvas 2D Context` - Rendering
- `localStorage` - Persistenz
- `KeyboardEvent` - Input

### 5.3 Key Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "zustand": "^5.0.0"
}
```

---

## 6. Erweiterbarkeit

### 6.1 Neue Lektionen
1. Neue Datei `src/config/lessons/lesson-05.ts`
2. `LessonConfig` Interface implementieren
3. `lessons/index.ts` updaten
4. **Keine anderen Änderungen nötig!**

### 6.2 Neue Themes
1. Ordner `public/themes/mein-theme/`
2. Assets (PNG Sprites) hinzufügen
3. `theme.json` mit Konfiguration
4. `ThemeRegistry.register('mein-theme', loader)`
5. **No code changes to game logic!**

### 6.3 Neue Spielmechaniken
1. Neue System-Klasse in `src/engine/systems/`
2. In `GameEngine.update()` aufrufen
3. Events über `GameSnapshot` propagieren
4. React Components abonnieren nötige Changes

---

## 7. Success Criteria

### 7.1 Functional Acceptance
- [ ] Spieler kann alle 4 Lektionen spielen
- [ ] Richtige Tasten zerstören Blöcke
- [ ] Falsche Tasten blinken rot
- [ ] Ball fängt den Spieler → Game Over
- [ ] Alle Blöcke zerstört → Level Complete
- [ ] Score wird korrekt berechnet
- [ ] Fortschritt wird in localStorage gespeichert
- [ ] Fortschritt bleibt nach Reload erhalten

### 7.2 Performance Acceptance
- [ ] Game läuft mit 60fps auf modernen Browsern
- [ ] Keyboard Input hat <50ms Latenz
- [ ] Keine sichtbaren Frame Drops bei 20 gleichzeitigen Blöcken
- [ ] Smooth Animationen (keine jankiness)

### 7.3 Quality Acceptance
- [ ] Unit Tests für Game Engine (>80% Coverage)
- [ ] Component Tests für kritische UI
- [ ] TypeScript Strict Mode - keine `any`
- [ ] No Console Errors oder Warnings

---

## 8. Glossary

| Term | Definition |
|------|-----------|
| **Block** | Quadratisches UI-Element mit Buchstabe/Wort, bewegt sich nach links |
| **Ball** | Verfolgender Gegner, bewegt sich nach rechts |
| **Game Over** | Zustand wenn Ball Spieler trifft |
| **Level Complete** | Zustand wenn alle Blöcke zerstört |
| **Spawn** | Block wird erstellt und erscheint auf Screen |
| **QWERTZ** | Deutsche Tastatur-Layout (vs. QWERTY) |
| **Delta-Time** | Zeitdelta seit letztem Frame (Δt) |
| **RAF** | requestAnimationFrame - Browser-API für 60fps Loop |
| **Theme** | Visueller Style mit Sprites und Farben |
| **Schwierigkeit** | Block-Speed steigt mit korrekten Eingaben |

---

## 9. Testing Requirements

### 9.1 Unit Tests
- GameEngine.update() mit verschiedenen Deltas
- CollisionSystem.checkAABB() und checkCircle()
- DifficultySystem Speed-Berechnung
- SpawnSystem Text-Generierung
- textGenerator für Character-Sequenzen

### 9.2 Component Tests
- VirtualKeyboard Rendering + Highlighting
- KeyCap mit verschiedenen States
- GameScreen mit Running Game
- LessonSelectScreen mit Fortschritt anzeigen

### 9.3 Integration Tests
- Kompletter Spielzug: Taste drücken → Block zerstört
- Lektion Start → Game Over → Fortschritt gespeichert
- Lektion-Wechsel → Korrekter Inhalt geladen

### 9.4 E2E Scenarios (manuell oder Playwright)
- User startet App → wählt Lektion → spielt → Fortschritt sichtbar
- User schließt und reopens Browser → Fortschritt erhalten

---

## 10. Known Limitations & Future Enhancements

### Current Limitations
- Keine Multiplayer
- Keine Sound-Effekte (Infrastruktur vorhanden)
- Keine Custom Character für Spieler
- Keine Statistik-Seite (nur Best Score pro Lektion)

### Potential Future Features
- Sound-Pack System (wie Themes)
- Leaderboard (Cloud-Persistenz)
- Trainer-Modi (z.B. Free Practice)
- Unterschiedliche Schwierigkeits-Grade
- Mehrsprachig Support
- Mobile Touch-Keyboard Fallback
