# 🎸 MIDI Music Theory Visualizer

A web application that visualizes MIDI files in real-time on both a **guitar fretboard** and **piano roll**. This project merges MIDI visualization functionality from [FretFlow](https://github.com/kappter/FretFlow) with the design aesthetic of [musicTheory](https://github.com/kappter/musicTheory).

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://kappter.github.io/midi-visualizer/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## ✨ Features

### 🎵 MIDI Playback
- **Upload MIDI files** or use built-in samples
- **Playback controls**: Play, pause, stop
- **Variable speed**: 0.5x to 2.0x playback speed
- **Real-time visualization** of active notes

### 🎸 Guitar Fretboard
- **Multiple tunings**: Standard, Drop D, Open G, DADGAD
- **String order options**: High-to-low or low-to-high
- **Visual fret markers** at positions 3, 5, 7, 9, 12
- **Note labels** displayed on active frets
- **12-fret range** with accurate note mapping

### 🎹 Piano Roll
- **Two-octave keyboard** (C3 to B4)
- **Realistic piano styling** with gradient shading
- **Active note highlighting** with theme color
- **Note labels** on all keys (white and black)

### 🎨 Customization
- **Sharp/Flat notation** toggle
- **Custom theme colors** with color picker
- **Responsive design** for desktop and mobile
- **Dark theme** with glowing accents

---

## 🚀 Quick Start

### Try It Online
Visit the **[Live Demo](https://kappter.github.io/midi-visualizer/)** to use the application immediately.

### Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/kappter/midi-visualizer.git
   cd midi-visualizer
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

That's it! No build process or dependencies required.

---

## 📖 Usage Guide

### Loading MIDI Files

**Option 1: Upload Your Own**
1. Click the **"📁 Upload MIDI"** button
2. Select a `.mid` or `.midi` file from your computer
3. The file will be parsed and ready to play

**Option 2: Use Built-in Samples**
1. Click the **"Select Sample MIDI"** dropdown
2. Choose from:
   - C Major Scale
   - Blues Riff
   - Arpeggio Pattern

### Playback Controls

- **▶ Play**: Start playback from current position
- **⏸ Pause**: Pause playback (resume with Play)
- **⏹ Stop**: Stop and reset to beginning
- **Speed Slider**: Adjust playback speed (0.5x - 2.0x)

### Customization Options

**Notation**
- Toggle between **Sharps** (C#, D#, F#...) and **Flats** (Db, Eb, Gb...)

**Guitar Tuning**
- **Standard**: E-A-D-G-B-E
- **Drop D**: D-A-D-G-B-E
- **Open G**: D-G-D-G-B-D
- **DADGAD**: D-A-D-G-A-D

**String Order**
- **High String Bottom**: Traditional guitar tab orientation
- **Low String Bottom**: Looking down at your own guitar

**Theme Color**
- Click the color picker to customize the accent color throughout the interface

---

## 🛠️ Technical Details

### Architecture

**Single-Page Application** built with:
- Pure **HTML5** (semantic markup)
- Vanilla **JavaScript** (ES6+)
- Modern **CSS3** (gradients, transforms, animations)
- **HTML5 Canvas** for rendering visualizations

**External Dependencies**:
- [midi-parser-js](https://github.com/colxi/midi-parser-js) (v4.0.4) - MIDI file parsing

### Key Components

| Component | Purpose |
|-----------|---------|
| **MIDI Parser** | Parses MIDI files and extracts note events with timing |
| **Playback Engine** | Time-based playback system with speed control |
| **Fretboard Renderer** | Draws guitar fretboard with strings, frets, and active notes |
| **Piano Roll Renderer** | Draws piano keyboard with active note highlighting |
| **Control Panel** | User interface for settings and playback controls |

### Browser Compatibility

Works in all modern browsers supporting:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 (gradients, transforms, transitions)
- File API

**Tested on**:
- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📁 Project Structure

```
midi-visualizer/
├── index.html              # Main application (all-in-one file)
├── README.md              # This file
├── LICENSE                # MIT License
├── CONTRIBUTING.md        # Contribution guidelines
├── _config.yml           # GitHub Pages configuration
├── .gitignore            # Git ignore rules
└── samples/              # Sample MIDI files directory
    └── README.md         # Sample files documentation
```

---

## 🎯 Use Cases

- **Music Education**: Visualize scales, chords, and melodies
- **Guitar Learning**: See where notes are on the fretboard
- **Music Theory**: Understand note relationships across instruments
- **MIDI File Analysis**: Inspect MIDI file contents visually
- **Practice Tool**: Slow down songs to learn note positions
- **Composition Aid**: Visualize your MIDI compositions

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ideas for contributions**:
- 🔊 Audio playback with Web Audio API
- 🎵 Chord detection and display
- 🎼 Multi-track MIDI support
- 📊 Scale highlighting modes
- 🎥 Export as video/image
- ♿ Accessibility improvements
- 🎻 Additional instruments (bass, ukulele, violin)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

This project merges concepts from:

- **[FretFlow](https://github.com/kappter/FretFlow)** by kappter
  - MIDI parsing and playback logic
  - Time-based visualization approach

- **[musicTheory](https://github.com/kappter/musicTheory)** by kappter
  - Visual design and dark theme
  - Fretboard and piano roll styling

**External Libraries**:
- [midi-parser-js](https://github.com/colxi/midi-parser-js) by colxi

---

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/kappter/midi-visualizer/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/kappter/midi-visualizer/issues)
- 💬 **Questions**: [Start a discussion](https://github.com/kappter/midi-visualizer/discussions)

---

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🍴 Forking and contributing
- 📢 Sharing with others

---

**Made with ❤️ for music learners and MIDI enthusiasts**
