import { AIEnhancer } from "@/components/AIEnhancer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Settings = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <div className="max-w-2xl mx-auto">
            <AIEnhancer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;