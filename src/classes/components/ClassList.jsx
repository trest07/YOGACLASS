export default function ClassList({
  classes,
  onEdit,
  onArchive,
  onViewRoster,
}) {
  if (!classes.length) {
    return <p className="text-gray-500">No classes available yet.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((c) => (
        <div
          key={c.id}
          className="rounded-2xl p-4 bg-white shadow-md border flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-lg text-leaf">{c.name}</h3>
            <p className="text-sm text-gray-600">
              {c.instructor} • {c.location}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(c.start_time).toLocaleString()} →{" "}
              {new Date(c.end_time).toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              <span className="px-2 py-0.5 rounded-full bg-leaf/10 text-leaf font-medium text-xs">
                {c.level}
              </span>
            </p>
            {c.price && (
              <p className="mt-2 text-sm">
                💲 {c.price} {c.tier && `• ${c.tier}`}
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(c)}
              className="flex-1 shadow-md px-3 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
            >
              Edit
            </button>
            {c.status === "active" && (
              <button
                onClick={() => onArchive(c.id)}
                className="flex-1 px-3 shadow-md py-1 bg-red-400 text-white rounded-lg hover:bg-red-500"
              >
                Archive
              </button>
            )}
            {/* Nuevo botón para ver roster */}
            <button
              onClick={() => onViewRoster?.(c)}
              className="flex-1 px-3 py-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              View Roster
            </button>{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
