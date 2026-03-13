# Architektur: 10-Finger-Schreibtrainer

## 1. Hochlevel-Übersicht

Der Schreibtrainer ist eine React-basierte Webanwendung mit einer game engine separat von der UI-Logic.

```mermaid
graph TB
    User["Benutzer<br/>(Tastatureingabe)"]
    App["App.tsx<br/>(Screen Management)"]
    GS["GameScreen"]
    Engine["GameEngine<br/>(Spiel-Logik)"]
    Canvas["GameCanvas<br/>(Rendering)"]
    Keyboard["VirtualKeyboard<br/>(UI)"]
    Store["Zustand Stores<br/>(State)"]
    Lessons["Lessons Config<br/>(Daten)"]
    Theme["ThemeProvider<br/>(Assets)"]

    User -->|Tastatura| GS
    GS -->|handleKeyPress| Engine
    GS -->|update deltaTime| Engine
    Engine -->|snapshot| Canvas
    Engine -->|snapshot| Store
    Canvas -->|render| User
    Keyboard -->|targetLetter| User
    Store -->|read| Keyboard
    Store -->|read| Canvas
    Engine -->|lesson| Lessons
    Canvas -->|assets| Theme
```

## 2. Komponenten-Hierarchie

```
App
├── MenuScreen (Start-Menü)
├── LessonSelectScreen (Lektionen-Übersicht)
├── GameScreen (Haupt-Spielbildschirm)
│   ├── GameCanvas (Canvas mit Game-Engine)
│   ├── VirtualKeyboard (Tastatur-Anzeige)
│   └── Game-Over Modal
└── ThemeProvider (Context für Assets)
```

## 3. Game Loop Architektur

```mermaid
graph LR
    RAF["requestAnimationFrame<br/>(60 FPS)"]
    Loop["useGameLoop Hook<br/>(Delta-Time Berechnung)"]
    Update["GameEngine.update<br/>(deltaTime)"]
    Spawn["SpawnSystem<br/>(Block generieren)"]
    Collision["CollisionSystem<br/>(Kollisionen)"]
    Difficulty["DifficultySystem<br/>(Geschwindigkeit)"]
    Render["Canvas.render<br/>(zeichnen)"]
    Store["Zustand updateFromSnapshot<br/>(React State)"]

    RAF -->|deltaTime| Loop
    Loop -->|callback| Update
    Update -->|update| Spawn
    Update -->|check| Collision
    Update -->|adjust| Difficulty
    Update -->|create| Store
    Store -->|snapshot| Render
    Render -->|UI Update| RAF
```

**Wichtig:** Die Game-Engine läuft mit ~60fps in einem lokalen Update-Zyklus. Der Zustand wird nur ~5-10 mal pro Sekunde aktualisiert, damit React nicht zu oft re-rendert.

## 4. State Management Pattern

```mermaid
graph TB
    subgraph "Game Loop (60fps)"
        LocalState["GameState<br/>(Plain Object)"]
        Engine["GameEngine"]
        Snapshot["GameSnapshot"]
    end

    subgraph "React Layer (~10fps update)"
        GameStore["useGameStore<br/>(Zustand)"]
        Components["React Components<br/>(GameCanvas, Keyboard)"]
    end

    subgraph "Persistenz"
        ProgressStore["useProgressStore<br/>(localStorage)"]
        LocalStorage["Browser localStorage"]
    end

    Engine -->|mutate| LocalState
    Engine -->|createSnapshot| Snapshot
    Snapshot -->|updateFromSnapshot| GameStore
    GameStore -->|subscribe| Components
    Components -->|onGameComplete| ProgressStore
    ProgressStore -->|persist| LocalStorage
```

## 5. Lesson & Character System

```mermaid
graph TB
    LessonConfig["LessonConfig<br/>(TypeScript Interface)"]
    Lesson01["lesson-01.ts<br/>(asdf + jklö)"]
    Lesson02["lesson-02.ts<br/>(+ e,i,r,t)"]
    Lesson03["lesson-03.ts<br/>(+ n,m,u,o)"]
    Lesson04["lesson-04.ts<br/>(Wort-Modus)"]

    LessonRegistry["Lessons Registry<br/>(lessons/index.ts)"]
    SpawnSystem["SpawnSystem<br/>(Text-Generierung)"]

    LessonConfig -->|implements| Lesson01
    LessonConfig -->|implements| Lesson02
    LessonConfig -->|implements| Lesson03
    LessonConfig -->|implements| Lesson04

    Lesson01 -->|export| LessonRegistry
    Lesson02 -->|export| LessonRegistry
    Lesson03 -->|export| LessonRegistry
    Lesson04 -->|export| LessonRegistry

    LessonRegistry -->|getLessonById| SpawnSystem
    SpawnSystem -->|generateSequence| Engine
```

