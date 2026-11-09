export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-dim/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Outer orbital spinning ring */}
        <div className="w-24 h-24 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        
        {/* Inner reverse spinning ring */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-secondary/20 border-b-secondary animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
        
        {/* Center glowing core emblem */}
        <div className="absolute flex items-center justify-center">
          <img
            src="/images/artboard-mark.png"
            alt="Islam Samy"
            className="h-8 w-auto object-contain filter drop-shadow-[0_0_16px_rgba(34,211,238,0.85)] brightness-110 animate-pulse"
          />
        </div>
      </div>

      {/* Cybernetic Telemetry Indicator */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
            TRANSMITTING TELEMETRY
          </span>
        </div>
        <p className="font-mono text-[11px] text-on-surface-variant/70 tracking-wider">
          SYNCHRONIZING SECURE REPOSITORY BUFFER...
        </p>
      </div>
    </div>
  );
}
