import Header from "@/components/header";
import Head from "next/head";


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
        <Footer/>
      </div>
    </>
  );
}