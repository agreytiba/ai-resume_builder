"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import resumePreview from "@/assets/sample.jpg";
import logo from "@/assets/LOGO.jpg";
import CvTemplate from "@/assets/steps.jpg";

export default function Page() {
  useEffect(() => {
    // Smooth scroll animations on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Framer motion animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-200 px-8 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Link href={"/resume"}>
            <Image
              src={logo}
              alt="Logo"
              width={80}
              height={80}
              className="rounded"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-6 text-gray-600">
            <Link href="#home" className="hover:text-gray-800">
              Home
            </Link>
            <Link href="#about" className="hover:text-gray-800">
              About
            </Link>
          </nav>
          <Link href="/sign-in">
            <p className="rounded-md bg-yellow-500 px-4 py-2 text-black hover:bg-blue-700 hover:text-white">
              Sign In
            </p>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        id="home"
        className="flex h-screen flex-col items-center px-8 py-16 lg:flex-row lg:items-start"
      >
        <div className="max-w-2xl flex-1 space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Fast AI CV Builder
          </h1>
          <p className="my-2 text-2xl font-semibold">
            Your AI-Powered Resume Builder
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Craft a professional and tailored resume effortlessly with our
            AI-powered builder. Showcase your skills, experience, and
            achievements to stand out in today&apos;s competitive job market.
          </p>
          <div className="mt-8 flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <Link
              href={"/select-template"}
              className="rounded-lg bg-yellow-500 px-6 py-3 text-black shadow-lg hover:opacity-50 hover:shadow-sm"
            >
              Build Your Resume / CV
            </Link>
            <div>
              <span className="font-semibold text-gray-700">
                Call us: 0735-338-149
              </span>
              <p className="text-gray-500">
                We’re here to assist you with any questions.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="h-full flex-1"
        >
          <Image
            src={resumePreview}
            alt="AI Resume Preview"
            width={400}
            height={350}
            className="mx-auto rounded-lg shadow-lg"
            style={{
              transform: "rotateY(35deg)", // Rotate the image on the Y-axis
            }}
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        id="about"
        className="bg-gray-800 px-8 py-16"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Advantages of Using AI Resume Builder
          </h2>
          <p className="mt-4 text-gray-300">
            Leverage the power of AI to create professional, personalized
            resumes that stand out.
          </p>
        </div>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={slideInLeft}
        >
          {[
            {
              icon: "📄",
              title: "Tailored Resumes",
              desc: "Get resumes customized to your industry, role, and career goals effortlessly.",
            },
            {
              icon: "⚙️",
              title: "AI-Driven Suggestions",
              desc: "Let AI enhance your resume with optimized content and formatting.",
            },
            {
              icon: "📊",
              title: "Instant Feedback",
              desc: "Receive real-time feedback and suggestions to improve your resume’s impact.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-lg bg-yellow-500 p-6 text-center shadow-lg"
            >
              <div className="mb-4 rounded-full bg-blue-100 p-4">
                <span className="text-3xl text-blue-600">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        id="works"
        className="bg-gray-50 px-8 py-16"
      >
        <div className="flex flex-col items-center lg:flex-row lg:space-x-8">
          {/* Left: Image */}
          <motion.div
            variants={slideInRight}
            className="flex flex-col space-y-6 sm:hidden md:block lg:block"
          >
            <Image
              src={CvTemplate} // Replace with your actual image path
              alt="CV Builder Interface"
              className="rounded-lg shadow-lg"
              height={550}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={slideInLeft}
            className="mt-8 max-w-lg rounded-sm border-2 border-gray-700 text-center lg:mt-0 lg:text-left"
          >
            <h2 className="bg-gray-700 py-3 text-3xl font-semibold text-yellow-500 lg:text-center">
              How It Works
            </h2>
            <div className="space-y-4 p-4">
              <h3 className="mt-2 text-xl font-bold text-gray-900">
                Create a Winning CV in 3 Simple Steps
              </h3>
              <p className="mt-4 text-gray-600">
                Our AI-powered CV builder makes it effortless to craft a
                professional resume tailored to your needs. Just follow these
                three steps to get started.
              </p>
              {/* Steps */}
              <div className="mt-6 space-y-4">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-yellow-500 p-3 text-white">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Choose a Template
                    </h4>
                    <p className="text-gray-600">
                      Select from a range of modern, professional templates that
                      suit your industry and style.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-yellow-500 p-3 text-white">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Enter Your Details
                    </h4>
                    <p className="text-gray-600">
                      Add your person details,
                      experience,education,skills,proffesional summarry . Let
                      our AI optimize the layout and content.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-yellow-500 p-3 text-white">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Download and Share
                    </h4>
                    <p className="text-gray-600">
                      Review your CV and download it in a format of your choice,
                      ready to impress employers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-action Button */}
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <button className="flex items-center space-x-2 rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-lg hover:opacity-50">
                  <span className="rounded-full bg-white p-2 text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-4.796-2.398a1 1 0 00-1.456.894v4.796a1 1 0 001.456.894l4.796-2.398a1 1 0 000-1.788z"
                      />
                    </svg>
                  </span>
                  <Link href={"/select-template"}>Start Building Now</Link>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 px-8 py-16">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-yellow-500">Contact Us</h3>
            <p className="mt-4 text-gray-300">
              Have questions? Feel free to contact us. We’re here to assist you!
            </p>
          </div>
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="rounded-md border border-gray-700 bg-gray-800 p-3 text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="rounded-md border border-gray-700 bg-gray-800 p-3 text-white"
            />
            <textarea
              placeholder="Your Message"
              className="rounded-md border border-gray-700 bg-gray-800 p-3 text-white"
            ></textarea>
            <button
              type="submit"
              className="rounded-md bg-yellow-500 p-3 font-semibold text-black hover:bg-blue-700 hover:text-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
