import { useState } from "react";
import { sendContactEmail } from "@/api/contact";
// import { sendContactEmailFormspree } from "@/api/contact-formspree"; // Alternative: Formspree

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormState {
  formData: ContactFormData;
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export const useContactForm = () => {
  const [state, setState] = useState<ContactFormState>({
    formData: initialFormData,
    isLoading: false,
    isSubmitted: false,
    error: null,
  });

  const updateField = (field: keyof ContactFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
      error: null, // Clear error when user starts typing
    }));
  };

  const validateForm = (): boolean => {
    const { firstName, lastName, email, subject, message } = state.formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setState((prev) => ({ ...prev, error: "All fields are required" }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Using EmailJS (now installed)
      await sendContactEmail(state.formData);

      // Alternative: Using Formspree (uncomment the import above and use this instead)
      // await sendContactEmailFormspree(state.formData);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSubmitted: true,
        formData: initialFormData,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      }));
    }
  };

  const resetForm = () => {
    setState({
      formData: initialFormData,
      isLoading: false,
      isSubmitted: false,
      error: null,
    });
  };

  return {
    formData: state.formData,
    isLoading: state.isLoading,
    isSubmitted: state.isSubmitted,
    error: state.error,
    updateField,
    submitForm,
    resetForm,
  };
};
