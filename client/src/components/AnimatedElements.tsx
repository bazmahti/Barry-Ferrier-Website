import { useInView, useCountUp, useTypewriter, useTilt } from "@/hooks/use-animations";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  duration = 0.6 
}: FadeInProps) {
  const { ref, isInView } = useInView();
  
  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isInView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{ 
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({ 
  end, 
  suffix = "", 
  prefix = "",
  className,
  duration = 2000 
}: AnimatedCounterProps) {
  const { count, ref } = useCountUp(end, duration);
  
  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  cursorClassName?: string;
}

export function TypewriterText({ 
  text, 
  className,
  speed = 50,
  cursorClassName = "text-neon-cyan"
}: TypewriterTextProps) {
  const { displayText, ref, isComplete } = useTypewriter(text, speed);
  
  return (
    <span ref={ref} className={className}>
      {displayText}
      <span 
        className={cn(
          "inline-block w-0.5 h-[1em] ml-1 align-middle",
          cursorClassName,
          isComplete ? "animate-pulse" : "animate-blink"
        )}
        style={{ backgroundColor: "currentColor" }}
      />
    </span>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export function TiltCard({ 
  children, 
  className,
  intensity = 8,
  glowColor = "neon-cyan"
}: TiltCardProps) {
  const { ref, transform } = useTilt(intensity);
  
  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-200 ease-out",
        "hover:shadow-lg",
        className
      )}
      style={{ transform }}
    >
      {children}
    </div>
  );
}

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: "cyan" | "magenta" | "purple" | "gold";
  animated?: boolean;
}

export function GlowingBorder({ 
  children, 
  className,
  color = "cyan",
  animated = true
}: GlowingBorderProps) {
  const colorMap = {
    cyan: "from-neon-cyan via-neon-purple to-neon-magenta",
    magenta: "from-neon-magenta via-neon-purple to-neon-cyan",
    purple: "from-neon-purple via-neon-magenta to-neon-cyan",
    gold: "from-gold via-amber-400 to-gold",
  };

  return (
    <div className={cn("relative group", className)}>
      <div 
        className={cn(
          "absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-75 blur-sm transition-all duration-500",
          colorMap[color],
          animated && "group-hover:opacity-100 group-hover:blur-md animate-gradient-shift",
          !animated && "group-hover:opacity-100"
        )}
      />
      <div className="relative bg-background rounded-lg">
        {children}
      </div>
    </div>
  );
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export function FloatingParticles({ 
  count = 30, 
  color = "neon-cyan",
  className 
}: FloatingParticlesProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        return (
          <div
            key={i}
            className={`absolute rounded-full bg-${color}/40`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${duration}s ease-in-out infinite, pulse-glow ${duration / 2}s ease-in-out infinite alternate`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

interface PulsingGlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function PulsingGlow({ children, className, color = "neon-cyan" }: PulsingGlowProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div 
        className={`absolute inset-0 bg-${color}/30 blur-xl animate-pulse-glow rounded-full`}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

interface StaggeredListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function StaggeredList({ 
  children, 
  className,
  staggerDelay = 0.1,
  direction = "up"
}: StaggeredListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeIn key={index} delay={index * staggerDelay} direction={direction}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
}

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <span
      className={cn("inline-block", className)}
      style={{
        background: "linear-gradient(135deg, hsl(190 95% 65%), hsl(280 85% 70%), hsl(320 90% 65%), hsl(190 95% 65%))",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "gradient-shift 4s ease infinite",
      }}
    >
      {children}
    </span>
  );
}

interface ScanlineEffectProps {
  className?: string;
}

export function ScanlineEffect({ className }: ScanlineEffectProps) {
  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none opacity-[0.02]", className)}
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
      }}
    />
  );
}

interface NeonLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  animated?: boolean;
}

export function NeonLine({ 
  orientation = "horizontal", 
  className,
  animated = true 
}: NeonLineProps) {
  const isHorizontal = orientation === "horizontal";
  
  return (
    <div 
      className={cn(
        "bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent",
        isHorizontal ? "h-px w-full" : "w-px h-full bg-gradient-to-b",
        animated && "animate-pulse",
        className
      )}
    />
  );
}
