import { useEffect } from 'react';
import {
  activeAnimation,
  initCursor,
  jarallaxAnimation,
  stickyNav,
} from "./utils";

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/contact/Contact.jsx';
import SkillSlider from './components/skillslider/SkillSlider';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Portfolio from './components/portfolio/Portfolio';

function App() {
  /* Setup initial JS items */
  useEffect(() => {
  //  activeAnimation();
    initCursor();
    //window.addEventListener("scroll", activeAnimation);
    //window.addEventListener("scroll", stickyNav);

    // scroll to top button
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add('active');
    } else {
      scrollToTopButton.classList.remove('active');
    }
    });
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);


  return (
    <>
      <Header/>
      <Hero/>
      <About/>
      <SkillSlider/>
      <Portfolio/>
      <Contact/>
      <Footer/>
      <button id="scrollToTopButton" title="Scroll to Top"><i class="fas fa-chevron-up"></i></button>
      <div className="cursor" />
    </>
  );
}

export default App;
