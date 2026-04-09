import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects, { MusicProjects, MediaProjects, AppProjects } from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import History from "@/pages/History";
import HistoryDetail from "@/pages/HistoryDetail";
import Awards from "@/pages/Awards";
import Videos from "@/pages/Videos";
import Contact from "@/pages/Contact";
import Links from "@/pages/Links";
import Admin from "@/pages/Admin";
import Entombed from "@/pages/Entombed";
import Book from "@/pages/Book";
import Brushstrokes from "@/pages/Brushstrokes";
import Innovation from "@/pages/Innovation";
import EnterTheMachine from "@/pages/EnterTheMachine";

import Music from "@/pages/Music";
import AwardVideos from "@/pages/AwardVideos";
import ElectronicMusic from "@/pages/ElectronicMusic";
import Academic from "@/pages/Academic";
import NotFound from "@/pages/not-found";
import starryBgVideo from "@assets/star-starry-dark-blur-universe-motion-graphic-animation-backgr_1770352589156.mp4";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/entombed" component={Entombed} />
      <Route path="/book" component={Book} />
      <Route path="/brushstrokes" component={Brushstrokes} />
      <Route path="/innovation" component={Innovation} />
      <Route path="/enter-the-machine" component={EnterTheMachine} />

      <Route path="/music" component={Music} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/music" component={MusicProjects} />
      <Route path="/projects/media" component={MediaProjects} />
      <Route path="/projects/apps" component={AppProjects} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/history" component={History} />
      <Route path="/history/:slug" component={HistoryDetail} />
      <Route path="/awards" component={Awards} />
      <Route path="/videos" component={Videos} />
      <Route path="/award-videos" component={AwardVideos} />
      <Route path="/electronic-music" component={ElectronicMusic} />
      <Route path="/academic" component={Academic} />
      <Route path="/contact" component={Contact} />
      <Route path="/links" component={Links} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-[0.35]"
              src={starryBgVideo}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">
                <Router />
              </div>
              <Footer />
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
