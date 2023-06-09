import Navbar from '@/Layouts/Navbar';
import FlashMessage from '@/Components/FlashMessage';
import Footer from '@/Layouts/Footer';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
