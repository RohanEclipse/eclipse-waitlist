// components/Footer.tsx
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="h-[25vh] w-full bg-[#3C3E55] text-white flex flex-col items-center justify-center space-y-4 font-obv-light text-center px-4">
      <h2 className="text-3xl lg:text-4xl font-ekl tracking-wide">Stay in the Loop</h2>
      
      <div className="flex space-x-6 items-center">
        <a href="https://instagram.com/theeclipseapp" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaInstagram size={32} />
        </a>
        <a href="https://www.tiktok.com/@its_eclipse_" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaTiktok size={32} />
        </a>
        <a href="mailto:hello@theeclipseapp.com" className="hover:text-gray-300">
          <FaEnvelope size={32} />
        </a>
      </div>

      <p className="text-sm sm:text-base">hello@theeclipseapp.com</p>
      <p className="text-xs text-white/60 mt-1 flex flex-row items-center gap-1">
      <Link href="/help" className="underline hover:text-white/80">About</Link>
      <Link href="/safety" className="underline hover:text-white/80">| Safety</Link>
      <Link href="/contact" className="underline hover:text-white/80">| Contact</Link>
      <Link href="/legal" className="underline hover:text-white/80">Privacy Policy & Terms</Link>



      <span>| © Eclipse Platforms, Inc.</span>
      </p>
        
    </footer>
  );
}