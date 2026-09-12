const CodeMetricsLogo = () => (
  <div className="flex items-center group -translate-x-5">
    <div className="relative h-12 sm:h-16 w-16 sm:w-20">
      <div className="absolute left-2 right-2 sm:left-4 sm:right-4 top-1/2 -translate-y-1/2 flex justify-center">
        <img
          src="/logo2.png"
          alt="Codemetrics Logo"
          className="h-8 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
    <div className="relative">
      <span className="font-extrabold text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400">
        CodeMetrics
      </span>
      <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"></div>
    </div>
  </div>
);

export default CodeMetricsLogo;
