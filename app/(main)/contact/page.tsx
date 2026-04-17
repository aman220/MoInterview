import { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact MoInterview | Get in Touch",
  description: "Have questions? Contact MoInterview's support team. We're here to help.",
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Have a question or feedback? We&apos;d love to hear from you. Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Issue</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground mb-1">
                  <a href="mailto:support@mointerview.com" className="hover:text-foreground transition-colors">
                    support@mointerview.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  For general inquiries and support
                </p>
                <p className="text-muted-foreground mt-3 mb-1">
                  <a href="mailto:partnerships@mointerview.com" className="hover:text-foreground transition-colors">
                    partnerships@mointerview.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  For partnership and business inquiries
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Phone className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                    +1 (234) 567-890
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available Monday - Friday, 9AM - 6PM EST
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Office Address</h3>
                <p className="text-muted-foreground">
                  MoInterview, Inc.<br />
                  123 Tech Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday - Sunday: Closed<br />
                  <span className="text-sm mt-2 block">
                    Response time: 24-48 hours
                  </span>
                </p>
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Quick Help</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-primary hover:underline">
                    FAQ & Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Booking Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Video Tutorial Library
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
        <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "How quickly will I get a response?",
              answer: "We typically respond to all inquiries within 24-48 hours during business hours."
            },
            {
              question: "What if I need urgent help?",
              answer: "For urgent matters, please call our support line during business hours or email us with 'URGENT' in the subject line."
            },
            {
              question: "Do you offer live chat support?",
              answer: "Yes, live chat is available on our website during business hours (9 AM - 6 PM EST)."
            },
            {
              question: "Can I schedule a call with someone?",
              answer: "Absolutely! Contact us and we can arrange a call to discuss your specific needs."
            },
          ].map((item, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3">{item.question}</h3>
              <p className="text-muted-foreground text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
