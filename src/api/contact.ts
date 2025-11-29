// This is a client-side solution using EmailJS
// You'll need to install: npm install @emailjs/browser

import emailjs from "@emailjs/browser";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (
  formData: ContactFormData
): Promise<void> => {
  // Get credentials from environment variables
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

  // Validate environment variables
  if (!publicKey || !serviceId || !templateId) {
    throw new Error(
      "EmailJS configuration is missing. Please check your environment variables."
    );
  }

  // Initialize EmailJS with your public key
  emailjs.init(publicKey);

  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: contactEmail || "tomusacc@gmail.com",
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
