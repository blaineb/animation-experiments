import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home() {
  const pagesDirectory = path.join(process.cwd(), 'app');
  const pages = fs.readdirSync(pagesDirectory)
    .filter(file => fs.statSync(path.join(pagesDirectory, file)).isDirectory() && file !== 'api')
    .filter(dir => fs.existsSync(path.join(pagesDirectory, dir, 'page.tsx')));

  return (
    <main className="p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-6">Animation and Design Examples</h1>
      <ul className="space-y-2">
        {pages.map(page => (
          <li key={page}>
            <Link href={`/${page}`} className="text-blue-500 hover:underline">
              {page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}