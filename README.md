# 2027 Rugby World Cup Predictor 🏉

An interactive web application that allows users to predict the 2027 Rugby World Cup winner by ranking teams in pool stages and progressing through knockout rounds.

## Features

- **Pool Stage Rankings**: Drag and drop teams to rank them within their pools (A, B, C, D)
- **Knockout Bracket**: Simulate quarter-finals, semi-finals, and final based on your pool rankings
- **Official RWC Rules**: Implements authentic 2027 Rugby World Cup tournament structure
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI**: Click to select match winners and progress through the tournament
- **Reset Options**: Reset pools, bracket, or start over completely

## Tournament Structure

### Pool Stage

- **Pool A**: New Zealand, France, Italy, Uruguay, Namibia
- **Pool B**: South Africa, Ireland, Scotland, Tonga, Romania
- **Pool C**: England, Argentina, Japan, Samoa, Chile
- **Pool D**: Australia, Wales, Fiji, Georgia, Portugal

### Knockout Stage Rules

The quarter-final matchups follow official RWC rules:

- **QF1**: Winner Pool B vs Runner-up Pool A
- **QF2**: Winner Pool C vs Runner-up Pool D
- **QF3**: Winner Pool D vs Runner-up Pool C
- **QF4**: Winner Pool A vs Runner-up Pool B

Semi-finals:

- **SF1**: Winner QF1 vs Winner QF2
- **SF2**: Winner QF3 vs Winner QF4

Final and Third Place:

- **Final**: Winner SF1 vs Winner SF2
- **3rd Place**: Loser SF1 vs Loser SF2

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone or download this repository**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL shown in your terminal

## How to Use

### Step 1: Rank Teams in Pool Stage

1. You'll see 4 pools (A, B, C, D) with 5 teams each
2. Drag and drop teams to reorder them within their pool
3. Rank teams from 1st to 5th based on your prediction
4. You can only reorder teams within the same pool

### Step 2: Simulate Knockout Stage

1. Click the **"Simulate Knockout Stage"** button
2. The quarter-final bracket will be generated based on your pool rankings
3. Top 2 teams from each pool advance to the knockout stage

### Step 3: Predict Match Winners

1. Click on teams in each match to select the winner
2. Progress through the stages:
   - Complete all quarter-finals first
   - Then select semi-final winners
   - Finally, choose the champion in the final
3. The 3rd place playoff is also available after semi-finals

### Step 4: View Your Prediction

- The champion will be displayed prominently with a trophy 🏆
- You can reset the bracket or go back to modify pool rankings

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 18**: Component-based UI framework
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **HTML5 Drag and Drop API**: Native drag-and-drop functionality

## Project Structure

```
world-cup-predictor/
├── src/
│   ├── components/
│   │   ├── PoolStage.jsx      # Pool stage with drag-and-drop
│   │   └── KnockoutBracket.jsx # Tournament bracket
│   ├── data/
│   │   └── teams.js            # Team data and initial pools
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles and animations
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Key Features Explained

### Drag and Drop

- Uses HTML5 Drag and Drop API
- Visual feedback during dragging
- Teams can only be reordered within their own pool

### State Management

- React hooks (useState, useEffect) for state management
- Automatic progression through tournament stages
- Preserves user selections throughout the bracket

### Responsive Design

- Mobile-first approach
- Flexbox and CSS Grid for layouts
- Tailwind CSS for consistent styling across devices

### RWC Rules Implementation

- Strict adherence to 2027 Rugby World Cup tournament structure
- Correct quarter-final matchup logic
- Progressive unlocking of stages

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

Potential features to add:

- LocalStorage persistence (save predictions)
- Share predictions via URL
- Historical RWC statistics
- Expert pick suggestions
- Print/export bracket as image

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

This project is open source and available for personal and educational use.

## Notes

- Pool compositions are projected and may differ from the actual 2027 RWC draw
- This is a prediction tool for entertainment purposes
- No backend required - runs entirely in the browser

---

**Enjoy predicting the 2027 Rugby World Cup champion! 🏉🏆**
