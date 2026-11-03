// Who sells (Jacqueline, 3 Nov 2026). Empty fields are hidden on the site. Fill the legal name,
// registration (RC, ICE) and address once the company is set up; the email works once the domain is live.
export const COMPANY = {
  brand: "Spice Hanout",
  legalName: "",
  rc: "",
  ice: "",
  address: "",
  city: "Marrakech, Morocco",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@spicehanout.com",
  site: "spicehanout.com",
};
