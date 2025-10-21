# 🎓 Prompt-Trainer für Notion

Ein einfacher, sicherer Prompt-Effizienz-Checker für Schüler, der in Notion eingebettet werden kann.

## 📋 Was macht diese App?

- Schüler geben einen Prompt ein
- Claude Haiku 4.5 analysiert den Prompt nach Klarheit, Spezifität, Kontext und Struktur
- Konkrete Verbesserungsvorschläge werden gegeben
- Kann direkt in Notion eingebettet werden

## ⚙️ Technologie

- **Frontend**: Einfaches HTML/CSS/JavaScript (keine Frameworks nötig)
- **Backend**: Vercel Serverless Functions (Node.js)
- **KI**: Claude Haiku 4.5 (via Anthropic API)
- **Hosting**: Vercel (kostenlos)

---

## 🚀 SCHRITT-FÜR-SCHRITT ANLEITUNG

### **Schritt 1: Claude API-Key besorgen**

1. Gehen Sie zu: https://console.anthropic.com/
2. Melden Sie sich an oder erstellen Sie einen Account
3. Klicken Sie auf **"API Keys"** in der Seitenleiste
4. Klicken Sie auf **"Create Key"**
5. Geben Sie einen Namen ein (z.B. "Prompt-Trainer-Notion")
6. Kopieren Sie den Key (beginnt mit `sk-ant-api03-...`)
   
   ⚠️ **WICHTIG**: Kopieren Sie den Key sofort! Er wird nur einmal angezeigt.
   
7. Bewahren Sie den Key sicher auf (noch nicht irgendwo einfügen!)

---

### **Schritt 2: GitHub Repository erstellen**

1. Gehen Sie zu: https://github.com/
2. Klicken Sie oben rechts auf **"+"** → **"New repository"**
3. Repository-Name: `prompt-trainer-notion`
4. Sichtbarkeit: **Public** (für kostenloses Vercel Hosting)
5. Klicken Sie auf **"Create repository"**

---

### **Schritt 3: Dateien hochladen**

Sie haben jetzt alle Projektdateien in diesem Ordner:

```
prompt-trainer-notion/
├── api/
│   └── check-prompt.js     ← Backend (hier ist der API-Key sicher!)
├── index.html              ← Frontend (sichtbar für Nutzer)
├── package.json            ← Projekt-Konfiguration
├── vercel.json             ← Vercel-Einstellungen
├── .env.example            ← Template für API-Key (nur lokal)
└── README.md               ← Diese Anleitung
```

**So laden Sie die Dateien hoch:**

**Option A: Via GitHub Website (einfacher)**
1. Öffnen Sie Ihr Repository auf GitHub
2. Klicken Sie auf **"uploading an existing file"**
3. Ziehen Sie ALLE Dateien aus dem Projekt-Ordner in den Upload-Bereich
4. Klicken Sie auf **"Commit changes"**

**Option B: Via Git CLI (für Fortgeschrittene)**
```bash
cd /pfad/zum/projekt
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/IHR-USERNAME/prompt-trainer-notion.git
git push -u origin main
```

---

### **Schritt 4: Mit Vercel verbinden**

1. Gehen Sie zu: https://vercel.com/
2. Klicken Sie auf **"Sign Up"** oder **"Log In"**
3. Wählen Sie **"Continue with GitHub"**
4. Autorisieren Sie Vercel für GitHub
5. Klicken Sie auf **"Import Project"**
6. Wählen Sie Ihr Repository: **`prompt-trainer-notion`**
7. Klicken Sie auf **"Import"**

---

### **Schritt 5: API-Key in Vercel setzen** ⚠️ **WICHTIGSTER SCHRITT!**

Hier setzen Sie Ihren Claude API-Key **sicher** ein:

1. In Ihrem Vercel-Projekt, gehen Sie zu **"Settings"** (oben)
2. Klicken Sie in der Seitenleiste auf **"Environment Variables"**
3. Fügen Sie eine neue Variable hinzu:
   
   **Name:**
   ```
   CLAUDE_API_KEY
   ```
   
   **Value:**
   ```
   sk-ant-api03-IHR-ECHTER-API-KEY-HIER
   ```
   (Fügen Sie hier den Key ein, den Sie in Schritt 1 kopiert haben)
   
4. **Environment**: Wählen Sie **alle drei** aus:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
   
5. Klicken Sie auf **"Save"**

**🔒 Sicherheit:**
- Der API-Key wird verschlüsselt gespeichert
- Er ist NIEMALS im Frontend-Code sichtbar
- Er wird nur auf dem Server verwendet
- Selbst wenn jemand den Code ansieht, kann er den Key nicht sehen

---

### **Schritt 6: Deployment starten**

1. Gehen Sie zurück zur **"Deployments"** Tab
2. Klicken Sie auf **"Redeploy"** (falls nötig)
3. Warten Sie ca. 1-2 Minuten
4. Sie sehen einen grünen Status: **"Ready"** ✅

5. Klicken Sie auf **"Visit"** oder die URL (z.B. `https://prompt-trainer-notion.vercel.app`)

6. **Testen Sie die App:**
   - Geben Sie einen Testprompt ein (z.B. "Erkläre mir etwas")
   - Klicken Sie auf "Prompt überprüfen"
   - Sie sollten eine Analyse von Claude sehen

---

### **Schritt 7: In Notion einbetten**

1. Öffnen Sie Ihre Notion-Seite
2. Tippen Sie `/embed`
3. Fügen Sie die Vercel-URL ein:
   ```
   https://IHRE-APP-NAME.vercel.app
   ```
4. Drücken Sie Enter
5. Fertig! 🎉

**Tipp:** Sie können die Größe des Embeds anpassen:
- Ziehen Sie an den Rändern
- Empfohlen: Volle Breite, ca. 600-700px Höhe

