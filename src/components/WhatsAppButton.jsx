import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href="https://wa.me/923062229369"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with the restaurant on WhatsApp"
      title="WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
