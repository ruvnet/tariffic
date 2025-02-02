import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About AlternativeTo</h1>
          
          <div className="prose prose-lg">
            <p className="mb-6">
              AlternativeTo helps you discover non-American alternatives to popular companies and products. 
              Our platform provides detailed information about companies' supply chains, manufacturing locations, 
              and sustainable alternatives from around the world.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe in providing consumers with transparent information about the products they use 
              and offering diverse alternatives from various global markets. Our goal is to help you make 
              informed decisions while supporting international business diversity.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
            <p className="mb-6">
              We analyze company data, supply chain information, and manufacturing sources to provide 
              you with detailed insights about product origins and alternative options. Our database 
              includes information about company headquarters, employee count, revenue, and sustainability 
              initiatives.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;