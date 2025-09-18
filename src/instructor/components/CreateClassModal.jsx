import React, { useEffect } from "react";

export default function CreateClassModal({
  open,
  onClose,
  onCreate,
  onUpdate,
  initialData = {},
}) {
  const [name, setName] = React.useState("");
  const [level, setLevel] = React.useState("Beginner");
  const [instructor, setInstructor] = React.useState("Ana");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [repeatPattern, setRepeatPattern] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [tier, setTier] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [waitlistEnabled, setWaitlistEnabled] = React.useState(false);
  const [location, setLocation] = React.useState("");

  useEffect(() => {
    if (initialData && Object.keys(initialData).length) {
      setName(initialData.name || "");
      setLevel(initialData.level || "Beginner");
      setInstructor(initialData.instructor || "Ana");
      setPrice(initialData.price || 0);
      setDescription(initialData.description || "");
      setRepeatPattern(initialData.repeatPattern || "");
      setStartTime(
        new Date(initialData.start_time).toISOString().slice(0, 16) || ""
      );
      setEndTime(
        new Date(initialData.end_time).toISOString().slice(0, 16) || ""
      );
      setTier(initialData.tier || "");
      setCapacity(initialData.capacity || 0);
      setWaitlistEnabled(initialData.waitlist_enabled || false);
      setLocation(initialData.location || "");
    }
  }, [initialData]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    const classData = {
      name,
      level,
      instructor,
      price: Number(price),
      start_time: startTime,
      end_time: endTime,
      description,
      repeat_pattern: repeatPattern,
      tier,
      capacity: Number(capacity),
      waitlist_enabled: waitlistEnabled,
      location,
    };

    if (initialData && initialData.id && onUpdate) {
      // EDIT mode
      onUpdate({ id: initialData.id, ...classData });
    } else {
      // CREATE mode
      onCreate({ id: crypto.randomUUID(), ...classData });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData?.id ? "Edit Class" : "Create Class"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          {/* Name / Title */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>All Levels</option>
            </select>
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location / Room
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Repeat Pattern */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repeat Pattern
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={repeatPattern}
              onChange={(e) => setRepeatPattern(e.target.value)}
            >
              <option value="none">None</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              min="1"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>

          {/* Waitlist */}
          <div className="flex items-center mt-2 gap-2">
            <input
              type="checkbox"
              checked={waitlistEnabled}
              onChange={(e) => setWaitlistEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-leaf focus:ring-2"
            />
            <label className="text-sm text-gray-700">Enable Waitlist</label>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Tier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tier
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
            >
              <option value="">None</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-leaf text-white font-semibold"
            >
              {initialData?.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
