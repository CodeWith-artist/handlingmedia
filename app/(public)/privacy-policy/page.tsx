// app/privacy-policy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="mb-12">
          <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
            Legal
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-slate-400">
            Last Updated: May 29, 2026
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Welcome to <strong>Handling Media</strong>. We provide
            WhatsApp Business API integration, chatbot development,
            automation, customer engagement solutions, and related services.
            This Privacy Policy explains how we collect, use, and protect your
            information.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              1. Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  Personal Information
                </h3>
                <ul className="list-disc space-y-2 pl-6 text-slate-300">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Job title</li>
                  <li>Billing information</li>
                  <li>Business details</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  WhatsApp Communication Data
                </h3>
                <ul className="list-disc space-y-2 pl-6 text-slate-300">
                  <li>Customer phone numbers</li>
                  <li>Message content</li>
                  <li>Message delivery status</li>
                  <li>Contact metadata</li>
                  <li>Campaign performance metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  Technical Information
                </h3>
                <ul className="list-disc space-y-2 pl-6 text-slate-300">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Website usage analytics</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              2. How We Use Your Information
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-slate-300">
              <li>Provide WhatsApp Business API services</li>
              <li>Manage customer accounts</li>
              <li>Deliver technical support</li>
              <li>Process invoices and payments</li>
              <li>Improve service performance</li>
              <li>Send service-related communications</li>
              <li>Monitor security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              3. WhatsApp Business API Data Processing
            </h2>

            <p className="leading-7 text-slate-300">
              As a service provider, we may process customer data on behalf of
              our clients. We do not sell customer message data or use message
              content for advertising purposes.
            </p>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-slate-300">
                Clients are responsible for obtaining appropriate consent from
                their customers before sending messages through WhatsApp.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              4. Third-Party Services
            </h2>

            <p className="mb-4 text-slate-300">
              Our services may integrate with:
            </p>

            <ul className="list-disc space-y-2 pl-6 text-slate-300">
              <li>WhatsApp Business Platform</li>
              <li>Meta Platforms</li>
              <li>Cloud hosting providers</li>
              <li>Payment processors</li>
              <li>CRM platforms</li>
              <li>Analytics providers</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              5. Data Retention
            </h2>

            <p className="leading-7 text-slate-300">
              We retain personal information only as long as necessary to
              provide services, comply with legal obligations, resolve
              disputes, and enforce agreements. When data is no longer needed,
              it is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              6. Data Security
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-slate-300">
              <li>Encrypted communications where applicable</li>
              <li>Secure cloud infrastructure</li>
              <li>Access control mechanisms</li>
              <li>Authentication and authorization systems</li>
              <li>Regular security monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              7. Sharing of Information
            </h2>

            <p className="mb-4 text-slate-300">
              We may share information with:
            </p>

            <ul className="list-disc space-y-2 pl-6 text-slate-300">
              <li>Service providers and infrastructure partners</li>
              <li>Payment processing providers</li>
              <li>Legal authorities when required by law</li>
              <li>Authorized partners involved in service delivery</li>
            </ul>

            <p className="mt-4 text-slate-300">
              We do not sell personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              8. International Data Transfers
            </h2>

            <p className="leading-7 text-slate-300">
              Information may be processed or stored in countries where our
              service providers operate. Appropriate safeguards are implemented
              to protect transferred data.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              9. Your Rights
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-slate-300">
              <li>Access your personal information</li>
              <li>Request corrections</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Object to data processing</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              10. Cookies & Analytics
            </h2>

            <p className="leading-7 text-slate-300">
              We use cookies and analytics technologies to improve user
              experience, analyze website performance, and maintain service
              functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              11. Children&apos;s Privacy
            </h2>

            <p className="leading-7 text-slate-300">
              Our services are intended for businesses and individuals who meet
              the minimum legal age requirements. We do not knowingly collect
              information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              12. Compliance with WhatsApp Policies
            </h2>

            <p className="leading-7 text-slate-300">
              Clients must comply with WhatsApp Business Messaging Policies,
              Meta Platform Terms, and applicable privacy regulations when
              using our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              13. Changes to This Policy
            </h2>

            <p className="leading-7 text-slate-300">
              We may update this Privacy Policy periodically. Any changes will
              be posted on this page with a revised effective date.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              14. Contact Us
            </h2>

            <div className="space-y-2 text-slate-300">
              <p>
                <strong>Handling Media</strong>
              </p>
              <p>Email: info@handlingmedia.com</p>
              <p>Phone: +91 9205606143</p>
              <p>Address: remote gurugram, Haryana</p>
              <p>Website: www.handlingmedia.io</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}