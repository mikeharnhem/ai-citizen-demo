import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// AI CITIZEN DEMO - MUNICIPAL SERVICES ASSISTANT
// Nxt Era Solutions | Part of HES Consultancy International
// ============================================================================

// Language content
const content = {
  en: {
    title: "AI Citizen",
    subtitle: "Municipal Services Assistant",
    tagline: "Experience how AI transforms municipal services",
    selectService: "Select a service to begin",
    services: {
      welfare: {
        name: "Work & Income",
        desc: "Welfare applications, reintegration",
        icon: "💼"
      },
      wmo: {
        name: "Social Care (WMO)",
        desc: "Home care, assistive devices",
        icon: "🏠"
      },
      debt: {
        name: "Debt Assistance",
        desc: "Financial help, debt resolution",
        icon: "💰"
      },
      youth: {
        name: "Youth Care",
        desc: "Support for children & families",
        icon: "👶"
      }
    },
    chat: {
      placeholder: "Type your message or use voice...",
      send: "Send",
      listening: "Listening...",
      processing: "Processing...",
      voiceStart: "Start voice input",
      voiceStop: "Stop listening",
      newChat: "New conversation",
      back: "Back to services"
    },
    features: {
      voice: "Voice Input",
      multilingual: "EN/NL",
      urgency: "Urgency Detection",
      reports: "Auto Reports"
    },
    urgencyLevels: {
      low: "Standard",
      medium: "Priority",
      high: "Urgent",
      critical: "Crisis"
    },
    report: {
      title: "Intake Report",
      generate: "Generate Report",
      summary: "Summary",
      situation: "Current Situation",
      request: "Request",
      urgency: "Urgency Level",
      nextSteps: "Recommended Next Steps",
      download: "Download Report",
      close: "Close"
    },
    stats: {
      conversations: "Conversations",
      avgTime: "Avg. Time",
      satisfaction: "Satisfaction",
      resolved: "First Contact Resolution"
    },
    footer: "AI Citizen Demo | Nxt Era Solutions | Part of HES Consultancy International",
    disclaimer: "This is a demonstration. AI never makes decisions about citizens - all decisions are made by qualified staff."
  },
  nl: {
    title: "AI Citizen",
    subtitle: "Gemeentelijke Dienstverlening Assistent",
    tagline: "Ervaar hoe AI gemeentelijke dienstverlening transformeert",
    selectService: "Selecteer een dienst om te beginnen",
    services: {
      welfare: {
        name: "Werk & Inkomen",
        desc: "Bijstandsaanvragen, re-integratie",
        icon: "💼"
      },
      wmo: {
        name: "WMO",
        desc: "Huishoudelijke hulp, hulpmiddelen",
        icon: "🏠"
      },
      debt: {
        name: "Schuldhulpverlening",
        desc: "Financiële hulp, schulden oplossen",
        icon: "💰"
      },
      youth: {
        name: "Jeugdzorg",
        desc: "Ondersteuning voor kinderen & gezinnen",
        icon: "👶"
      }
    },
    chat: {
      placeholder: "Typ uw bericht of gebruik spraak...",
      send: "Verstuur",
      listening: "Luistert...",
      processing: "Verwerkt...",
      voiceStart: "Start spraakinvoer",
      voiceStop: "Stop luisteren",
      newChat: "Nieuw gesprek",
      back: "Terug naar diensten"
    },
    features: {
      voice: "Spraakinvoer",
      multilingual: "NL/EN",
      urgency: "Urgentie Detectie",
      reports: "Auto Rapportage"
    },
    urgencyLevels: {
      low: "Standaard",
      medium: "Prioriteit",
      high: "Urgent",
      critical: "Crisis"
    },
    report: {
      title: "Intake Rapport",
      generate: "Genereer Rapport",
      summary: "Samenvatting",
      situation: "Huidige Situatie",
      request: "Hulpvraag",
      urgency: "Urgentie Niveau",
      nextSteps: "Aanbevolen Vervolgstappen",
      download: "Download Rapport",
      close: "Sluiten"
    },
    stats: {
      conversations: "Gesprekken",
      avgTime: "Gem. Tijd",
      satisfaction: "Tevredenheid",
      resolved: "Direct Opgelost"
    },
    footer: "AI Citizen Demo | Nxt Era Solutions | Onderdeel van HES Consultancy International",
    disclaimer: "Dit is een demonstratie. AI neemt nooit besluiten over burgers - alle besluiten worden genomen door gekwalificeerde medewerkers."
  }
};

