export default async function handler(req, res) {
  const r = await fetch(
    'https://api.football-data.org/v4/competitions/2000/matches?status=LIVE,FINISHED,SCHEDULED',
    { headers: { 'X-Auth-Token': '55228a28932e43939447a577a695fada' } }
  );
  const data = await r.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
}
