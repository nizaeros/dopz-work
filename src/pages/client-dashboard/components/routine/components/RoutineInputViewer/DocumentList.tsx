import React from 'react';
import { File, Trash2, Upload } from 'lucide-react';

interface Document {
  id: string;
  url: string;
  name: string;
  type: string;
}

interface DocumentListProps {
  documents?: Document[];
  selectedUrl?: string;
  onSelect: (url: string) => void;
  onDelete?: (id: string) => void;
  onUpload?: (files: FileList) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents = [],
  selectedUrl,
  onSelect,
  onDelete,
  onUpload
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Documents</h3>
        <label className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary hover:text-primary-dark cursor-pointer">
          <Upload className="h-4 w-4" />
          Upload
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            multiple // Enable multiple file selection
          />
        </label>
      </div>

      {documents.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No documents available</p>
      ) : (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelect(doc.url)}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                selectedUrl === doc.url ? 'bg-primary/5 text-primary' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span className="text-sm truncate">{doc.name}</span>
              </div>
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(doc.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};