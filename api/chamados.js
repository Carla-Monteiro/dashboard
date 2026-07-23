
Api chamados · JS
// Vercel Serverless Function
// GET /api/chamados - Retorna dados do chamados.json do SharePoint
 
export default async function handler(req, res) {
  // CORS habilitado
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
 
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
 
  try {
    // Configurações do SharePoint
    const siteUrl = "https://unifeb.sharepoint.com/sites/SuporteDTI";
    const folderPath = "Documentos Compartilhados/dashboard";
    const fileName = "chamados.json";
 
    // URL do arquivo no SharePoint
    const fileUrl = `${siteUrl}/_api/web/GetFileByServerRelativeUrl('/sites/SuporteDTI/Documentos%20Compartilhados/dashboard/chamados.json')/$value`;
 
    console.log("Buscando arquivo:", fileUrl);
 
    // Buscar arquivo do SharePoint
    const response = await fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
 
    if (!response.ok) {
      throw new Error(`SharePoint retornou: ${response.status}`);
    }
 
    const data = await response.json();
 
    // Retornar dados com cache de 30 segundos
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    res.status(200).json({
      success: true,
      data: Array.isArray(data) ? data : (data.value || []),
      timestamp: new Date().toISOString(),
      total: Array.isArray(data) ? data.length : (data.value ? data.value.length : 0)
    });
 
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
 



