import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

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

// --- Data ---
const navItems = [
  "ALVERNO NEWS", "ATHLETICS", "VISIT", "EVENTS", "ALUMNAE", "GIVE",
  "ACADEMICS & ADMISSIONS", "CAMPUS", "RESOURCES", "ABILITIES"
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
    image: "/events/event1.jpg",
    title: "Mid-Semester Assessments",
    subtitle: "October 13-15",
    description: "",
  },
  {
    date: "2025-10-14",
    image: "/events/event2.jpg",
    title: "Vocal Health Workshop",
    subtitle: "",
    description: "Brush-up on the basics of vocal health, explore vocal exercises and receive individual support!",
  },
  {
    date: "2025-10-15",
    image: "/events/event3.jpg",
    title: "Last Day of Fall Session 1 Classes",
    subtitle: "",
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
  const [calendarMonth, setCalendarMonth] = useState(9); // October
  const [calendarYear, setCalendarYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarDays = getCalendarDays(calendarYear, calendarMonth);
  const navScrolled = useNavScrolled();

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

  return (


    <div className="w-full">
      {/* Hero Section (banner, logo, nav, overlay headline) */}
      <section className="w-full h-screen ">
        {/* Navigation - fixed and always visible */}

        <nav className={`fixed top-0 left-0 w-full flex justify-center gap-8 py-6 z-50 transition-colors duration-300 ${navScrolled ? "bg-black/40 backdrop-blur-md border-b border-white/10" : "bg-black/20 backdrop-blur-sm"
          }`}>
          <ul className="flex flex-wrap justify-center gap-5 md:gap-8 items-center">
            {navItems.map((item) => (
              <li
                key={item}
                className="relative group font-medium md:font-semibold text-white text-xs md:text-sm tracking-wide whitespace-nowrap"
              >
                <a href="#" className="px-2 py-2">
                  {item}
                  <span className="absolute left-1/2 -bottom-1 w-4/5 h-[2px] bg-[#efa700] scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 origin-center -translate-x-1/2"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="fixed top-0 left-0 w-full h-full z-0">
          <img
            src="/VCET.jpg"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-[#0b1a3a]/10 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h1 className="text-7xl font-extrabold text-white drop-shadow-lg text-center">Velammal College</h1>
            <p className="mt-6 text-3xl font-bold text-white drop-shadow text-center">
              A Mission Defined by Possibility
            </p>
          </div>
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
                  {/* Vision */}
                  <div className="flex flex-col h-full border-b md:border-b-0 md:border-r border-blue-200 p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src="/Vision.jpg" alt="vision" className="w-10 h-10" />
                      <span className="font-bold text-2xl text-[#153962]">Vision</span>
                      <span className="ml-2 block h-1 w-12 bg-yellow-400 rounded"></span>
                    </div>
                    <div className="flex items-start mt-2 mb-6">
                      <span className="mt-1 text-xl text-[#153962] mr-3"><b>&#10148;</b></span>
                      <p className="font-semibold text-lg text-gray-800">
                        Transforming life through excellence in education and research.
                      </p>
                    </div>
                    <img src="/vissionbanner.jpg" alt="vision illustration" className="w-3/4 mx-auto mt-8" />
                  </div>
                  {/* Mission */}
                  <div className="flex flex-col h-full p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src="/Mission.jpg" alt="mission" className="w-10 h-10" />
                      <span className="font-bold text-2xl text-[#153962]">Mission</span>
                      <span className="ml-2 block h-1 w-12 bg-yellow-400 rounded"></span>
                    </div>
                    <ul className="flex flex-col gap-3 mt-3">
                      <li className="flex items-start">
                        <span className="mt-1 text-xl text-[#153962] mr-3"><b>&#10148;</b></span>
                        <span><b>World class Education:</b> Excellence in education, grounded in ethics and critical thinking, for improvement of life.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mt-1 text-xl text-[#153962] mr-3"><b>&#10148;</b></span>
                        <span><b>Cutting edge Research:</b> An innovation ecosystem to extend knowledge and solve critical problems.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mt-1 text-xl text-[#153962] mr-3"><b>&#10148;</b></span>
                        <span><b>Impactful People:</b> Happy, accountable, caring and effective workforce and students.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mt-1 text-xl text-[#153962] mr-3"><b>&#10148;</b></span>
                        <span><b>Rewarding Co-creations:</b> Active collaboration with national & international industries & universities for productivity and economic development.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mt-1 text-xl text-[#153962] mr-3"><b>&#10148;</b></span>
                        <span><b>Service to Society:</b> Service to the region and world through knowledge and compassion.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* DEPARTMENT SECTION */}
              <section className="px-6 py-12">
                <h2 className="text-4xl font-extrabold text-[#2860f1] text-center mb-10 tracking-wide">Departments</h2>
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
                        <h3 className="font-bold text-xl mb-2 text-[#1f4fe0] group-hover:text-white text-center transition-colors duration-200">
                          {dept.title}
                        </h3>
                        <div className="text-[#2a55a4] group-hover:text-white text-center font-semibold transition-colors">
                          Sanctioned Intake: {dept.intake}
                        </div>
                        <div className="text-[#2a55a4] group-hover:text-white text-center transition-colors mb-1">
                          Course Duration: {dept.duration} Years
                        </div>
                        <a
                          href={dept.more}
                          className="block font-bold text-[#4f7ff0] mt-4 hover:text-[#1f4fe0] transition group-hover:text-yellow-300 group-hover:underline text-center"
                        >
                          View More...
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Events Section */}
              <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-white py-8 px-4 md:px-8 shadow-none rounded-none mb-10 border-t-8 border-[#2860f1]">
                <h2 className="text-4xl font-extrabold text-[#2860f1] mb-8 text-center tracking-wide">Alverno Events</h2>
                <div className="flex flex-col md:flex-row gap-8">

                  {/* Calendar Card */}
                  <div className="bg-gradient-to-br from-[#eef4ff] to-[#dbe7ff] rounded-2xl shadow-lg p-5 w-full md:max-w-xs flex-shrink-0 text-[#0b2a63]">
                    <div className="text-lg font-semibold mb-4 flex justify-between items-center">
                      <button className="text-[#0b2a63] border-2 border-[#0b2a63] rounded px-2 py-1 hover:bg-white/60" onClick={goToPreviousMonth}>
                        &lt;
                      </button>
                      <span>
                        {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button className="text-[#0b2a63] border-2 border-[#0b2a63] rounded px-2 py-1 hover:bg-white/60" onClick={goToNextMonth}>
                        &gt;
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-center text-[#0b2a63] text-sm mb-2">
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
                                  ? "hover:bg-white hover:text-[#2860f1] bg-white/80 text-[#0b2a63]"
                                  : "text-[#8aa2d9] bg-transparent")
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
                      <div className="col-span-3 text-[#2860f1] text-lg p-8 text-center bg-blue-50 rounded-xl font-bold shadow">
                        No events for this date.
                      </div>
                    )}
                    {filteredEvents.map((event, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-xl shadow-lg overflow-hidden border border-[#2860f1]">
                        <div className="relative">
                          <img src={event.image} alt={event.title} className="w-full h-36 object-cover" />
                          <div className="absolute top-2 left-2 bg-[#4f7ff0] text-white rounded-md px-3 py-1 text-center shadow">
                            <div className="text-lg font-bold leading-none">{parseInt(event.date.split("-")[2], 10)}</div>
                            <div className="text-xs leading-none">{new Date(event.date).toLocaleString('default', { month: "short", year: "numeric" })}</div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="font-bold text-lg mb-1 text-[#2860f1]">{event.title}</div>
                          {event.subtitle && (
                            <div className="text-sm font-medium text-blue-800 mb-2">{event.subtitle}</div>
                          )}
                          {event.description && (
                            <div className="text-sm text-[#2052b8]">{event.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Placement Success Stories Marquee */}
              <section className="w-full py-12 bg-white overflow-hidden rounded-lg shadow mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                  Placement success stories to inspire yours
                </h2>
                <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
                  At KGISL MicroCollege, every placement has a story. We've guided 3000+ students, including those from non-coding backgrounds, to learn in-demand tech skills. Our alumni’s success—starting fresh and getting placed in the IT sector—defines who we are.
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
                        <div className="text-xs text-blue-200">{p.company}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* STRONG COUNT SECTION: blue/white theme */}
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


              {/* BOTTOM News Section */}
              <section className="py-10 px-2 md:px-8 rounded-lg shadow mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <NewsTicker height="h-96" />
                  </div>
                  <div />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div >
    </div >
  );
}
