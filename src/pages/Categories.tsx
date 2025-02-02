import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Technology",
    description: "Computers, smartphones, software, and electronic devices",
    count: 156
  },
  {
    title: "Automotive",
    description: "Cars, electric vehicles, and automotive components",
    count: 89
  },
  {
    title: "Consumer Goods",
    description: "Clothing, food, beverages, and household items",
    count: 234
  },
  {
    title: "Entertainment",
    description: "Streaming services, gaming, and media platforms",
    count: 67
  },
  {
    title: "Financial Services",
    description: "Banking, insurance, and investment services",
    count: 112
  },
  {
    title: "E-commerce",
    description: "Online retail and marketplace platforms",
    count: 78
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8">Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow">
              <Link to={`/category/${category.title.toLowerCase()}`}>
                <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-primary">
                  {category.count} companies listed
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;