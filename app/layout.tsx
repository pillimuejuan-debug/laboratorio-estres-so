import './globals.css';
export const metadata = { title: 'OS Stress Lab Dashboard' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( <html lang="es"><body className="bg-slate-900 text-slate-100 min-h-screen font-sans">{children}</body></html> );
}
