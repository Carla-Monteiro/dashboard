export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  try {
    const response = await fetch(
      'https://unifeb.sharepoint.com/sites/SuporteDTI/Documentos%20Compartilhados/dashboard/chamados_realtime.json'
    );
    
    const dados = await response.json();
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
