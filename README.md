# AI Citizen Demo

**Intelligent Municipal Services Assistant**  
*Nxt Era Solutions | Part of HES Consultancy International*

## Overview

AI Citizen is an interactive demo showcasing how AI can transform municipal services. The demo includes:

- **Work & Income** - Welfare applications, reintegration support
- **Social Care (WMO)** - Home care, assistive devices
- **Debt Assistance** - Financial help, debt resolution
- **Youth Care** - Support for children & families

## Features

- 🎤 **Voice Recognition** - Dutch & English speech input
- 🌐 **Bilingual** - Full EN/NL language toggle
- 🚨 **Urgency Detection** - Automatic priority assessment
- 📋 **Auto Reports** - Generate intake reports
- 📱 **Responsive** - Works on desktop, tablet, mobile

## Live Demo

Visit: [https://ai-citizen-demo.netlify.app](https://ai-citizen-demo.netlify.app)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment to Netlify

### Option 1: Drag & Drop
1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `build` folder to deploy

### Option 2: GitHub Integration
1. Push to GitHub repository
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

## Project Structure

```
ai-citizen-demo/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main application component
│   └── index.js        # Entry point
├── package.json
└── README.md
```

## Customization

### Adding New Services

In `App.js`, add to the `aiResponses` object:

```javascript
newService: {
  en: {
    greeting: "Hello! ...",
    followUp: ["Question 1", "Question 2", ...],
    urgencyTriggers: ["keyword1", "keyword2"]
  },
  nl: {
    greeting: "Goedendag! ...",
    followUp: ["Vraag 1", "Vraag 2", ...],
    urgencyTriggers: ["sleutelwoord1", "sleutelwoord2"]
  }
}
```

And add to `content.services`:

```javascript
newService: {
  name: "Service Name",
  desc: "Description",
  icon: "🆕"
}
```

### Branding

Update colors in the `styles` constant:
- Primary: `#1E3A5F` (Deep blue)
- Accent: `#E86C3A` (Orange)
- Secondary: `#2E86AB` (Light blue)

## Important Notice

**This is a demonstration.** AI Citizen never makes autonomous decisions about citizens. All decisions are made by qualified municipal staff. AI supports and informs, but the human touch remains central.

## Links

- Website: [hes-consultancy-international.com](https://www.hes-consultancy-international.com)
- Nxt Era Solutions: [Healthcare & Municipal Solutions](https://www.hes-consultancy-international.com/nxt-era-solutions-1)

## License

© 2025 HES Consultancy International. All rights reserved.

---

*Built with React | Powered by Nxt Era Solutions*
