import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const workspaceDataDir = path.join(process.cwd(), 'src', 'data');
  const workspaceDataFile = path.join(workspaceDataDir, 'siteContent.json');
  const distDataDir = path.join(process.cwd(), 'dist', 'data');
  const distDataFile = path.join(distDataDir, 'siteContent.json');

  try {
    if (!fs.existsSync(workspaceDataDir)) {
      fs.mkdirSync(workspaceDataDir, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create workspace data dir:', err);
  }

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '@elmanca91218';
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  });

  app.get(['/api/health', '/api/health.php'], (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  app.get(['/api/content', '/api/content.php'], (req, res) => {
    try {
      if (fs.existsSync(workspaceDataFile)) {
        const raw = fs.readFileSync(workspaceDataFile, 'utf-8');
        return res.setHeader('Content-Type', 'application/json; charset=utf-8').send(raw);
      }
      if (fs.existsSync(distDataFile)) {
        const raw = fs.readFileSync(distDataFile, 'utf-8');
        return res.setHeader('Content-Type', 'application/json; charset=utf-8').send(raw);
      }
      return res.status(404).json({ error: 'No content found' });
    } catch (err) {
      console.error('Error reading site content:', err);
      return res.status(500).json({ error: 'Error reading site content' });
    }
  });

  app.post(['/api/content', '/api/content.php'], (req, res) => {
    try {
      const payload = req.body;
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      const contentString = JSON.stringify(payload, null, 2);

      try {
        if (!fs.existsSync(workspaceDataDir)) {
          fs.mkdirSync(workspaceDataDir, { recursive: true });
        }
        fs.writeFileSync(workspaceDataFile, contentString, 'utf-8');
      } catch (e) {
        console.warn('Could not write to src/data/siteContent.json:', e);
      }

      try {
        if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
          if (!fs.existsSync(distDataDir)) {
            fs.mkdirSync(distDataDir, { recursive: true });
          }
          fs.writeFileSync(distDataFile, contentString, 'utf-8');
        }
      } catch (e) {
        console.warn('Could not write to dist/data/siteContent.json:', e);
      }

      const timestamp = new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      return res.json({
        success: true,
        message: 'Contenido guardado permanentemente en el servidor y código fuente.',
        timestamp,
      });
    } catch (err) {
      console.error('Error saving site content:', err);
      return res.status(500).json({ error: 'Error saving site content' });
    }
  });

  const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const distUploadsDir = path.join(process.cwd(), 'dist', 'uploads');

  try {
    if (!fs.existsSync(publicUploadsDir)) {
      fs.mkdirSync(publicUploadsDir, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create public/uploads:', err);
  }

  app.post(['/api/upload', '/api/upload.php'], (req, res) => {
    try {
      const { image, name } = req.body;
      if (!image || typeof image !== 'string') {
        return res.status(400).json({ error: 'No se envió ninguna imagen.' });
      }

      const match = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!match) {
        return res.status(400).json({ error: 'Formato de imagen inválido. Debe ser base64.' });
      }

      const extRaw = match[1].toLowerCase();
      const ext = extRaw === 'svg+xml' ? 'svg' : extRaw === 'jpeg' ? 'jpg' : extRaw;
      const base64Data = match[2];
      const buffer = Buffer.from(base64Data, 'base64');

      const safePrefix = (name || 'manca')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .toLowerCase()
        .slice(0, 30);
      const filename = `${safePrefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;

      fs.writeFileSync(path.join(publicUploadsDir, filename), buffer);

      try {
        if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
          if (!fs.existsSync(distUploadsDir)) {
            fs.mkdirSync(distUploadsDir, { recursive: true });
          }
          fs.writeFileSync(path.join(distUploadsDir, filename), buffer);
        }
      } catch (e) {
        console.warn('Could not copy to dist/uploads:', e);
      }

      const url = `/uploads/${filename}`;
      return res.json({
        success: true,
        url,
        filename,
        message: 'Imagen guardada con éxito en el servidor.',
      });
    } catch (err) {
      console.error('Error in /api/upload:', err);
      return res.status(500).json({ error: 'Error procesando la imagen' });
    }
  });

  app.get(['/api/images', '/api/images.php'], (req, res) => {
    try {
      const sources = [
        { dir: path.join(process.cwd(), 'public', 'assets', 'img'), folder: 'assets/img' },
        { dir: path.join(process.cwd(), 'dist', 'assets', 'img'), folder: 'assets/img' },
        { dir: path.join(process.cwd(), 'public', 'uploads'), folder: 'uploads' },
        { dir: path.join(process.cwd(), 'dist', 'uploads'), folder: 'uploads' },
      ];
      const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']);
      const seen = new Set<string>();
      const images: { name: string; folder: string; size: number }[] = [];
      for (const s of sources) {
        if (!fs.existsSync(s.dir)) continue;
        let entries: fs.Dirent[] = [];
        try {
          entries = fs.readdirSync(s.dir, { withFileTypes: true });
        } catch {
          continue;
        }
        for (const e of entries) {
          if (!e.isFile()) continue;
          const ext = path.extname(e.name).toLowerCase();
          if (!exts.has(ext)) continue;
          const key = `${s.folder}/${e.name}`;
          if (seen.has(key)) continue;
          seen.add(key);
          images.push({
            name: e.name,
            folder: s.folder,
            size: fs.statSync(path.join(s.dir, e.name)).size,
          });
        }
      }
      images.sort((a, b) => a.name.localeCompare(b.name));
      return res.json({ images, count: images.length });
    } catch (err) {
      console.error('Error listing images:', err);
      return res.status(500).json({ error: 'Error listing images' });
    }
  });

  app.use('/uploads', express.static(publicUploadsDir));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
