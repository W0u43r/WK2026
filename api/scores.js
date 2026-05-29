// Vercel serverless proxy — football-data.org
// Testmodus: competitie 2021 = WK 2022 Qatar
// Productie: competitie 2000 = WK 2026
// ▼ Verander naar 2000 als WK 2026 begint op 11 juni 2026

const COMPETITIE_ID = 2021;
const API_TOKEN     = '55228a28932e43939447a577a695fada';

export default async function handler(req, res) {
  try {
    const url = `https://api.football-data.org/v4/competitions/${COMPETITIE_ID}/matches?status=LIVE,FINISHED,SCHEDULED`;
    const r   = await fetch(url, { headers: { 'X-Auth-Token': API_TOKEN } });
    if (!r.ok) { res.status(r.status).json({ error: `${r.status}` }); return; }
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}
