import Layout from '@/components/layout';
import Link from 'next/link';
import logo from '@/public/logo.ico';
export const metadata = {
  icons: {
    icon: { logo },
  },
};
export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <p>This is the main content area.</p>
        <Link href="/sidebar">Move to side bar</Link>
      </div>
    </Layout>
  );
}
