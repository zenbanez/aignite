import Link from "next/link";
import Image from "next/image";

const resources = [
  {
    id: 1,
    title: "DepEd Order 003 s. 2026",
    description: "Foundational Guidelines on Artificial Intelligence in Basic Education. Download the official memo directly from the DepEd portal.",
    link: "https://www.deped.gov.ph/2026/02/20/february-20-2026-do-003-s-2026-foundational-guidelines-on-artificial-intelligence-ai-in-basic-education/",
    isExternal: true,
    actionText: "Download Official Memo ↗",
    bannerClass: "bg-stone-800"
  },
  {
    id: 2,
    title: "The Humanist Prompt Bank",
    description: "A curated collection of 50+ safe, effective AI prompts designed specifically for Filipino teachers to streamline lesson prep.",
    link: "/launch",
    isExternal: false,
    actionText: "Explore Prompts →",
    bannerClass: "bg-[#00464a]"
  },
  {
    id: 3,
    title: "MELC Alignment Framework",
    description: "Copy-paste templates to ensure your AI-generated activities strictly align with the Most Essential Learning Competencies.",
    link: "/launch",
    isExternal: false,
    actionText: "Get Templates →",
    bannerClass: "bg-[#744f00]"
  },
  {
    id: 4,
    title: "Student Privacy Checklist",
    description: "A quick 5-point checklist to verify you aren't leaking PII or violating data privacy when using generative AI tools.",
    link: "/launch",
    isExternal: false,
    actionText: "View Checklist →",
    bannerClass: "bg-stone-600"
  },
  {
    id: 5,
    title: "AI-Resistant Assessments",
    description: "Strategies for designing performance tasks and rubrics that require authentic human experience and critical thinking.",
    link: "/launch",
    isExternal: false,
    actionText: "Learn Strategies →",
    bannerClass: "bg-[#006064]"
  },
  {
    id: 6,
    title: "Teacher Wellbeing Tracker",
    description: "Interactive tools to log your hours saved using AI and manage digital boundaries effectively.",
    link: "/wellbeing",
    isExternal: false,
    actionText: "Access Tracker →",
    bannerClass: "bg-stone-700"
  }
];

export default function ResourcesPage() {
  return (
    <div className="bg-surface min-h-screen py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Ebook Promo Banner */}
        <div className="mb-12 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl p-8 lg:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">New Release</span>
            <h2 className="text-3xl lg:text-4xl font-serif font-black mb-4 leading-tight">Master DepEd Order 003.</h2>
            <p className="text-white/90 text-lg font-body leading-relaxed">
              Stop guessing how to implement AI safely. Get the comprehensive, step-by-step guide written specifically for Filipino public school teachers.
            </p>
          </div>
          <Link href="/launch" className="shrink-0 bg-white text-primary px-8 py-4 rounded-xl font-bold tracking-wide uppercase text-sm shadow-md hover:shadow-xl transition-all text-center">
            Get the Ebook
          </Link>
        </div>

        <h1 className="text-5xl font-black text-primary mb-12">Resources Hub</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((res) => (
            <div key={res.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
              {/* Small Banner Photo / Color Block */}
              <div className={`h-32 w-full ${res.bannerClass} relative flex items-center justify-center overflow-hidden`}>
                 <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                 {res.id === 1 && <Image src="/old and new.png" alt="Official Documents" fill className="object-cover" />}
                 {res.id === 2 && <Image src="/pen table.png" alt="Prompt Interface" fill className="object-cover" />}
                 {res.id === 5 && <Image src="/serene desk.png" alt="Assessment Strategy" fill className="object-cover" />}
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary mb-3">{res.title}</h3>
                <p className="text-on-surface-variant mb-8 text-sm leading-relaxed flex-grow">{res.description}</p>
                
                {res.isExternal ? (
                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                    {res.actionText}
                  </a>
                ) : (
                  <Link href={res.link} className="text-primary font-bold text-sm flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                    {res.actionText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
