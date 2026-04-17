import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | MoInterview",
  description: "Learn about how MoInterview uses cookies and how to manage your cookie preferences.",
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies help us remember your preferences and understand how you use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How MoInterview Uses Cookies</h2>
            <p className="mb-4">
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li><strong>Authentication:</strong> To keep you logged in to your account</li>
              <li><strong>Preferences:</strong> To remember your settings and choices</li>
              <li><strong>Analytics:</strong> To understand how you use our Service</li>
              <li><strong>Performance:</strong> To improve the speed and functionality of our website</li>
              <li><strong>Security:</strong> To prevent fraud and ensure the security of our Service</li>
              <li><strong>Marketing:</strong> To deliver relevant content and advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are necessary for the website to function properly. They enable basic functionality such as page navigation and access to secure areas. Without these cookies, you cannot use the website properly.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Performance Cookies</h3>
              <p className="text-muted-foreground">
                These cookies collect information about how you use our website, such as which pages you visit most often and if you receive any error messages. These cookies do not identify you individually and are mainly used for statistical purposes.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Functional Cookies</h3>
              <p className="text-muted-foreground">
                These cookies allow our website to remember choices you have made (such as your username, language, or the region you are in) and to provide enhanced, more personal features.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Targeting Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="mb-4">
              We may allow third-party service providers to place cookies on our website for analytics, advertising, and other purposes. These third parties include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Google Analytics</li>
              <li>Advertising networks</li>
              <li>Social media platforms</li>
              <li>Payment processors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. How to Control Cookies</h2>
            <p className="mb-4">
              You have the right to decide whether to accept or reject cookies. Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>See what cookies you have and delete them individually</li>
              <li>Block cookies from particular websites</li>
              <li>Block all cookies by default</li>
              <li>Delete cookies when you close your browser</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              However, please note that blocking or disabling cookies may affect the functionality of our website and your user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookie Consent</h2>
            <p className="mb-4">
              When you first visit our website, we will ask for your consent to use cookies. You can change your cookie preferences at any time by updating your browser settings or by contacting us directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Duration of Cookies</h2>
            <p className="mb-4">
              Cookies can be either &quot;session cookies&quot; or &quot;persistent cookies&quot;:
            </p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Session Cookies</h4>
              <p className="text-muted-foreground">
                These cookies expire when you close your browser and are not stored on your device after you leave our website.
              </p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Persistent Cookies</h4>
              <p className="text-muted-foreground">
                These cookies remain on your device for a set period or until you manually delete them.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Updates to This Cookie Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time. We encourage you to review this policy regularly to stay informed about how we use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2"><strong>Email:</strong> privacy@mointerview.com</p>
              <p><strong>Address:</strong> MoInterview, Inc., Privacy Team</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
