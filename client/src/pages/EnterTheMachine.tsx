import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Play, Pause, Monitor, Calendar, Cog, Zap, ArrowRight, 
  Volume2, VolumeX, Power, DoorOpen, Home, Factory, Music, 
  Palmtree, Camera, Circle, ChevronRight, Sparkles, Eye
} from "lucide-react";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard } from "@/components/AnimatedElements";
import machineImage from "@/assets/enter-the-machine/the-machine.jpg";

const AREAS = {
  dormitory: {
    name: "Dormitory",
    icon: Home,
    color: "neon-cyan",
    bgGradient: "from-cyan-900/30 via-background to-background",
    description: "Click anagram button",
    ambient: "Ambient Moments"
  },
  factory: {
    name: "Acme Baby Factory",
    icon: Factory,
    color: "neon-magenta",
    bgGradient: "from-pink-900/30 via-background to-background",
    description: "Phone now for a new tot!",
    ambient: "Welcome to Acme Baby Factory"
  },
  techno: {
    name: "Techno Zone",
    icon: Music,
    color: "neon-purple",
    bgGradient: "from-purple-900/30 via-background to-background",
    description: "Future Shock",
    ambient: "Gothic"
  },
  island: {
    name: "The Island",
    icon: Palmtree,
    color: "green-500",
    bgGradient: "from-green-900/30 via-background to-background",
    description: "Time is a Journey...",
    ambient: "Psychology Today"
  }
};

const DOOR_SPEECHES = [
  "click to access main pump mechanism and interactive node",
  "click here to progress to pumping station",
  "yes, this is the next door. click here and look for the node"
];

const LOST_SPEECHES = [
  "Man, like I'm sorry? Arm, well. Just Try clicking on stuff. there's gotta be a way out, you know?",
  "Damn. Where are we? My God, how embarrassing, I've never, like, actually got lost in my own mind before. I'm sorry. Keep clicking while I consult the manual",
  "God damnit, I don't recognise this at all. Like, damn click on the moon, will you, it's right in the middle!",
  "Holy Shit, what now? I think we've come the wrong way. Try clicking on stuff. there's gotta be a way out"
];

const TRANSPORT_SPEECHES = [
  "releasing transporter module. Fasten your safety belt. No smoking. Please refrain from leaning out of the windows.",
  "now, don't panic, remain seated and in the event of an emergency pull down the oxygen masks",
  "generating anagram",
  "On ward, and on ward, they travelled."
];

const QUIRKY_PHRASES = [
  "yuck",
  "yeah!",
  "oh yeah",
  "nah nah na nah nah",
  "seeing sights no one had ever seen before"
];

type AreaKey = keyof typeof AREAS;

function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text: string, rate: number = 0.9) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 0.8;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking };
}

