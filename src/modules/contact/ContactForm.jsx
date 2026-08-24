'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { contactSchema } from './contactValidation';
import { sendContactMessage } from './contactService';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { customerName: '', email: '', phone: '', subject: '', message: '' },
  });

  async function onSubmit(values) {
    try {
      await sendContactMessage(values);
      toast.success('Your message has reached the restaurant team.');
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form className="booking-form contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-heading"><Send size={24} /><div><span>Talk to us</span><h2>Send a message</h2></div></div>
      <div className="form-grid">
        <ContactField label="Full name" error={errors.customerName?.message}><input {...register('customerName')} autoComplete="name" /></ContactField>
        <ContactField label="Email" error={errors.email?.message}><input {...register('email')} type="email" autoComplete="email" /></ContactField>
        <ContactField label="Phone (optional)" error={errors.phone?.message}><input {...register('phone')} autoComplete="tel" /></ContactField>
        <ContactField label="Subject" error={errors.subject?.message}><input {...register('subject')} placeholder="Catering, feedback, an event..." /></ContactField>
        <ContactField className="form-full" label="Message" error={errors.message?.message}><textarea {...register('message')} rows="6" /></ContactField>
      </div>
      <button className="button form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="spin" size={19} /> : <Send size={19} />}
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}

function ContactField({ label, error, className = '', children }) {
  return <label className={`form-field ${className}`}><span>{label}</span>{children}{error && <small role="alert">{error}</small>}</label>;
}
