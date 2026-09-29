"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Info, CheckCircle2 } from "lucide-react";

interface LabImageProps {
  src: string;
  alt: string;
  caption: string;
  placeholderGuide: string;
  suggestedFileName: string;
}

export default function LabImage({
  src,
  alt,
  caption,
  placeholderGuide,
  suggestedFileName,
}: LabImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="my-5 space-y-2">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xs transition-all">
        {!hasError ? (
          <div className="relative w-full bg-white flex items-center justify-center p-2">
            {/* Standard img tag so dynamic file addition in public/ works directly without build-time image dimensions */}
            <img
              src={src}
              alt={alt}
              className="max-h-[460px] w-auto max-w-full rounded-xl object-contain mx-auto"
              onError={() => setHasError(true)}
              loading="lazy"
            />
          </div>
        ) : (
          /* Modern Soft Placeholder if file doesn't exist yet */
          <div className="p-6 sm:p-8 border-2 border-dashed border-sky-200 bg-sky-50/40 rounded-2xl flex flex-col items-center text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
              <ImageIcon className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800">
                [Placeholder Screenshot Laboratorium]
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                {placeholderGuide}
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 shadow-xs">
              <span className="text-slate-400">Lokasi simpan file:</span>
              <span className="font-bold text-sky-600">
                public/images/cloud-computing/pertemuan-1/{suggestedFileName}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              💡 Cukup letakkan file screenshot dengan nama di atas, gambar akan otomatis tampil di sini.
            </p>
          </div>
        )}
      </div>

      <figcaption className="text-center text-xs text-slate-500 italic">
        {caption}
      </figcaption>
    </figure>
  );
}
