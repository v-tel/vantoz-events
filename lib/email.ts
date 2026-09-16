import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error(
    "RESEND_API_KEY is not set. Add it to .env.local — see the setup notes in README.md."
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

// While your domain isn't verified with Resend, "from" must stay
// onboarding@resend.dev. Once you verify vantozevents.com, switch this.
const FROM = process.env.RESEND_FROM_EMAIL ?? "Vantoz Events <onboarding@resend.dev>";
const NOTIFY_TO = process.env.VANTOZ_NOTIFY_EMAIL ?? "hello@vantozevents.com";

type QuoteEmailInput = {
  eventType: string;
  date: string;
  guests: number;
  venue: string;
  needs: string[];
  budget: string;
  name: string;
  phone: string;
  email?: string;
};

export async function sendQuoteEmails(data: QuoteEmailInput) {
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `New quote request — ${data.eventType} (${data.name})`,
    html: `
      <h2>New quote request</h2>
      <p><strong>Event type:</strong> ${data.eventType}</p>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Guests:</strong> ${data.guests}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p><strong>Needs:</strong> ${data.needs.join(", ")}</p>
      <p><strong>Budget:</strong> ${data.budget}</p>
      <hr />
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
    `,
  });

  if (data.email) {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "We've received your quote request — Vantoz Events",
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for telling us about your ${data.eventType.toLowerCase()} on ${data.date}.
        Our team is putting together a tailored quote and will reach out within 24 hours,
        either by phone or WhatsApp on ${data.phone}.</p>
        <p>— Vantoz Events</p>
      `,
    });
  }
}

type ContactEmailInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export async function sendContactEmail(data: ContactEmailInput) {
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: data.email,
    subject: `New contact message from ${data.name}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br />")}</p>
    `,
  });
}
