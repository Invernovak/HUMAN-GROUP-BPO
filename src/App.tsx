import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<div className="flex h-screen items-center justify-center text-4xl font-bold">Lovable React App Initialized!</div>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
