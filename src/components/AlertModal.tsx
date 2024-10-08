import React, { useEffect } from "react";
import { Reminder } from "./Reminder";

interface AlertModalProps {
  reminder: Reminder;
  onClose: () => void;
  onSnooze: (minutes: number) => void;
  onDelete: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  reminder,
  onClose,
  onSnooze,
  onDelete,
}) => {
  useEffect(() => {
    const audio = new Audio("/./public/alarm-sound.mp3.mp3");
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Alarm!</h2>
        <p className="text-xl mb-2">{reminder.title}</p>
        <p className="mb-4">{reminder.description}</p>
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Dismiss
          </button>
          <button
            onClick={() => onSnooze(5)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Snooze 5 min
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
