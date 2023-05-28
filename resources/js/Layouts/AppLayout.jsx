import { useState } from 'react';
import Navbar from '@/Layouts/Navbar.jsx';
import Footer from '@/Components/Footer.jsx';

export default function AppLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
