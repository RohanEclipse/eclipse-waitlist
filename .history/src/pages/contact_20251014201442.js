import Header from "@/components/header";
import Head from "next/head";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Eclipse</title>
      </Head>

      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/chicago4.JPG')" }}
      >
        <Header />
        {/* Dark overlay */}
        <div className="absolute inset-0 backdrop-brightness-50 z-0" />

        {/* Content */}
        <main className="relative z-10 px-6 text-white font-obv-light min-h-screen flex flex-col items-center justify-center text-center space-y-12 pb-10">
          <h1 className="text-5xl font-ekl font-semibold tracking-wide mb-4">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-xl">
            Need help or have general inquiries?
          </p>

          {/* Contact Info Box */}
          <div className="w-full lg:w-1/2 bg-[#1D225B]/60 p-8 rounded-lg backdrop-blur-md shadow-lg space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 font-ekl">General Inquiries</h2>
              <a
                href="mailto:hello@theeclipseapp.com"
                className="underline text-white/80 hover:text-white text-lg"
              >
                hello@theeclipseapp.com
              </a>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 font-ekl">Safety or Reporting Concerns</h2>
              <a
                href="mailto:safety@theeclipseapp.com"
                className="underline text-white/80 hover:text-white text-lg"
              >
                safety@theeclipseapp.com
              </a>
            </div>
          </div>

          {/* Social Section */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-ekl tracking-wide">Stay Updated</h2>

            <div className="flex justify-center space-x-8 items-center">
              <a
                href="https://instagram.com/theeclipseapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaInstagram size={36} />
              </a>

              <a
                href="https://www.tiktok.com/@theeclipseapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaTiktok size={36} />
              </a>

              <a
                href="mailto:hello@theeclipseapp.com"
                className="hover:text-gray-300 transition"
              >
                <FaEnvelope size={36} />
              </a>
            </div>

            <div className="space-y-1 text-white/80">
              <p>Instagram: @theeclipseapp</p>
              <p>TikTok: @theeclipseapp</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}