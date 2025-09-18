export default function MyClasses({ enrolled }) {
  if (!enrolled.length) {
    return <p className="text-gray-500">You have no classes yet.</p>
  }

  return (
    <ul className="space-y-4">
      {enrolled.map((e) => (
        <li key={e.id} className="p-4 rounded-xl border shadow bg-white">
          <h3 className="font-bold text-leaf">{e.class.name}</h3>
          <p className="text-sm text-gray-600">
            {new Date(e.class.start_time).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            Status: {e.status}
          </p>
        </li>
      ))}
    </ul>
  )
}
