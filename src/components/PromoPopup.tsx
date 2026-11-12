import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PROMO } from '../constants/promo';
import { ADS_LABELS, fireConversion } from '../lib/googleAds';

const PREVIEW_KEY = 'promo-preview';

function readStore(key: string): string | null {
    try {
        return window.sessionStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStore(key: string, value: string): void {
    try {
        window.sessionStorage.setItem(key, value);
    } catch {
        /* storage blocked: preview just will not carry over to other pages */
    }
}

function isPreview(): boolean {
    if (new URLSearchParams(window.location.search).get('promo') === 'preview') {
        writeStore(PREVIEW_KEY, '1');
        return true;
    }
    return readStore(PREVIEW_KEY) === '1';
}

function isLive(now = Date.now()): boolean {
    if (import.meta.env.VITE_PROMO_ENABLED !== 'true') return false;
    return now >= new Date(PROMO.startsAt).getTime() && now <= new Date(PROMO.endsAt).getTime();
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const PromoPopup = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const returnFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (pathname !== '/') return;
        if (!isPreview() && !isLive()) return;

        const timer = window.setTimeout(() => {
            returnFocusRef.current = document.activeElement as HTMLElement | null;
            setOpen(true);
        }, PROMO.delayMs);
        return () => window.clearTimeout(timer);
    }, [pathname]);

    const close = useCallback(() => {
        setOpen(false);
        returnFocusRef.current?.focus?.();
    }, []);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
                return;
            }
            if (e.key !== 'Tab' || !dialogRef.current) return;
            const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open, close]);

    if (!open || pathname !== '/') return null;

    const onCta = () => {
        fireConversion(ADS_LABELS.promo);
        setOpen(false);
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) close();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="promo-title"
                className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl motion-safe:animate-[promo-in_0.25s_ease-out] sm:max-w-xl sm:rounded-2xl"
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close offer"
                    className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <div className="px-6 pb-2 pt-8 sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copa-blue-700">{PROMO.eyebrow}</p>
                    <h2 id="promo-title" className="mt-2 pr-8 text-3xl font-semibold text-gray-900">
                        {PROMO.headline}
                    </h2>
                </div>

                <ul className="space-y-4 px-6 pb-6 pt-4 sm:px-8">
                    {PROMO.offers.map((offer) => {
                        const className =
                            'mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-copa-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto';
                        return (
                            <li key={offer.id} className="rounded-xl border border-gray-200 p-5">
                                <h3 className="text-lg font-semibold text-gray-900">{offer.name}</h3>
                                <ul className="mt-2 space-y-1">
                                    {offer.prices.map((p) => (
                                        <li key={p.size} className="flex items-baseline gap-x-3">
                                            <span className="w-28 shrink-0 text-sm font-medium text-gray-600">{p.size}</span>
                                            {offer.prices.some((x) => x.wasPrice) && (
                                                <span className="w-14 shrink-0">
                                                    {p.wasPrice && (
                                                        <del className="text-base text-gray-500">
                                                            <span className="sr-only">Regular price </span>
                                                            {p.wasPrice}
                                                        </del>
                                                    )}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold text-copa-blue-700">
                                                <span className="sr-only">{p.wasPrice ? 'Sale price ' : 'Price '}</span>
                                                {p.price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                                    {offer.details.map((d) => (
                                        <li key={d} className="flex gap-2">
                                            <span aria-hidden="true" className="text-copa-blue-700">•</span>
                                            <span>{d}</span>
                                        </li>
                                    ))}
                                </ul>
                                {offer.ctaHref.startsWith('/') ? (
                                    <Link to={offer.ctaHref} onClick={onCta} className={className}>
                                        {offer.ctaLabel}
                                    </Link>
                                ) : (
                                    <a href={offer.ctaHref} onClick={onCta} className={className}>
                                        {offer.ctaLabel}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PromoPopup;
