import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdCall } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { PiVirtualRealityBold } from "react-icons/pi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Home.css"; // Import custom CSS for additional styling

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


function useNavScrolled(threshold = 420) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}


// --- Helper ---
function getCalendarDays(year, month) {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  let dayCounter = 1 - firstWeekday;
  for (let i = 0; i < 6 * 7; i++) {
    let date = new Date(year, month, dayCounter);
    days.push(date);
    dayCounter += 1;
  }
  return days;
}
const navItems = [
  "NAAC", "NBA", "AICTE Approval", "ARIIA Report", "NIRF", "Greivance Redressal"
];
// --- Data ---
const navItems1 = [
  { label: "HOME" },
  { label: "ABOUT US", subItems: ["Vision", "Mission", "Management"] },
  { label: "ACADEMICS", subItems: ["Departments", "Curriculum", "Faculty"] },
  { label: "RESEARCH", subItems: ["Projects", "Publications", "Patents"] },
  { label: "PLACEMENTS", subItems: ["Statistics", "Recruiters", "Training"] },
  { label: "CENTRE OF EXCELLENCE" },
  { label: "COE" },
  { label: "INFRASTRUCTURE", subItems: ["Campus", "Labs", "Hostel"] },
  { label: "ALUMNI", subItems: ["Events", "Network", "Support"] },
  { label: "CFG" }
];
const placements = [
  { name: "Lakshmi P S", company: "cloudrive", photo: "/placements/lakshmi.jpg" },
  { name: "Rama Prabha", company: "Infy", photo: "/placements/rama.jpg" },
  { name: "Resika", company: "GJOTIT", photo: "/placements/resika.jpg" },
  { name: "Riswana Fathima M", company: "Dreams", photo: "/placements/riswana.jpg" },
  { name: "Barath Rahav", company: "Aricent", photo: "/placements/barath.jpg" },
  { name: "Juhinaaz", company: "noname", photo: "/placements/juhinaaz.jpg" },
];

const events = [
  {
    date: "2025-10-13",
    image: "/event1.jpg",
    title: "Rifle Women Events",
    subtitle: "Ms. J. Melvina Angeline",
    description: "New state record in 50 Mts Prone & 10 Mts Rifle Events",
  },
  {
    date: "2025-10-14",
    image: "/event2.jpg",
    title: "High Jump-Bronze Medal",
    subtitle: "Mr.M.Vijay Vindhan",
    description: "",
  },
  {
    date: "2025-10-15",
    image: "/event3.jpg",
    title: "Zone-XVI Tournament 2024-2025",
    subtitle: "Basketball Women Team-Silver Medal",
    description: "",
  },
];

const newsItems = [
  { date: "19 SEP 2025", title: "Symposium INSTERA 2K25", dept: "SEC" },
  { date: "08 MAY 2025", title: "How To Plan For Start – Upcoming Seminar", dept: "CSE" },
  { date: "27 MAR 2025", title: "Red Hat Certification on 27-03-2025", dept: "CSE" },
  { date: "04 FEB 2025", title: "GenAI-VR 2025 Shaping the Future of Immersive Tech", dept: "CSE" },
  { date: "08 AUG 2025", title: "ZENISTA’25 – the 28th National Event", dept: "ECE" },
];

const departments = [
  {
    img: "/csedept.gif", // replace with correct import or path; order as per your screenshot
    title: "Computer Science and Engineering",
    intake: 180,
    duration: 4,
    more: "#",
  },
  {
    img: "/it dept.jpg",
    title: "Information Technology",
    intake: 180,
    duration: 4,
    more: "#",
  },
  {
    img: "/aidept.jpg",
    title: "Artificial Intelligence and Data Science",
    intake: 120,
    duration: 4,
    more: "#",
  },
  {
    img: "/cyberdept.jpg",
    title: "Computer Science and Engineering (Cyber Security)",
    intake: 60,
    duration: 4,
    more: "#",
  },
];






// --- Animated Counter ---
function useCounter(max, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(max / (duration / 16));
    const tick = () => {
      start += increment;
      setCount(start < max ? start : max);
      if (start < max) requestAnimationFrame(tick);
    };
    tick();
  }, [max, duration]);
  return count;
}

