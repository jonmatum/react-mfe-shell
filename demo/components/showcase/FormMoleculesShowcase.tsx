import React, { useState } from 'react';
import {
  Button,
  Input,
  FormField,
  SearchBox,
  Select,
  Checkbox,
  Radio,
  SwitchField,
  Textarea,
  FileUpload,
} from '../../../src';
import { ShowcaseSection, ShowcaseCard, ComponentGrid } from './ShowcaseSection';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  country: string;
  message: string;
  newsletter: boolean;
  plan: string;
  notifications: boolean;
  searchTerm: string;
  files: File[] | null;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  country: '',
  message: '',
  newsletter: false,
  plan: 'basic',
  notifications: true,
  searchTerm: '',
  files: null
};

export const FormMoleculesShowcase: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email' : '';
      case 'country':
        return !value ? 'Please select a country' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: any) => {
    updateField(name as keyof FormData, value);
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <ShowcaseSection
      title="Complete Form Ecosystem"
      description="Experience our comprehensive collection of form molecule components with built-in validation, accessibility features, and seamless theme integration."
      badge={{
        text: "Form Molecules",
        variant: "success",
        icon: <DocumentTextIcon />
      }}
    >
      <ComponentGrid columns={2}>
        <ContactFormCard 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />
        <FormComponentsGrid 
          formData={formData}
          onUpdateField={updateField}
        />
      </ComponentGrid>
    </ShowcaseSection>
  );
};

interface ContactFormCardProps {
  formData: FormData;
  errors: Record<string, string>;
  onInputChange: (name: string, value: any) => void;
}

const ContactFormCard: React.FC<ContactFormCardProps> = ({ formData, errors, onInputChange }) => {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'es', label: 'Spain' },
    { value: 'it', label: 'Italy' },
    { value: 'au', label: 'Australia' }
  ];

  return (
    <ShowcaseCard
      title="Contact Form"
      description="Complete form with validation"
    >
      <div className="space-y-6">
        <FormField 
          label="Full Name" 
          required 
          error={errors.name}
          description="Enter your first and last name"
        >
          <Input
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="John Doe"
            error={!!errors.name}
          />
        </FormField>
        
        <FormField 
          label="Email Address" 
          required 
          error={errors.email}
          description="We'll never share your email"
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="john@example.com"
            error={!!errors.email}
          />
        </FormField>
        
        <FormField 
          label="Country" 
          required 
          error={errors.country}
        >
          <Select
            value={formData.country}
            onChange={(value) => onInputChange('country', value)}
            options={countryOptions}
            placeholder="Select your country"
            searchable
          />
        </FormField>
        
        <FormField 
          label="Message" 
          required 
          error={errors.message}
          description="Tell us how we can help"
        >
          <Textarea
            value={formData.message}
            onChange={(e) => onInputChange('message', e.target.value)}
            placeholder="Your message here..."
            rows={4}
          />
        </FormField>
        
        <div className="flex gap-4">
          <Button variant="primary" size="md">
            Send Message
          </Button>
          <Button variant="secondary" size="md">
            Save Draft
          </Button>
        </div>
      </div>
    </ShowcaseCard>
  );
};

interface FormComponentsGridProps {
  formData: FormData;
  onUpdateField: (field: keyof FormData, value: any) => void;
}

const FormComponentsGrid: React.FC<FormComponentsGridProps> = ({ formData, onUpdateField }) => {
  const planOptions = [
    { value: 'basic', label: 'Basic Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan' }
  ];

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <ShowcaseCard
        title="Search Box"
        description="Debounced search with clear functionality"
      >
        <SearchBox
          value={formData.searchTerm}
          onChange={(value) => onUpdateField('searchTerm', value)}
          placeholder="Search components..."
          debounceMs={300}
        />
        {formData.searchTerm && (
          <p className="text-sm text-text-secondary mt-2">
            Searching for: "{formData.searchTerm}"
          </p>
        )}
      </ShowcaseCard>

      {/* Selection Components */}
      <ShowcaseCard
        title="Selection Components"
        description="Checkboxes and radio buttons"
      >
        <div className="space-y-4">
          <Checkbox
            checked={formData.newsletter}
            onChange={(checked) => onUpdateField('newsletter', checked)}
            label="Subscribe to newsletter"
            description="Get updates about new features"
          />
          
          <Checkbox
            checked={formData.notifications}
            onChange={(checked) => onUpdateField('notifications', checked)}
            label="Enable notifications"
            description="Receive important updates"
          />

          <div className="pt-4">
            <p className="text-sm font-medium text-text-primary mb-3">
              Choose your plan:
            </p>
            <Radio
              name="plan"
              options={planOptions}
              value={formData.plan}
              onChange={(value) => onUpdateField('plan', value)}
            />
          </div>
        </div>
      </ShowcaseCard>

      {/* Switch Field */}
      <ShowcaseCard
        title="Switch Field"
        description="Enhanced switch with form integration"
      >
        <SwitchField
          checked={formData.notifications}
          onChange={(checked) => onUpdateField('notifications', checked)}
          label="Push Notifications"
          description="Receive notifications on your device"
        />
      </ShowcaseCard>

      {/* File Upload */}
      <ShowcaseCard
        title="File Upload"
        description="Drag-and-drop with preview and validation"
      >
        <FileUpload
          onFileSelect={(files) => onUpdateField('files', files)}
          accept="image/*,.pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024} // 5MB
          multiple
        />
      </ShowcaseCard>
    </div>
  );
};