---

## 🧪 LOKALES TESTEN (Optional)

Falls Sie lokal testen möchten:

1. **Installieren Sie Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Erstellen Sie eine `.env` Datei:**
   ```bash
   cp .env.example .env
   ```
   
3. **Fügen Sie Ihren API-Key in `.env` ein:**
   ```
   CLAUDE_API_KEY=sk-ant-api03-IHR-KEY-HIER
   ```

4. **Starten Sie den Dev-Server:**
   ```bash
   vercel dev
   ```

5. **Öffnen Sie:** http://localhost:3000

---

## 📂 PROJEKTSTRUKTUR ERKLÄRT

### **`api/check-prompt.js`** - Das Backend ⚡

**Was macht diese Datei?**
- Läuft auf dem Vercel-Server (NICHT im Browser!)
- Empfängt Prompts vom Frontend
- Ruft die Claude API mit Ihrem sicheren API-Key auf
- Sendet die Analyse zurück

**Wo ist der API-Key?**
```javascript
const apiKey = process.env.CLAUDE_API_KEY;  // ← Hier wird er geholt!
```
- `process.env` = Server-Environment-Variablen
- Wird in Vercel gesetzt (Schritt 5)
- NIEMALS im Code hardcoden!

**Sicherheitsfeatures:**
- CORS-Header für Notion Embed
- Input-Validierung (Länge, Typ)
- Rate-Limiting möglich
- Fehlerbehandlung

---

### **`index.html`** - Das Frontend 🎨

**Was macht diese Datei?**
- Das, was der Nutzer sieht
- Textfeld für Prompt-Eingabe
- Button zum Absenden
- Zeigt die Analyse an

**Wichtig:**
- Enthält KEINEN API-Key (ist ja öffentlich!)
- Sendet nur an `/api/check-prompt`
- Zeigt nur Ergebnisse an

---

### **`package.json`** - Projekt-Info 📦

- Definiert das Projekt
- Keine Dependencies nötig (Vanilla JS!)
- Für Vercel-Erkennung

---

### **`vercel.json`** - Deployment-Config ⚙️

- Sagt Vercel, wie es die App bauen soll
- Routet `/api/*` zu den Serverless Functions
- Routet `/*` zu statischen Dateien

---

## 🔧 ANPASSUNGEN

### **Analyse-Kriterien ändern**

In `api/check-prompt.js`, Zeile ~70-90:
```javascript
content: `Du bist ein Experte für Prompt-Engineering. Analysiere...`
```

Hier können Sie die Bewertungskriterien ändern!

### **Design anpassen**

In `index.html`, im `<style>`-Block:
```css
.btn-primary {
  background: #3b82f6;  /* ← Farbe ändern */
}
```

### **Max. Zeichenlänge ändern**

In `index.html` und `api/check-prompt.js`:
```javascript
maxlength="1000"  // ← HTML
if (prompt.length > 1000)  // ← Backend
```

---

## ❓ HÄUFIGE FEHLER & LÖSUNGEN

### **Fehler: "API-Key nicht konfiguriert"**

**Lösung:**
- Schritt 5 nochmal durchgehen
- Sicherstellen, dass die Variable **genau** `CLAUDE_API_KEY` heißt
- In Vercel: Settings → Environment Variables → Check
- Nach Änderung: Redeploy triggern

---

### **Fehler: "API-Key ist ungültig"**

**Lösung:**
- API-Key auf https://console.anthropic.com/ überprüfen
- Neuen Key generieren
- In Vercel aktualisieren
- Redeploy

---

### **Fehler: "Zu viele Anfragen"**

**Lösung:**
- Claude API hat Rate Limits
- Bei vielen Schülern: Rate Limiting im Code einbauen
- Oder: API-Key mit höherem Limit besorgen

---

### **Embed in Notion funktioniert nicht**

**Lösung:**
- URL nochmal prüfen (ohne `/` am Ende)
- HTTPS muss funktionieren
- Notion blockiert manche Embeds → im Zweifel Link teilen

---

## 💰 KOSTEN

**Vercel:**
- Kostenlos für Hobby-Projekte
- 100GB Bandwidth/Monat kostenlos

**Claude API:**
- Haiku 4.5 ist sehr günstig
- Ca. $0.25 per 1M Input Tokens
- Ca. $1.25 per 1M Output Tokens
- Bei 100 Schülern/Tag ≈ $2-5/Monat

**Tipp:** Setzen Sie Usage Limits in Anthropic Console!

---

## 🔐 SICHERHEITS-CHECKLISTE

- ✅ API-Key nur in Environment Variables
- ✅ Nie im Frontend-Code
- ✅ Nie in Git committen (`.env` in `.gitignore`)
- ✅ Input-Validierung im Backend
- ✅ CORS korrekt konfiguriert
- ✅ Rate Limiting erwägen bei vielen Nutzern

---

## 📞 SUPPORT

Bei Fragen:
1. Vercel Logs checken: Vercel Dashboard → Ihr Projekt → Logs
2. Claude API Status: https://status.anthropic.com/
3. Vercel Docs: https://vercel.com/docs

---

## 📜 LIZENZ

MIT License - Frei verwendbar für Bildungszwecke

---

## ✅ NÄCHSTE SCHRITTE

1. ✅ Claude API-Key besorgt?
2. ✅ GitHub Repository erstellt?
3. ✅ Dateien hochgeladen?
4. ✅ Mit Vercel verbunden?
5. ✅ API-Key in Vercel gesetzt?
6. ✅ Deployment erfolgreich?
7. ✅ In Notion eingebettet?

**Fertig!** 🎉

---

**Viel Erfolg beim Lehren von Prompt-Engineering!** 🚀
