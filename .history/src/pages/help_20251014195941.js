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

        <div className="relative container mx-auto px-4 py-16 z-10">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-lg text-white">
            At Eclipse, we value your privacy. This policy outlines how we collect, use, and protect your information.
          </p>
        </div>
      </div>
    </>
  );
}