// AI Response templates per service
const aiResponses = {
  welfare: {
    en: {
      greeting: "Hello! I'm here to help you with Work & Income services. I can assist with welfare applications, reintegration support, and employment services. What would you like help with today?",
      followUp: [
        "I understand you're looking for income support. Let me ask a few questions to better understand your situation. Are you currently employed, self-employed, or looking for work?",
        "Thank you for sharing that. To help determine which support options might be available, could you tell me about your current living situation? Do you live alone or with others?",
        "I'm gathering important information to prepare your case. Have you received any income in the past 3 months from work, benefits, or other sources?",
        "Based on what you've shared, it appears you may be eligible for welfare assistance. A caseworker will review your situation. Would you like me to schedule an appointment for an intake conversation?"
      ],
      urgencyTriggers: ["homeless", "no food", "eviction", "emergency", "children hungry"]
    },
    nl: {
      greeting: "Goedendag! Ik help u graag met Werk & Inkomen. Ik kan u ondersteunen bij bijstandsaanvragen, re-integratie en arbeidsbemiddeling. Waar kan ik u vandaag mee helpen?",
      followUp: [
        "Ik begrijp dat u op zoek bent naar inkomensondersteuning. Laat me een paar vragen stellen om uw situatie beter te begrijpen. Bent u momenteel in loondienst, zelfstandig, of op zoek naar werk?",
        "Dank u voor het delen. Om te bepalen welke ondersteuning mogelijk is, kunt u mij vertellen over uw woonsituatie? Woont u alleen of met anderen?",
        "Ik verzamel belangrijke informatie voor uw dossier. Heeft u de afgelopen 3 maanden inkomsten ontvangen uit werk, uitkeringen of andere bronnen?",
        "Op basis van wat u heeft gedeeld, lijkt het erop dat u mogelijk in aanmerking komt voor bijstand. Een klantmanager zal uw situatie beoordelen. Wilt u dat ik een afspraak inplan voor een intakegesprek?"
      ],
      urgencyTriggers: ["dakloos", "geen eten", "huisuitzetting", "noodgeval", "kinderen honger"]
    }
  },
  wmo: {
    en: {
      greeting: "Hello! I'm here to help with Social Care (WMO) services. This includes home care, assistive devices, transportation, and day activities. What support are you looking for?",
      followUp: [
        "I'd like to understand your situation better. Could you describe what daily activities have become difficult for you?",
        "Thank you for explaining. Is this related to a medical condition, aging, or another circumstance? This helps us determine the right type of support.",
        "I'm noting down the details. Do you currently receive any other care or support, from family members or professional caregivers?",
        "Based on your needs, a WMO consultant will conduct a home visit to assess your situation. This is called a 'kitchen table conversation'. Shall I explain what to expect during this visit?"
      ],
      urgencyTriggers: ["fallen", "can't get up", "no one to help", "medication", "alone"]
    },
    nl: {
      greeting: "Goedendag! Ik help u graag met WMO-voorzieningen. Dit omvat huishoudelijke hulp, hulpmiddelen, vervoer en dagbesteding. Welke ondersteuning zoekt u?",
      followUp: [
        "Ik wil graag uw situatie beter begrijpen. Kunt u beschrijven welke dagelijkse activiteiten moeilijk voor u zijn geworden?",
        "Dank u voor de uitleg. Heeft dit te maken met een medische aandoening, ouderdom, of een andere omstandigheid? Dit helpt ons de juiste ondersteuning te bepalen.",
        "Ik noteer de details. Ontvangt u momenteel al andere zorg of ondersteuning, van familieleden of professionele hulpverleners?",
        "Op basis van uw behoeften zal een WMO-consulent een huisbezoek afleggen om uw situatie te beoordelen. Dit heet een 'keukentafelgesprek'. Zal ik uitleggen wat u kunt verwachten tijdens dit bezoek?"
      ],
      urgencyTriggers: ["gevallen", "kan niet opstaan", "niemand om te helpen", "medicijnen", "alleen"]
    }
  },
  debt: {
    en: {
      greeting: "Hello! I'm here to help with debt assistance. I understand financial problems can be stressful. We're here to help you find a way forward. Would you like to tell me about your situation?",
      followUp: [
        "Thank you for reaching out. First, I want you to know that seeking help is an important step. Are you currently facing immediate threats like eviction or utility disconnection?",
        "I'm here to help. Can you give me a general idea of how many creditors you have and the total amount of debt? An estimate is fine.",
        "Many people in your situation have found a path to becoming debt-free. Do you currently have any income from work, benefits, or other sources?",
        "Based on what you've shared, you may benefit from our debt assistance program. A financial counselor can help create a plan. Would you like me to schedule an intake appointment?"
      ],
      urgencyTriggers: ["bailiff", "eviction tomorrow", "utilities cut off", "collection agency", "wage garnishment"]
    },
    nl: {
      greeting: "Goedendag! Ik help u graag met schuldhulpverlening. Ik begrijp dat financiële problemen stressvol kunnen zijn. We zijn er om u te helpen een weg vooruit te vinden. Wilt u mij over uw situatie vertellen?",
      followUp: [
        "Dank u dat u contact opneemt. Allereerst wil ik dat u weet dat hulp zoeken een belangrijke stap is. Heeft u op dit moment te maken met directe bedreigingen zoals huisuitzetting of afsluiting van nutsvoorzieningen?",
        "Ik ben hier om te helpen. Kunt u mij een algemeen idee geven van hoeveel schuldeisers u heeft en het totale schuldbedrag? Een schatting is prima.",
        "Veel mensen in uw situatie hebben een weg naar schuldenvrij leven gevonden. Heeft u momenteel inkomsten uit werk, uitkeringen of andere bronnen?",
        "Op basis van wat u heeft gedeeld, kunt u baat hebben bij ons schuldhulpverleningsprogramma. Een financieel adviseur kan helpen een plan te maken. Wilt u dat ik een intakegesprek inplan?"
      ],
      urgencyTriggers: ["deurwaarder", "huisuitzetting morgen", "afgesloten", "incassobureau", "loonbeslag"]
    }
  },
  youth: {
    en: {
      greeting: "Hello! I'm here to help with Youth Care services. We support children, young people, and families who need extra help. What would you like to discuss?",
      followUp: [
        "Thank you for reaching out. To help you best, could you tell me if you're a parent/guardian seeking help for your child, or a young person yourself?",
        "I understand. Could you describe what challenges you or your family are currently facing? This helps us connect you with the right support.",
        "Thank you for sharing. How long have these concerns been going on, and have you received any support before?",
        "Based on what you've told me, I'll connect you with a youth care specialist who can discuss options with you. Would you prefer a phone call or an in-person meeting?"
      ],
      urgencyTriggers: ["abuse", "unsafe at home", "suicide", "self-harm", "running away"]
    },
    nl: {
      greeting: "Goedendag! Ik help u graag met Jeugdzorg. We ondersteunen kinderen, jongeren en gezinnen die extra hulp nodig hebben. Waar wilt u over praten?",
      followUp: [
        "Dank u dat u contact opneemt. Om u het beste te kunnen helpen, kunt u mij vertellen of u een ouder/verzorger bent die hulp zoekt voor uw kind, of dat u zelf een jongere bent?",
        "Ik begrijp het. Kunt u beschrijven met welke uitdagingen u of uw gezin momenteel te maken heeft? Dit helpt ons u met de juiste ondersteuning te verbinden.",
        "Dank u voor het delen. Hoe lang spelen deze zorgen al, en heeft u eerder ondersteuning ontvangen?",
        "Op basis van wat u mij heeft verteld, verbind ik u met een jeugdzorgspecialist die de opties met u kan bespreken. Heeft u voorkeur voor een telefoongesprek of een persoonlijke afspraak?"
      ],
      urgencyTriggers: ["mishandeling", "onveilig thuis", "zelfmoord", "zelfbeschadiging", "weglopen"]
    }
  }
};

// Styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0D1B2A 0%, #1B3A4B 50%, #2E86AB 100%);
    min-height: 100vh;
    color: #fff;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .header {
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .logo-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #E86C3A, #FF8C5A);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .logo-text h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .logo-text p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .lang-toggle {
    display: flex;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 4px;
  }

  .lang-btn {
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    font-weight: 600;
    border-radius: 16px;
    transition: all 0.3s;
  }

  .lang-btn.active {
    background: #E86C3A;
    color: white;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  /* Service Selection */
  .service-selection {
    text-align: center;
    padding: 40px 20px;
  }

  .service-selection h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #fff 0%, #E86C3A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .service-selection .tagline {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 40px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .service-card {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 35px 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }

  .service-card:hover {
    transform: translateY(-8px);
    background: rgba(255,255,255,0.12);
    border-color: #E86C3A;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .service-icon {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }

  .service-card h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #fff;
  }

  .service-card p {
    color: rgba(255,255,255,0.7);
    font-size: 0.95rem;
  }

  /* Features Bar */
  .features-bar {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 50px;
    flex-wrap: wrap;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255,255,255,0.8);
    font-size: 0.95rem;
  }

  .feature-icon {
    font-size: 1.3rem;
  }

  /* Chat Interface */
  .chat-container {
    display: flex;
    gap: 25px;
    flex: 1;
    max-height: calc(100vh - 180px);
  }

  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.1);
    overflow: hidden;
  }

  .chat-header {
    padding: 20px 25px;
    background: rgba(0,0,0,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .chat-header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .chat-service-icon {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #E86C3A, #FF8C5A);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .chat-service-info h3 {
    font-size: 1.1rem;
    color: #fff;
  }

  .chat-service-info p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
  }

  .back-btn {
    padding: 10px 20px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.2);
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .message {
    display: flex;
    gap: 12px;
    max-width: 85%;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  .message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .message.ai .message-avatar {
    background: linear-gradient(135deg, #E86C3A, #FF8C5A);
  }

  .message.user .message-avatar {
    background: linear-gradient(135deg, #2E86AB, #48B8D0);
  }

  .message-content {
    background: rgba(255,255,255,0.1);
    padding: 15px 20px;
    border-radius: 18px;
    color: #fff;
    line-height: 1.6;
  }

  .message.user .message-content {
    background: linear-gradient(135deg, #2E86AB, #48B8D0);
  }

  .message.ai .message-content {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .typing-indicator {
    display: flex;
    gap: 5px;
    padding: 15px 20px;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }

  .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
  .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }

  /* Chat Input */
  .chat-input-container {
    padding: 20px 25px;
    background: rgba(0,0,0,0.2);
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .chat-input-wrapper {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .chat-input {
    flex: 1;
    padding: 15px 20px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
  }

  .chat-input:focus {
    border-color: #E86C3A;
    background: rgba(255,255,255,0.15);
  }

  .chat-input::placeholder {
    color: rgba(255,255,255,0.5);
  }

  .voice-btn, .send-btn {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    font-size: 1.3rem;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .voice-btn {
    background: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .voice-btn:hover {
    background: rgba(255,255,255,0.2);
  }

  .voice-btn.listening {
    background: #E53E3E;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.5); }
    50% { box-shadow: 0 0 0 15px rgba(229, 62, 62, 0); }
  }

  .send-btn {
    background: linear-gradient(135deg, #E86C3A, #FF8C5A);
    color: white;
  }

  .send-btn:hover {
    transform: scale(1.05);
  }

  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Sidebar */
  .chat-sidebar {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sidebar-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    padding: 25px;
  }

  .sidebar-card h4 {
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }

  /* Urgency Indicator */
  .urgency-indicator {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .urgency-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    animation: urgencyPulse 2s infinite;
  }

  .urgency-dot.low { background: #27AE60; }
  .urgency-dot.medium { background: #F39C12; }
  .urgency-dot.high { background: #E67E22; }
  .urgency-dot.critical { background: #E53E3E; }

  @keyframes urgencyPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .urgency-text {
    font-size: 1.1rem;
    font-weight: 600;
  }

  /* Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .stat-item {
    text-align: center;
    padding: 15px;
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #E86C3A;
  }

  .stat-label {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
    margin-top: 5px;
  }

  /* Report Button */
  .report-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #E86C3A, #FF8C5A);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .report-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(232,108,58,0.3);
  }

  /* Report Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-content {
    background: linear-gradient(135deg, #1E3A5F, #2E86AB);
    border-radius: 24px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .modal-header {
    padding: 25px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h3 {
    font-size: 1.5rem;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s;
  }

  .modal-close:hover {
    background: rgba(255,255,255,0.1);
  }

  .modal-body {
    padding: 25px;
  }

  .report-section {
    margin-bottom: 25px;
  }

  .report-section h4 {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .report-section p {
    color: #fff;
    line-height: 1.7;
  }

  .report-urgency {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }

  .report-steps {
    list-style: none;
  }

  .report-steps li {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .report-steps li:last-child {
    border-bottom: none;
  }

  .step-number {
    width: 28px;
    height: 28px;
    background: #E86C3A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .modal-footer {
    padding: 20px 25px;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex;
    gap: 15px;
  }

  .modal-btn {
    flex: 1;
    padding: 15px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .modal-btn.primary {
    background: linear-gradient(135deg, #E86C3A, #FF8C5A);
    border: none;
    color: white;
  }

  .modal-btn.secondary {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
  }

  /* Footer */
  .footer {
    padding: 20px 30px;
    text-align: center;
    background: rgba(0,0,0,0.3);
    color: rgba(255,255,255,0.6);
    font-size: 0.85rem;
  }

  .disclaimer {
    margin-top: 10px;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.4);
    font-style: italic;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .chat-container {
      flex-direction: column;
      max-height: none;
    }

    .chat-sidebar {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .sidebar-card {
      flex: 1;
      min-width: 200px;
    }
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      gap: 15px;
      padding: 15px;
    }

    .main-content {
      padding: 15px;
    }

    .service-selection h2 {
      font-size: 1.8rem;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .features-bar {
      gap: 15px;
    }

    .chat-sidebar {
      flex-direction: column;
    }

    .sidebar-card {
      min-width: auto;
    }

    .modal-footer {
      flex-direction: column;
    }
  }
`;

// Main App Component
function App() {
  const [lang, setLang] = useState('en');
  const [selectedService, setSelectedService] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('low');
  const [showReport, setShowReport] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const t = content[lang];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = lang === 'nl' ? 'nl-NL' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [lang]);

  // Start a service conversation
  const startService = (serviceKey) => {
    setSelectedService(serviceKey);
    setMessages([]);
    setConversationStep(0);
    setUrgencyLevel('low');
    
    // Add initial AI greeting
    setTimeout(() => {
      const greeting = aiResponses[serviceKey][lang].greeting;
      setMessages([{ type: 'ai', text: greeting }]);
    }, 500);
  };

  // Check for urgency triggers
  const checkUrgency = (text) => {
    if (!selectedService) return 'low';
    
    const triggers = aiResponses[selectedService][lang].urgencyTriggers;
    const lowerText = text.toLowerCase();
    
    for (const trigger of triggers) {
      if (lowerText.includes(trigger.toLowerCase())) {
        return 'critical';
      }
    }
    
    // Check for medium/high urgency keywords
    const highKeywords = ['urgent', 'dringend', 'snel', 'immediately', 'help me', 'help mij'];
    const mediumKeywords = ['worried', 'bezorgd', 'problem', 'probleem', 'difficult', 'moeilijk'];
    
    for (const keyword of highKeywords) {
      if (lowerText.includes(keyword)) return 'high';
    }
    
    for (const keyword of mediumKeywords) {
      if (lowerText.includes(keyword)) return 'medium';
    }
    
    return urgencyLevel; // Keep current level
  };

  // Send message
  const sendMessage = () => {
    if (!inputValue.trim() || !selectedService) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    
    // Check urgency
    const newUrgency = checkUrgency(userMessage);
    if (['medium', 'high', 'critical'].indexOf(newUrgency) > ['medium', 'high', 'critical'].indexOf(urgencyLevel)) {
      setUrgencyLevel(newUrgency);
    }
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = aiResponses[selectedService][lang].followUp;
      const responseIndex = Math.min(conversationStep, responses.length - 1);
      const aiResponse = responses[responseIndex];
      
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setConversationStep(prev => prev + 1);
    }, 1500 + Math.random() * 1000);
  };

  // Handle voice input
  const toggleVoice = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.lang = lang === 'nl' ? 'nl-NL' : 'en-US';
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Generate report data
  const getReportData = () => {
    if (!selectedService || messages.length < 2) return null;

    const userMessages = messages.filter(m => m.type === 'user').map(m => m.text).join(' ');
    
    const reportData = {
      service: t.services[selectedService].name,
      summary: userMessages.substring(0, 200) + (userMessages.length > 200 ? '...' : ''),
      urgency: urgencyLevel,
      steps: lang === 'en' ? [
        'Schedule intake appointment with caseworker',
        'Gather required documentation',
        'Complete formal application',
        'Await assessment decision',
        'Follow-up support if needed'
      ] : [
        'Intakegesprek inplannen met klantmanager',
        'Benodigde documenten verzamelen',
        'Formele aanvraag indienen',
        'Wachten op beoordelingsbesluit',
        'Vervolgondersteuning indien nodig'
      ]
    };

    return reportData;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="logo-section">
            <div className="logo-icon">🏛️</div>
            <div className="logo-text">
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>
          </div>
          <div className="header-controls">
            <div className="lang-toggle">
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button 
                className={`lang-btn ${lang === 'nl' ? 'active' : ''}`}
                onClick={() => setLang('nl')}
              >
                NL
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {!selectedService ? (
            // Service Selection
            <div className="service-selection">
              <h2>{t.title}</h2>
              <p className="tagline">{t.tagline}</p>
              <p style={{ marginBottom: '40px', color: 'rgba(255,255,255,0.7)' }}>
                {t.selectService}
              </p>
              
              <div className="services-grid">
                {Object.entries(t.services).map(([key, service]) => (
                  <div 
                    key={key}
                    className="service-card"
                    onClick={() => startService(key)}
                  >
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.name}</h3>
                    <p>{service.desc}</p>
                  </div>
                ))}
              </div>

              <div className="features-bar">
                <div className="feature-item">
                  <span className="feature-icon">🎤</span>
                  <span>{t.features.voice}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌐</span>
                  <span>{t.features.multilingual}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚨</span>
                  <span>{t.features.urgency}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📋</span>
                  <span>{t.features.reports}</span>
                </div>
              </div>
            </div>
          ) : (
            // Chat Interface
            <div className="chat-container">
              <div className="chat-main">
                <div className="chat-header">
                  <div className="chat-header-left">
                    <div className="chat-service-icon">
                      {t.services[selectedService].icon}
                    </div>
                    <div className="chat-service-info">
                      <h3>{t.services[selectedService].name}</h3>
                      <p>{t.services[selectedService].desc}</p>
                    </div>
                  </div>
                  <button className="back-btn" onClick={() => setSelectedService(null)}>
                    ← {t.chat.back}
                  </button>
                </div>

                <div className="chat-messages">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.type}`}>
                      <div className="message-avatar">
                        {msg.type === 'ai' ? '🏛️' : '👤'}
                      </div>
                      <div className="message-content">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message ai">
                      <div className="message-avatar">🏛️</div>
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                  <div className="chat-input-wrapper">
                    <input
                      type="text"
                      className="chat-input"
                      placeholder={t.chat.placeholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button 
                      className={`voice-btn ${isListening ? 'listening' : ''}`}
                      onClick={toggleVoice}
                      title={isListening ? t.chat.voiceStop : t.chat.voiceStart}
                    >
                      {isListening ? '⏹️' : '🎤'}
                    </button>
                    <button 
                      className="send-btn"
                      onClick={sendMessage}
                      disabled={!inputValue.trim()}
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="chat-sidebar">
                <div className="sidebar-card">
                  <h4>{t.report.urgency}</h4>
                  <div className="urgency-indicator">
                    <div className={`urgency-dot ${urgencyLevel}`}></div>
                    <span className="urgency-text">{t.urgencyLevels[urgencyLevel]}</span>
                  </div>
                </div>

                <div className="sidebar-card">
                  <h4>Dashboard</h4>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-value">1,247</div>
                      <div className="stat-label">{t.stats.conversations}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">4:32</div>
                      <div className="stat-label">{t.stats.avgTime}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">94%</div>
                      <div className="stat-label">{t.stats.satisfaction}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">67%</div>
                      <div className="stat-label">{t.stats.resolved}</div>
                    </div>
                  </div>
                </div>

                <button 
                  className="report-btn"
                  onClick={() => setShowReport(true)}
                  disabled={messages.length < 2}
                >
                  📋 {t.report.generate}
                </button>
              </aside>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          {t.footer}
          <div className="disclaimer">{t.disclaimer}</div>
        </footer>

        {/* Report Modal */}
        {showReport && (
          <div className="modal-overlay" onClick={() => setShowReport(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>📋 {t.report.title}</h3>
                <button className="modal-close" onClick={() => setShowReport(false)}>✕</button>
              </div>
              <div className="modal-body">
                {getReportData() && (
                  <>
                    <div className="report-section">
                      <h4>{t.report.summary}</h4>
                      <p>{getReportData().summary}</p>
                    </div>
                    <div className="report-section">
                      <h4>{t.report.urgency}</h4>
                      <div className="report-urgency">
                        <div className={`urgency-dot ${urgencyLevel}`}></div>
                        <span>{t.urgencyLevels[urgencyLevel]}</span>
                      </div>
                    </div>
                    <div className="report-section">
                      <h4>{t.report.nextSteps}</h4>
                      <ul className="report-steps">
                        {getReportData().steps.map((step, idx) => (
                          <li key={idx}>
                            <span className="step-number">{idx + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="modal-btn secondary" onClick={() => setShowReport(false)}>
                  {t.report.close}
                </button>
                <button className="modal-btn primary">
                  📥 {t.report.download}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
