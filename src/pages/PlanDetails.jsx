import { Navigate, useParams } from "react-router-dom";
import HouseGallery from "@/features/plan-details/components/HouseGallery";
import PlanInformation from "@/features/plan-details/components/PlanInformation";
import FloorPlansSection from "@/features/plan-details/components/FloorPlansSection";
import ActionButtons from "@/features/plan-details/components/ActionButtons";
import housePlans from "@/assets/data/houses.json";

const imageModules = import.meta.glob("/src/assets/plan-detailsImages/*.{avif,jpg,jpeg,png,gif,webp,svg}", {
  eager: true,
  query: { format: "url" },
  import: "default",
});

const planImages = Object.values(imageModules);

export default function PlanDetails() {
  const { id } = useParams();
  const planId = Number(id);
  const plan = id ? housePlans.find((p) => p.id === planId) : housePlans[0];

  if (id && !plan) return <Navigate to="/plan-details" replace />;

  return (
    <div>
      <section className="px-4 pt-6 sm:px-6 lg:px-8 md:h-dvh">
        <HouseGallery images={planImages} />
      </section>

      <section className="space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PlanInformation plan={plan} />
        <FloorPlansSection plan={plan} />
        <ActionButtons plan={plan} />
      </section>
    </div>
  );
}
