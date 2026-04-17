import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | MoInterview",
  description: "Read our Terms of Service to understand your rights and responsibilities when using MoInterview.",
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using MoInterview (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on MoInterview for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
              <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transmitting the materials over a network or selling/offering them for sale</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on MoInterview are provided on an &apos;as is&apos; basis. MoInterview makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p className="mb-4">
              In no event shall MoInterview or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MoInterview, even if MoInterview or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Materials</h2>
            <p className="mb-4">
              The materials appearing on MoInterview could include technical, typographical, or photographic errors. MoInterview does not warrant that any of the materials on its website are accurate, complete, or current. MoInterview may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
            <p className="mb-4">
              MoInterview has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MoInterview of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
            <p className="mb-4">
              MoInterview may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which MoInterview operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. User Accounts</h2>
            <p className="mb-4">
              When you create an account on MoInterview, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your password and account information, and you agree to accept responsibility for all activities that occur under your account. You agree to notify MoInterview immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. User Conduct</h2>
            <p className="mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
              <li>Engage in any form of harassment or abuse</li>
              <li>Post or transmit unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable content</li>
              <li>Disrupt the normal flow of dialogue within our Service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Engage in any commercial activities without express written consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Intellectual Property Rights</h2>
            <p className="mb-4">
              All content on MoInterview, including text, graphics, logos, images, and software, is the property of MoInterview or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2"><strong>Email:</strong> legal@mointerview.com</p>
              <p><strong>Address:</strong> MoInterview, Inc., Legal Department</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
