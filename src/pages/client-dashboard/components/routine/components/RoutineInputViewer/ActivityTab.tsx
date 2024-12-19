import React from 'react';
import { useRoutineInputActivity } from '../../hooks/useRoutineInputActivity';
import { formatDate } from '../../../../../../utils/date';

interface ActivityTabProps {
  inputId: string;
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ inputId }) => {
  const { activities, loading } = useRoutineInputActivity(inputId);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                {/* Render the icon as a JSX element */}
                {React.createElement(activity.icon, {
                  className: "h-5 w-5 text-gray-500"
                })}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.user} • {formatDate(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};