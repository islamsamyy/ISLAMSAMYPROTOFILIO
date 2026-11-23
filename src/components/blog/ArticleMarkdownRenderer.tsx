'use client';

import React from 'react';

interface ArticleMarkdownRendererProps {
  content: string;
  productionLabel?: string;
}

function renderInline(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={idx} className="text-on-surface font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={idx}
          dir="ltr"
          className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-surface-container-highest/90 text-secondary font-mono text-[0.85em] border border-outline-variant/20"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

function parseTable(lines: string[]): { headers: string[]; rows: string[][] } | null {
  if (lines.length < 2) return null;
  const parseRow = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const headers = parseRow(lines[0]);
  const separator = lines[1].trim();
  if (!/^\|?[\s:-]+\|/.test(separator)) return null;

  const rows = lines.slice(2).map(parseRow);
  return { headers, rows };
}

export function ArticleMarkdownRenderer({
  content,
  productionLabel = 'Production Architecture',
}: ArticleMarkdownRendererProps) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-5 text-on-surface-variant leading-relaxed">
      {blocks.map((rawBlock, idx) => {
        const block = rawBlock.trim();
        if (!block) return null;

        if (block === '---' || block === '***') {
          return <hr key={idx} className="border-t border-surface-container-high/70 my-6" />;
        }

        if (block.startsWith('# ')) {
          return (
            <h2
              key={idx}
              className="font-display-xl text-2xl sm:text-3xl font-extrabold text-on-surface mt-6 mb-3"
            >
              {renderInline(block.slice(2))}
            </h2>
          );
        }

        if (block.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="font-display-xl text-xl sm:text-2xl font-extrabold text-on-surface pt-3 border-b border-surface-container-high/50 pb-2 mt-7 mb-3"
            >
              {renderInline(block.slice(3))}
            </h2>
          );
        }

        if (block.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className="font-display-xl text-lg sm:text-xl font-bold text-primary mt-6 mb-2"
            >
              {renderInline(block.slice(4))}
            </h3>
          );
        }

        if (block.startsWith('```')) {
          const lines = block.split('\n');
          const lang = lines[0].replace('```', '').trim() || 'sql';
          const code = lines.slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined).join('\n');
          return (
            <div
              key={idx}
              dir="ltr"
              className="my-5 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/30 overflow-hidden shadow-inner text-left"
            >
              <div className="px-4 py-2 bg-surface-container-high/60 border-b border-outline-variant/20 flex items-center justify-between">
                <span className="font-mono text-xs text-secondary font-bold uppercase">{lang}</span>
                <span className="text-[10px] text-on-surface-variant font-mono">{productionLabel}</span>
              </div>
              <pre className="p-4 sm:p-5 text-secondary font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed text-left">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        const lines = block.split('\n');

        // Markdown table
        if (lines.length >= 2 && lines[0].trim().startsWith('|')) {
          const table = parseTable(lines);
          if (table) {
            return (
              <div
                key={idx}
                className="my-5 overflow-x-auto rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60"
              >
                <table className="w-full text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/70 border-b border-outline-variant/30">
                      {table.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-3 text-start font-bold text-on-surface whitespace-nowrap"
                        >
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface-container-high/30 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-on-surface-variant align-top">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Blockquote
        if (lines.every((l) => l.trim().startsWith('>'))) {
          const quoteText = lines.map((l) => l.trim().replace(/^>\s?/, '')).join(' ');
          return (
            <blockquote
              key={idx}
              className="my-4 p-4 sm:p-5 rounded-2xl bg-primary/10 border-s-4 border-primary text-on-surface text-sm sm:text-base leading-relaxed"
            >
              {renderInline(quoteText)}
            </blockquote>
          );
        }

        // Unordered or ordered list (possibly preceded by a single heading/intro line)
        const isListLine = (l: string) => /^(\s*[-*]\s+|\s*\d+\.\s+)/.test(l);
        if (lines.every(isListLine) || (lines.length > 1 && lines.slice(1).every(isListLine))) {
          const hasIntro = !isListLine(lines[0]);
          const introLine = hasIntro ? lines[0] : null;
          const listLines = hasIntro ? lines.slice(1) : lines;
          const isOrdered = /^\s*\d+\.\s+/.test(listLines[0]);

          const ListTag = isOrdered ? 'ol' : 'ul';
          return (
            <div key={idx} className="space-y-2">
              {introLine && (
                <p className="text-on-surface font-semibold text-sm sm:text-base">
                  {renderInline(introLine)}
                </p>
              )}
              <ListTag
                className={`space-y-2 ps-5 ${
                  isOrdered ? 'list-decimal' : 'list-disc'
                } marker:text-primary text-sm sm:text-base`}
              >
                {listLines.map((item, iIdx) => {
                  const cleanItem = item.replace(/^(\s*[-*]\s+|\s*\d+\.\s+)/, '');
                  return (
                    <li key={iIdx} className="text-on-surface-variant leading-relaxed">
                      {renderInline(cleanItem)}
                    </li>
                  );
                })}
              </ListTag>
            </div>
          );
        }

        return (
          <p key={idx} className="text-on-surface-variant leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
