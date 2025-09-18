import { useEffect, useMemo, useState } from "react";
import ClassGrid from "../components/ClassGrid";
import { Filters } from "../components/Filters";
import { getAllClasses } from "../classes/api/classesApi";

export default function Classes() {
  const [classes, setClasses] = useState([]);

  const loadClasses = async () => {
    const data = await getAllClasses();
    setClasses(data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const tiers = [
    { id: "none", name: "None" },
    { id: "basic", name: "Basic" },
    { id: "premium", name: "Premium" },
  ];
  const levels = ["Beginner", "Intermediate"];

  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // filtered list
  const filtered = useMemo(() => {
    return classes.filter((c) => {
      if (selectedTier && c.tier !== selectedTier) return false;
      if (selectedLevel && c.level !== selectedLevel) return false;
      return true;
    });
  }, [classes, selectedTier, selectedLevel]);

  return (
    <section className="space-y-8">
      <div className="rounded-2xl p-6 sm:p-8 text-white bg-gradient-to-r from-leaf to-green-600 shadow-md">
        <h1 className="text-3xl font-bold mb-1">All Classes</h1>
        <p className="opacity-90">Browse categories and levels here.</p>
      </div>

      <div className="space-y-4">
        <Filters
          tiers={tiers}
          levels={levels}
          selectedTier={selectedTier}
          selectedLevel={selectedLevel}
          onChangeTier={setSelectedTier}
          onChangeLevel={setSelectedLevel}
        />

        <div className="text-sm text-gray-900 ml-4">
          Total: {filtered.length}
        </div>

        <ClassGrid classes={filtered} />
      </div>
    </section>
  );
}
