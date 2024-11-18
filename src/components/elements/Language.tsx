"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Language() {
  const [language, setLanguage] = useState("Vietnamese");

  const languages = new Map([
    ["Vietnamese", "/icons/vn-flag.svg"],
    ["English", "/icons/usa-flag.svg"],
  ]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src={languages.get(language) || "/icons/vn-flag.svg"}
            alt={`${language} flag`}
            width={24}
            height={16}
            className="w-12 h-8"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          {[...languages.keys()].map((lang) => (
            <div
              key={lang}
              onClick={() => setLanguage(lang)}
              className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md"
            >
              <Image
                src={languages.get(lang) || ""}
                alt={`${lang} flag`}
                width={24}
                height={16}
                className="w-12 h-8"
              />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
