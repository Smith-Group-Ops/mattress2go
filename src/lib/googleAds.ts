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

/**
 * Fires a conversion by env-configured label. No-ops if ADS_ID or the label
 * isn't set — `callback` still runs in that case so navigation-delaying
 * callers (see attachClickTracking) never hang waiting on a ping that was
 * never going to be sent.
 */
export function fireConversion(label: string | undefined, callback?: () => void): void {
    if (!ADS_ID || !label || typeof window.gtag !== 'function') {
        callback?.();
        return;
    }
    window.gtag('event', 'conversion', {
        send_to: `${ADS_ID}/${label}`,
        ...(callback ? { event_callback: callback } : {}),
    });
}

export const ADS_LABELS = {
    phone: import.meta.env.VITE_GOOGLE_ADS_LABEL_PHONE as string | undefined,
    directions: import.meta.env.VITE_GOOGLE_ADS_LABEL_DIRECTIONS as string | undefined,
    contact: import.meta.env.VITE_GOOGLE_ADS_LABEL_CONTACT as string | undefined,
};

/**
 * Delegated click listener — catches tel:/maps links anywhere on the page
 * (Header, Footer, ContactPage, wherever) without patching each render site.
 *
 * tel: and maps links need OPPOSITE handling:
 *
 * - tel: is an external protocol handoff (OS dialer/app), not a page
 *   navigation — the current page never unloads, so there's no race to
 *   guard against. It's also gesture-gated: Chrome requires `tel:`
 *   navigation to happen SYNCHRONOUSLY inside the click, or it silently
 *   blocks it ("user gesture is required"). So: fire-and-forget, no
 *   preventDefault, let the browser's own native href handling proceed.
 *
 * - google.com/maps links are normal https:// navigation that DOES unload
 *   the current tab almost immediately, which can cancel gtag's conversion
 *   ping before it leaves the browser (the actual, well-documented Google
 *   Ads gotcha for outbound-click tracking). Regular http(s) navigation
 *   isn't gesture-gated the way external protocols are, so it's safe to
 *   preventDefault, fire the conversion with an event_callback that
 *   performs the real navigation, and fall back to navigating anyway after
 *   a short timeout if the callback never fires (blocked ping, slow
 *   network, ad blocker, etc.) — the click must never feel broken.
 */
export function attachClickTracking(): () => void {
    const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href]') as HTMLAnchorElement | null;
        if (!link) return;
        const href = link.getAttribute('href') || '';

        if (href.startsWith('tel:')) {
            fireConversion(ADS_LABELS.phone);
            return;
        }

        const isMapsLink = href.includes('google.com/maps') || href.includes('maps.google') || href.includes('goo.gl/maps');
        if (!isMapsLink) return;

        if (link.target === '_blank') {
            // Opens a new tab — this tab never unloads, no race to guard against.
            fireConversion(ADS_LABELS.directions);
            return;
        }

        e.preventDefault();
        let navigated = false;
        const proceed = () => {
            if (navigated) return;
            navigated = true;
            window.location.href = href;
        };
        fireConversion(ADS_LABELS.directions, proceed);
        setTimeout(proceed, 500);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
}
