import { useEffect, useRef, useState } from "react";
import { getRoster, updateAttendance } from "../../students/api/studentsApi";

export default function StudentRoster({ classId }) {
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const noteTimers = useRef({});

  const loadRoster = async () => {
    setLoading(true);
    try {
      const data = await getRoster(classId);
      setRoster(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classId) loadRoster();
  }, [classId]);

  const handleToggleAttendance = async (attendance) => {
    try {
      setRoster((prev) =>
        prev.map((s) =>
          s.id === attendance.id
            ? { ...s, attended: !s.attended } // toggle local
            : s
        )
      );
      await updateAttendance(attendance.id, {
        attended: !attendance.attended,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotesChange = (attendanceId, newNotes) => {
    // update state
    setRoster((prev) =>
      prev.map((s) =>
        s.id === attendanceId
          ? { ...s, notes: newNotes } // actualizar local
          : s
      )
    );

    // clean timer
    if (noteTimers.current[attendanceId]) {
      clearTimeout(noteTimers.current[attendanceId]);
    }

    noteTimers.current[attendanceId] = setTimeout(async () => {
      try {
        await updateAttendance(attendanceId, { notes: newNotes });
      } catch (err) {
        console.error(err);
      }
    }, 500);
  };
  if (loading) return <p className="text-gray-500">Loading roster...</p>;
  if (!roster.length)
    return <p className="text-gray-500">No students enrolled yet.</p>;

  return (
    <div className="overflow-x-auto mt-4 bg-gray-200">
      <table className="min-w-full border rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-leaf text-white">
          <tr>
            <th className="px-4 py-2 text-left">Student</th>
            <th className="px-4 py-2">Attendance</th>
            <th className="px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {roster.map((s) => (
            <tr
              key={s?.enrollment?.student.id}
              className="border-b last:border-b-0"
            >
              <td className="px-4 py-2">{s?.enrollment?.student.full_name}</td>
              <td className="px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={s.attended}
                  onChange={() => handleToggleAttendance(s)}
                  className="w-5 h-5 cursor-pointer"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={s.notes || ""}
                  onChange={(e) => handleNotesChange(s.id, e.target.value)}
                  className="w-full border px-2 py-1 rounded focus:ring-1 ring-leaf outline-none"
                  placeholder="Add notes"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
