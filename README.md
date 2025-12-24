# Dwarkesh Dubey | Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features smooth animations, 3D effects, and an AI-powered chat assistant powered by Google's Gemini AI.

## ✨ Features

- **Responsive Design** - Fully responsive across all devices
- **Modern UI/UX** - Clean, professional design with smooth animations using Framer Motion
- **3D Effects** - Engaging background effects and transformations
- **AI Chat Assistant** - Integrated Gemini AI chatbot for interactive conversations
- **Sections**:
  - Hero section with dynamic introduction
  - Skills showcase
  - Projects portfolio
  - Contact form

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Google Gemini AI** - AI chat capabilities

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dwarkesh-dubey-_-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
dwarkesh-dubey-_-portfolio/
├── components/
│   ├── BackgroundEffect.tsx
│   ├── ChatAssistant.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── services/
│   └── geminiService.ts
├── public/
├── App.tsx
├── constants.tsx
├── index.tsx
├── types.ts
└── vite.config.ts
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key for the chat assistant |

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Dwarkesh Dubey**

Feel free to reach out for collaborations or questions!

---

Made with ❤️ using React and TypeScript