## 6. Theme-System (Plugin-Architektur)

```mermaid
graph TB
    ThemeProvider["ThemeProvider.tsx<br/>(Context)"]
    Registry["ThemeRegistry<br/>(Singleton)"]
    DefaultTheme["defaultTheme.ts"]
    ThemeAssets["ThemeAssets<br/>(Types)"]

    AssetLoader["preloadSpriteSheet<br/>(spriteUtils.ts)"]
    SpriteSheet1["player-run.png"]
    SpriteSheet2["player-idle.png"]
    SpriteSheet3["block.png"]
    SpriteSheet4["ball.png"]

    ThemeProvider -->|load| Registry
    Registry -->|cache| DefaultTheme
    DefaultTheme -->|defines| ThemeAssets
    ThemeAssets -->|sprites| AssetLoader

    AssetLoader -->|preload| SpriteSheet1
    AssetLoader -->|preload| SpriteSheet2
    AssetLoader -->|preload| SpriteSheet3
    AssetLoader -->|preload| SpriteSheet4

    style Registry fill:#e1f5ff
    style DefaultTheme fill:#f3e5f5
```

**Erweiterung mit neuen Themes:**
- Neuer Ordner `public/themes/my-theme/`
- `theme.json` mit Asset-Pfaden
- `ThemeRegistry.register('my-theme', loader)` aufrufen
- Kein Code-Änderungen nötig!

## 7. Keyboard Layout & Fingerzuordnung

```mermaid
graph TB
    KeyboardLayout["keyboard-layout.ts<br/>(KEYBOARD_LAYOUT Array)"]
    Finger["Finger Type<br/>(10 Finger)"]
    Colors["FINGER_COLORS<br/>(Hex Farben)"]
    KeyCap["KeyCap Component<br/>(Visuelle Anzeige)"]
    VirtualKB["VirtualKeyboard<br/>(Gesamt-Tastatur)"]

    KeyboardLayout -->|defines| Finger
    Finger -->|maps to| Colors
    Colors -->|used by| KeyCap
    KeyCap -->|renders| VirtualKB

    style Finger fill:#fff3e0
    style Colors fill:#e8f5e9
```

**10-Finger-Positions:**
```
Linke Hand:          Rechte Hand:
Pinky (Rot)          Index (Türkis)
Ring (Orange)        Middle (Blau-Grün)
Middle (Blau)        Ring (Grün)
Index (Lila)         Pinky (Orange-Rot)
```

## 8. Typescript Type Hierarchy

```mermaid
graph TB
    subgraph "Game Types"
        GameEntity["GameEntity<br/>(x, y, width, height, velocity)"]
        Player["Player extends GameEntity<br/>(animationState, lives)"]
        LetterBlock["LetterBlock extends GameEntity<br/>(letter, isDestroying)"]
        Ball["PursuitBall extends GameEntity<br/>(speed, catchDistance)"]
        Snapshot["GameSnapshot<br/>(Immutable State)"]
    end

    subgraph "Lesson Types"
        LessonConfig["LessonConfig<br/>(id, characters, minSpeed, maxSpeed)"]
        Progress["LessonProgress<br/>(bestScore, stars, attempts)"]
    end

    subgraph "Theme Types"
        Theme["Theme<br/>(id, name, assets)"]
        ThemeAssets["ThemeAssets<br/>(sprites, colors)"]
        SpriteConfig["SpriteConfig<br/>(src, frameWidth, frameCount, fps)"]
    end

    GameEntity -->|parent| Player
    GameEntity -->|parent| LetterBlock
    GameEntity -->|parent| Ball
    GameEntity -->|contains in| Snapshot

    LessonConfig -->|produces| Progress
    Theme -->|contains| ThemeAssets
    ThemeAssets -->|defines| SpriteConfig
```

## 9. File Structure Overview

