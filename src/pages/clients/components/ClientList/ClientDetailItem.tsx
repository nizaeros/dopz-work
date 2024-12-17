import React from 'react';
import { Copy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ClientDetailItemProps {
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: () => void;
  icon?: LucideIcon;
  className?: string;
}

export const ClientDetailItem: React.FC<ClientDetailItemProps> = ({
  label,
  value,
  copyable,
  onCopy,
  icon: Icon,
  className = '',
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-gray-400 flex-shrink-0" />}
        <span className={`text-sm ${className}`}>{value}</span>
        {copyable && (
          <button
            onClick={onCopy}
            className="ml-1 p-1 text-gray-400 hover:text-primary hover:bg-gray-50 rounded transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};