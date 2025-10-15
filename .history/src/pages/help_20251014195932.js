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
        <div className="relative z-10 px-6 text-white font-obv-light min-h-screen flex flex-col items-center justify-center gap-8 pb-10">
          {/* Privacy Policy Box */}
          <div className="w-full lg:w-1/2 bg-[#1D225B]/60 p-8 rounded-lg backdrop-blur-md mb-10">
            <h1 className="text-4xl font-semibold mb-6 font-ekl">Privacy Policy</h1>

            <p className="mb-4">
              Eclipse Platforms, Inc. (“Eclipse,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-2">Information We Collect</h2>
            <p className="mb-4">
              We collect personal information
        </div>
      </div>
    </>
  );
}