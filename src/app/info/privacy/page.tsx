export default function PrivacyPolicyPage() {
  const effectiveDate = "February 28, 2026";

  return (
    <>
      <section className="border-b border-border">
        <div className="container mx-auto px-8 py-16 max-w-4xl">
          <div className="mb-4 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Legal</span>
            <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
              Effective: {effectiveDate}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            This page explains what information Optix Toolkit collects, how we
            use it, and the choices you have.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-8 py-12 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-4 mb-8 not-prose">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold mb-1">Data Types</div>
            <p className="text-sm text-muted-foreground">
              Account info, auth/session data, and product records you submit.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold mb-1">Cookies & Storage</div>
            <p className="text-sm text-muted-foreground">
              Supabase session cookies, UI preference cookie, analytics events,
              and minimal localStorage.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold mb-1">Your Control</div>
            <p className="text-sm text-muted-foreground">
              You can clear browser storage, manage cookies, and contact admins
              for account help.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">1. Scope</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy applies to Optix Toolkit (the “Service”),
              including public pages, authentication pages, and authenticated
              product areas.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              2. Information We Collect
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-semibold mb-2">Directly from you</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>
                    Account details, such as name and email, when you sign up.
                  </li>
                  <li>
                    Authentication data when you sign in with email/password or
                    supported OAuth providers (currently Google and Discord).
                  </li>
                  <li>
                    Product data you enter while using toolkit features (for
                    example, outreach and scouting-related records).
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">Automatically collected</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>
                    Device and usage events used for analytics and product
                    improvement.
                  </li>
                  <li>
                    Basic technical data, such as browser type, operating
                    system, approximate geolocation derived from IP, and
                    request metadata.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              3. Cookies and Similar Technologies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and browser storage for authentication, security,
              functionality, and analytics.
            </p>

            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <th className="text-left font-semibold p-3">Type</th>
                    <th className="text-left font-semibold p-3">Name / Provider</th>
                    <th className="text-left font-semibold p-3">Purpose</th>
                    <th className="text-left font-semibold p-3">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="p-3 align-top text-muted-foreground">
                      Strictly necessary cookie
                    </td>
                    <td className="p-3 align-top">Supabase auth/session cookies</td>
                    <td className="p-3 align-top text-muted-foreground">
                      Keep users signed in, secure access, and support route
                      protection.
                    </td>
                    <td className="p-3 align-top text-muted-foreground">
                      Varies by session and auth settings
                    </td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="p-3 align-top text-muted-foreground">
                      Functional cookie
                    </td>
                    <td className="p-3 align-top">sidebar_state</td>
                    <td className="p-3 align-top text-muted-foreground">
                      Stores whether the sidebar is expanded or collapsed.
                    </td>
                    <td className="p-3 align-top text-muted-foreground">Up to 7 days</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="p-3 align-top text-muted-foreground">
                      Analytics
                    </td>
                    <td className="p-3 align-top">PostHog (via /ph proxy)</td>
                    <td className="p-3 align-top text-muted-foreground">
                      Understand feature usage and improve product quality.
                    </td>
                    <td className="p-3 align-top text-muted-foreground">
                      Per PostHog/browser settings
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 align-top text-muted-foreground">Local storage</td>
                    <td className="p-3 align-top">navbarTipSeen</td>
                    <td className="p-3 align-top text-muted-foreground">
                      Remembers whether you dismissed the one-time navigation
                      tip.
                    </td>
                    <td className="p-3 align-top text-muted-foreground">
                      Until cleared by browser/user
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              4. How We Use Information
            </h2>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              <li>Provide, secure, and operate the Service.</li>
              <li>Authenticate users and maintain account sessions.</li>
              <li>Save your interface preferences.</li>
              <li>Analyze usage to improve reliability and user experience.</li>
              <li>Detect and prevent abuse, fraud, and unauthorized access.</li>
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              5. Sharing and Service Providers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We share information with service providers only as needed to run
              the Service, such as:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5 mb-3">
              <li>
                Supabase (authentication/session management and backend data
                services).
              </li>
              <li>PostHog (analytics and product insights).</li>
              <li>
                OAuth identity providers you choose to use (for example, Google
                or Discord).
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal information for money.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain information for as long as needed to provide the
              Service, comply with legal obligations, resolve disputes, and
              enforce our agreements. Retention periods may vary by data type
              and account status.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">7. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use reasonable technical and organizational measures to protect
              your data. No method of transmission or storage is 100% secure,
              so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">8. Your Choices</h2>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              <li>You can manage or clear cookies and site data in your browser.</li>
              <li>
                You can disable localStorage by changing browser settings (some
                UI preferences may not persist).
              </li>
              <li>
                You can stop using the Service or request account-related help
                from the team administrators.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">9. Children’s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is not directed to children under 13, and we do not
              knowingly collect personal information directly from children
              under 13 without appropriate authorization.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              10. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. When we do,
              we will update the effective date on this page.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold tracking-tight mb-3">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy questions or requests related to your data, please
              contact the Optix Toolkit administrators through your team’s
              normal support channel.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
