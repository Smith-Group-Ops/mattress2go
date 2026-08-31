const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;

declare global {
    interface Window {
        dataLayer: any[];
        gtag?: (...args: any[]) => void;
    }
}

/** Injects gtag.js once. No-ops if VITE_GOOGLE_ADS_ID isn't set yet. */
export function initGoogleAds(): void {
    if (!ADS_ID || typeof window === 'undefined' || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push(args);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', ADS_ID);
}

/** Fires a conversion by env-configured label. No-ops if ADS_ID or the label isn't set. */
export function fireConversion(label: string | undefined): void {
    if (!ADS_ID || !label || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` });
}

export const ADS_LABELS = {
    phone: import.meta.env.VITE_GOOGLE_ADS_LABEL_PHONE as string | undefined,
    directions: import.meta.env.VITE_GOOGLE_ADS_LABEL_DIRECTIONS as string | undefined,
    contact: import.meta.env.VITE_GOOGLE_ADS_LABEL_CONTACT as string | undefined,
};

/**
 * Delegated click listener — catches tel:/maps links anywhere on the page
 * (Header, Footer, ContactPage, wherever) without patching each render site.
 */
export function attachClickTracking(): () => void {
    const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href]') as HTMLAnchorElement | null;
        if (!link) return;
        const href = link.getAttribute('href') || '';
        if (href.startsWith('tel:')) {
            fireConversion(ADS_LABELS.phone);
        } else if (href.includes('google.com/maps') || href.includes('maps.google') || href.includes('goo.gl/maps')) {
            fireConversion(ADS_LABELS.directions);
        }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
}
