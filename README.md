# Auto Parts Foreign Trade Website

A modern, multi-language website for automotive parts export business built with React, Vite, and Tailwind CSS.

## 🌟 Features

- **Multi-language Support**: Chinese, English, French, Spanish, Arabic
- **Product Catalog**: 6 categories with 20+ products
- **Quote System**: Netlify-integrated contact forms
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Modern UI**: Beautiful, professional design with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
autopart/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   └── ProductCard.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── QuotePage.jsx
│   ├── data/               # Static data files
│   │   ├── translations.js
│   │   └── products.js
│   ├── hooks/              # Custom React hooks
│   │   └── useLanguage.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── netlify.toml           # Netlify configuration
└── package.json
```

## 🌐 Pages

1. **Home Page**: Hero section, advantages, product categories, featured products
2. **Products Page**: Complete catalog with search and filtering
3. **About Page**: Company information and advantages
4. **Contact Page**: Contact information and location details
5. **Quote Page**: Product inquiry form with Netlify integration

## 🛠 Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Forms**: Netlify Forms

## 🌍 Languages

The website supports 5 languages with automatic browser detection and RTL support:
- 🇨🇳 Chinese (中文)
- 🇺🇸 English
- 🇫🇷 French (Français)
- 🇪🇸 Spanish (Español)
- 🇸🇦 Arabic (العربية) with RTL support

## 📦 Product Categories

1. **Engine System**: Pistons, rings, crankshafts, etc.
2. **Brake System**: Brake pads, discs, drums, fluid
3. **Suspension System**: Shock absorbers, springs, stabilizers
4. **Electrical System**: Spark plugs, coils, batteries, alternators
5. **Filter System**: Oil, air, and fuel filters
6. **Lighting System**: Headlights, tail lights, LED bars

## 🚀 Deployment to Netlify

1. **Prepare for Deployment**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your Git repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - The `netlify.toml` file handles configuration

3. **Form Setup**
   - Quote forms are automatically handled by Netlify Forms
   - No additional configuration needed

## 📧 Contact Information

- **Sales**: sales@autoparts.com
- **Phone**: +86 138 0013 8000
- **Location**: Guangzhou, China

## 📄 License

This project is created for a professional auto parts export business.

---

**Ready for Production** ✅
The website is 100% complete and ready for deployment to Netlify.