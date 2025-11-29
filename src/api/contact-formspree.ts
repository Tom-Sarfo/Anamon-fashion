// Alternative solution using Formspree (no dependencies required)
// Sign up at https://formspree.io and get your form endpoint

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmailFormspree = async (
  formData: ContactFormData
): Promise<void> => {
  // Get form endpoint from environment variables
  const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  if (!formEndpoint) {
    throw new Error(
      "Formspree endpoint is missing. Please check your environment variables."
    );
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", `${formData.firstName} ${formData.lastName}`);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("subject", formData.subject);
  formDataToSend.append("message", formData.message);

  const response = await fetch(formEndpoint, {
    method: "POST",
    body: formDataToSend,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }
};