// --- News Ticker ---
function NewsTicker({ height = "h-96" }) {
  const listRef = useRef(null);
  useEffect(() => {
    const list = listRef.current;
    let start = 0;
    let frame;
    const totalHeight = list.scrollHeight / 2;
    function scrollNews() {
      start += 0.7;
      if (start >= totalHeight) start = 0;
      list.style.transform = `translateY(-${start}px)`;
      frame = requestAnimationFrame(scrollNews);
    }
    frame = requestAnimationFrame(scrollNews);
    return () => cancelAnimationFrame(frame);
  }, []);
  const data = [...newsItems, ...newsItems];
  return (
    <div className="w-full bg-white shadow rounded-lg p-0 pt-2 overflow-hidden border">
      <h3 className="text-xl font-bold px-4 pb-2 pt-2">News &amp; Events</h3>
      <div className={`relative ${height} overflow-hidden w-full`}>
        <ul ref={listRef} className="absolute w-full left-0 top-0">
          {data.map((item, idx) => (
            <li key={idx} className="flex gap-4 py-4 px-4 border-b place-items-center bg-white">
              <div className="flex flex-col items-center px-2 py-2 rounded bg-blue-900 text-white min-w-[66px]">
                <span className="font-bold text-lg leading-4">{item.date.split(" ")[0]}</span>
                <span className="text-xs">{item.date.split(" ")[1]}</span>
                <span className="text-xs">{item.date.split(" ")[2]}</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[15px] font-semibold">{item.title.length > 38 ? item.title.substring(0, 35) + "..." : item.title}</span>
                <span className="text-[15px] font-bold text-blue-900">{item.dept}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-3 flex justify-center">
        <button className="border border-blue-900 text-blue-900 py-1 px-6 rounded hover:bg-blue-50 font-semibold transition">See All News</button>
      </div>
    </div>
  );
}

// --- Main Home Component (Stanford style scroll) ---
export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
    "/gallery7.jpg",
    "/gallery8.jpg",
    "/gallery9.jpg"
  ];
  const [calendarMonth, setCalendarMonth] = useState(9); // October
  const [calendarYear, setCalendarYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarDays = getCalendarDays(calendarYear, calendarMonth);
  const navScrolled = useNavScrolled();
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    // Disable ScrollSmoother for now to fix scroll cutoff
    // Reason: the hero section sits outside `#smooth-wrapper`, causing height miscalc
    // If you want smooth scrolling later, move the hero inside `#smooth-content` first.
    return () => { };
  }, []);

  // Event Filtering
  const filteredEvents = events.filter(ev => {
    const evDate = new Date(ev.date);
    if (selectedDate) {
      return evDate.getFullYear() === selectedDate.getFullYear() &&
        evDate.getMonth() === selectedDate.getMonth() &&
        evDate.getDate() === selectedDate.getDate();
    } else {
      return evDate.getFullYear() === calendarYear && evDate.getMonth() === calendarMonth;
    }
  });

  function goToPreviousMonth() {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  }
  function goToNextMonth() {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  }

  const count95 = useCounter(95, 1200);
  const count100a = useCounter(100, 1500);
  const count100b = useCounter(100, 1700);
  const count100c = useCounter(100, 1700);
  const [navOpen, setNavOpen] = useState(false);
  const [navOpen1, setNavOpen1] = useState(false);

  // Optional: Scroll listener to toggle nav background
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (


    <div className="w-full">
      <section className="w-full h-screen relative overflow-hidden">
        {/* First Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/10   shadow-md border-b border-gray-200 font-sans">
          <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-2 gap-2 md:gap-0">
            {/* Branding Block */}
            <div className="flex items-center justify-between w-full md:w-auto gap-2 text-gray-800">
              {/* Mobile View Branding */}
              <div className="flex items-center md:hidden text-[0.6rem] leading-tight">
                <img
                  src="/VCET_logo.jpg"
                  alt="VCET Logo"
                  className="h-6 w-auto rounded-full"
                />
                <div className="flex flex-col text-left font-semibold leading-[1.1] ml-2">
                  <span className="text-[0.7rem] font-bold tracking-wide">VELAMMAL</span>
                  <span className="text-[0.45rem] font-bold">COLLEGE OF ENGINEERING AND TECHNOLOGY</span>
                  <span className="italic text-gray-500">Wheel rolls on!</span>
                  <span className="italic text-gray-400">(Autonomous)</span>
                  <span className="text-[#d97706] font-medium">TNEA: 5986</span>
                </div>
                <div className="w-[3px] h-15 bg-gray-800 mx-1" />
                <div className="flex items-center gap-1">
                  <img src="/NAAC.jpeg" alt="NAAC" className="h-6 w-auto rounded" />
                  <img src="/NBA.png" alt="NBA" className="h-6 w-auto rounded" />
                </div>
              </div>

              {/* Desktop View Branding */}
              <div className="hidden md:flex items-center text-[0.65rem] leading-tight">
                <img
                  src="/VCET_logo.jpg"
                  alt="VCET Logo"
                  className="h-8 w-auto rounded-full mr-2"
                />
                <div className="flex flex-col font-semibold leading-[1.2]">
                  <span className="text-[0.65rem] font-bold tracking-wide">VELAMMAL COLLEGE OF </span>
                  <span className="text-[0.65rem] font-bold tracking-wide">ENGINEERING AND TECHNOLOGY</span>
                  <span className="italic text-gray-500">
                    Wheel rolls on! <span className="text-gray-400">(Autonomous)</span>
                  </span>
                  <span className="text-[#d97706] font-medium">TNEA: 5986</span>
                </div>
                <div className="w-[2px] h-10 bg-gray-400 mx-2" />
                <div className="flex items-center">
                  <img src="/NAAC.jpeg" alt="NAAC A+" className="h-8 w-auto" />
                  <img src="/NBA.png" alt="NBA" className="h-8 w-auto ml-1" />
                </div>
              </div>

              {/* Hamburger Button for Mobile */}
              <button
                className="md:hidden text-gray-700 ml-2"
                onClick={() => setNavOpen(!navOpen)}
                aria-label="Toggle navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      navOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex gap-6 items-center md:mt-0">
              {navItems.map((item) => (
                <li key={item} className="text-gray-700 text-sm font-medium hover:text-[#d97706] transition-colors">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {navOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-40 overflow-y-auto px-4 pt-16 pb-6 font-sans text-gray-800 text-[0.85rem] leading-snug">
              {/* Close Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setNavOpen(false)}
                  aria-label="Close navigation"
                  className="text-gray-600 hover:text-[#d97706] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Primary Navigation – navItems as Grid */}
              <div className="mb-6 mt-2">
                <h2 className="text-[0.7rem] font-bold text-gray-500 uppercase mb-2 tracking-wide">Main Navigation</h2>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[0.8rem] font-medium">
                  {navItems.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block px-3 py-2 text-center rounded-md border border-gray-300 hover:bg-gray-100 hover:text-[#d97706] transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dropdown Sections – navItems1 */}
              <div className="space-y-3">
                {navItems1.map((item) => (
                  <div key={item.label} className="border border-gray-200 rounded-md">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-[0.8rem] font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none"
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      {item.subItems && (
                        <svg
                          className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${expanded === item.label ? 'rotate-180 text-[#d97706]' : ''
                            }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                      )}
                    </button>

                    {/* SubItems */}
                    {expanded === item.label && item.subItems && (
                      <ul className="border-t border-gray-100 bg-gray-50">
                        {item.subItems.map((sub, index) => (
                          <li key={index}>
                            <a
                              href="#"
                              className="block px-5 py-1.5 text-[0.75rem] text-gray-600 hover:text-[#d97706] hover:bg-gray-100"
                            >
                              {sub}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Second Navigation Bar – Desktop Only */}
        <div className="hidden md:flex fixed top-[56px] left-0 w-full justify-center bg-gradient-to-r from-white via-gray-50 to-white border-t border-b border-gray-200 text-[0.75rem] font-medium text-gray-700 z-50 shadow-sm">
          <ul className="flex flex-wrap justify-center gap-6 px-6 py-3">
            {navItems1.map((item) => (
              <li key={item.label} className="relative group">
                <a
                  href="#"
                  className="hover:text-[#d97706] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>

                {/* Dropdown */}
                {item.subItems && (
                  <ul className="absolute left-0 top-full mt-2 w-44 bg-white shadow-lg border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-200 z-50">
                    {item.subItems.map((sub, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-[0.7rem] text-gray-700 hover:bg-gradient-to-r hover:from-[#fef3c7] hover:to-[#fde68a] hover:text-[#d97706] rounded-sm"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Background Video */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
          <video
            className="w-full h-full object-cover md:object-cover  md:h-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/vcetvideo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Animated Text */}
        <div className="hidden md:flex fixed inset-0 items-center justify-start px-6 md:pl-16 z-10 pointer-events-none">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-left pointer-events-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
              VELAMMAL <br /> COLLEGE OF <br /> ENGINEERING <br /> AND <br /> TECHNOLOGY
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow">
              A Mission Defined by Possibility
            </p>
          </motion.div>
        </div>
      </section>

      <div id="smooth-wrapper" className="w-full">
        <div id="smooth-content">
          <main className="relative z-40">
            <div
              className="absolute left-1/2 right-1/2 -mx-[50vw] top-[540px] w-screen mb-10 bg-white/95 shadow-2xl"
              style={{ right: 0 }}>


              {/* Vision & Mission */}
              
    <section className="bg-white py-10 px-2 md:px-8 rounded-lg shadow mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-blue-200 rounded-lg">

        {/* Left Side – Vision & Mission */}
        <div className="flex flex-col justify-center p-6 space-y-6">
          <div>
            <h2 className="font-bold text-2xl text-[#153962] flex items-center gap-2">
              Vision <span className="block h-1 w-12 bg-yellow-400 rounded"></span>
            </h2>
            <p className="mt-4 text-gray-800 text-[1rem] font-semibold leading-relaxed">
              &#10148; To emerge and sustain as a center of excellence for technical and managerial education upholding social values.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-2xl text-[#153962] flex items-center gap-2">
              Mission <span className="block h-1 w-12 bg-yellow-400 rounded"></span>
            </h2>
            <ul className="mt-4 space-y-3 text-gray-800 text-[1rem] font-semibold leading-relaxed">
              <li>&#10148; Our aspirants are:</li>
              <li>&#10148; Imparted with comprehensive, innovative and value–based education.</li>
              <li>&#10148; Exposed to technical, managerial and soft skill resources with emphasis on research and professionalism.</li>
              <li>&#10148; Inculcated with the need for a disciplined, happy, married and peaceful life.</li>
            </ul>
          </div>
        </div>

         <div className="grid grid-cols-3 gap-4 overflow-hidden max-h-[500px] p-4">
            {[0, 1, 2].map((col) => (
              <div
                key={col}
                className={`flex flex-col gap-4 ${
                  col % 2 === 0 ? "animate-scroll-down" : "animate-scroll-up"
                }`}
                style={{ minHeight: "1200px" }} // Adjusted for 6 images × 2 duplicates × ~100px each
              >
                {[...galleryImages, ...galleryImages].map((src, index) => (
                  <div
                    key={`${col}-${index}`}
                    className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(index % galleryImages.length);
                      setLightboxOpen(true);
                    }}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

{/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white text-3xl"
            onClick={() =>
              setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length)
            }
          >
            &#10094;
          </button>

          {/* Image */}
          <img
            src={galleryImages[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            className="max-w-[90%] max-h-[80vh] rounded-lg shadow-lg"
          />

          {/* Next Button */}
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={() => setCurrentIndex((currentIndex + 1) % galleryImages.length)}
          >
            &#10095;
          </button>
        </div>
      )}

        </div>
    </section>




              {/* DEPARTMENT SECTION */}
              <section className="w-full py-12 bg-[#eef4ff]">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-4xl font-extrabold text-black text-center mb-10 tracking-wide">Departments</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {departments.map((dept) => (
                      <div
                        key={dept.title}
                        className="relative flex flex-col items-center rounded-2xl overflow-hidden shadow-xl bg-[#f5f9ff] hover:bg-gradient-to-br hover:from-[#79a6ff] hover:to-[#4f7ff0] transition-all duration-300 group min-h-[180px] border-2 border-[#9bb7ff]"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <img
                            src={dept.img}
                            alt={dept.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        <div className="flex-1 p-5 flex flex-col justify-center w-full">
                          <h3 className="font-bold text-xl mb-2 text-black group-hover:text-black text-center transition-colors duration-200">
                            {dept.title}
                          </h3>
                          <div className="text-black group-hover:text-black text-center font-semibold transition-colors">
                            Sanctioned Intake: {dept.intake}
                          </div>
                          <div className="text-black group-hover:text-black text-center transition-colors mb-1">
                            Course Duration: {dept.duration} Years
                          </div>
                          <a
                            href={dept.more}
                            className="block font-bold text-black mt-4 hover:text-yellow-300 transition group-hover:text-yellow-300 group-hover:underline text-center"
                          >
                            View More...
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Events Section */}
              <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-white py-12 px-0 shadow-none rounded-none mb-10 border-t-8 border-[#2860f1]">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <h2 className="text-4xl font-extrabold text-black mb-8 text-center tracking-wide">Velammal Events</h2>
                  <div className="flex flex-col md:flex-row gap-8">

                    {/* Calendar Card */}
                    <div className="bg-gradient-to-br from-[#eef4ff] to-[#dbe7ff] rounded-2xl shadow-lg p-5 w-full md:max-w-xs flex-shrink-0 text-black">
                      <div className="text-lg font-semibold mb-4 flex justify-between items-center">
                        <button className="text-black border-2 border-black rounded px-2 py-1 hover:bg-white/60" onClick={goToPreviousMonth}>
                          &lt;
                        </button>
                        <span>
                          {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button className="text-[#2860f1] border-2 border-white rounded px-2 py-1 hover:bg-white/60" onClick={goToNextMonth}>
                          &gt;
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 text-center text-[#2860f1] text-sm mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <div key={i} className="font-bold">{d}</div>
                        ))}
                        {calendarDays.map((d, idx) => {
                          const isCurrentMonth = d.getMonth() === calendarMonth;
                          const isSelected = selectedDate &&
                            d.getDate() === selectedDate.getDate() &&
                            d.getMonth() === selectedDate.getMonth() &&
                            d.getFullYear() === selectedDate.getFullYear();
                          return (
                            <button
                              key={idx}
                              onClick={() => isCurrentMonth && setSelectedDate(d)}
                              className={
                                "w-8 h-8 rounded-full flex items-center justify-center font-semibold " +
                                (isSelected
                                  ? "bg-white text-[#2860f1] border-2 border-[#2860f1]"
                                  : isCurrentMonth
                                    ? "hover:bg-white hover:text-[#2860f1] bg-white/80 text-[#2860f1]"
                                    : "text-[#2860f1] bg-transparent")
                              }
                              disabled={!isCurrentMonth}
                            >
                              {d.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Event Cards */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredEvents.length === 0 && (
                        <div className="col-span-3 text-black text-lg p-8 text-center bg-blue-50 rounded-xl font-bold shadow">
                          No events for this date.
                        </div>
                      )}
                      {filteredEvents.map((event, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-xl shadow-lg overflow-hidden border border-[#2860f1]">
                          <div className="relative">
                            <img src={event.image} alt={event.title} className="w-full h-36 object-cover" />
                            <div className="absolute top-2 left-2 bg-[#4f7ff0] text-black rounded-md px-3 py-1 text-center shadow">
                              <div className="text-lg font-bold leading-none">{parseInt(event.date.split("-")[2], 10)}</div>
                              <div className="text-xs leading-none">{new Date(event.date).toLocaleString('default', { month: "short", year: "numeric" })}</div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="font-bold text-lg mb-1 text-black">{event.title}</div>
                            {event.subtitle && (
                              <div className="text-sm font-medium text-black mb-2">{event.subtitle}</div>
                            )}
                            {event.description && (
                              <div className="text-sm text-black">{event.description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Placement Success Stories Marquee */}
              <div className="w-full bg-[#eef4ff] py-12">
                <section className="w-full max-w-7xl mx-auto bg-white overflow-hidden rounded-lg shadow px-6 md:px-10 py-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    Placement success stories to inspire yours
                  </h2>
                  <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
                    At every placement has a story. We've guided 3000+ students, including those from non-coding backgrounds, to learn in-demand tech skills. Our alumni’s success—starting fresh and getting placed in the IT sector—defines who we are.
                  </p>
                  <div className="relative w-full overflow-x-hidden">
                    <div className="flex w-max animate-marquee gap-6">
                      {[...placements, ...placements].map((p, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 w-60 h-28 md:h-32 bg-[#181c39] rounded-xl text-white flex flex-col items-center justify-center relative shadow"
                        >
                          <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-full border-2 border-white mb-2" />
                          <div className="text-base font-medium">{p.name}</div>
                          <div className="text-xs text-white">{p.company}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* STRONG COUNT SECTION: blue/white theme */}
              <div className="w-full bg-white py-12">
                <section
                  className="relative w-full py-12 flex items-center"
                  style={{
                    minHeight: "260px",
                    background:
                      "linear-gradient(90deg, rgba(40,96,241,0.78) 0%, rgba(40,96,241,0.95) 100%)",
                    // Add this if you want a background image behind the overlay (optional):
                    backgroundImage: "url('/VCET.jpg'), linear-gradient(90deg, rgba(40,96,241,0.88), rgba(40,96,241,0.95))",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="max-w-6xl mx-auto flex-1 flex flex-col md:flex-row gap-10 md:gap-0 justify-evenly items-center text-center px-2 md:px-10">
                    <div className="flex flex-col justify-center items-center flex-1 py-8">
                      <span className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-2">A++</span>
                      <span className="text-white text-lg md:text-xl font-bold mb-1">GRADE BY NAAC,<br />NIRF RANKED</span>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-1 py-8">
                      <span className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-2">190+</span>
                      <span className="text-white text-lg md:text-xl font-bold mb-1">Foreign Adjunct<br />Professors</span>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-1 py-8">
                      <span className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-2">500+</span>
                      <span className="text-white text-lg md:text-xl font-bold mb-1">International<br />Partners</span>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-1 py-8">
                      <span className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-2">372acre</span>
                      <span className="text-white text-lg md:text-xl font-bold mb-1">Eco-friendly campus<br />with over 62 lakhs sq. ft built-up space</span>
                    </div>
                    {/* Add more as needed */}
                  </div>
                </section>
              </div>

              {/* BOTTOM News Section */}
              <div className="w-full bg-slate-50 py-12">
                <section className="max-w-7xl mx-auto px-2 md:px-8 rounded-lg shadow bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <NewsTicker height="h-96" />
                    </div>
                    <div />
                  </div>
                </section>

                <footer className="bg-[#f7fafd] border-t border-gray-200 font-sans mt-20">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 px-6 py-8">
                    <div className="flex items-center gap-4">
                      {/* <img src={logo} alt="Velammal Logo" className="w-20 h-20 object-contain rounded-full" /> */}
                      <div>
                        <span className="block font-extrabold text-xl text-black">Velammal College of Engineering and Technology</span>
                        <span className="block text-gray-600 text-sm">Madurai to Rameshwaram Highway, Viraganoor,</span>
                        <span className="block text-gray-600 text-sm">Madurai – 625 009.</span>
                      </div>
                    </div>
                    {/* Contact Info */}
                    <div className="flex flex-col gap-2 min-w-[210px]">
                      <div className="flex items-center gap-2 text-black">
                        <MdCall />
                        <span className="text-gray-800 font-semibold">+91-9994994991</span>
                      </div>
                      <div className="flex items-center gap-2 text-black">
                        <MdEmail />
                        <span className="text-gray-800 font-semibold">principal@vcet.ac.in</span>
                      </div>
                      <div className="flex items-center gap-2 text-black">
                        <FiMapPin />
                        <span className="text-gray-800 font-semibold">Madurai to Rameshwaram Highway, Viraganoor,</span>
                      </div>
                    </div>

                  </div>
                  {/* Bottom bar */}
                  <div className="bg-[#2860f1] flex flex-col md:flex-row md:items-center justify-between py-3 px-4 text-white text-sm">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <span>Page Updated: Oct 11th, 2025</span>
                      <span className="hidden sm:inline">|</span>
                      <a href="#" className="hover:underline">Terms of Use</a>
                      <span className="hidden sm:inline">|</span>
                      <a href="#" className="hover:underline">Privacy Policy</a>
                    </div>
                    <div className="mt-2 md:mt-0 flex-1 flex justify-center md:justify-end items-center gap-6">
                      <span className="text-center text-sm">Copyright &copy; {new Date().getFullYear()} Velammal College. All Rights Reserved</span>
                      <div className="flex gap-2 ml-2">
                        <a href="#" className="hover:text-yellow-300"><FaFacebookF /></a>
                        <a href="#" className="hover:text-yellow-300"><FaXTwitter /></a>
                        <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
                        <a href="#" className="hover:text-yellow-300"><FaLinkedinIn /></a>
                        <a href="#" className="hover:text-yellow-300"><FaYoutube /></a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </main>
        </div>
      </div >
    </div >
  );
}
