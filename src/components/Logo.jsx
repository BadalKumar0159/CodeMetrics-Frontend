const CodeMetricsLogo = () => (
  <div className="flex items-center">
    <div className="relative h-16 w-20">
      {/* Center logo image */}
      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-center">
        <img
          src="/logo2.png" // Make sure this exists in the public folder
          alt="Codemetrics Logo"
          className="h-12 object-contain" // Increased from h-8 to h-12
        />
      </div>
    </div>

    <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400">
      CodeMetrics
    </span>
  </div>
);

export default CodeMetricsLogo;
