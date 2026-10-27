import React, { useState } from 'react';
import { BookOpenCheck, CheckCircle2, ClipboardCopy, ExternalLink, Lightbulb } from 'lucide-react';
import type { NextStepInsightEntry } from '../data/nextStepInsights';

interface Props {
  entry: NextStepInsightEntry;
  variant?: 'chat' | 'sofia' | 'daniel';
  showQuestion?: boolean;
}

/** Evidence-linked, user-actionable insight. Opening an official page is not an application or appointment. */
export function NextStepInsightCard({ entry, variant = 'sofia', showQuestion = false }: Props) {
  const [copyFeedback, setCopyFeedback] = useState('');
  const dark = variant === 'chat';
  const indigo = variant === 'daniel';
  const base = dark
    ? 'border-teal-700/70 bg-slate-900/80 text-slate-100'
    : indigo
      ? 'border-indigo-200 bg-indigo-50 text-slate-900'
      : 'border-emerald-200 bg-emerald-50 text-slate-900';
  const emphasis = dark ? 'text-teal-200' : indigo ? 'text-indigo-900' : 'text-emerald-950';
  const sourceText = dark ? 'text-teal-200 hover:text-white' : indigo ? 'text-indigo-800 hover:text-indigo-950' : 'text-emerald-800 hover:text-emerald-950';
  const link = entry.sources[0];
  const copySafeSummary = async () => {
    const safeText = [
      'WhatSack — NextStep Insights (fictional prototype)',
      'Things to keep in mind: ' + entry.insight,
      'Suggested next action: ' + entry.actionLabel,
      'Official starting points:',
      ...entry.sources.map(source => source.title + ' — ' + source.url),
      'Check current details with the official organization. No personal information included.',
    ].join('\n');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(safeText);
      setCopyFeedback('Action checklist copied — no private information included.');
    } catch {
      setCopyFeedback('Automatic copying is unavailable here. You can still open the source links below.');
    }
  };
  const actionIsCopy = entry.id === 'D7.5';
  return (
    <article className={'rounded-xl border p-4 space-y-3 ' + base} aria-label={'NextStep Insight: ' + entry.actionLabel}>
      <div className={'flex gap-2 items-center font-extrabold text-sm ' + emphasis}>
        <Lightbulb size={17} aria-hidden="true"/>
        Things to Keep in Mind
      </div>
      {showQuestion && <p className={'text-xs font-semibold ' + (dark ? 'text-slate-300' : 'text-slate-600')}>You asked: {entry.question}</p>}
      <p className="text-sm leading-relaxed">{entry.insight}</p>
      <div className={'rounded-lg border p-3 ' + (dark ? 'border-slate-700 bg-slate-800/90' : 'border-white bg-white/80')}>
        <p className={'flex gap-2 items-center text-xs font-bold ' + emphasis}>
          <CheckCircle2 size={15} aria-hidden="true"/> Suggested next action
        </p>
        <p className="mt-1 text-sm font-semibold">{entry.actionLabel}</p>
      </div>
      {actionIsCopy ? (
        <button type="button" onClick={()=>{void copySafeSummary();}}
          className={'inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-3 py-2 text-xs font-extrabold ' +
            (dark ? 'border-teal-500 text-teal-100 hover:bg-slate-800' : 'border-indigo-300 bg-white text-indigo-800 hover:bg-indigo-100')}>
          <ClipboardCopy size={15} aria-hidden="true"/> Copy a private-data-free checklist
        </button>
      ) : link ? (
        <a href={link.url} target="_blank" rel="noopener noreferrer"
          className={'inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-3 py-2 text-xs font-extrabold ' +
            (dark ? 'border-teal-500 text-teal-100 hover:bg-slate-800' : 'border-slate-300 bg-white ' + sourceText)}>
          <BookOpenCheck size={15} aria-hidden="true"/> Open official guidance <ExternalLink size={14} aria-hidden="true"/>
        </a>
      ) : null}
      {copyFeedback && <p role="status" className="text-xs font-semibold">{copyFeedback}</p>}
      {entry.sources.length > 0 && (
        <div className={'text-xs ' + (dark ? 'text-slate-300' : 'text-slate-700')}>
          <span className="font-bold">Research starting {entry.sources.length === 1 ? 'point' : 'points'}: </span>
          {entry.sources.map((source,index) => (
            <React.Fragment key={source.url}>
              {index > 0 && ' · '}
              <a className={'underline underline-offset-2 ' + sourceText} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
            </React.Fragment>
          ))}
        </div>
      )}
      <p className={'text-[11px] leading-relaxed ' + (dark ? 'text-slate-400' : 'text-slate-600')}>
        Scripted research demo (sources compiled October 2026). Verify eligibility, dates, costs and availability with the provider. Opening a link does not submit an application.
      </p>
    </article>
  );
}
