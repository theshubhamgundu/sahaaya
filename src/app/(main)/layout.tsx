import { Sidebar } from '@/components/sahaaya/Sidebar';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 min-h-0"> {/* Changed min-h-screen to min-h-0 and flex-1 for better flex behavior within parent */}
      <Sidebar />
      <div className="flex-grow flex flex-col w-[70%] min-w-0"> {/* Added min-w-0 for flex shrink issues */}
        <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
