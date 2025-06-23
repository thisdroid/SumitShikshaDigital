const AptitudeBanner = () => {
  return (
    // Wrapper - centers the box on page
    <div className="flex justify-center items-center w-full p-8">
      {/* Main contained box */}
      <div className="relative max-w-7xl w-full bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative px-12 py-8 lg:px-16 lg:py-10">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary decorative circle */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
            {/* Secondary decorative circle */}
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200/20 rounded-full blur-lg"></div>
          </div>

          {/* Content container */}
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side with text */}
            <div className="space-y-8">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Measure Your <span className="text-blue-600">Skills</span> with Our Official Aptitude Assessment
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Challenge yourself with our comprehensive aptitude assessments designed to measure your logical reasoning, numerical abilities, and problem-solving skills. Perfect for career advancement and personal growth.
              </p>

              <div>
                <a href="/home-courses/37/">
                  <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg">
                    Start Your Assessment
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>

            {/* Right side with exact puzzle arrangement - KEEPING ALL ANIMATIONS */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-64">
                {/* Main large plus shape - top left */}
                <div className="absolute top-8 left-8">
                  {/* Shadow */}
                  <div className="absolute top-4 left-4 w-20 h-20 opacity-30">
                    <div className="absolute top-1/2 left-0 w-full h-6 bg-blue-300 transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-6 h-full bg-blue-300 transform -translate-x-1/2"></div>
                  </div>
                  {/* Floating plus */}
                  <div
                    className="relative w-20 h-20 animate-bounce z-10"
                    style={{ animationDuration: "3s", animationDelay: "0s" }}
                  >
                    <div className="absolute top-1/2 left-0 w-full h-6 bg-blue-600 transform -translate-y-1/2 shadow-lg"></div>
                    <div className="absolute left-1/2 top-0 w-6 h-full bg-blue-600 transform -translate-x-1/2 shadow-lg"></div>
                  </div>
                </div>

                {/* Medium plus shape - top right */}
                <div className="absolute top-16 right-12">
                  {/* Shadow */}
                  <div className="absolute top-3 left-3 w-16 h-16 opacity-25">
                    <div className="absolute top-1/2 left-0 w-full h-5 bg-blue-300 transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-5 h-full bg-blue-300 transform -translate-x-1/2"></div>
                  </div>
                  {/* Floating plus */}
                  <div
                    className="relative w-16 h-16 animate-bounce z-10"
                    style={{ animationDuration: "3.5s", animationDelay: "1s" }}
                  >
                    <div className="absolute top-1/2 left-0 w-full h-5 bg-blue-500 transform -translate-y-1/2 shadow-lg"></div>
                    <div className="absolute left-1/2 top-0 w-5 h-full bg-blue-500 transform -translate-x-1/2 shadow-lg"></div>
                  </div>
                </div>

                {/* Large plus shape - bottom center */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                  {/* Shadow */}
                  <div className="absolute top-5 left-5 w-24 h-24 opacity-20">
                    <div className="absolute top-1/2 left-0 w-full h-7 bg-blue-300 transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-7 h-full bg-blue-300 transform -translate-x-1/2"></div>
                  </div>
                  {/* Floating plus */}
                  <div
                    className="relative w-24 h-24 animate-bounce z-10"
                    style={{ animationDuration: "4s", animationDelay: "2s" }}
                  >
                    <div className="absolute top-1/2 left-0 w-full h-7 bg-blue-700 transform -translate-y-1/2 shadow-lg"></div>
                    <div className="absolute left-1/2 top-0 w-7 h-full bg-blue-700 transform -translate-x-1/2 shadow-lg"></div>
                  </div>
                </div>

                {/* Small plus shape - middle left */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  {/* Shadow */}
                  <div className="absolute top-2 left-2 w-12 h-12 opacity-25">
                    <div className="absolute top-1/2 left-0 w-full h-4 bg-blue-300 transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-4 h-full bg-blue-300 transform -translate-x-1/2"></div>
                  </div>
                  {/* Floating plus */}
                  <div
                    className="relative w-12 h-12 animate-bounce z-10"
                    style={{ animationDuration: "3.2s", animationDelay: "0.5s" }}
                  >
                    <div className="absolute top-1/2 left-0 w-full h-4 bg-blue-400 transform -translate-y-1/2 shadow-md"></div>
                    <div className="absolute left-1/2 top-0 w-4 h-full bg-blue-400 transform -translate-x-1/2 shadow-md"></div>
                  </div>
                </div>

                {/* Medium plus shape - middle right */}
                <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                  {/* Shadow */}
                  <div className="absolute top-3 left-3 w-14 h-14 opacity-25">
                    <div className="absolute top-1/2 left-0 w-full h-4 bg-blue-300 transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-4 h-full bg-blue-300 transform -translate-x-1/2"></div>
                  </div>
                  {/* Floating plus */}
                  <div
                    className="relative w-14 h-14 animate-bounce z-10"
                    style={{ animationDuration: "3.8s", animationDelay: "1.5s" }}
                  >
                    <div className="absolute top-1/2 left-0 w-full h-4 bg-blue-500 transform -translate-y-1/2 shadow-lg"></div>
                    <div className="absolute left-1/2 top-0 w-4 h-full bg-blue-500 transform -translate-x-1/2 shadow-lg"></div>
                  </div>
                </div>

                {/* Star icon - top right corner */}
                <div className="absolute -top-4 -right-4 text-blue-300/50 animate-pulse z-20">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L15.09 8.09L22 9.9L17 14.5L18.18 21.33L12 18.13L5.82 21.33L7 14.5L2 9.9L8.91 8.09L12 2Z"></path>
                  </svg>
                </div>

                {/* Lightbulb icon - bottom left */}
                <div
                  className="absolute -bottom-8 -left-4 text-blue-300/40 animate-pulse z-20"
                  style={{ animationDelay: "1s" }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AptitudeBanner
