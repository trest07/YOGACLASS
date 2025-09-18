import { useEffect, useState } from "react";
import { enroll, unenroll } from "../students/api/enrollmentsApi";
import { useNavigate } from "react-router-dom";

/**
 * ClassCard
 * props:
 * - cls: { id, name, level, instructor, price, start_time, location }
 * - size: 'sm' | 'md' | 'lg' (controls padding/text sizes)
 */
export default function ClassCardStudent({ cls, size = "md", studentId }) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sizeMap = {
    sm: {
      card: "p-3 rounded-xl",
      title: "text-sm",
      meta: "text-xs",
      price: "text-sm",
    },
    md: {
      card: "p-4 rounded-2xl",
      title: "text-lg",
      meta: "text-sm",
      price: "text-sm",
    },
    lg: {
      card: "p-6 rounded-2xl",
      title: "text-xl",
      meta: "text-sm",
      price: "text-base",
    },
  };
  const s = sizeMap[size] || sizeMap.md;

  useEffect(() => {
    if (!cls.enrollments) return;
    const isEnrolled = cls.enrollments.some(
      (e) => e.student_id === studentId && e.status === "enrolled"
    );
    setEnrolled(isEnrolled);
  }, [cls.enrollments, studentId]);

  const handleEnrollToggle = async () => {
    if (!studentId) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      if (enrolled) {
        await unenroll(studentId, cls.id);
      } else {
        await enroll(studentId, cls.id);
      }
      setEnrolled(!enrolled);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className={`relative bg-white shadow-md border ${s.card} flex flex-col justify-between`}
    >
      <div>
        <h3 className={`font-bold ${s.title} text-leaf`}>{cls.name}</h3>
        {cls.tier && (
          <span
            className={`absolute shadow-md top-2 right-2 inline-block px-3 py-0.5 ml-2 rounded-full text-xs font-semibold tracking-wide
        ${
          cls.tier === "premium"
            ? "bg-yellow-200 text-yellow-800"
            : cls.tier === "basic"
            ? "bg-blue-200 text-blue-800"
            : "bg-gray-200 text-gray-700"
        }
      `}
          >
            {cls.tier.toUpperCase()}
          </span>
        )}
        <p className={`text-gray-600 ${s.meta}`}>
          {cls.instructor} • {cls.location}
        </p>

        {cls.start_time && (
          <p className={`text-gray-500 mt-1 ${s.meta}`}>
            {new Date(cls.start_time).toLocaleDateString()} ·{" "}
            {new Date(cls.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}

        {cls.description && (
          <p className="mt-3 text-gray-700 text-sm line-clamp-3">
            {cls.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`font-semibold ${s.price}`}>
          {cls.price ? `💲 ${cls.price}` : "Free"}
        </span>
        <span className="px-2 shadow-md bg-leaf text-white rounded-xl text-sm">
          {cls.level}
        </span>
      </div>

      <button
        onClick={handleEnrollToggle}
        disabled={
          loading ||
          (cls.capacity && cls.enrolledCount >= cls.capacity && !enrolled)
        }
        className={`mt-3 shadow-md w-full px-4 py-1 rounded-lg font-semibold text-white ${
          enrolled
            ? "bg-red-500 hover:bg-red-600"
            : "bg-leaf hover:bg-green-600"
        } transition`}
      >
        {enrolled ? "Unenroll" : "Enroll"}
      </button>
    </article>
  );
}
