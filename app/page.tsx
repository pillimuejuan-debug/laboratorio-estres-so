import StressDashboard from '@/app/components/StressDashboard';
export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-extrabold text-indigo-400">WSL2 / Docker Stress Laboratory</h1>
      </header>
      <StressDashboard />
    </main>
  );
}
