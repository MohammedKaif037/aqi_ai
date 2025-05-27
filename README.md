 
# AQI AI Dashboard

> A modern web application that visualizes Air Quality Index (AQI) data with historical trends, notifications, and AI-powered insights.

## 🌐 Overview

The **AQI AI Dashboard** is a Next.js-based web application that fetches real-time and historical air quality data, visualizes it using charts, and provides actionable insights powered by an AI backend. The app includes features like:

- Historical AQI comparison between cities
- Interactive line charts with tooltips
- Notifications and alert system
- User settings for thresholds and preferences
- Dark/light mode toggle
- Responsive sidebar navigation
- Toasts, dialogs, dropdowns, and other UI components

---

## 🛠️ Features

- ✅ Real-time and historical AQI data fetching via API routes
- 📈 Interactive chart visualization using `recharts`
- 💡 AI-powered health insights based on AQI levels
- 🔔 Notification center with read/unread status and deletion
- ⚙️ Settings panel to customize email, push notifications, and city selection
- 🎨 Theming support with light/dark modes
- 🧭 Sidebar navigation with collapsible menu
- 📱 Mobile-responsive layout

---

## 📁 Project Structure

```
aqi-ai-dashboard/
├── app/                  # Main application pages and layout
├── components/           # Reusable UI components (buttons, modals, etc.)
├── lib/                  # Utility functions and helpers (e.g., `cn`, `utils`)
├── public/               # Static assets (images, icons)
├── styles/               # Global and component-specific CSS
├── types/                # TypeScript type definitions
├── utils/                # Shared logic (date formatting, mock data, etc.)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

---

## 🧪 Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React hooks + Context API
- **Charting**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Toast Notifications**: [Sonner](https://ui.shadcn.com/docs/components/toast)
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📦 Dependencies

### Core Libraries
- `react`, `react-dom`
- `next`
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `@radix-ui/react-*` series for accessible UI primitives

### Utilities
- `date-fns` – Date manipulation
- `cmdk` – Command palette
- `input-otp` – OTP input field
- `vaul` – Drawer implementation

### Styling
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `tailwindcss-animate`

### Data Visualization
- `recharts`
- `chart.js` / `react-chartjs-2` *(optional)*

---

## 🧑‍💻 Development Setup

### Prerequisites

- Node.js v18.x or higher
- PNPM (or NPM/Yarn if preferred)

### Installation

```bash
pnpm install
# or
npm install
```

### Running the App

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛢️ API Endpoints

The following API routes are available under `app/api/air-quality/...`.

### GET `/api/air-quality/historical`

Fetches historical AQI data for a given city and time range.

#### Query Parameters:
- `city`: Name of the city (default: "bangalore")
- `hours`: Number of hours to fetch data for (default: 24)

### GET `/api/air-quality/insight`

Generates AI-powered insight based on current AQI level.

#### Query Parameters:
- `city`: Name of the city
- `aqi`: Current AQI value

---

 

## 📝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to improve or extend this dashboard.
 

## 📬 Contact

For questions or feedback, reach out at:

📧 Email: mohammedkaif037@example.com  
 
🔗 GitHub: [github.com/mohammedkaif037/aqi_ai](https://github.com/mohammedkaif037/aqi_ai)

---
 
