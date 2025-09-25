import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { myProjects } from "../constants"; // your project data
import { Particles } from "../components/Particles";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 2 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
    hidden: { opacity: 0, scale: 0.3, zIndex: 0, x: "0%" },
  };

  // Auto-scroll (paused when a project is selected)
  useEffect(() => {
    if (selectedProject) return; // Pause auto-scroll when modal is open

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % myProjects.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedProject]);

  // Get position for each image
  const getPosition = (i) => {
    const diff = (i - activeIndex + myProjects.length) % myProjects.length;
    return diff < positions.length ? positions[diff] : "hidden";
  };

  return (
    <>
      <div className="w-full pt-4 md:pt-6">
            
        <h2 className="text-white text-3xl font-bold  text-center">my selected projects</h2>
      </div>
      <section
        id="project"
        className="flex flex-col items-center justify-start h-[60vh] md:h-[55vh] relative pt-2 md:pt-4"
      >
        <Particles
          className="absolute inset-0 -z-50"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />
 
      {/* Carousel */}
      {myProjects.map((project, index) => {
        const position = getPosition(index);
        if (position === "hidden") return null;
        const isCenter = position === "center";

        return (
          <motion.img
            key={project.id}
            src={project.image}
            alt={project.title}
            className="rounded-[12px] select-none cursor-pointer"
            initial="center"
            animate={position}
            variants={imageVariants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: "40%",
              position: "absolute",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
            whileHover={isCenter ? { scale: 1.1, zIndex: 10 } : {}}
            onClick={() => isCenter && setSelectedProject(project)}
          />
        );
      })}

      {/* Selected Project Details */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-neutral-900 text-white rounded-xl shadow-2xl w-[70vw] h-[70vh] p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              onClick={() => setSelectedProject(null)}
            >
              <img src="/assets/close.svg" alt="Close" className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex flex-col gap-4 h-full">
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>

              {/* Image and basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-56 md:h-auto max-h-[60vh] object-contain rounded-lg bg-neutral-900/30 p-2"
                />

                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-200">
                    {selectedProject.description}
                  </p>

                  {selectedProject.subDescription && (
                    <div>
                      <p className="font-semibold mb-2">Highlights</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {Array.isArray(selectedProject.subDescription) ? (
                          selectedProject.subDescription.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-300">
                              {item}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-300">
                            {selectedProject.subDescription}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedProject.tags?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold mb-2">Tech</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((t) => (
                          <span
                            key={t.id}
                            className="px-2 py-1 rounded bg-white/10 text-xs"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.href && selectedProject.href.length > 0 && (
                    <div className="mt-auto">
                      <a
                        href={selectedProject.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition text-sm"
                      >
                        Visit Project
                        <img src="/assets/arrow-up.svg" alt="" className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
    <div className="w-full mt-1">
      <p className="text-center text-xs text-neutral-400">Click on a project to read more</p>
    </div>
      <div className="w-full mt-1">
      <p className="text-center text-xs text-neutral-400">For More Projects visit <a href="https://github.com/piyushh2304" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">my GitHub</a></p>
    </div>
    </>
  );
};

export default Projects;

