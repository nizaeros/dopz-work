import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { routineInputMigrationService } from '../../services/routine-input/data-migration.service';

export const DataMigrationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    sourceCount?: number;
    targetCount?: number;
    isComplete?: boolean;
  }>({});

  const handleMigration = async () => {
    try {
      setLoading(true);
      setError(null);

      // Run migration
      const { success, count } = await routineInputMigrationService.migrateFromClientInputs();
      
      if (success) {
        // Verify migration
        const verificationResult = await routineInputMigrationService.verifyMigration();
        setResult(verificationResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Migration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Data Migration: Client Inputs to Routine Inputs
        </h1>

        <div className="space-y-6">
          {/* Status Display */}
          {result.sourceCount !== undefined && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Source Records</p>
                  <p className="text-2xl font-semibold text-gray-900">{result.sourceCount}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Migrated Records</p>
                  <p className="text-2xl font-semibold text-gray-900">{result.targetCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {result.isComplete ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                <span className="text-sm font-medium">
                  {result.isComplete 
                    ? 'Migration completed successfully' 
                    : 'Migration incomplete or pending'}
                </span>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleMigration}
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Migrating Data...' : 'Start Migration'}
          </Button>
        </div>
      </div>
    </div>
  );
};