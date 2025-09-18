import React, { useState, useEffect } from "react";

export default function ClassForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    instructor: "",
    location: "",
    start_time: "",
    end_time: "",
    repeat_pattern: "none",
    capacity: '',
    waitlist_enabled: false,
    price: "",
    tier: "",
    ...initialData,
  });

  useEffect(() => {
    setForm({ ...form, ...initialData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 sm:grid-cols-2 bg-white p-6 rounded-2xl shadow-md"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Class name"
        className="border p-2 rounded"
        required
      />
      <input
        name="instructor"
        value={form.instructor}
        onChange={handleChange}
        placeholder="Instructor"
        className="border p-2 rounded"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="border p-2 rounded"
        required
      />
      <select
        name="repeat_pattern"
        value={form.repeat_pattern}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="none">One-off</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <div>
        <label className="block mb-1 text-sm font-medium">Start Time</label>
        <input
          type="datetime-local"
          name="start_time"
          value={form.start_time}
          aria-label="Start Time"
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">End Time</label>
        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <input
        type="number"
        name="capacity"
        value={form.capacity}
        onChange={handleChange}
        placeholder="Capacity"
        className="border p-2 rounded"
        required
      />
      <label className="flex items-center gap-2 col-span-2">
        <input
          type="checkbox"
          name="waitlist_enabled"
          checked={form.waitlist_enabled}
          onChange={handleChange}
        />
        Enable waitlist
      </label>
      <input
        type="number"
        step="0.01"
        name="price"
        value={form.price || ""}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 rounded"
        required
      />
      <input
        name="tier"
        value={form.tier}
        onChange={handleChange}
        placeholder="Tier"
        className="border p-2 rounded"
        required
      />

      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-leaf text-white rounded-lg hover:opacity-90"
        >
          Save
        </button>
      </div>
    </form>
  );
}
