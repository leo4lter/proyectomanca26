import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { Server, Upload, Download, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, RefreshCw, Copy, ExternalLink, HardDrive, FileCode, FolderPlus, ShieldCheck, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';

export const AdminHostingerTab: React.FC = () => {
  const {
    hostingerUrl,
    setHostingerUrl,
    isHostingerConnected,
    testHostingerConnection,
    uploadImageToHostinger,
    syncWithHostinger,
    setCustomIconUrl,
    setCustomFooterLogoUrl,
    addMarqueeItem,
    exportContentJson,
  } = useSiteContent();

  const [inputUrl, setInputUrl] = useState(hostingerUrl || 'https://elmanca.com.ar');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [imageName, setImageName] = useState('imagen-manca');

  const handleSaveAndTest = async () => {
    setHostingerUrl(inputUrl);
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testHostingerConnection(inputUrl);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Error al contactar con el servidor de Hostinger.',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSyncSite = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await syncWithHostinger();
      setSyncResult(res);
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: 'No se pudo sincronizar con Hostinger.',
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleDirectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await uploadImageToHostinger(file, imageName || 'manca-asset');
      setUploadedUrl(url);
    } catch (err: any) {
      alert('Error subiendo imagen: ' + (err.message || 'Error desconocido'));
    } finally {
      setUploadingImage(false);
    }
    e.target.value = '';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const downloadFile = (filename: string, content: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadContentPhp = () => {
    fetch('/api/content.php')
      .then((res) => res.text())
      .then((txt) => downloadFile('content.php', txt, 'application/x-php'))
      .catch(() => {
        const fallback = `<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
$dataDir = __DIR__ . '/data';
$dataFile = $dataDir . '/siteContent.json';
if (!file_exists($dataDir)) { @mkdir($dataDir, 0755, true); }
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) { echo file_get_contents($dataFile); }
    else { echo json_encode(["status" => "ready", "message" => "Hostinger API activa"]); }
    exit();
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    if ($raw && file_put_contents($dataFile, $raw) !== false) {
        echo json_encode(["success" => true, "message" => "Guardado en Hostinger"]);
    } else { http_response_code(500); echo json_encode(["error" => "Error al guardar"]); }
    exit();
}`;
        downloadFile('content.php', fallback, 'application/x-php');
      });
  };

  const downloadUploadPhp = () => {
    fetch('/api/upload.php')
      .then((res) => res.text())
      .then((txt) => downloadFile('upload.php', txt, 'application/x-php'))
      .catch(() => {
        downloadFile('upload.php', '<?php // Manca Image Uploader ?>', 'application/x-php');
      });
  };

  const downloadHtaccess = () => {
    fetch('/api/.htaccess')
      .then((res) => res.text())
      .then((txt) => downloadFile('.htaccess', txt, 'text/plain'))
      .catch(() => {
        const ht = `<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</IfModule>`;
        downloadFile('.htaccess', ht, 'text/plain');
      });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div
        id="hostinger-status-card"
        className="rounded-3xl bg-gradient-to-r from-[#0C1A38] via-[#0E204A] to-[#0A1633] border border-[#2A52BE]/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-blue-950/40"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2A52BE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                isHostingerConnected
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-[#2A52BE]/20 border-[#2A52BE]/50 text-[#93C5FD]'
              }`}
            >
              <Server className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide uppercase font-['Kanit'] text-white">
                  Almacenamiento Persistente en Hostinger
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    isHostingerConnected
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isHostingerConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  {isHostingerConnected ? 'Hostinger Activo' : 'Listo para Conectar'}
                </span>
              </div>
              <p className="text-sm text-[#94A3B8] mt-1.5 max-w-2xl leading-relaxed">
                Todas las fotos, íconos y contenidos del sitio se almacenan directamente en tu cuenta de
                Hostinger (<span className="text-[#60A5FA] font-mono">{hostingerUrl || 'https://elmanca.com.ar'}</span>).
                Permanecen 100% intactos y seguros ante cualquier redeploy o actualización futura.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              type="button"
              id="hostinger-sync-all-btn"
              onClick={handleSyncSite}
              disabled={syncing}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer hover:scale-105"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Sincronizando...' : 'Sincronizar Todo con Hostinger'}</span>
            </button>
          </div>
        </div>

        {syncResult && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              syncResult.success
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/20 border border-red-500/40 text-red-300'
            }`}
          >
            {syncResult.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            )}
            <span>{syncResult.message}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#081229] border border-[#2A52BE]/30 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base uppercase tracking-wider mb-2">
              <HardDrive className="w-5 h-5 text-[#3870E0]" />
              <span>1. Configuración de Dominio Hostinger</span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-4">
              Indica el dominio o subdominio donde tienes alojada la web en Hostinger.
            </p>

            <label className="block text-xs text-[#93C5FD] font-semibold mb-1.5 uppercase tracking-wide">
              URL del Sitio Web en Hostinger:
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                id="hostinger-url-input"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://elmanca.com.ar"
                className="flex-1 bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3870E0] font-mono"
              />
              <button
                type="button"
                id="hostinger-test-conn-btn"
                onClick={handleSaveAndTest}
                disabled={testing}
                className="px-4 py-2.5 rounded-xl bg-[#2A52BE] hover:bg-[#3870E0] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>{testing ? 'Probando...' : 'Probar'}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border mb-4 ${
                  testResult.success
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{testResult.message}</p>
                  {testResult.success && testResult.data && (
                    <p className="text-[11px] opacity-80 mt-1 font-mono">
                      Respuesta del servidor: {JSON.stringify(testResult.data).slice(0, 80)}...
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="bg-[#050C1F] rounded-xl p-3 border border-[#2A52BE]/20 text-[11px] text-[#94A3B8] space-y-1">
              <div className="flex justify-between">
                <span>Ruta API en Hostinger:</span>
                <span className="text-[#60A5FA] font-mono font-semibold">
                  {inputUrl.replace(/\/+$/, '')}/api/content.php
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ruta Subidas (Uploads):</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  {inputUrl.replace(/\/+$/, '')}/uploads/
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#081229] border border-[#2A52BE]/30 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base uppercase tracking-wider mb-2">
              <Upload className="w-5 h-5 text-emerald-400" />
              <span>2. Subir Imagen Directamente a Hostinger</span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-4">
              Sube cualquier imagen para guardarla en <code className="text-[#93C5FD]">public_html/uploads/</code> de Hostinger y obtener su enlace público permanente.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[11px] text-[#94A3B8] uppercase font-semibold mb-1">
                  Nombre descriptivo para la imagen:
                </label>
                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="ej: logo-manca-2026, banner-festival"
                  className="w-full bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                />
              </div>

              <label
                className={`w-full py-5 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                  uploadingImage
                    ? 'border-[#2A52BE] bg-[#2A52BE]/10 opacity-70'
                    : 'border-[#2A52BE]/60 hover:border-emerald-400 bg-[#050C1F] hover:bg-[#091533]'
                }`}
              >
                <Upload className={`w-7 h-7 ${uploadingImage ? 'animate-bounce text-[#60A5FA]' : 'text-emerald-400'}`} />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {uploadingImage ? 'Guardando en Hostinger...' : 'Seleccionar o Soltar Imagen Aquí'}
                </span>
                <span className="text-[10px] text-[#94A3B8]">
                  Soporta JPG, PNG, WEBP y SVG (optimizado automático)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDirectImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            {uploadedUrl && (
              <div className="bg-[#050C1F] border border-emerald-500/40 rounded-xl p-3.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>¡Imagen guardada con éxito en Hostinger!</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    readOnly
                    value={uploadedUrl}
                    className="flex-1 bg-[#040813] border border-[#2A52BE]/40 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono select-all"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(uploadedUrl)}
                    className="px-3 py-1.5 rounded-lg bg-[#2A52BE] hover:bg-[#3870E0] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedUrl ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#2A52BE]/20">
                  <span className="text-[10px] text-[#94A3B8] font-semibold">Usar inmediatamente como:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomIconUrl(uploadedUrl);
                      alert('¡Establecido como Ícono Principal! Recuerda tocar "Aplicar Cambios".');
                    }}
                    className="px-2 py-1 rounded bg-[#0E1E44] hover:bg-[#162D66] text-[#93C5FD] hover:text-white text-[10px] font-semibold border border-[#2A52BE]/40 cursor-pointer"
                  >
                    Ícono Web
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomFooterLogoUrl(uploadedUrl);
                      alert('¡Establecido como Logo de Footer! Recuerda tocar "Aplicar Cambios".');
                    }}
                    className="px-2 py-1 rounded bg-[#0E1E44] hover:bg-[#162D66] text-[#93C5FD] hover:text-white text-[10px] font-semibold border border-[#2A52BE]/40 cursor-pointer"
                  >
                    Logo Footer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addMarqueeItem({
                        title: imageName || 'Nuevo Elemento',
                        category: 'Producción Audiovisual',
                        image: uploadedUrl,
                        tag: 'Destacado',
                      });
                      alert('¡Agregado a la Galería Bajo Home! Recuerda tocar "Aplicar Cambios".');
                    }}
                    className="px-2 py-1 rounded bg-[#0E1E44] hover:bg-[#162D66] text-[#93C5FD] hover:text-white text-[10px] font-semibold border border-[#2A52BE]/40 cursor-pointer"
                  >
                    + Galería Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#081229] border border-[#2A52BE]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-[#60A5FA]" />
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Kit de Archivos PHP para Hostinger
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Estos archivos ya están listos en la carpeta <code className="text-[#93C5FD]">public/api/</code> y en la carpeta <code className="text-[#93C5FD]">hostinger/</code> de este proyecto. Puedes descargarlos directamente aquí si los necesitas:
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={downloadContentPhp}
            className="p-3.5 rounded-xl bg-[#050C1F] hover:bg-[#0C1A38] border border-[#2A52BE]/40 flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-[#60A5FA] font-mono">
                content.php
              </div>
              <div className="text-[11px] text-[#94A3B8]">API de guardado de JSON</div>
            </div>
            <Download className="w-4 h-4 text-[#60A5FA]" />
          </button>

          <button
            type="button"
            onClick={downloadUploadPhp}
            className="p-3.5 rounded-xl bg-[#050C1F] hover:bg-[#0C1A38] border border-[#2A52BE]/40 flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-400 font-mono">
                upload.php
              </div>
              <div className="text-[11px] text-[#94A3B8]">Subidor de imágenes a /uploads/</div>
            </div>
            <Download className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            type="button"
            onClick={downloadHtaccess}
            className="p-3.5 rounded-xl bg-[#050C1F] hover:bg-[#0C1A38] border border-[#2A52BE]/40 flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-400 font-mono">
                .htaccess
              </div>
              <div className="text-[11px] text-[#94A3B8]">Cabeceras CORS activas</div>
            </div>
            <Download className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      <div className="bg-[#050B1A] border border-[#2A52BE]/20 rounded-2xl p-6 sm:p-8">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Guía Rápida: Cómo configurar Hostinger en 3 minutos</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#081229] border border-[#2A52BE]/30 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 text-[#60A5FA] font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Abrir hPanel en Hostinger</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Ingresa a tu cuenta de Hostinger, ve a <strong>Sitios Web</strong> &gt; <strong>Administrar</strong> &gt; <strong>Administrador de Archivos</strong> y entra en la carpeta <code className="text-[#60A5FA]">public_html/</code>.
              </p>
            </div>
          </div>

          <div className="bg-[#081229] border border-[#2A52BE]/30 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 text-[#60A5FA] font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Crear carpeta "api"</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Dentro de <code className="text-[#60A5FA]">public_html/</code> crea la carpeta <code className="text-[#93C5FD]">api</code> y coloca los 3 archivos: <span className="text-white font-mono">content.php</span>, <span className="text-white font-mono">upload.php</span> y <span className="text-white font-mono">.htaccess</span>.
              </p>
            </div>
          </div>

          <div className="bg-[#081229] border border-[#2A52BE]/30 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Crear carpeta "uploads"</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Dentro de <code className="text-[#60A5FA]">public_html/</code> crea la carpeta <code className="text-emerald-400">uploads</code> y asegúrate de que tenga permisos <code className="text-white">755</code>. ¡Ahí se guardarán todas tus fotos para siempre!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
