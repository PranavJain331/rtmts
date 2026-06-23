import React from 'react';
import { Alert } from '../types';
import { X, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface AlertPanelProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onDismiss }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {alerts.map((alert) => {
        const isError = alert.type === 'error';
        const isWarning = alert.type === 'warning';

        return (
          <div
            key={alert.id}
            className={`flex items-start p-4 rounded-lg border shadow-lg ${
              isError ? 'bg-red-950/50 border-red-500/50 text-red-200' :
              isWarning ? 'bg-orange-950/50 border-orange-500/50 text-orange-200' :
              'bg-cyan-950/50 border-cyan-500/50 text-cyan-200'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {isError && <AlertTriangle className="w-5 h-5 text-red-500" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-orange-500" />}
              {!isError && !isWarning && <Info className="w-5 h-5 text-cyan-500" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-70 mt-1">{new Date(alert.timestamp).toLocaleTimeString()}</p>
            </div>
            <button
              onClick={() => onDismiss(alert.id)}
              className="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
