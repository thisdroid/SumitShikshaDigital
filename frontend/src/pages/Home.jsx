import Navbar from '../components/common_components/Navbar'
import Footer from '../components/common_components/Footer'
import Carousel from '../components/home/Carousel'
import PartnerCollab from '../components/home/PartnerCollab'
import AptitudeBanner from '../components/home/AptitudeBanner'
import TrendingCourses from '../components/home/TrendingCourses'
import TrainingPromo from '../components/home/TrainingPromo'
import PreviewTestimonials from '../components/home/PreviewTestimonials'

const Home = () => (
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

export default Home