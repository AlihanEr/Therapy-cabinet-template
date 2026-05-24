import Approach from "@/components/Approach";
import Booking from "@/components/Booking";
import ClientEffects from "@/components/ClientEffects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Practitioner from "@/components/Practitioner";
import Principles from "@/components/Principles";
import Testimonials from "@/components/Testimonials";
import Treatments from "@/components/Treatments";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Approach />
      <Treatments />
      <Practitioner />
      <Principles />
      <Testimonials />
      <Booking />
      <Footer />
      <ClientEffects />
    </>
  );
}
