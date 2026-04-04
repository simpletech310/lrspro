'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className={`font-semibold pr-8 ${open === i ? 'text-[#0A1628]' : 'text-slate-700'}`}>
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180 text-[#C9A84C]' : ''}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${open === i ? 'max-h-96 pb-5' : 'max-h-0'}`}
          >
            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
