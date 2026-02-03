# SliceMatch

A minimal decision tool that helps customers choose what to order before buying pizza or café items.

## What It Does

SliceMatch asks 3 quick questions and returns a recommended order + 2 alternatives with a short reason. The goal is to help reduce decision paralysis in 10 seconds.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- No external UI libraries
- No backend (v1)
- No authentication (v1)

## Design Principles (Amro Studio)

- Minimal black and white UI only
- Grid-based layout with lots of whitespace
- No gradients, no icons
- Calm, intelligent tone
- Typography: Inter
- Subtle motion (fade only)

## Project Structure

```
SliceMatch/
├── app/
│   ├── layout.tsx          # Root layout with Inter font
│   ├── page.tsx            # Main page with header and wizard
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Wizard.tsx          # Main wizard state management
│   ├── Question.tsx        # Question step component
│   └── Result.tsx          # Result display component
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   ├── data.ts             # Pizza and café menu items
│   └── recommender.ts      # Recommendation engine logic
└── package.json
```

## Flow

1. **Step 0**: Choose mode (Pizza or Café)
2. **Step 1**: Hunger level (Snack, Normal, Starving)
3. **Step 2**: Mood (Comfort, Light, Spicy)
4. **Step 3**: Style (Classic, Adventurous)
5. **Result**: Primary recommendation + 2 alternatives + reason

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Features

- ✅ Deterministic recommendation engine with weighted scoring
- ✅ Keyboard navigation and focus states
- ✅ Fully responsive (mobile-first)
- ✅ Clean component architecture
- ✅ TypeScript for type safety
- ✅ Fade animations for smooth transitions
- ✅ Accessible button semantics

## Build

```bash
npm run build
npm start
```

## What This Is NOT

- Not an ordering/payment app
- Not a delivery tracker
- Not a restaurant directory

This is purely a decision-making tool to help customers choose menu items quickly.
