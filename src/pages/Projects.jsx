// src/pages/Projects.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import CurrentBadge from "../components/CurrentBadge";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&@!";

function decodeText(target, ref, speed = 30) {
  let iterations = 0;
  const totalIterations = target.length;
  const resultArray = Array.from({ length: totalIterations }, () => "");

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      for (let i = 0; i < target.length; i++) {
        if (i < iterations) {
          resultArray[i] = target[i];
        } else {
          resultArray[i] = characters[Math.floor(Math.random() * characters.length)];
        }
      }

      iterations += 1;

      if (ref.current) {
        ref.current.textContent = resultArray.join("");
      }

      if (iterations > totalIterations) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

const projects = [
  {
    title: "RiskPulse: Real-Time Financial Fraud Analytics",
    language: "Python",
    objective: "Build a high-throughput, low-latency fraud detection engine capable of analyzing over 5,000 events/sec in financial transaction streams. The system blended machine learning with rule-based logic to enable sub-second response times, real-time monitoring, and model hot-swapping, ensuring fraud analysts could respond to threats instantly while maintaining explainability.",
    technologies: "Flask, Kafka, MongoDB",
    skills: "Event stream processing, multithreaded Flask workers, fraud detection, real-time APIs, model hot-swapping",
    current: true,
  },
  {
    title: "CovenantIQ: AI-Powered Contract Risk Analyzer",
    language: "Java, JavaScript",
    objective: "Develop a secure, multi-tenant platform for automating legal contract reviews by detecting risky clauses using NLP and regulatory logic. The tool streamlined clause extraction, risk tagging, and compliance reporting, enabling legal teams to cut contract review time by 40% and minimize manual effort across complex regulatory landscapes.",
    technologies: "Java Spring Boot, React, NLP",
    skills: "Multi-tenant architecture, clause extraction, RBAC, compliance automation",
    current: true,
  },
  {
    title: "VigilTrial: Clinical Trial Participant Tracker",
    language: "Python, JavaScript",
    objective: "Create a HIPAA-compliant platform for clinical research teams to manage participant consent, monitor adverse events, and track submission timelines in real time. The system used FastAPI and WebSockets to ensure audit-readiness, alert generation, and traceable compliance workflows across diverse stakeholders like coordinators, investigators, and CROs.",
    technologies: "FastAPI, React, WebSockets, MongoDB",
    skills: "Consent tracking, real-time alerts, audit trail generation, HIPAA-compliance",
  },
  {
    title: "E-commerce Sales Forecasting & Analytics Dashboard",
    language: "Python, SQL",
    objective: "Design a SKU-level forecasting and visualization pipeline to support inventory planning for e-commerce operations. The system leveraged ARIMA and Prophet models to capture seasonality and demand trends, while automated ETL pipelines and Tableau dashboards provided daily visibility for product and ops teams, reducing forecasting error by 15%.",
    technologies: "Pandas, SQL, Tableau, AWS RDS",
    skills: "Time-series forecasting, ARIMA/Prophet modeling, ETL, dashboard automation",
  },
  {
    title: "Serverless Job Market Analytics Pipeline",
    language: "Python",
    objective: "Build a fully serverless pipeline to analyze job market trends from 10,000+ listings, extracting salary and skill signals using custom NLP. This data was surfaced in Metabase dashboards to help education leaders and policy makers identify regional skill gaps and adjust curricula or workforce strategies, enabling evidence-based decision-making.",
    technologies: "BeautifulSoup, PostgreSQL, Metabase",
    skills: "Web scraping, NLP, job trend analytics, dashboard generation",
  },
  {
    title: "SecurePix",
    language: "Python",
    objective: "Develop a secure and user-friendly tool for image encryption and decryption, ensuring data confidentiality and secure user authentication.",
    technologies: "Django, Python, HTML, CSS, JavaScript, PyCryptodome, SQLite/PostgreSQL",
    skills: "Backend development, AES encryption, secure authentication, database management, web security, deployment",
  },
  {
    title: "Image Recognition as a Service",
    language: "Python, JavaScript",
    objective: "Develop a scalable and cost-efficient face recognition service with real-time insights.",
    technologies: "AWS (EC2, S3, SQS), TensorFlow, OpenCV, Node.js, React.js, PostgreSQL, Docker, Kubernetes",
    skills: "Cloud services, real-time processing, face recognition, asynchronous processing, containerization, orchestration",
  },
  {
    title: "Multiplayer Game Development",
    language: "C#",
    objective: "Create an engaging multiplayer game with smooth gameplay, efficient matchmaking, and high scalability.",
    technologies: ".NET, C#, Unity, Photon PUN, Azure, Azure Cosmos DB",
    skills: "Real-time game development, networking, cloud backend management, matchmaking, performance optimization",
  },
  {
    title: "Automated Log Analysis System",
    language: "Python",
    objective: "Automate log analysis to reduce downtime and speed up incident resolution.",
    technologies: "Python, ELK Stack, AWS (Lambda, S3, CloudWatch), Docker",
    skills: "Log analysis, automation, ELK Stack management, cloud deployment, real-time monitoring",
  },
  {
    title: "AWS IAM-Based Access Management System",
    language: "Java",
    objective: "Provide secure authentication and authorization using role-based access control in a scalable environment.",
    technologies: "Java Spring Boot, AWS (Cognito, DynamoDB, API Gateway), RBAC, JWT, OAuth 2.0",
    skills: "Secure backend development, RBAC implementation, API security, cloud integration, microservices",
  },
  {
    title: "AWS Cloud Support Tools",
    language: "Python",
    objective: "Automate issue detection and troubleshooting to reduce downtime and improve operational efficiency.",
    technologies: "AWS (CloudWatch, Lambda, SNS, S3, API Gateway, DynamoDB), Python, Docker, CloudFormation",
    skills: "Cloud monitoring, serverless automation, real-time alerting, troubleshooting, AWS integration",
  },
  {
    title: "AI-Powered Resume Parser",
    language: "Python",
    objective: "Automate resume data extraction to streamline the recruitment process.",
    technologies: "Flask, React.js, Python, SpaCy, PyPDF2/pdfplumber, SQLite/MongoDB, Docker",
    skills: "API development, NLP, resume parsing, database management, full-stack development, deployment",
  },
  {
    title: "Scalable Identity & Access Management System",
    language: "Python, Go",
    objective: "Provide secure, scalable authentication and authorization for multi-tenant environments.",
    technologies: "Python (FastAPI), Go, OAuth 2.0, JWT, AWS (Cognito, API Gateway, DynamoDB), Docker, Kubernetes",
    skills: "Microservices development, secure authentication, multi-tenancy, cloud orchestration, zero-trust security",
  },
  {
    title: "Twitter Analysis System",
    language: "Java, Python",
    objective: "Perform real-time sentiment analysis on Twitter data and deliver actionable insights via interactive dashboards.",
    technologies: "Java, Spring Boot, Twitter API, Python (TextBlob/VADER), MongoDB, Plotly/Matplotlib, Docker, Kubernetes",
    skills: "Real-time data pipelines, NLP, API integration, secure API development, interactive data visualization, containerization",
  },
  {
    title: "Dream House",
    language: "Java",
    objective: "Create a user-friendly platform that integrates financial planning tools and property customization features.",
    technologies: "Android Studio (Java, XML), HTML, CSS, JavaScript, Firebase, Payment Gateway Integration, Google Maps API",
    skills: "Mobile app development, web design, real-time database management, financial calculator integration, secure transactions",
  }
  
];


export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (selectedProject && titleRef.current) {
      decodeText(selectedProject.title, titleRef);
    }
  }, [selectedProject]);

  return (
    <section className="py-24 px-6 sm:px-12 bg-gradient-to-br from-white/30 to-gray-100/30 dark:from-black/30 dark:to-gray-900/30 ml-7 sm:ml-0 lg:ml-7">
      <div className="max-w-6xl mx-auto">
       <SectionHeading
         label="Selected Work"
         title="Projects"
         subtitle="A few things I’ve built recently."
         align="center"
       />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="relative rounded-2xl backdrop-blur-lg bg-white/40 dark:bg-white/10
                        border border-white/30 p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Current badge overlay */}
              {project.current && (
                <div className="absolute top-3 right-3 z-10">
                  <CurrentBadge tone="emerald" size="xs" blink />
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {project.language}
              </p>
            </motion.div>
          ))}
        </div>


        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="backdrop-blur-xl bg-white/80 dark:bg-white/5 dark:from-white/5 dark:to-white/0 border border-gray-300 dark:border-white/20 shadow-xl rounded-[2rem] p-6 w-full max-w-2xl transition-all duration-300 text-gray-800 dark:text-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    <h3
                      className="text-3xl font-bold text-gray-900 dark:text-white"
                      ref={titleRef}
                    >
                      {selectedProject.title}
                    </h3>
                    {selectedProject.current && (
                      <CurrentBadge tone="emerald" size="xs" blink />
                    )}
                  </motion.div>

                  <motion.p
                    className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <strong>Tech Stack:</strong> {selectedProject.technologies}
                  </motion.p>
                </div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedProject.objective}
                    </p>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <strong>Skills:</strong> {selectedProject.skills}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}