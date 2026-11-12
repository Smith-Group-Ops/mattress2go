export interface PromoPrice {
    size: string;
    price: string;
    wasPrice?: string;
}

export interface PromoOffer {
    id: string;
    name: string;
    prices: PromoPrice[];
    details: string[];
    ctaLabel: string;
    ctaHref: string;
}

export interface PromoConfig {
    id: string;
    eyebrow: string;
    headline: string;
    startsAt: string;
    endsAt: string;
    delayMs: number;
    offers: PromoOffer[];
}

/*
 * GS-147 Black Friday pop-up. Cool Lux slashed prices confirmed by Parker (Queen $999 to $499,
 * King $1,299 to $599). Still placeholder until confirmed: images, dates, quantities, button
 * destination, and any warranty or hand-built claims (left out). Offer 2 shows no slashed price.
 * Homepage only, every visit (closing it hides it until the next homepage load).
 * Shows only with ?promo=preview, or VITE_PROMO_ENABLED=true inside the date window.
 */
export const PROMO: PromoConfig = {
    id: 'black-friday-2026',
    eyebrow: 'Black Friday',
    headline: 'Doorbuster mattress deals',
    startsAt: '2026-11-01T00:00:00-07:00', // TEMP(GS-147): moved early for local testing; real start TBD with Parker
    endsAt: '2026-11-30T23:59:59-07:00', // TODO(GS-147): confirm end with Parker
    delayMs: 2000,
    offers: [
        {
            id: 'cool-lux',
            name: 'Cool Lux Mattress',
            prices: [
                { size: 'Queen', price: '$499', wasPrice: '$999' },
                { size: 'King', price: '$599', wasPrice: '$1,299' },
            ],
            details: ['Cooling gel comfort layer', 'Pocket-coil support', 'Limited quantities'],
            ctaLabel: 'Shop mattresses',
            ctaHref: '/products/cool-lux-cool-gel-pocket-coil-mattress-black-friday-special', // TODO(GS-147): confirm button destination
        },
        {
            id: 'glacier-ice-adjustable',
            name: 'Eurotop Glacier Ice + Adjustable Base',
            prices: [{ size: 'Queen or King', price: '$1,999', wasPrice: '$8,000' }],
            details: ['Wireless head-and-foot adjustable base', 'First 200 customers only', 'Free delivery and pillows not included'],
            ctaLabel: 'Shop mattresses',
            ctaHref: '/products/eclipse-ice-series-y-plush-eurotop-adjustable-base-black-friday-combo', // TODO(GS-147): confirm button destination
        },
    ],
};
