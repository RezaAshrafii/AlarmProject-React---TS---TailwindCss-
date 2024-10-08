import React, { useState, useEffect } from "react";
import ReminderForm from "./components/ReminderForm";
import ReminderList from "./components/ReminderList";
import { Reminder } from "./components/Reminder";
import AlertModal from "./components/AlertModal";

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [sortBy, setSortBy] = useState<"time" | "title">("time");
  const [alertReminder, setAlertReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        if (new Date(reminder.time) == now && !reminder.alerted) {
          setAlertReminder(reminder);
          setReminders((prev) =>
            prev.map((r) =>
              r.id === reminder.id ? { ...r, alerted: true } : r
            )
          );
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [reminders]);

  const addReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
  };

  const updateReminder = (updatedReminder: Reminder) => {
    setReminders(
      reminders.map((r) => (r.id === updatedReminder.id ? updatedReminder : r))
    );
    setEditingReminder(null);
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const sortReminders = (reminders: Reminder[]) => {
    return reminders.sort((a, b) => {
      if (sortBy === "time") {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const handleCloseAlert = () => {
    setAlertReminder(null);
  };

  const handleSnooze = (minutes: number) => {
    if (alertReminder) {
      const newTime = new Date(
        new Date(alertReminder.time).getTime() + minutes * 60000
      );
      updateReminder({
        ...alertReminder,
        time: newTime.toISOString(),
        alerted: false,
      });
    }
    setAlertReminder(null);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-start p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-white text-center shadow-text">
        Colorful Reminder App
      </h1>
      <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <ReminderForm
          onSubmit={addReminder}
          editingReminder={editingReminder}
          onUpdate={updateReminder}
        />
        <div className="mt-4 mb-2">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "time" | "title")}
            className="p-2 rounded border"
          >
            <option value="time">Time</option>
            <option value="title">Title</option>
          </select>
        </div>
        <ReminderList
          reminders={sortReminders(reminders)}
          onDelete={deleteReminder}
          onEdit={setEditingReminder}
        />
      </div>
      {alertReminder && (
        <AlertModal
          reminder={alertReminder}
          onClose={handleCloseAlert}
          onSnooze={handleSnooze}
          onDelete={() => {
            deleteReminder(alertReminder.id);
            setAlertReminder(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
