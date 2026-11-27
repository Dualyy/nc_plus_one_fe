# +one (Front End)

The front end for **NC +one**, an events app where users can browse events and create an account. Built with React, TypeScript and Vite.


## Tech Stack

- React 19
- TypeScript
- React Router
- Vite
- Oxlint

## Getting Started

### Prerequisites

- Node.js 22.22+ or 24+
- npm
- The NC +one back-end API running (defaults to `http://127.0.0.1:8000`)

### Installation

```bash
git clone https://github.com/Dualyy/nc_plus_one_fe.git
cd nc_plus_one_fe
npm install
```

### Configuration

To use a different API URL, create a `.env.local` file in the project root:

```env
VITE_API_URL=[YOUR_APIURL]
```

### Run

```bash
npm run dev
```

Then open the URL shown in your terminal. By default that would be: `http://localhost:5173`.

### Features in development:

Paramaterised / server-side search 

Light and dark mode toggle

Delete events

General improvements to individual pages like more stats, graphs etc.


