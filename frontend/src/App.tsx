import Chatbot from "./components/ChatBot";

function App() {
  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center">
            <a
              data-testId="title"
              href="#"
              className="text-white text-2xl font-bold"
            >
              JOSEPH DUNG
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-gray-300">
              ABOUT
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              DOWNLOAD
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              PRICING
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              FEATURES
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              CONTACT
            </a>
            <a
              href="#"
              className="bg-[#6366F1] text-white px-6 py-2 rounded-full hover:bg-[#5558DD]"
            >
              SIGN IN
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-white text-7xl font-bold">Welcome.</h1>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button className="bg-[#3B82F6] text-white px-8 py-3 rounded-full hover:bg-[#2563EB] transition-colors">
                  FREE TRIAL
                </button>
                <button className="border border-gray-700 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors">
                  see more
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Abstract Wave Pattern */}
              <svg
                className="w-full h-full"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#6366F1", stopOpacity: 0.2 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#A855F7", stopOpacity: 0.2 }}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M100,100 C150,150 200,50 250,100 S350,150 400,100 S450,50 500,100"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>

              {/* Content Overlay */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-right">
                <div className="mb-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle
                      cx="20"
                      cy="20"
                      r="20"
                      fill="#6366F1"
                      fillOpacity="0.2"
                    />
                    <circle cx="20" cy="20" r="10" fill="#6366F1" />
                  </svg>
                </div>
                <h2 className="text-white text-3xl mb-4">Landing page.</h2>
                <p className="text-gray-400 max-w-md ml-auto">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Purple Gradient Border */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
        </div>

        <Chatbot />
      </div>
    </>
  );
}

export default App;
