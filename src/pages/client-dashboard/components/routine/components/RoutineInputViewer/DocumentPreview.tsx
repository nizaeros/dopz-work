import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';

interface DocumentPreviewProps {
  url: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ url }) => {
  const [zoom, setZoom] = useState(100);
  const fileType = url.split('.').pop()?.toLowerCase();

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const renderPreview = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <iframe
            src={`${url}#view=FitH`}
            className="w-full h-full"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <img
            src={url}
            alt="Document preview"
            className="max-w-full h-auto"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          />
        );
      case 'xlsx':
      case 'xls':
      case 'doc':
      case 'docx':
        return (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <p className="text-gray-500">
              Preview not available. Please download to view.
            </p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <p className="text-gray-500">Unsupported file format</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-600">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
        <a
          href={url}
          download
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900"
        >
          <Download className="h-4 w-4" />
          Download
        </a>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-4">
        {renderPreview()}
      </div>
    </div>
  );
};