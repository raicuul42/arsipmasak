import { FlashMessage } from '@/components/flash-message';
import { Footer } from '@/layouts/footer';
import { Navigation } from '@/layouts/navigation';

export function AppLayout({ children }) {
    return (
        <div className="min-h-screen">
            <Navigation />
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
