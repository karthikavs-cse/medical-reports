import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = { title: 'Medical Report Tool', description: 'Generate and manage reports' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}