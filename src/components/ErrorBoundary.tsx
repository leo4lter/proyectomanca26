import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('manca_marquee_items');
      localStorage.removeItem('manca_custom_icon');
      localStorage.removeItem('manca_brand_logos');
      localStorage.removeItem('manca_web_projects');
      localStorage.removeItem('manca_channel_videos');
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#060A14] flex flex-col items-center justify-center p-6 text-white text-center font-['Kanit']">
          <div className="max-w-md p-8 rounded-3xl bg-[#0B1428] border border-[#2A52BE]/40 shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide mb-2">
              Se detectó un error en los datos cargados
            </h2>
            <p className="text-xs text-[#CBD5E1] mb-6 leading-relaxed">
              Es posible que una imagen subida haya excedido la memoria local del navegador o esté incompleta. Podés restablecer a la versión segura original con un solo clic.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-3 rounded-full bg-[#2A52BE] hover:bg-[#3870E0] text-white font-medium uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer y Recuperar Vista</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
