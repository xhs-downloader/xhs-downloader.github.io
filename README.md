# Xiaohongshu Downloader

A Next.js-based web application for downloading videos and images from Xiaohongshu (RED) platform without watermarks.

## Features

- 🎬 Download Xiaohongshu videos
- 🖼️ Download Xiaohongshu images
- 🌐 Multi-language support (English & Chinese)
- 📱 Responsive design (mobile & desktop)
- ⚡ Fast and reliable
- 🆓 Completely free
- 🔒 No installation required

## Tech Stack

- **Framework**: Next.js 16.1.6
- **Frontend**: React 19.2.3
- **Styling**: CSS3
- **Language**: TypeScript 5
- **Build**: Static Export

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── policy/
│   │   └── page.tsx        # Privacy policy
│   ├── about/
│   │   └── page.tsx        # About page
│   └── terms/
│       └── page.tsx        # Terms of service
├── components/
│   ├── header.tsx          # Header navigation
│   ├── footer.tsx          # Footer
│   ├── hero-section.tsx    # Hero section
│   ├── how-to-section.tsx  # How to use section
│   ├── download-section.tsx # Download interface
│   ├── faq-section.tsx     # FAQ section
│   └── tools-section.tsx   # Other tools section
├── lib/
│   ├── translations.ts     # Multi-language translations
│   ├── api.ts             # API calls
│   └── download-utils.ts  # Download utilities
├── hooks/
│   └── useTranslation.ts  # Translation hook
├── styles/
│   └── globals.css        # Global styles
├── public/
│   ├── favicon.ico
│   ├── assets/
│   │   ├── images/        # Images and icons
│   │   ├── css/           # Additional CSS files
│   │   └── js/            # JavaScript libraries
└── package.json
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Configuration

The application uses the following API endpoint:
- Development: `http://localhost:3000`
- Production: `https://xhs-download-api.onrender.com`

## Features

### Multi-language Support
- English
- Simplified Chinese

The language preference is saved in localStorage and persists across sessions.

### Download Functionality
- Video downloads with format selection
- Image downloads in batches
- Automatic file naming and sanitization
- Progress indication

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## API Integration

The application communicates with a backend API for:
- Media information retrieval
- File download handling
- Format selection and optimization

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## License

This project is provided as-is for educational and personal use.

## Disclaimer

This tool is designed for personal and educational use only. Users are responsible for complying with applicable laws and respecting copyright and intellectual property rights of content creators.

## Support

For issues or questions, please open an issue on GitHub or contact us through the website.
