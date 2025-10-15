import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";

export default function Safety() {
  return (
    <>
      <Head>
        <title>Help | Eclipse</title>
      </Head>

      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/chicago4.JPG')" }}
      >
        <Header />
        {/* Dark overlay */}
        <div className="absolute inset-0 backdrop-brightness-50 z-0" />

        {/* Content */}
        <main className="relative z-10 px-6 text-white font-obv-light min-h-screen flex flex-col items-center justify-center gap-8 pb-10">

          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8">

          <Link
              href="/pdfs/Eclipse Safety Resources & FAQ Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block group focus:outline-none"
            >
              <div
                className="w-full h-full bg-[#1D225B]/60 p-8 rounded-lg backdrop-blur-md ring-1 ring-white/10
                           transition transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30
                           focus-visible:ring-2 focus-visible:ring-white/60"
                role="button"
                aria-label="Open Eclipse Safety PDF in a new tab"
              >
                <h2 className="text-3xl font-semibold mb-3 font-ekl">Eclipse Safety</h2>
                <p className="text-white/90">
                  Community guidelines, reporting tools, and safety resources.
                </p>
                <div className="mt-6 inline-flex items-center text-white/90 group-hover:text-white">
                  <span className="underline">Open PDF</span>
                  <svg
                    className="ml-2 h-5 w-5 transition transform group-hover:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M13.5 4.5H21m0 0v7.5M21 4.5l-9 9M8.25 6.75H6A2.25 2.25 0 003.75 9v9A2.25 2.25 0 006 20.25h9A2.25 2.25 0 0017.25 18v-2.25" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}