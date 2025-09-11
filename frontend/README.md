# HackSmiths Frontend

This is the frontend application for the HackSmiths project, built using React and Vite.

## 🛠️ Tech Stack

- **React 19** - Latest version of the React framework
- **Vite 7** - Next-generation frontend tooling
- **ESLint** - Code linting and formatting
- **Node.js** - JavaScript runtime environment

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```powershell
   npm install
   # or if using yarn
   yarn install
   ```

### Development

To start the development server:

```powershell
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:5173` by default.

### Building for Production

To create a production build:

```powershell
npm run build
# or
yarn build
```

To preview the production build:

```powershell
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
frontend/
├── public/          # Public assets
├── src/             # Source files
│   ├── assets/      # Project assets
│   ├── App.jsx      # Main App component
│   ├── App.css      # App styles
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML entry point
├── vite.config.js   # Vite configuration
├── eslint.config.js # ESLint configuration
└── package.json     # Project dependencies and scripts
```

## 📦 Dependencies

### Main Dependencies
- React v19.1.1
- React DOM v19.1.1

### Development Dependencies
- Vite v7.1.2
- ESLint v9.33.0
- @vitejs/plugin-react v5.0.0
- Various ESLint plugins and configurations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## 🌐 Browser Support

The application is built using modern JavaScript features and React 19. It supports all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## 🔗 Connection with Backend

This frontend application is designed to work with the HackSmiths backend API. Make sure the backend server is running on `http://localhost:8000` for full functionality.

## 🛡️ ESLint Configuration

The project uses ESLint for code quality and consistency. The configuration can be found in `eslint.config.js`.
