import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";

// Pages
import Home from "@/pages/home";
import HowItWorks from "@/pages/how-it-works";
import Families from "@/pages/families";
import CaregiverRecruiting from "@/pages/caregiver-recruiting";
import Safety from "@/pages/safety";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SearchPage from "@/pages/search";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";
import Book from "@/pages/book";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/come-funziona" component={HowItWorks} />
      <Route path="/famiglie" component={Families} />
      <Route path="/caregiver" component={CaregiverRecruiting} />
      <Route path="/sicurezza" component={Safety} />
      <Route path="/prezzi" component={Pricing} />
      <Route path="/chi-siamo" component={About} />
      <Route path="/contatti" component={Contact} />
      <Route path="/ricerca" component={SearchPage} />
      <Route path="/profilo/:id" component={Profile} />
      <Route path="/chat/:room" component={Chat} />
      <Route path="/prenota/:id" component={Book} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
