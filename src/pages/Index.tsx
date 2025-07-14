import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import UploadSection from '@/components/UploadSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Gallery />
      <UploadSection />
    </div>
  );
};

export default Index;
