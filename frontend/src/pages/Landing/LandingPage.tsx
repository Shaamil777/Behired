import React, { Suspense, lazy } from "react";
const LandingNavbar = lazy(()=>import("../../components/ui/Landing/LandingNavbar"))
const HeroSection = lazy(() => import("../../components/ui/Landing/HeroSection"));
const IntroSection = lazy(() => import("../../components/ui/Landing/IntroSection"));
const OverviewSection = lazy(() => import("../../components/ui/Landing/OverviewSection"));
const StepsSection = lazy(() => import("../../components/ui/Landing/StepsSections"));
const CTAContactSection = lazy(()=>import("../../components/ui/Landing/CTAContactSection"))

const LandingPage:React.FC=()=> {
  return (
    <div className="bg-black text-white">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-black text-[#48E0A4] text-xl font-semibold">
            Loading...
          </div>
        }
      >
        <LandingNavbar/>
        <HeroSection />
        <IntroSection />
        <OverviewSection />
        <StepsSection />
        <CTAContactSection/>
      </Suspense>
    </div>
  );
}

export default LandingPage;
