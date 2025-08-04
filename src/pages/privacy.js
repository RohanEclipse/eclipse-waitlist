import Header from "@/components/header";
import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy & Terms | Eclipse</title>
      </Head>

      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/chicago4.JPG')" }}
      >
        <Header />
        {/* Dark overlay */}
        <div className="absolute inset-0 backdrop-brightness-50 z-0" />

        {/* Content */}
        <div className="relative z-10 px-6 text-white font-obv-light min-h-screen flex flex-col items-center justify-center gap-8 pb-10">          {/* Privacy Policy Box */}
          <div className="w-full lg:w-1/2 bg-[#1D225B]/60 p-8 rounded-lg backdrop-blur-md mb-10">
            <h1 className="text-4xl font-semibold mb-6 font-ekl">Privacy Policy</h1>

            <p className="mb-4">
              Eclipse Platforms, Inc. (“Eclipse,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">Information We Collect</h2>
            <p className="mb-4">
              We collect personal information, including your phone number, when you register for Eclipse or opt in to receive text message notifications.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">Use of Information</h2>
            <p className="mb-4">
              Your phone number is used solely for account verification and to deliver messages related to your use of the Eclipse platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">No Sharing of Mobile Information</h2>
            <p className="mb-4">
              We do not share, sell, or rent mobile subscriber information with third parties or affiliates for marketing or promotional purposes. Your mobile information will be kept confidential and used only for Eclipse’s internal operations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">Security</h2>
            <p className="mb-4">
              We implement reasonable safeguards to protect your personal data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">Contact Us</h2>
            <p>
              For questions about this policy, email us at:{" "}
              <a
                href="mailto:hello@theeclipseapp.com"
                className="underline text-white/80 hover:text-white"
              >
                hello@theeclipseapp.com
              </a>
            </p>
          </div>

          {/* Terms of Use Box */}
          <div className="w-full lg:w-1/2 bg-[#1D225B]/60 p-8 rounded-lg backdrop-blur-md mb-10">
            <h1 className="text-4xl font-semibold mb-6 font-ekl">Terms of Use</h1>

            <p className="text-sm mb-4 italic">Effective Date: July 30, 2025</p>

            <p className="mb-4">
              These Terms of Use (“Terms”) govern your use of the Eclipse platform, website, mobile application, and any associated services (“Platform”), operated by Eclipse Platforms, Inc. (“Eclipse,” “we,” “us,” or “our”).
            </p>

            <p className="mb-4">
              By accessing or using Eclipse, you agree to be bound by these Terms. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">1. Eligibility</h2>
            <p className="mb-4">
              You must be at least 18 years old to use Eclipse. By using the Platform, you confirm that you meet this requirement.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">2. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc list-inside mb-4 space-y-1 text-white/90">
              <li>Violate any laws or regulations while using Eclipse.</li>
              <li>Harass, impersonate, or harm other users.</li>
              <li>Interfere with or disrupt the Platform’s security or functionality.</li>
              <li>Use the Platform for commercial purposes without our prior consent.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-2">3. Account Registration</h2>
            <p className="mb-4">
              When registering, you agree to provide accurate information. You are responsible for maintaining the confidentiality of your account and for all activity under it.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">4. SMS & Communication Consent</h2>
            <p className="mb-4">
              By creating an account or joining the waitlist, you consent to receive text messages from Eclipse for account verification, platform updates, and user notifications.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 text-white/90">
              <li>Message and data rates may apply.</li>
              <li>Message frequency may vary.</li>
              <li>Reply “STOP” to opt out, “HELP” for assistance.</li>
              <li>We use third-party services such as Twilio to facilitate these communications.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-2">5. Intellectual Property</h2>
            <p className="mb-4">
              All content, trademarks, and features of the Eclipse Platform are the property of Eclipse Platforms, Inc. or its licensors. You may not copy, use, or distribute any materials without prior written consent.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">6. Termination</h2>
            <p className="mb-4">
              We may suspend or terminate your access to Eclipse at any time, without notice, if we believe you’ve violated these Terms or engaged in harmful conduct.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">7. Disclaimers</h2>
            <p className="mb-4">
              The Eclipse Platform is provided “as is” and “as available.” We do not guarantee uninterrupted service or that the Platform will be error-free.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, Eclipse is not liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">9. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by the laws of the State of Delaware, without regard to its conflict of laws principles.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">10. Changes to These Terms</h2>
            <p className="mb-4">
              We may modify these Terms at any time. Changes will be posted to this page with an updated effective date. Continued use of Eclipse after changes means you accept the revised Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">11. Contact Us</h2>
            <p>
              For questions about these Terms, email us at:{" "}
              <a
                href="mailto:hello@theeclipseapp.com"
                className="underline text-white/80 hover:text-white"
              >
                hello@theeclipseapp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}