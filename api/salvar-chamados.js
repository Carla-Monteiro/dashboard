// Vercel Serverless Function
// POST /api/salvar-chamados - Salva mudanças em arquivo temporário

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

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    const { chamadoId, status, prioridade, setor } = req.body;

    if (!chamadoId) {
      return res.status(400).json({ error: 'chamadoId obrigatório' });
    }

    // Simular salvar em arquivo intermediário
    // Em produção, isso salvaria em um banco de dados ou arquivo no SharePoint
    const update = {
      chamadoId,
      status,
      prioridade,
      setor,
      timestamp: new Date().toISOString(),
      tipo: 'update'
    };

    console.log("Update recebido:", update);

    // Por enquanto, apenas retorna sucesso
    // O Power Automate irá processar essas mudanças
    res.status(200).json({
      success: true,
      message: 'Mudança registrada com sucesso',
      data: update,
      aviso: 'Sincronizando com SharePoint...'
    });

  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
