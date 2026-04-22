import {
  db,
  caregiversTable,
  reviewsTable,
  chatMessagesTable,
} from "@workspace/db";

const colors = [
  "#E8A87C",
  "#85C1AE",
  "#C38D9E",
  "#41B3A3",
  "#E27D60",
  "#7A8FA6",
  "#D9BF77",
  "#9B5DE5",
  "#6FB1FC",
  "#F4845F",
  "#5B8C5A",
  "#B0413E",
];

function makeAvailability(seed: number) {
  const days = [
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica",
  ];
  const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  return days.map((day, i) => ({
    day,
    slots: hours.map((hour, j) => ({
      hour,
      free: ((seed + i * 3 + j * 2) % 5) !== 0,
    })),
  }));
}

const caregivers = [
  {
    id: "giulia-rossi",
    name: "Giulia Rossi",
    city: "Milano",
    bio: "Educatrice dell'infanzia con 8 anni di esperienza in asili Montessori. Adoro inventare attività creative e leggere storie. Ho il certificato di primo soccorso pediatrico BLS-D.",
    services: ["baby"],
    pricePerHour: 14,
    rating: 4.9,
    reviewCount: 142,
    availableNow: true,
    lat: 45.4642,
    lng: 9.19,
    radiusKm: 8,
    certifications: ["Primo Soccorso BLS-D", "Educatrice Montessori", "Verifica identità"],
    yearsExperience: 8,
  },
  {
    id: "marco-ferrari",
    name: "Marco Ferrari",
    city: "Milano",
    bio: "Pet-sitter appassionato, vivo con due labrador. Offro passeggiate lunghe, addestramento gentile e pet-sitting in casa con foto e GPS in tempo reale.",
    services: ["pet"],
    pricePerHour: 12,
    rating: 4.8,
    reviewCount: 98,
    availableNow: true,
    lat: 45.485,
    lng: 9.205,
    radiusKm: 6,
    certifications: ["Educatore cinofilo ENCI", "RC professionale", "Verifica identità"],
    yearsExperience: 5,
  },
  {
    id: "anna-bianchi",
    name: "Anna Bianchi",
    city: "Roma",
    bio: "OSS qualificata da oltre 12 anni. Assisto persone anziane con dolcezza e professionalità: igiene, somministrazione farmaci, compagnia e piccole commissioni.",
    services: ["elder"],
    pricePerHour: 17,
    rating: 5.0,
    reviewCount: 211,
    availableNow: false,
    lat: 41.9028,
    lng: 12.4964,
    radiusKm: 12,
    certifications: ["OSS certificata", "Background check", "Primo Soccorso", "Verifica identità"],
    yearsExperience: 12,
  },
  {
    id: "sofia-conti",
    name: "Sofia Conti",
    city: "Roma",
    bio: "Studentessa di Scienze della Formazione, esperienza con bambini 0-10 anni. Disponibile per aiuto compiti, attività pomeridiane e accompagno a scuola.",
    services: ["baby"],
    pricePerHour: 13,
    rating: 4.7,
    reviewCount: 64,
    availableNow: true,
    lat: 41.91,
    lng: 12.48,
    radiusKm: 7,
    certifications: ["Primo Soccorso BLS-D", "Verifica identità"],
    yearsExperience: 4,
  },
  {
    id: "luca-romano",
    name: "Luca Romano",
    city: "Torino",
    bio: "Veterinario di formazione, mi prendo cura di cani e gatti con esperienza clinica. Specializzato in animali anziani e con bisogni medici particolari.",
    services: ["pet"],
    pricePerHour: 16,
    rating: 4.9,
    reviewCount: 87,
    availableNow: true,
    lat: 45.0703,
    lng: 7.6869,
    radiusKm: 10,
    certifications: ["Laurea in Veterinaria", "RC professionale", "Verifica identità"],
    yearsExperience: 7,
  },
  {
    id: "francesca-greco",
    name: "Francesca Greco",
    city: "Torino",
    bio: "Babysitter bilingue italiano-inglese. Esperienza con neonati e gemelli. Mamma di due bambini, paziente e affidabile.",
    services: ["baby"],
    pricePerHour: 15,
    rating: 4.8,
    reviewCount: 119,
    availableNow: false,
    lat: 45.075,
    lng: 7.69,
    radiusKm: 8,
    certifications: ["Primo Soccorso BLS-D", "Inglese C1", "Verifica identità"],
    yearsExperience: 9,
  },
  {
    id: "paolo-marini",
    name: "Paolo Marini",
    city: "Bologna",
    bio: "Assistente familiare con esperienza in supporto a persone con Alzheimer e mobilità ridotta. Disponibile anche per turni notturni.",
    services: ["elder"],
    pricePerHour: 16,
    rating: 4.9,
    reviewCount: 156,
    availableNow: true,
    lat: 44.4949,
    lng: 11.3426,
    radiusKm: 15,
    certifications: ["OSS certificata", "Specializzazione Alzheimer", "Background check", "Verifica identità"],
    yearsExperience: 10,
  },
  {
    id: "elena-villa",
    name: "Elena Villa",
    city: "Firenze",
    bio: "Babysitter ed educatrice musicale. Porto la chitarra e organizzo piccoli laboratori di musica e arte per bambini dai 3 ai 12 anni.",
    services: ["baby"],
    pricePerHour: 14,
    rating: 4.9,
    reviewCount: 78,
    availableNow: true,
    lat: 43.7696,
    lng: 11.2558,
    radiusKm: 6,
    certifications: ["Primo Soccorso BLS-D", "Diploma Conservatorio", "Verifica identità"],
    yearsExperience: 6,
  },
  {
    id: "matteo-russo",
    name: "Matteo Russo",
    city: "Napoli",
    bio: "Pet-sitter e dog walker, gestisco piccoli gruppi di cani al parco. Offro anche servizio di trasporto dal veterinario in auto attrezzata.",
    services: ["pet"],
    pricePerHour: 11,
    rating: 4.7,
    reviewCount: 92,
    availableNow: true,
    lat: 40.8518,
    lng: 14.2681,
    radiusKm: 9,
    certifications: ["Educatore cinofilo", "RC professionale", "Verifica identità"],
    yearsExperience: 4,
  },
  {
    id: "chiara-de-luca",
    name: "Chiara De Luca",
    city: "Napoli",
    bio: "Doppia specializzazione: babysitter per i più piccoli e aiuto compiti per scuole elementari e medie. Laureata in Lettere.",
    services: ["baby"],
    pricePerHour: 13,
    rating: 4.8,
    reviewCount: 71,
    availableNow: false,
    lat: 40.84,
    lng: 14.25,
    radiusKm: 7,
    certifications: ["Primo Soccorso BLS-D", "Laurea in Lettere", "Verifica identità"],
    yearsExperience: 5,
  },
  {
    id: "davide-moretti",
    name: "Davide Moretti",
    city: "Milano",
    bio: "Operatore socio-sanitario. Aiuto anziani autosufficienti e non, con esperienza in cure post-operatorie e riabilitazione domiciliare.",
    services: ["elder"],
    pricePerHour: 18,
    rating: 4.9,
    reviewCount: 134,
    availableNow: true,
    lat: 45.45,
    lng: 9.18,
    radiusKm: 10,
    certifications: ["OSS certificata", "Background check", "Riabilitazione", "Verifica identità"],
    yearsExperience: 11,
  },
  {
    id: "alessia-fontana",
    name: "Alessia Fontana",
    city: "Verona",
    bio: "Pet-sitter con casa con giardino, ospito cani anche per più giorni. Tantissime referenze e foto giornaliere ai padroncini.",
    services: ["pet"],
    pricePerHour: 13,
    rating: 5.0,
    reviewCount: 105,
    availableNow: true,
    lat: 45.4384,
    lng: 10.9916,
    radiusKm: 12,
    certifications: ["Educatore cinofilo", "RC professionale", "Verifica identità"],
    yearsExperience: 6,
  },
];

