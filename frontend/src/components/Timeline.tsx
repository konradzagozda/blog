import { CommandLineIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { type ReactElement } from "react";

type TimelineItemType = "article" | "project";

interface TimelineItemProps {
  isFirst: boolean;
  isLast: boolean;
  date: string;
  title: string;
  description: string;
  type: TimelineItemType;
}

function TimelineItem({
  isFirst,
  isLast,
  date,
  title,
  description,
  type,
}: TimelineItemProps): ReactElement {
  return (
    <div className="flex gap-4 items-start">
      {/* Date on left */}
      <div className="w-24 pt-1 text-right text-sm text-gray-600">{date}</div>

      {/* Line and Icon */}
      <div className="flex flex-col items-center">
        <div
          className={`w-px bg-blue-300 ${
            isFirst ? "h-8 translate-y-4" : "h-full -translate-y-6"
          }`}
        />
        <div
          className={`rounded-full p-2 border-2 border-white shadow
          ${type === "article" ? "bg-blue-500" : "bg-purple-500"}`}
        >
          {type === "article" ? (
            <DocumentIcon className="w-5 h-5 text-white" />
          ) : (
            <CommandLineIcon className="w-5 h-5 text-white" />
          )}
        </div>
        <div
          className={`w-px bg-blue-300 ${
            isLast ? "h-8" : "h-full translate-y-6"
          }`}
        />
      </div>

      {/* Content on right */}
      <div className="flex-1 pb-12">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}

interface TimelineProps {
  items: {
    date: string;
    title: string;
    description: string;
    type: TimelineItemType;
  }[];
}

export function Timeline({ items }: TimelineProps): ReactElement {
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          {...item}
        />
      ))}
    </div>
  );
}
