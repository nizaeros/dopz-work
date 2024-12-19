import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { DocumentPreview } from './DocumentPreview';
import { DocumentList } from './DocumentList';
import { InputDetails } from './InputDetails';
import { ActivityTab } from './ActivityTab';
import { StatusActions } from './StatusActions';
import type { RoutineInput } from '../../types';

interface RoutineInputViewerProps {
  input: RoutineInput;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const RoutineInputViewer: React.FC<RoutineInputViewerProps> = ({
  input,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details');
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string>(input.documents?.[0]?.url);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm">
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {input.docCode}
            </h2>
            <div className="flex items-center gap-2">
              <StatusActions input={input} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Document Preview (70%) */}
          <div className="w-[70%] border-r border-gray-200">
            <DocumentPreview url={selectedDocumentUrl} />
          </div>

          {/* Sidebar (30%) */}
          <div className="w-[30%] flex flex-col">
            {/* Document List */}
            <div className="border-b border-gray-200">
              <DocumentList
                documents={input.documents}
                selectedUrl={selectedDocumentUrl}
                onSelect={setSelectedDocumentUrl}
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'activity'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Activity
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'details' ? (
                <InputDetails input={input} />
              ) : (
                <ActivityTab inputId={input.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};