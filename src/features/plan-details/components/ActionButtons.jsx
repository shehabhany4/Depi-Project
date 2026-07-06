import { useNavigate } from "react-router-dom";

function ActionButton({ label, onClick, variant = "primary" }) {
  const base = "flex-1 rounded-2xl px-6 py-4 font-semibold text-center transition-all duration-200";
  const styles = {
    primary:
      "bg-teal-600 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl active:scale-95",
    secondary:
      "bg-white text-neutral-800 shadow-lg ring-1 ring-neutral-200 hover:-translate-y-1 hover:shadow-xl active:scale-95",
    outline:
      "bg-white text-neutral-800 shadow-lg ring-1 ring-neutral-200 hover:-translate-y-1 hover:shadow-xl active:scale-95",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {label}
    </button>
  );
}

export default function ActionButtons({ plan }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <ActionButton
        label="Generate 3D"
        variant="primary"
        onClick={() => navigate(`/plan-details/${plan.id}`)}
      />
      <ActionButton
        label="Buy This Plan"
        variant="secondary"
        onClick={() => {}}
      />
      <ActionButton
        label="Modify This Plan"
        variant="outline"
        onClick={() => navigate(`/plan-details/${plan.id}`)}
      />
    </div>
  );
}
