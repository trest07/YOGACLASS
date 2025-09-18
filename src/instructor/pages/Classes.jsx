import { useEffect, useState } from "react";
import CreateClassModal from "@/instructor/components/CreateClassModal";
import ClassList from "../../classes/components/ClassList";
import {
  archiveClass,
  createClass,
  getAllClasses,
  updateClass,
} from "../../classes/api/classesApi";
import { useAlert } from "../../components/AlertContext";
import StudentRoster from "../components/StudentRoster";

export default function Classes() {
  const [open, setOpen] = useState(false);

  const [classes, setClasses] = useState([]);
  const [editing, setEditing] = useState(null);
  const { showConfirm, showAlert } = useAlert();

  const loadClasses = async () => {
    const data = await getAllClasses();
    setClasses(data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleCreate = async (newClass) => {
    await createClass(newClass);
    await loadClasses();
  };

  const handleUpdate = async (updates) => {
    await updateClass(editing.id, updates);
    setEditing(null);
    await loadClasses();
  };

  const handleArchive = async (id) => {
    showConfirm({
      message: "Are you sure you want to archive this class?",
      onConfirm: async () => {
        await archiveClass(id);
        await loadClasses();
        showAlert({ message: "Class archived", type: "success" });
      },
    });
  };

  const [rosterOpen, setRosterOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const handleViewRoster = (cls) => {
    setSelectedClassId(cls.id);
    setRosterOpen(true);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Classes</h2>
        <button
          className="px-3 py-1 shadow-xl rounded-lg bg-leaf text-white"
          onClick={() => setOpen(true)}
        >
          New Class
        </button>
      </div>

      {/* List section */}
      <div className="mt-6">
        <ClassList
          classes={classes}
          onEdit={(cls) => {
            setEditing(cls);
            setOpen(true);
          }}
          onArchive={handleArchive}
          onViewRoster={handleViewRoster}
        />
      </div>
      {/* TODO: render class list */}
      <CreateClassModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        initialData={editing}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      {rosterOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl h-xl bg-gray-200 rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setRosterOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {classes?.name} - Roster
            </h2>
            <StudentRoster classId={selectedClassId} />
          </div>
        </div>
      )}
    </div>
  );
}
