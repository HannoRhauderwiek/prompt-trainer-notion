// ============================================
// BACKEND API - HIER IST IHR API-KEY SICHER!
// ============================================
// Diese Datei läuft auf dem Server (Vercel)
// Der API-Key wird NIEMALS im Browser sichtbar

export default async function handler(req, res) {
  
  // CORS-Header für Notion Embed erlauben
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONS-Request für CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Nur POST-Requests erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Methode nicht erlaubt. Nur POST ist möglich.' 
    });
  }

  // ⚠️ WICHTIG: API-Key aus Environment Variable holen
  // ⚠️ DER KEY WIRD SPÄTER IN VERCEL GESETZT (siehe README.md)
  // ⚠️ NIEMALS den Key direkt hier im Code eintragen!
  const apiKey = process.env.CLAUDE_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'API-Key nicht konfiguriert. Bitte CLAUDE_API_KEY in Vercel setzen.' 
    });
  }

  // Prompt vom Frontend holen
  const { prompt } = req.body;
  
  // Validierung
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ 
      error: 'Bitte einen gültigen Prompt eingeben.' 
    });
  }

  if (prompt.length < 5) {
    return res.status(400).json({ 
      error: 'Der Prompt ist zu kurz. Mindestens 5 Zeichen erforderlich.' 
    });
  }

  if (prompt.length > 1000) {
    return res.status(400).json({ 
      error: 'Der Prompt ist zu lang. Maximum 1000 Zeichen.' 
    });
  }

  try {
    // ============================================
    // CLAUDE API AUFRUF (Haiku 4.5)
    // ============================================
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,  // ← Hier wird der sichere API-Key verwendet
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20250929',  // Claude Haiku 4.5
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Du bist ein Experte für Prompt-Engineering. Analysiere den folgenden Prompt eines Schülers und bewerte ihn nach diesen Kriterien:

1. **Klarheit** (1-10): Ist die Anweisung klar und verständlich?
2. **Spezifität** (1-10): Ist der Prompt konkret genug?
3. **Kontext** (1-10): Wird ausreichend Kontext gegeben?
4. **Struktur** (1-10): Ist der Prompt gut strukturiert?

Gib eine **Gesamtbewertung** und **konkrete Verbesserungsvorschläge**.

**Prompt des Schülers:**
"${prompt}"

**Format deiner Antwort:**
📊 BEWERTUNG:
- Klarheit: X/10
- Spezifität: X/10
- Kontext: X/10
- Struktur: X/10

✅ Gesamtbewertung: XX/40 (Kategorie)

💡 VERBESSERUNGSVORSCHLÄGE:
[Konkrete Tipps]

📝 VERBESSERTER PROMPT:
[Zeige einen optimierten Prompt]`
          }
        ]
      })
    });

    // Fehlerbehandlung für Claude API
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API Fehler:', errorData);
      
      // Spezifische Fehlermeldungen
      if (response.status === 401) {
        return res.status(500).json({ 
          error: 'API-Key ist ungültig. Bitte in Vercel überprüfen.' 
        });
      }
      
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Zu viele Anfragen. Bitte kurz warten.' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Fehler bei der Claude API-Kommunikation.' 
      });
    }

    const data = await response.json();
    
    // Erfolgreiche Antwort zurückgeben
    return res.status(200).json({
      success: true,
      feedback: data.content[0].text,
      model: 'claude-haiku-4.5'
    });
    
  } catch (error) {
    console.error('Server-Fehler:', error);
    return res.status(500).json({ 
      error: 'Ein unerwarteter Fehler ist aufgetreten.',
      details: error.message 
    });
  }
}
