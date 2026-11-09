import LegalDocument, { type LegalSection } from '../components/LegalDocument';
import { STORE_INFO } from '../constants';

const b = (t: string) => <strong className="font-semibold text-gray-900">{t}</strong>;

const sections: LegalSection[] = [
    {
        title: 'Purchases and Pricing',
        intro: 'All orders are subject to the terms on your sales order. Prices, promotions, and product availability are subject to change. If financing is used, the terms of your financing agreement with the financing provider apply.',
    },
    {
        title: 'Delivery',
        intro: 'Delivery dates and time windows are estimates and may change due to scheduling, weather, product availability, or other factors. We will notify you of changes to your delivery. Please ensure someone 18 or older is present to receive delivery and that the delivery path is clear.',
    },
    {
        title: 'Returns, Exchanges, and Warranties',
        intro: 'Return and exchange eligibility, comfort guarantees, and fees are stated on your sales order. Manufacturer warranties are provided by the manufacturer and are subject to their terms. Contact your store for help with warranty claims.',
    },
    {
        title: 'SMS Terms',
        intro: 'By checking the SMS consent box on your sales order and providing your mobile number, you agree to receive text messages from Mattress Rx and the store you purchased from (Mattress Center USA, Mattress Magic, Mattress 2 Go, Copa Mattress, or Curly\'s Discount Mattress) about your order, delivery scheduling and delivery time windows, and customer service, including two-way conversations with our staff.',
        bullets: [
            <>{b('Program description:')} Order updates, delivery scheduling and time window notifications, and customer service messages.</>,
            <>{b('Message frequency varies')} based on your order and conversations with our staff.</>,
            <>{b('Message and data rates may apply.')}</>,
            <>{b('To opt out,')} reply STOP to any message at any time. You will receive one final message confirming you have been unsubscribed, and you will receive no further messages unless you opt in again.</>,
            <>{b('For help,')} reply HELP to any message or call {STORE_INFO.phone}.</>,
            <>{b('Consent is not a condition of purchase.')}</>,
            'Carriers are not liable for delayed or undelivered messages.',
            'Supported carriers include major U.S. wireless carriers. Service may not be available on all carriers.',
            <>Your information is handled according to our <a className="text-gray-900 underline" href="/privacy-policy">Privacy Policy</a>. We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.</>,
        ],
    },
    {
        title: 'Website Use',
        intro: 'Content on our websites is provided for general information. We may update or change website content at any time without notice. You agree not to misuse our websites or interfere with their operation.',
    },
    {
        title: 'Limitation of Liability',
        intro: 'To the fullest extent permitted by law, Mattress Rx is not liable for indirect, incidental, or consequential damages arising from your use of our websites, products, or messaging services. Nothing in these Terms limits any rights you have under applicable consumer protection laws.',
    },
    {
        title: 'Governing Law',
        intro: 'These Terms are governed by the laws of the State of Arizona, without regard to conflict of law principles.',
    },
    {
        title: 'Changes to These Terms',
        intro: 'We may update these Terms from time to time. Changes take effect when posted on this page, and the "Last updated" date above will be revised.',
    },
];

const TermsPage = () => (
    <LegalDocument
        title="Terms & Conditions"
        updated="November 5, 2026"
        intro={'These Terms & Conditions ("Terms") apply to purchases, deliveries, websites, and communications from Mattress Rx and its store locations operating as Mattress Center USA, Mattress Magic, Mattress 2 Go, Copa Mattress, and Curly\'s Discount Mattress ("Mattress Rx," "we," "us," or "our"). By making a purchase, using our websites, or opting in to our text messages, you agree to these Terms.'}
        sections={sections}
    />
);

export default TermsPage;