const reviews = [
  {
    caregiverId: "giulia-rossi",
    authorName: "Sara M.",
    authorRole: "Mamma di Leonardo (3 anni)",
    city: "Milano",
    rating: 5,
    comment:
      "Giulia è una persona meravigliosa. Mio figlio la aspetta con gioia e ha imparato cose nuove ad ogni incontro. Ci ha cambiato la vita.",
    date: "2026-03-12",
    featured: true,
  },
  {
    caregiverId: "giulia-rossi",
    authorName: "Federico T.",
    authorRole: "Papà di Anna (5 anni)",
    city: "Milano",
    rating: 5,
    comment:
      "Puntuale, dolce, professionale. Si vede che ama il suo lavoro. Consigliatissima.",
    date: "2026-02-20",
    featured: false,
  },
  {
    caregiverId: "anna-bianchi",
    authorName: "Roberto P.",
    authorRole: "Figlio di nonna Maria",
    city: "Roma",
    rating: 5,
    comment:
      "Anna si prende cura di mia madre con una delicatezza unica. Posso lavorare sereno sapendo che è in mani sicure.",
    date: "2026-03-30",
    featured: true,
  },
  {
    caregiverId: "marco-ferrari",
    authorName: "Giorgia L.",
    authorRole: "Padroncina di Pippo",
    city: "Milano",
    rating: 5,
    comment:
      "Marco tratta i nostri cani come fossero suoi. Le foto e il GPS ci tranquillizzano tantissimo durante il lavoro.",
    date: "2026-04-02",
    featured: true,
  },
  {
    caregiverId: "paolo-marini",
    authorName: "Lucia B.",
    authorRole: "Figlia di nonno Aldo",
    city: "Bologna",
    rating: 5,
    comment:
      "Esperienza Alzheimer fondamentale. Paolo ha portato calma in casa nostra in un momento difficilissimo. Grazie davvero.",
    date: "2026-03-18",
    featured: true,
  },
  {
    caregiverId: "elena-villa",
    authorName: "Marta C.",
    authorRole: "Mamma di Giulio (7 anni)",
    city: "Firenze",
    rating: 5,
    comment:
      "I laboratori di musica con Elena sono diventati il momento preferito della settimana. Mio figlio non vuole più mancare.",
    date: "2026-04-10",
    featured: true,
  },
  {
    caregiverId: "sofia-conti",
    authorName: "Daniela G.",
    authorRole: "Mamma di Marta (8 anni)",
    city: "Roma",
    rating: 5,
    comment:
      "Sofia è organizzatissima con i compiti. Voti scolastici migliorati e mia figlia ha ritrovato fiducia.",
    date: "2026-04-05",
    featured: false,
  },
  {
    caregiverId: "luca-romano",
    authorName: "Stefano R.",
    authorRole: "Padroncino di Bea (gatta)",
    city: "Torino",
    rating: 5,
    comment:
      "Avere un veterinario come pet-sitter quando hai un animale anziano è impagabile. Bea sta meglio da quando lo conosciamo.",
    date: "2026-03-22",
    featured: false,
  },
  {
    caregiverId: "alessia-fontana",
    authorName: "Cristina V.",
    authorRole: "Padroncina di Luna",
    city: "Verona",
    rating: 5,
    comment:
      "Ho lasciato Luna per dieci giorni di vacanza e mi ha mandato foto e video ogni giorno. Cura, attenzione, amore vero.",
    date: "2026-04-15",
    featured: true,
  },
];