function InteractiveMachine() {
  const [isActivated, setIsActivated] = useState(true);
  const [currentArea, setCurrentArea] = useState<AreaKey | null>(null);
  const [navBarText, setNavBarText] = useState("Select an area to explore The Machine");
  const [unitsProduced, setUnitsProduced] = useState(100);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [doorOpen, setDoorOpen] = useState(false);
  const [securityCamActive, setSecurityCamActive] = useState(false);
  const [mirrorballSpinning, setMirrorballSpinning] = useState(false);
  
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const activateMachine = () => {
    setIsActivated(true);
    if (audioEnabled) {
      speak("Initiating system. Welcome to the machine.");
    }
    setNavBarText("...and so the journey began...");
    
    intervalRef.current = setInterval(() => {
      setUnitsProduced(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
  };

  const deactivateMachine = () => {
    setIsActivated(false);
    setCurrentArea(null);
    setUnitsProduced(0);
    setNavBarText("Click to enter The Machine");
    setDoorOpen(false);
    if (audioEnabled) {
      speak("System shutdown complete.");
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const navigateToArea = (area: AreaKey) => {
    if (audioEnabled) {
      speak(getRandomItem(TRANSPORT_SPEECHES));
    }
    setCurrentArea(area);
    setNavBarText(AREAS[area].description);
  };

  const handleDoorHover = () => {
    setHoveredElement("door");
    if (audioEnabled) {
      speak(getRandomItem(DOOR_SPEECHES));
    }
    setNavBarText("Click to Open");
  };

  const handleDoorClick = () => {
    setDoorOpen(true);
    setNavBarText("Door opened! Explore the area...");
    if (audioEnabled) {
      speak("Access granted. Entering new sector.");
    }
  };

  const handlePowerButtonHover = () => {
    setHoveredElement("power");
    setNavBarText(isActivated ? "Click to turn off" : "Click to activate The Machine");
  };

  const handleSecurityCamHover = () => {
    setHoveredElement("camera");
    setSecurityCamActive(true);
    setNavBarText("View: Security Camera 3");
  };

  const handleMirrorballHover = () => {
    setHoveredElement("mirrorball");
    setMirrorballSpinning(true);
    if (audioEnabled) {
      speak(getRandomItem(QUIRKY_PHRASES));
    }
  };

  const handleRandomClick = () => {
    if (audioEnabled && Math.random() > 0.5) {
      speak(getRandomItem(LOST_SPEECHES));
    }
    setNavBarText(getRandomItem(["Adult Entertainment is off air", "Masochist's Self Improvement", "Shelter from the storm"]));
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
    setSecurityCamActive(false);
    setMirrorballSpinning(false);
    if (currentArea) {
      setNavBarText(AREAS[currentArea].ambient);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stop();
    };
  }, [stop]);

  const areaConfig = currentArea ? AREAS[currentArea] : null;

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-6">
      <div 
        className={`h-10 rounded-lg border border-neon-cyan/30 bg-black/80 flex items-center px-4 font-mono text-sm transition-colors duration-300 ${
          isSpeaking ? 'border-neon-magenta/50 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : ''
        }`}
        data-testid="nav-bar"
      >
        <span className="text-neon-cyan mr-2">&gt;</span>
        <span className="text-foreground animate-pulse">{navBarText}</span>
        {isSpeaking && (
          <span className="ml-auto flex items-center gap-1 text-neon-magenta">
            <Volume2 className="w-4 h-4 animate-pulse" />
            Speaking...
          </span>
        )}
      </div>

      <TiltCard intensity={3}>
        <GlowingBorder color="cyan" animated>
          <div 
            className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
              currentArea ? `bg-gradient-to-br ${areaConfig?.bgGradient}` : ''
            }`}
          >
            {!currentArea ? (
              <>
                <img 
                  src={machineImage}
                  alt="Enter the Machine - Interactive Art Interface"
                  className={`w-full h-auto transition-all duration-500 ${isActivated ? 'brightness-110' : 'brightness-75 hover:brightness-90'}`}
                  onClick={!isActivated ? activateMachine : undefined}
                  data-testid="img-machine-interface"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </>
            ) : (
              <div className="min-h-[400px] md:min-h-[500px] p-6 md:p-8 relative">
                <div className="absolute top-4 left-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setCurrentArea(null); setNavBarText("Main control room"); }}
                    className="border-white/20 bg-black/50"
                    data-testid="button-back"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Back to Control
                  </Button>
                </div>

                <div className="flex flex-col items-center justify-center h-full pt-12">
                  <div className="text-center mb-8">
                    {areaConfig && (
                      <>
                        <areaConfig.icon className={`w-16 h-16 mx-auto mb-4 text-${areaConfig.color}`} />
                        <h3 className={`text-3xl font-serif font-bold text-${areaConfig.color} mb-2`}>
                          {areaConfig.name}
                        </h3>
                        <p className="text-muted-foreground">{areaConfig.ambient}</p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
                    <InteractiveElement 
                      icon={DoorOpen}
                      label="Grate Door"
                      isHovered={hoveredElement === "door"}
                      isActive={doorOpen}
                      onHover={handleDoorHover}
                      onClick={handleDoorClick}
                      onLeave={handleMouseLeave}
                      color="cyan"
                    />
                    <InteractiveElement 
                      icon={Camera}
                      label="Security Cam"
                      isHovered={hoveredElement === "camera"}
                      isActive={securityCamActive}
                      onHover={handleSecurityCamHover}
                      onClick={handleRandomClick}
                      onLeave={handleMouseLeave}
                      color="purple"
                    />
                    <InteractiveElement 
                      icon={Circle}
                      label="Mirrorball"
                      isHovered={hoveredElement === "mirrorball"}
                      isActive={mirrorballSpinning}
                      onHover={handleMirrorballHover}
                      onClick={handleRandomClick}
                      onLeave={handleMouseLeave}
                      color="magenta"
                      spinning={mirrorballSpinning}
                    />
                    <InteractiveElement 
                      icon={Eye}
                      label="Fatcom"
                      isHovered={hoveredElement === "fatcom"}
                      isActive={false}
                      onHover={() => { 
                        setHoveredElement("fatcom"); 
                        setNavBarText("yuck"); 
                        if (audioEnabled) speak("yuck");
                      }}
                      onClick={handleRandomClick}
                      onLeave={handleMouseLeave}
                      color="green"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={isActivated ? deactivateMachine : activateMachine}
                    onMouseEnter={handlePowerButtonHover}
                    onMouseLeave={handleMouseLeave}
                    className={`${isActivated ? 'bg-red-600 hover:bg-red-700' : 'bg-neon-cyan hover:bg-neon-cyan/80'} text-background`}
                    data-testid="button-power"
                  >
                    {isActivated ? <Pause className="w-4 h-4 mr-2" /> : <Power className="w-4 h-4 mr-2" />}
                    {isActivated ? 'Shutdown' : 'Activate'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      setAudioEnabled(!audioEnabled);
                      if (!audioEnabled) {
                        speak("Audio enabled. Welcome to the machine.");
                      }
                    }}
                    className={`border-neon-cyan/50 ${audioEnabled ? 'bg-neon-cyan/20' : ''}`}
                    data-testid="button-audio"
                  >
                    {audioEnabled ? <Volume2 className="w-4 h-4 text-neon-cyan" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
                
                <div className="font-mono text-neon-cyan text-center sm:text-right">
                  <span className="text-xs text-muted-foreground mr-2">Units Produced:</span>
                  <span className="text-2xl font-bold" data-testid="text-units">{unitsProduced}</span>
                </div>
              </div>
            </div>
          </div>
        </GlowingBorder>
      </TiltCard>

      {isActivated && !currentArea && (
        <FadeIn direction="up">
          <div className="text-center mb-4">
            <p className="text-neon-cyan font-mono text-sm animate-pulse">
              ▼ CLICK AN AREA TO EXPLORE THE MACHINE ▼
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(AREAS) as AreaKey[]).map((areaKey) => {
              const area = AREAS[areaKey];
              return (
                <button
                  key={areaKey}
                  className="h-32 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-neon-cyan/40 bg-black/50 hover:border-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 group cursor-pointer"
                  onClick={() => navigateToArea(areaKey)}
                  onMouseEnter={() => setNavBarText(`Jump to ${area.name}`)}
                  onMouseLeave={() => setNavBarText("Select a destination")}
                  data-testid={`button-area-${areaKey}`}
                >
                  <area.icon className="w-10 h-10 text-neon-cyan group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-base font-semibold text-foreground group-hover:text-neon-cyan transition-colors">{area.name}</span>
                  <span className="text-xs text-muted-foreground">{area.ambient}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>
      )}
    </div>
  );
}

interface InteractiveElementProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isHovered: boolean;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
  onLeave: () => void;
  color: string;
  spinning?: boolean;
}

function InteractiveElement({ 
  icon: Icon, 
  label, 
  isHovered, 
  isActive, 
  onHover, 
  onClick, 
  onLeave, 
  color,
  spinning 
}: InteractiveElementProps) {
  return (
    <button
      className={`
        p-4 rounded-lg border transition-all duration-300 flex flex-col items-center gap-2
        ${isHovered ? `border-neon-${color} bg-neon-${color}/20 shadow-[0_0_15px_rgba(0,255,255,0.3)]` : 'border-white/10 bg-black/30'}
        ${isActive ? 'ring-2 ring-neon-cyan ring-offset-2 ring-offset-black' : ''}
        hover:scale-105 active:scale-95
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-testid={`element-${label.toLowerCase().replace(' ', '-')}`}
    >
      <Icon className={`w-8 h-8 ${spinning ? 'animate-spin' : ''} ${isHovered ? 'text-neon-cyan' : 'text-white/60'}`} />
      <span className={`text-xs font-mono ${isHovered ? 'text-neon-cyan' : 'text-white/40'}`}>{label}</span>
    </button>
  );
}

const mediaFiles = [
  { name: "bird in the clouds", type: "Experimental Animation", duration: "~2 min" },
  { name: "Cells", type: "Microscopic Journey", duration: "~1 min" },
  { name: "elfy", type: "Character Animation", duration: "~30 sec" },
  { name: "jabberwock", type: "Literary Visualization", duration: "~45 sec" },
  { name: "Pink One", type: "Abstract Art", duration: "~2 min" },
  { name: "Boof & Dick", type: "Feature Animation", duration: "~15 min" },
];

function TechnicalSpecs() {
  return (
    <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn direction="left">
            <div className="space-y-6">
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                <Cpu className="w-3 h-3 mr-1" />
                Technical Details
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                About the Experience
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Enter the Machine</strong> was created in 2004 using 
                  Macromedia Director and Shockwave technology—cutting-edge multimedia tools of the era that 
                  enabled rich interactive experiences before modern web standards existed.
                </p>
                <p>
                  The interactive recreation above is based on the <strong className="text-neon-cyan">original Lingo scripts</strong> extracted 
                  from the PowerPC Shockwave projector using specialized decompilation tools. The original featured 
                  multiple explorable areas including the "Acme Baby Factory," synthesized speech, and an intricate 
                  system of rollover interactions and sound effects.
                </p>
                <p>
                  Originally distributed on CD-ROM for both Macintosh and Windows platforms, The Machine 
                  represents an important milestone in Doctor Baz's exploration of interactive multimedia art.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Cog className="w-5 h-5 text-neon-cyan" />
                  Original Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Year Created:</span>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> 2004
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Technology:</span>
                    <p className="font-medium">Macromedia Director MX 2004</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Format:</span>
                    <p className="font-medium">Shockwave DCR/DXR</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Distribution:</span>
                    <p className="font-medium">CD-ROM</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Platforms:</span>
                    <p className="font-medium">Mac OS X (PowerPC), Windows</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Media:</span>
                    <p className="font-medium">QuickTime Video</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium text-foreground mb-3">Original Features (Preserved)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                      <span>Text-to-speech (voiceSpeak) integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                      <span>Multi-room navigation (Dormitory, Factory, Techno, Island)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                      <span>Rollover behaviors with random responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                      <span>Dynamic nav bar status text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-neon-magenta mt-0.5 shrink-0" />
                      <span>"Acme Baby Factory" surreal humor</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function MediaContent() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 mb-4">
              <Monitor className="w-3 h-3 mr-1" />
              Original Media
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Inside the Machine
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The original experience contained multiple video artworks, each offering a unique journey 
              through experimental animation and visual storytelling.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaFiles.map((media, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <Card className="bg-card/50 border-border/50 hover-elevate overflow-visible">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-4">
                    <Play className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <h3 className="font-semibold text-foreground">{media.name}</h3>
                  <p className="text-sm text-muted-foreground">{media.type}</p>
                  <Badge variant="secondary" className="text-xs">{media.duration}</Badge>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function OriginalScripts() {
  const sampleScripts = [
    {
      name: "rollover grate door",
      code: `on mouseEnter
  sound(1).volume = 100
  puppetSound(2, "SONAR2")
  n = random(3)
  if n = 1 then
    voiceSpeak("click to access main pump mechanism")
  end if
end`
    },
    {
      name: "jump dormitory",
      code: `on mouseUp
  go("dormitory")
  put "click anagram button" into field "nav bar text"
end`
    },
    {
      name: "lost speech",
      code: `on exitFrame me
  voiceSpeak("Holy Shit, what now? I think we've come the wrong way. Try clicking on stuff.")
end`
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <Badge className="bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30 mb-4">
              <Cpu className="w-3 h-3 mr-1" />
              Recovered Source Code
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Original Lingo Scripts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These scripts were extracted from the original 2004 PowerPC Shockwave projector using 
              ProjectorRays decompiler. They reveal the interactive logic of the original experience.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {sampleScripts.map((script, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <Card className="bg-black/50 border-neon-cyan/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-2 bg-neon-cyan/10 border-b border-neon-cyan/20">
                    <code className="text-xs text-neon-cyan font-mono">{script.name}.ls</code>
                  </div>
                  <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto whitespace-pre-wrap">
                    {script.code}
                  </pre>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegacyNote() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-magenta/5 border-y border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-6">
          <Cpu className="w-8 h-8 text-neon-purple" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4">
          A Digital Time Capsule
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          "Enter the Machine" represents an era of experimental multimedia art created before YouTube, 
          before streaming, before the modern web. It was distributed on physical CD-ROMs and required 
          specialized software to experience. Today, it stands as a testament to Doctor Baz's pioneering 
          spirit in interactive digital art—now recreated using modern web technologies while preserving 
          the original quirky, surreal atmosphere.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/innovation">
            <Button className="bg-neon-cyan text-background group" data-testid="button-more-innovation">
              <Cpu className="w-4 h-4 mr-2" />
              More Innovation Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="outline" className="border-neon-purple/50 text-neon-purple" data-testid="button-career-history">
              Explore Career History
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function EnterTheMachine() {
  usePageTitle("Enter the Machine", "Experience Doctor Baz's 2004 interactive multimedia art installation - a pioneering Shockwave experience exploring biomechanical worlds.");

  return (
    <main className="min-h-screen">
      <SEO 
        title="Enter the Machine - Interactive Art Experience (2004)"
        description="Explore Doctor Baz's pioneering 2004 interactive multimedia art installation created with Macromedia Director and Shockwave technology. Now recreated with modern web technologies featuring the original text-to-speech, multi-room navigation, and surreal 'Acme Baby Factory' humor."
        url="/enter-the-machine"
        type="article"
      />
      
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-neon-cyan/5 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 70%, hsl(190 95% 55% / 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, hsl(280 85% 65% / 0.15) 0%, transparent 50%)
            `,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 mb-6 animate-border-glow" data-testid="badge-legacy">
                <Cpu className="w-3 h-3 mr-1" />
                2004 Interactive Art Installation • Recreated
              </Badge>
              
              <h1 
                className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold tracking-tight mb-6"
                data-testid="text-title"
              >
                <AnimatedGradientText>ENTER THE MACHINE</AnimatedGradientText>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4" data-testid="text-subtitle">
                A pioneering interactive multimedia art experience from the Shockwave era
              </p>
              <p className="text-sm text-neon-cyan/80 max-w-2xl mx-auto">
                Enable audio for the full experience with original text-to-speech phrases
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <InteractiveMachine />
          </FadeIn>
        </div>
      </section>

      <TechnicalSpecs />
      <OriginalScripts />
      <MediaContent />
      <LegacyNote />
    </main>
  );
}
