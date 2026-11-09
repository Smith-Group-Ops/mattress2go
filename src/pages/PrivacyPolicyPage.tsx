import LegalDocument, { type LegalSection } from '../components/LegalDocument';
import { STORE_INFO } from '../constants';

const b = (t: string) => <strong className="font-semibold text-gray-900">{t}</strong>;

const sections: LegalSection[] = [
    {
        title: 'Information We Collect',
        intro: 'We collect information you provide to us directly, including:',
        bullets: [
            'Name, billing address, and delivery address',
            'Mobile phone number and email address',
            'Order, purchase, financing, and delivery details',
            'Messages and communications you send to us',
        ],
        outro: 'When you visit our websites, we may also automatically collect basic technical information such as your browser type, device type, and pages visited.',
    },
    {
        title: 'How We Use Your Information',
        intro: 'We use your information to:',
        bullets: [
            'Process and fulfill your orders',
            'Schedule and complete deliveries, including sending delivery time windows',
            'Provide customer service and respond to your questions',
            'Send text messages you have agreed to receive',
            'Operate, maintain, and improve our stores, websites, and services',
            'Comply with legal obligations',
        ],
    },
    {
        title: 'SMS / Text Messaging',
        intro: 'If you opt in to receive text messages by checking the SMS consent box on your sales order, Mattress Rx and the store you purchased from will use your mobile number to send order updates, delivery scheduling and time window notifications, and customer service messages, including two-way conversations with our staff.',
        bullets: [
            'Message frequency varies.',
            'Message and data rates may apply.',
            'Reply STOP at any time to opt out. You will receive one final message confirming you have been unsubscribed.',
            `Reply HELP for help, or call us at ${STORE_INFO.phone}.`,
            'Consent to receive text messages is not a condition of purchase.',
        ],
        outro: <>{b('We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.')} Mobile phone numbers and SMS consent collected for text messaging will not be shared with any third parties or affiliates for marketing or promotional purposes.</>,
    },
    {
        title: 'How We Share Information',
        intro: 'We do not sell your personal information. We share information only as needed to run our business, including with:',
        bullets: [
            <>{b('Service providers')} who perform services on our behalf, such as our software and messaging platform provider, delivery partners, payment processors, and financing providers. These providers may only use your information to perform services for Mattress Rx.</>,
            <>{b('Legal and safety purposes')}, when required by law or to protect the rights, property, or safety of Mattress Rx, our customers, or others.</>,
        ],
        outro: 'The SMS opt-in restriction above applies to all sharing: text messaging opt-in data and consent are never shared with third parties for marketing purposes.',
    },
    {
        title: 'Data Retention',
        intro: 'We keep your information for as long as needed to complete your order, provide service and warranty support, maintain records of consent, and meet legal and accounting requirements.',
    },
    {
        title: 'Data Security',
        intro: 'We use reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, loss, or misuse. No method of transmission or storage is completely secure, but we work to protect your information.',
    },
    {
        title: 'Your Choices',
        bullets: [
            <>{b('Text messages:')} Reply STOP to any message to opt out.</>,
            <>{b('Access, correction, or deletion:')} Contact us using the details below to request access to, correction of, or deletion of your personal information, subject to legal record-keeping requirements.</>,
        ],
    },
    {
        title: "Children's Privacy",
        intro: 'Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.',
    },
    {
        title: 'Changes to This Policy',
        intro: 'We may update this Privacy Policy from time to time. Changes take effect when posted on this page, and the "Last updated" date above will be revised.',
    },
];

const PrivacyPolicyPage = () => (
    <LegalDocument
        title="Privacy Policy"
        updated="November 5, 2026"
        intro={'This Privacy Policy describes how Mattress Rx and its store locations operating as Mattress Center USA, Mattress Magic, Mattress 2 Go, Copa Mattress, and Curly\'s Discount Mattress ("Mattress Rx," "we," "us," or "our") collect, use, and protect your personal information when you shop with us in store, visit our websites, or communicate with us, including by text message.'}
        sections={sections}
    />
);

export default PrivacyPolicyPage;
