import React from "react";
import { Reminder } from "./Reminder";

interface ReminderListProps {
  reminders: Reminder[];
  onDelete: (id: string) => void;
  onEdit: (reminder: Reminder) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="space-y-4">
      {reminders.map((reminder) => (
        <li key={reminder.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{reminder.title}</h3>
          <p className="text-gray-600">{reminder.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(reminder.time).toLocaleString("en-GB", {
              timeZone: "Europe/London",
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => onEdit(reminder)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(reminder.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;
