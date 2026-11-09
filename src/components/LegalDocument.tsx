import type { ReactNode } from 'react';
import Layout from '../Layout';
import { SITE_NAME, STORE_INFO } from '../constants';

export type LegalSection = {
    title: string;
    intro?: ReactNode;
    bullets?: ReactNode[];
    outro?: ReactNode;
};

const ContactBlock = () => (
    <address className="mt-4 not-italic">
        Mattress Rx (operating as {SITE_NAME})<br />
        {STORE_INFO.address}<br />
        Phone: <a className="text-gray-900 underline" href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.phone}</a><br />
        Website: {window.location.host}
    </address>
);

const LegalDocument = ({
    title,
    updated,
    intro,
    sections,
}: {
    title: string;
    updated: string;
    intro: ReactNode;
    sections: LegalSection[];
}) => (
    <Layout title={title}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">Last updated: {updated}</p>
                <p className="mt-6 text-base leading-7 text-gray-600">{intro}</p>
                <section className="mt-12 space-y-10 text-base leading-7 text-gray-600">
                    {sections.map((s) => (
                        <div key={s.title}>
                            <h2 className="text-xl font-semibold text-gray-900">{s.title}</h2>
                            {s.intro && <p className="mt-4">{s.intro}</p>}
                            {s.bullets && (
                                <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-600">
                                    {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            )}
                            {s.outro && <p className="mt-4">{s.outro}</p>}
                        </div>
                    ))}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
                        <ContactBlock />
                    </div>
                </section>
            </div>
        </div>
    </Layout>
);

export default LegalDocument;