async function main() {
  console.log("Seeding KYD...");
  await db.delete(reviewsTable);
  await db.delete(caregiversTable);
  await db.delete(chatMessagesTable);

  for (let i = 0; i < caregivers.length; i++) {
    const c = caregivers[i];
    await db.insert(caregiversTable).values({
      ...c,
      verified: true,
      avatarColor: colors[i % colors.length],
      availability: makeAvailability(i),
    });
  }

  let rid = 1;
  const cgMap = new Map(caregivers.map((c) => [c.id, c.name]));
  for (const r of reviews) {
    await db.insert(reviewsTable).values({
      id: `r-${rid++}`,
      caregiverId: r.caregiverId,
      caregiverName: cgMap.get(r.caregiverId) ?? "",
      authorName: r.authorName,
      authorRole: r.authorRole,
      city: r.city,
      rating: r.rating,
      comment: r.comment,
      date: r.date,
      verified: true,
      featured: r.featured,
    });
  }

  await db.insert(chatMessagesTable).values([
    {
      room: "giulia-rossi",
      author: "famiglia",
      text: "Ciao Giulia! Saresti disponibile sabato pomeriggio?",
    },
    {
      room: "giulia-rossi",
      author: "Giulia",
      text: "Ciao! Sì, sono libera dalle 14 alle 19. A presto!",
    },
  ]);

  console.log(`Inserted ${caregivers.length} caregivers and ${reviews.length} reviews.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
