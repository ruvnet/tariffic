import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryDetail } from "@/components/CategoryDetail";

const CategoryDetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryDetail />
      <Footer />
    </div>
  );
};

export default CategoryDetailPage;