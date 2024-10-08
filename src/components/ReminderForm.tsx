import React, { useState, useEffect } from "react";
import { Reminder } from "./Reminder";

interface ReminderFormProps {
  onSubmit: (reminder: Reminder) => void;
  editingReminder: Reminder | null;
  onUpdate: (reminder: Reminder) => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({
  onSubmit,
  editingReminder,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editingReminder) {
      setTitle(editingReminder.title);
      setDescription(editingReminder.description);
      setTime(editingReminder.time.slice(0, 16));
    }
  }, [editingReminder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReminder) {
      onUpdate({
        ...editingReminder,
        title,
        description,
        time: new Date(time).toISOString(),
      });
    } else {
      onSubmit({
        id: Date.now().toString(),
        title,
        description,
        time: new Date(time).toISOString(),
      });
    }
    setTitle("");
    setDescription("");
    setTime("");
  };

  const isFormValid =
    title.trim() !== "" && description.trim() !== "" && time !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">
          Alarm Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">
          Alarm Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="time" className="block mb-1">
          Alarm Time
        </label>
        <input
          type="datetime-local"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full p-2 rounded ${
          isFormValid
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {editingReminder ? "Update Reminder" : "Add Reminder"}
      </button>
    </form>
  );
};

export default ReminderForm;

// import React, { useState, useEffect } from "react";
// import { Reminder } from "./Reminder";

// interface ReminderFormProps {
//   onSubmit: (reminder: Reminder) => void;
//   editingReminder: Reminder | null;
//   onUpdate: (reminder: Reminder) => void;
// }

// const ReminderForm: React.FC<ReminderFormProps> = ({
//   onSubmit,
//   editingReminder,
//   onUpdate,
// }) => {
//   const [title, setTitle] = useState("");
//   const [time, setTime] = useState("");
//   const [minDateTime, setMinDateTime] = useState("");

//   useEffect(() => {
//     if (editingReminder) {
//       setTitle(editingReminder.title);
//       setTime(editingReminder.time.slice(0, 16)); // Format: "YYYY-MM-DDTHH:mm"
//     } else {
//       setTitle("");
//       setTime("");
//     }

//     // Set minimum date-time to current date and time
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = (now.getMonth() + 1).toString().padStart(2, "0");
//     const day = now.getDate().toString().padStart(2, "0");
//     const hours = now.getHours().toString().padStart(2, "0");
//     const minutes = now.getMinutes().toString().padStart(2, "0");
//     setMinDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
//   }, [editingReminder]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title && time) {
//       const reminder: Reminder = {
//         id: editingReminder ? editingReminder.id : Date.now().toString(),
//         title,
//         time: new Date(time).toISOString(),
//         alerted: false,
//       };
//       if (editingReminder) {
//         onUpdate(reminder);
//       } else {
//         onSubmit(reminder);
//       }
//       setTitle("");
//       setTime("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Reminder title"
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />
//       <input
//         type="datetime-local"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         className="w-full p-2 mb-2 border rounded"
//         min={minDateTime}
//         required
//       />
//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         {editingReminder ? "Update Reminder" : "Add Reminder"}
//       </button>
//     </form>
//   );
// };

// export default ReminderForm;
