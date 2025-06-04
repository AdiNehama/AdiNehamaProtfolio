import { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Briefcase,
  Code,
  Palette,
  Figma,
} from "lucide-react";
import ScrollToTop from "../src/components/scrollToTop";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../src/components/Footer/footer";

// Centralized image configuration
const siteImages = {
  profile: "/images/me_.jpeg",
  projects: {
    SuperEZ: ["/images/5.png", "/videos/SuperEz1.mp4", "/videos/SuperEz2.mp4"],
    Tapp: ["/images/3.png", "/videos/Tapp1.mp4"],
    Bono: ["/images/4.png", "/videos/bonoWebsite.mp4"],
    IritWebsite: ["/images/2.png", "/videos/eli.mp4"],
  },
  logos: {
    techStartup: "/images/SuperEZlogo.png",
    ecoBrand: "/images/IritRanCohenlogo.jpg",
    fashionBrand: "/images/GetPetlogo.png",
    foodDelivery: "/images/Picologo.png",
  },
};

interface Project {
  title: string;
  description: string;
  media: string[];
  tags: string[];
  links: {
    github?: string;
    Figma?: string;
    Live?: string;
  };
}

const projects: Project[] = [
  {
    title: "Landing Page for Tapp – Interactive Widget Playground",
    description:
      "An interactive landing page showcasing mini-games as home screen widgets. The site features a live widget playground, allowing users to experience real-time interactive widgets with smooth animations. Designed for Tapp, it highlights how the platform enhances user engagement and retention.",
    media: siteImages.projects.Tapp,
    tags: [
      "UI/UX",
      "React",
      "Html",
      "CSS",
      "TypeScript",
      "JavaScript",
      "Node.js",
    ],
    links: {
      Live: "https://www.tappgo.com/",
    },
  },
  {
    title: "Social Food MarketPlace",
    description:
      "Complete FullStack brand identity design including logo, typography, and design system documentation.",
    media: siteImages.projects.Bono,
    tags: ["Branding", "UI Design", "Design Systems"],
    links: {
      Figma:
        "https://www.figma.com/design/BK5EoKF9MORGbtBLVB8dCI/Bono-Website?node-id=0-1&t=j5KK8GdWrg5QZY5C-1",
      Live: "https://www.bonoeat.com/",
    },
  },
  {
    title: "Fully Designed and Developed Website",
    description:
      "A modern Website focused on to convey professionalism with a clean design.",
    media: siteImages.projects.IritWebsite,
    tags: [
      "UI/UX",
      "React",
      "Html",
      "CSS",
      "TypeScript",
      "Node.js",
      "logo",
      "marketing",
    ],
    links: {
      Live: "https://eli-m40t.onrender.com/",
    },
  },
  {
    title: "Online SuperMarket System",
    description:
      "A full-stack system that lets users compare shopping cart prices, including delivery fees, across supermarkets and automatically transfers their cart to the selected supermarket's checkout.",
    media: siteImages.projects.SuperEZ,
    tags: [
      "React",
      "Html",
      "CSS",
      "Python",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Material Design",
    ],
    links: {
      github: "https://github.com/ofekshp/SuperEZ",
      Figma:
        "https://www.figma.com/design/hvtMERuXEn6wGSgLbElbLA/SuperEZ?node-id=34-2280&t=zLtRCexOLNgRTois-1",
    },
  },
];

function MediaSlider({ media }: { media: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  useEffect(() => {
    if (!isVisible) return;

    const currentMedia = media[currentIndex];

    if (!currentMedia.endsWith(".mp4")) {
      intervalRef.current = setTimeout(nextSlide, 3000);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [currentIndex, media, isVisible]);

  const handleVideoEnd = () => {
    nextSlide();
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length
    );
  };

  return (
    <div ref={sliderRef} className="intro-slider relative overflow-hidden">
      <div
        className={`slider flex transition-transform duration-500 ${
          !isVisible ? "opacity-0" : "opacity-100"
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {media.map((src, index) =>
          src.endsWith(".mp4") ? (
            <video
              key={index}
              className="w-full h-auto"
              controls
              autoPlay={isVisible}
              muted
              ref={index === currentIndex ? videoRef : null}
              onEnded={handleVideoEnd}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={index}
              src={src}
              alt={`Media ${index + 1}`}
              className="w-full h-auto"
            />
          )
        )}
      </div>
      {isVisible && (
        <>
          <button
            className="prev-btn absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 active:scale-95 transition-all duration-200"
            onClick={prevSlide}
          >
            ←
          </button>
          <button
            className="next-btn absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-600 active:scale-95 transition-all duration-200"
            onClick={nextSlide}
          >
            →
          </button>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={projectRef}
      className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <MediaSlider media={project.media} />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Github size={20} />
              <span>Code</span>
            </a>
          )}
          {project.links.Figma && (
            <a
              href={project.links.Figma}
              target="_blank"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Figma size={20} />
              <span>Figma</span>
            </a>
          )}
          {project.links.Live && (
            <a
              href={project.links.Live}
              target="_blank"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ExternalLink size={20} />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".hidden-element");
    hiddenElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <header className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Title */}
              <div className="text-left space-y-8">
                <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-tight">
                  Full-Stack Developer
                </h1>
                <p className="text-xl md:text-2xl text-gray-600">
                  Crafting digital experiences and professional websites through
                  code and design
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/AdiNehama"
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adi-nehama-194222253/"
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="mailto:adinehama6@gmail.com"
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>

              {/* Right side - About Me */}
              <div className="bg-white/80 rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-32 h-32 relative group mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse group-hover:animate-none transition-all duration-300"></div>
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                    <img
                      src={siteImages.profile}
                      alt="Adi"
                      className="absolute inset-2 rounded-full object-cover w-[calc(100%-16px)] h-[calc(100%-16px)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Hey there! Thank you for visiting my portfolio :)
                  <br />
                  I'm Adi Nehama, a full-stack developer and designer with a
                  Computer Science degree, blending technical expertise with
                  creative vision to craft beautiful, functional digital
                  experiences.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50">
                    <Code size={20} className="text-indigo-600" />
                    <span className="text-indigo-600">Development</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50">
                    <Palette size={20} className="text-purple-600" />
                    <span className="text-purple-600">UI/UX Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Projects Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Briefcase size={24} className="text-indigo-600" />
              <h2 className="text-4xl font-bold text-center text-gray-800">
                Featured Projects
              </h2>
            </div>
            <p className="text-gray-600 text-center mb-12">
              Some of my recent development work
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
