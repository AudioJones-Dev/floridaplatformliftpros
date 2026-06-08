import Link from "next/link";
import { siteConfig } from "@/lib/seo/metadata";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-blue-900 border-t-2 border-yellow-400">
      <div className="grid grid-cols-2 divide-x divide-yellow-400">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          aria-label={`Call or text Florida Platform Lift Pros at ${siteConfig.phone}`}
          className="flex flex-col items-center justify-center py-3 text-white font-bold text-sm"
        >
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-0.5 h-5 w-5 text-yellow-400"
          >
            <path d="M19.95 21q-3.125 0-6.175-1.362-3.05-1.363-5.55-3.863-2.5-2.5-3.862-5.55Q3 7.175 3 4.05q0-.45.3-.75.3-.3.75-.3H8.1q.35 0 .625.238.275.237.325.562l.65 3.5q.05.4-.025.675-.075.275-.275.475L7.025 10.55q1.05 1.825 2.638 3.413Q11.25 15.55 13.2 16.7l2.35-2.35q.225-.225.588-.337.362-.113.712-.063l3.45.7q.35.075.575.337.225.263.225.638V20.95q0 .45-.3.75-.3.3-.75.3Z" />
          </svg>
          Call/Text
          <span className="text-yellow-300 text-xs">{siteConfig.phone}</span>
        </a>
        <Link
          href="/book-assessment"
          className="flex flex-col items-center justify-center py-3 text-blue-900 font-bold text-sm bg-yellow-400"
        >
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-0.5 h-5 w-5"
          >
            <path d="M5 21q-.825 0-1.412-.587Q3 19.825 3 19V5q0-.825.588-1.413Q4.175 3 5 3h1V1h2v2h8V1h2v2h1q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V9H5v10ZM5 7h14V5H5Zm0 0V5v2Zm7 6q-.425 0-.712-.288Q11 12.425 11 12t.288-.713Q11.575 11 12 11t.713.287Q13 11.575 13 12t-.287.712Q12.425 13 12 13Zm-4 0q-.425 0-.713-.288Q7 12.425 7 12t.287-.713Q7.575 11 8 11t.713.287Q9 11.575 9 12t-.287.712Q8.425 13 8 13Zm8 0q-.425 0-.712-.288Q15 12.425 15 12t.288-.713Q15.575 11 16 11t.712.287Q17 11.575 17 12t-.288.712Q16.425 13 16 13Zm-4 4q-.425 0-.712-.288Q11 16.425 11 16t.288-.713Q11.575 15 12 15t.713.287Q13 15.575 13 16t-.287.712Q12.425 17 12 17Zm-4 0q-.425 0-.713-.288Q7 16.425 7 16t.287-.713Q7.575 15 8 15t.713.287Q9 15.575 9 16t-.287.712Q8.425 17 8 17Zm8 0q-.425 0-.712-.288Q15 16.425 15 16t.288-.713Q15.575 15 16 15t.712.287Q17 15.575 17 16t-.288.712Q16.425 17 16 17Z" />
          </svg>
          Book Free Assessment
        </Link>
      </div>
    </div>
  );
}
