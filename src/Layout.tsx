import React from 'react';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';
import { SITE_NAME, DESCRIPTION } from './constants';
import CallButton from './components/CallButton';
import PromoPopup from './components/PromoPopup';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    React.useEffect(() => {
        document.title = `${title} - ${SITE_NAME}`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', DESCRIPTION);
        }
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderNav />
            <main className="grow">
                {children}
            </main>
            <CallButton />
            <PromoPopup />
            <Footer />
        </div>
    );
};

export default Layout;