```
schreibtrainer/
├── public/
│   └── sprites/              # Placeholder - würde echte Assets haben
│       ├── player-run.png
│       ├── player-idle.png
│       ├── block.png
│       └── ball.png
│
├── src/
│   ├── types/                # TypeScript Interfaces (zentral)
│   │   ├── game.types.ts
│   │   ├── lesson.types.ts
│   │   ├── theme.types.ts
│   │   └── keyboard.types.ts
│   │
│   ├── engine/               # Game Logic (framework-unabhängig)
│   │   ├── GameEngine.ts     # Hauptlogik
│   │   ├── GameState.ts      # State-Klasse
│   │   └── systems/
│   │       ├── CollisionSystem.ts
│   │       ├── DifficultySystem.ts
│   │       └── SpawnSystem.ts
│   │
│   ├── config/               # Daten-Konfigurationen
│   │   ├── lessons/
│   │   │   ├── lesson-01.ts bis lesson-04.ts
│   │   │   └── index.ts
│   │   ├── keyboard-layout.ts
│   │   └── game-settings.ts
│   │
│   ├── store/                # State Management (Zustand)
│   │   ├── useGameStore.ts
│   │   ├── useProgressStore.ts
│   │   └── useLessonStore.ts
│   │
│   ├── hooks/                # React Hooks
│   │   ├── useGameLoop.ts
│   │   ├── useKeyboardInput.ts
│   │   └── useSpriteAnimation.ts
│   │
│   ├── components/
│   │   ├── screens/          # Ganze Seiten
│   │   │   ├── MenuScreen.tsx
│   │   │   ├── LessonSelectScreen.tsx
│   │   │   ├── GameScreen.tsx
│   │   │   └── ResultScreen.tsx
│   │   ├── game/            # Game-Rendering
│   │   │   └── GameCanvas.tsx
│   │   ├── keyboard/        # Tastatur-UI
│   │   │   ├── VirtualKeyboard.tsx
│   │   │   └── KeyCap.tsx
│   │   └── ui/              # Generic UI
│   │       └── Button.tsx
│   │
│   ├── themes/              # Theme System
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeRegistry.ts
│   │   └── defaultTheme.ts
│   │
│   ├── utils/               # Hilfsfunktionen
│   │   ├── textGenerator.ts
│   │   ├── audioManager.ts
│   │   └── spriteUtils.ts
│   │
│   ├── App.tsx              # Haupt-App Component
│   └── main.tsx             # React Entry Point
│
├── tests/                   # Unit & Component Tests
│   ├── engine/
│   ├── components/
│   ├── hooks/
│   └── store/
│
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── package.json
├── arch.md                  # Diese Datei
└── srs.md                   # Anforderungen
```

## 10. Datenfluss: Ein kompletter Spielzug

```
1. Benutzer drückt Taste 'f'
   ↓
2. useKeyboardInput Hook fängt 'keydown' Event
   ↓
3. GameEngine.handleKeyPress('f') aufgerufen
   ↓
4. Engine prüft: Ist 'f' == targetLetter?
   ├─ JA:
   │  ├─ LetterBlock.isDestroying = true
   │  ├─ score += 10
   │  ├─ difficultySystem.recordCorrectInput()
   │  └─ selectNextTarget()
   │
   └─ NEIN:
      └─ difficultySystem.recordWrongInput()
   ↓
5. GameEngine.update(deltaTime) im nächsten RAF-Frame
   ├─ Blöcke bewegen sich nach links
   ├─ Ball bewegt sich nach rechts
   ├─ Kollisionsprüfung
   └─ SpawnSystem spawnt neue Blöcke
   ↓
6. Engine.getSnapshot() erstellt GameSnapshot
   ↓
7. useGameStore.updateFromSnapshot(snapshot)
   ├─ score aktualisiert
   ├─ targetLetter aktualisiert
   └─ React Components re-rendern
   ↓
8. GameCanvas rendert neue Frame
   └─ VirtualKeyboard hebt neue Zieltaste hervor
```

## 11. Erweiterungspunkte

### Neue Lektion hinzufügen
1. Neue Datei `src/config/lessons/lesson-05.ts` erstellen
2. `LessonConfig` Interface implementieren
3. In `lessons/index.ts` importieren und zu Array hinzufügen

### Neues Theme hinzufügen
1. Ordner `public/themes/my-theme/` anlegen
2. `theme.json` mit Assets definieren
3. `ThemeRegistry.register('my-theme', loader)` in `ThemeRegistry.ts`

### Neue Spielmechanik
1. Neue System-Klasse in `src/engine/systems/` erstellen
2. In `GameEngine.update()` aufrufen
3. Bei Bedarf neue Game Events in `GameSnapshot` hinzufügen

## 12. Performance-Optimierungen

- **Canvas vs. DOM:** Canvas für Game-Rendering, nicht React Components
- **Update Frequency:** Game Loop 60fps, Store Updates ~10fps
- **Delta-Time:** Framerate-unabhängige Physik
- **Max Delta Clamp:** Verhindert "Death Spiral" bei langsamen Geräten
- **Lazy Loading Themes:** Themes werden nur bei Auswahl geladen
- **localStorage Persistenz:** Zustand persist Middleware
