export default function WelcomeSection({ welcome }) {
  return (
    <div className="relative">
      <div className="h-56 sm:h-72 overflow-hidden">
        <img
          src={welcome.image}
          alt={welcome.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-sm uppercase tracking-widest opacity-80 mb-1">
          {welcome.subtitle}
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
          {welcome.title}
        </h1>
      </div>
    </div>
  );
}
