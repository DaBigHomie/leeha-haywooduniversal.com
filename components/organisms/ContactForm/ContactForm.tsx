import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { FormField } from '../../molecules/FormField/FormField';

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  successMessage = 'Thank you! We will get back to you soon.',
  errorMessage = 'Something went wrong. Please try again.',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitStatus('success');
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
      <Text variant="h2" className="mb-6 text-center">
        Get In Touch
      </Text>

      <div className="space-y-4">
        <FormField
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          error={errors.name}
          required
          onChange={handleChange('name')}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          error={errors.email}
          required
          onChange={handleChange('email')}
        />

        <FormField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="(123) 456-7890"
          value={formData.phone}
          error={errors.phone}
          onChange={handleChange('phone')}
        />

        <div className="w-full">
          <label htmlFor="message" className="block mb-2">
            <Text variant="body" weight="medium">
              Message <span className="text-red-500">*</span>
            </Text>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, message: e.target.value }));
              if (errors.message) {
                setErrors((prev) => ({ ...prev, message: undefined }));
              }
            }}
            className={`
              w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.message ? 'border-red-500' : 'border-gray-300'}
            `}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <div id="message-error" className="mt-1" role="alert">
              <Text variant="small" color="text-red-500">
                {errors.message}
              </Text>
            </div>
          )}
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md" role="status">
          <Text variant="body" color="text-green-700">
            {successMessage}
          </Text>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md" role="alert">
          <Text variant="body" color="text-red-700">
            {errorMessage}
          </Text>
        </div>
      )}

      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full mt-6"
        size="lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
