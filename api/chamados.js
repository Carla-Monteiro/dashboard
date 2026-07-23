export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://unifeb.sharepoint.com/sites/SuporteDTI/Documentos%20Compartilhados/dashboard/chamados_realtime.json';
    
    const response = await fetch(proxyUrl + url);
    const dados = await response.json();
    
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
