
# 🧑‍🎨 Interactive Whiteboard Application  
A fully-featured drawing/whiteboard web application built with **React**, **Canvas API**, **Rough.js**, and **Perfect Freehand**.  
Users can draw shapes, free-hand brush strokes, arrows, text, erase elements, undo/redo actions, customize colors & sizes, and download the canvas as an image.

---

## 🚀 Live Demo  
👉 **[Link to Deployed Project](https://whiteboard-two-puce.vercel.app/)**  


---

## ✨ Features

### 🎨 Drawing Tools
- ✏️ **Brush** (Perfect Freehand smooth strokes)  
- 📏 **Line**
- ▭ **Rectangle** (Stroke + Fill)
- ⚪ **Circle**
- 🥚 **Ellipse**
- ➡️ **Arrow**
- 🔤 **Text Tool**
- 🧹 **Eraser** (Smart shape-level erasing)

### 🧰 Toolbox
- Stroke color picker  
- Fill color picker (where applicable)  
- Brush / Line / Font size slider  
- Predefined color palette  

### 🔄 History Control
- Undo  
- Redo  
- Keyboard shortcuts:  
  - **Ctrl + Z → Undo**  
  - **Ctrl + Y → Redo**

### 📥 Export
- Download the canvas as a **PNG** image.

---

## 🏗️ Project Architecture

```text
src/
│── components/
│   ├── Board/        → Canvas rendering & mouse events
│   ├── Toolbar/      → Tools (line, brush, arrow, text...)
│   └── Toolbox/      → Stroke/Fill/Size controls
│
│── store/
│   ├── BoardProvider → Board state, history, drawing logic
│   └── ToolboxProvider → Color & size configuration state
│
│── utils/
│   ├── element.js    → Shape creation, brush paths, hit-testing
│   └── math.js       → Arrow geometry, distance calculations
│
└── constants.js      → Tool types, colors, enums
````

---

## 🛠️ Technologies Used

| Technology           | Purpose                     |
| -------------------- | --------------------------- |
| **React**            | UI and state management     |
| **Canvas API**       | Low-level drawing rendering |
| **Rough.js**         | Sketch-style shapes         |
| **Perfect Freehand** | Smooth brush strokes        |
| **React Icons**      | Toolbar icons               |
| **Tailwind CSS**     | Styling and layout          |

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/sairango/whiteboard.git
cd whiteboard
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

---

## 🧠 How It Works (Short Technical Summary)

* Every drawing action creates an **element object** containing coordinates, styles, and type.
* **BoardProvider** stores the drawing elements array + undo/redo history.
* Mouse events (`mousedown`, `mousemove`, `mouseup`) mutate the active element via reducers.
* Rough.js creates sketch-style primitives for shapes.
* Perfect Freehand generates brush strokes using SVG path conversion.
* A floating `<textarea>` handles text input before saving to canvas.
* Canvas is redrawn on every update using `useLayoutEffect`.

---



## ⭐ Acknowledgements

* [Rough.js](https://roughjs.com/)
* [Perfect Freehand](https://perfect-freehand-example.vercel.app/)
* Inspiration from digital whiteboard tools like Excalidraw.



