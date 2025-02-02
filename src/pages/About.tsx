import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Globe, Search, Building2, LineChart, Boxes, Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-16 pb-12">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-6">About Tariffic</h1>
            <p className="text-lg text-muted-foreground">
              Discover and explore non-American alternatives to companies and products across various industries.
              Our platform helps you diversify your supply chain and find global options.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 pt-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Search</h3>
                  <p className="text-muted-foreground">Search across multiple industries and sectors to find the perfect alternatives for your needs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
                  <p className="text-muted-foreground">Explore companies from various regions and countries to diversify your options.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Company Profiles</h3>
                  <p className="text-muted-foreground">Access detailed information about company operations, revenue, and market impact.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Boxes className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Supply Chain Data</h3>
                  <p className="text-muted-foreground">View detailed supply chain information and manufacturing locations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
                  <p className="text-muted-foreground">Compare market shares and analyze industry trends across different regions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sustainability Focus</h3>
                  <p className="text-muted-foreground">Find companies committed to sustainable practices and environmental responsibility.</p>
                </div>
              </div>
            </div>
          </div>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-semibold mb-4">Start Exploring Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking to diversify your supply chain, find local alternatives, or explore global options,
              Tariffic makes it easy to discover companies from around the world.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;