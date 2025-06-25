import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/common_components/Navbar'
import Footer from '../../components/common_components/Footer'
import Carousel from '../../components/home/Carousel'
import PartnerCollab from '../../components/home/PartnerCollab'
import AptitudeBanner from '../../components/home/AptitudeBanner'
import TrendingCourses from '../../components/home/TrendingCourses'
import TrainingPromo from '../../components/home/TrainingPromo'
import PreviewTestimonials from '../../components/home/PreviewTestimonials'

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Carousel />
      <TrendingCourses />
      <PartnerCollab />
      <AptitudeBanner />
      <TrainingPromo />
      <PreviewTestimonials />
      <Footer />
    </>
  )
}

export default Home