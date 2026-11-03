import React from "react";
import { ExternalLink, GitPullRequest } from "lucide-react";
import OogaCavemanIcon from "@/components/OogaCavemanIcon";
import OogaPalmTreeIcon from "@/components/OogaPalmTreeIcon";

export const OOGA_REPO = "https://github.com/OogaBoogaX/oogaboogaland";
export const OOGA_SITE = "https://oogabooga.land";

export default function OogaHero() {
  return (
    <div className="pb-14">
      <div className="flex items-center gap-3 mb-2">
        <OogaCavemanIcon className="h-12 w-12 md:h-14 md:w-14 shrink-0" />
        <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
          Ooga Booga Land
        </h1>
        <OogaPalmTreeIcon className="h-10 w-10 md:h-12 md:w-12 shrink-0" />
      </div>
      <p className="font-heading text-lg text-lead italic mb-3">
        A floating island of caves, cavemen and arcade games — and one small file that puts you on it.
      </p>
      <div className="w-12 h-px bg-[#B45309]" />

      <div className="mt-6 space-y-4 font-body text-base text-lead leading-relaxed">
        <p>
          Ooga Booga Land is a free 3D island you fly around in your browser. Its cliff caves hold real
          projects, its arcade holds games, and the weather is the live Bitcoin mempool. It is built in
          plain JavaScript by the OogaBoogaX community, with no frameworks and no dependencies.
        </p>
        <p>
          Every voxel caveman standing on that island is a real contributor. Feed one a banana and it
          perks up. Your own caveman can be up there too — and you do not need to be a programmer to
          make one. If you can copy and paste, describe a character, and click a few buttons on GitHub,
          you can do this.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-7">
        <a
          href={OOGA_SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase px-5 py-3 rounded-sm border border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white transition-colors duration-300"
        >
          Visit the island <ExternalLink size={13} />
        </a>
        <a
          href={OOGA_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase px-5 py-3 rounded-sm border border-border text-lead hover:text-ink hover:border-[#B45309] transition-colors duration-300"
        >
          <GitPullRequest size={14} /> GitHub repository
        </a>
      </div>

      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/50 mt-4 flex items-center gap-1.5">
        <ExternalLink size={11} /> Third-party site & repository — open in a new window
      </p>
    </div>
  );
}