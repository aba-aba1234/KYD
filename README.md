# 🔷 KYD — Keep Your Dear ones safe

> La piattaforma italiana che connette famiglie con caregiver verificati per assistenza a bambini, animali domestici e anziani.

---

## 📋 Indice

- [Descrizione](#-descrizione)
- [Funzionalità](#-funzionalità)
- [Tech Stack](#-tech-stack)
- [Installazione](#-installazione)
- [Struttura Progetto](#-struttura-progetto)
- [Variabili d'Ambiente](#-variabili-dambiente)
- [Demo](#-demo)
- [Roadmap](#-roadmap)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

---

## 📖 Descrizione

**KYD** è un marketplace meritocratico che risolve il problema di trovare assistenza affidabile per le proprie famiglie. Grazie a un sistema di profili verificati, gestione delle disponibilità in tempo reale e recensioni certificate, gli utenti possono prenotare un servizio in pochi click con la certezza di affidarsi a professionisti qualificati.

### Il Problema
- 73% delle famiglie impiega più di 2 settimane per trovare un caregiver affidabile
- Il mercato italiano del babysitting vale €2.5 miliardi, di cui l'85% è sommerso
- Le agenzie tradizionali prendono commissioni dal 30% al 50%

### La Soluzione
KYD connette domanda e offerta in meno di **3 minuti**, con verifica identità a 5 livelli, pagamento sicuro e chat real-time tra utenti e caregiver.

---

## ✨ Funzionalità

### Per gli Utenti
- 🔍 **Ricerca avanzata** con filtri per città (autocomplete), data (calendario), tipo servizio e budget
- 🗺️ **Mappa interattiva** con zona operativa di ogni caregiver
- 💬 **Chat real-time** stile WhatsApp tra utente e caregiver
- 📅 **Sistema prenotazioni** con stepper multi-step
- ❤️ **Sitter preferiti** salvabili e prenotabili con un click
- ⭐ **Recensioni certificate** (solo dopo prenotazione completata)
- 🆘 **Instant Booking** per urgenze last-minute

### Per i Caregiver
- 📝 **Profilo completo** con video presentazione, curriculum, certificazioni e CV
- 🗺️ **Zona operativa** impostabile su mappa con raggio km personalizzabile
- 📅 **Calendario disponibilità** settimanale
- 💰 **Pagamenti automatici** entro 48h dal servizio
- 📊 **Dashboard guadagni** con statistiche
- 🏅 **Sistema badge** meritocratico (Bronze → Diamond)

### Sistema di Sicurezza (5 livelli)
1. ✅ Verifica identità (documento + face matching)
2. ✅ Certificato penale del casellario giudiziale
3. ✅ Controllo referenze lavorative
4. ✅ Verifica certificazioni professionali
5. ✅ Recensioni certificate post-servizio

---

## 🛠️ Tech Stack

### Frontend
| Tecnologia | Versione | Utilizzo |
|-----------|----------|----------|
| React | 18.2+ | UI Framework |
| Vite | 5.0+ | Build tool |
| React Router DOM | 6.21+ | Routing |
| Tailwind CSS | 3.4+ | Styling |
| Framer Motion | 10.16+ | Animazioni |
| Lucide React | 0.303+ | Icone |
| React Leaflet | 4.2+ | Mappe interattive |
| Leaflet | 1.9+ | Mappe base |

### Backend & Database
| Tecnologia | Utilizzo |
|-----------|----------|
| Express.js | Server HTTP |
| Socket.io | Chat real-time |
| Supabase | Database PostgreSQL + Auth + Storage |
| Firebase | Realtime Database (chat fallback) |

### Deploy & DevOps
| Servizio | Utilizzo |
|---------|----------|
| Replit | Hosting + sviluppo |
| GitHub | Version control |
| Vercel | Deploy alternativo |

---

## 🚀 Installazione

### Prerequisiti
- Node.js 18+
- npm o pnpm
- Account Supabase (gratuito)
- Account Firebase (gratuito, per chat)

### 1. Clona il repository

```bash
git clone https://github.com/[tuo-username]/kyd-marketplace.git
cd kyd-marketplace
