'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarDays, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { reservationSchema } from '@/src/modules/reservations/reservationValidation';
import { createReservation } from '@/src/modules/reservations/reservationService';

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: '', phone: '', email: '', reservationDate: '',
      reservationTime: '19:30', guestCount: 4, occasion: 'Casual dining',
      seating: 'No preference', notes: '',
    },
  });

  async function onSubmit(values) {
    try {
      const result = await createReservation(values);
      toast.success(`Table request ${result.reservationId} received`);
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-heading">
        <CalendarDays size={24} />
        <div><span>Table request</span><h2>Plan your visit</h2></div>
      </div>
      <div className="form-grid">
        <Field label="Full name" error={errors.customerName?.message}>
          <input {...register('customerName')} autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register('phone')} autoComplete="tel" placeholder="03XX XXXXXXX" />
        </Field>
        <Field label="Email (optional)" error={errors.email?.message}>
          <input {...register('email')} type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>
        <Field label="Guests" error={errors.guestCount?.message}>
          <input {...register('guestCount')} type="number" min="1" max="30" />
        </Field>
        <Field label="Date" error={errors.reservationDate?.message}>
          <input {...register('reservationDate')} type="date" min={format(new Date(), 'yyyy-MM-dd')} />
        </Field>
        <Field label="Time" error={errors.reservationTime?.message}>
          <select {...register('reservationTime')}>
            {['12:30', '14:00', '17:30', '19:30', '21:00', '22:30'].map((time) => <option key={time}>{time}</option>)}
          </select>
        </Field>
        <Field label="Occasion" error={errors.occasion?.message}>
          <select {...register('occasion')}>
            {['Casual dining', 'Family gathering', 'Birthday', 'Corporate meal', 'Wedding event'].map((value) => <option key={value}>{value}</option>)}
          </select>
        </Field>
        <Field label="Seating" error={errors.seating?.message}>
          <select {...register('seating')}>
            {['No preference', 'Family hall', 'Outdoor courtyard', 'Quiet corner'].map((value) => <option key={value}>{value}</option>)}
          </select>
        </Field>
        <Field className="form-full" label="Anything we should arrange?" error={errors.notes?.message}>
          <textarea {...register('notes')} rows="4" placeholder="High chair, birthday setup, dietary notes..." />
        </Field>
      </div>
      <button className="button form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="spin" size={19} /> : <CalendarDays size={19} />}
        {isSubmitting ? 'Sending request...' : 'Request this table'}
      </button>
      <p className="form-note">A team member will confirm availability by phone.</p>
    </form>
  );
}

function Field({ label, error, className = '', children }) {
  return (
    <label className={`form-field ${className}`}>
      <span>{label}</span>
      {children}
      {error && <small role="alert">{error}</small>}
    </label>
  );
}
