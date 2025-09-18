// src/screens/YogaHome.jsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllClasses } from "../classes/api/classesApi.js";
import ClassGrid from "../components/ClassGrid.jsx";

export default function YogaHome() {
  const [classes, setClasses] = useState([]);
  
    const loadClasses = async () => {
      const data = await getAllClasses();
      setClasses(data);
    };
  
    useEffect(() => {
      loadClasses();
    }, []);

  return (
    <section className="space-y-10">
      {/* Hero banner */}
      <div className="rounded-2xl p-6 sm:p-8 text-white bg-gradient-to-r from-leaf to-green-600 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome to Vibez Yoga 🌿</h1>
        <p className="opacity-90">
          Find your balance, relax, and book your next class with us.
        </p>
      </div>

      {/* Featured class */}
      {/* <div>
        <h2 className="text-xl font-bold mb-4 text-leaf">🌟 Featured</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c, i) => (
            <ClassCard key={i} {...c} />
          ))}
        </div>
      </div> */}

      {/* All classes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-leaf">All Classes</h2>
          <Link
            to="/classes"
            className="text-sm font-medium text-leaf hover:underline"
          >
            Browse all →
          </Link>
        </div>
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c, i) => (
            <ClassCard key={i} {...c} />
          ))}
        </div> */}
        <ClassGrid classes={classes} />
      </div>
    </section>
  )
}
