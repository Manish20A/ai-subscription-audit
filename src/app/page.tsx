"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type ToolName = "Cursor" | "GitHub Copilot" | "Claude" | "ChatGPT" | "Anthropic API" | "OpenAI API" | "Gemini" | "Windsurf";

interface ToolState {
  id: string;
  name: ToolName;
  plan: string;
  spend: number;
  seats: number;
}

const TOOL_OPTIONS = ["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf"];

export default function Home() {
  const [tools, setTools] = useState<ToolState[]>([]);
  const [teamSize, setTeamSize] = useState<number>(1);
  const [useCase, setUseCase] = useState<string>("mixed");
  
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("credex-tools");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTools(parsed.tools || []);
        setTeamSize(parsed.teamSize || 1);
        setUseCase(parsed.useCase || "mixed");
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("credex-tools", JSON.stringify({ tools, teamSize, useCase }));
  }, [tools, teamSize, useCase]);

  const addTool = () => {
    setTools([...tools, { id: Math.random().toString(), name: "Cursor", plan: "Pro", spend: 20, seats: 1 }]);
  };

  const updateTool = (id: string, field: keyof ToolState, value: any) => {
    setTools(tools.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const removeTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id));
  };

  const runAudit = () => {
    setIsAuditing(true);
    
    // Simulate Audit Engine processing
    setTimeout(() => {
      let totalCurrent = 0;
      let totalSavings = 0;
      let recommendations: any[] = [];

      // Basic hardcoded logic
      const hasCursor = tools.some(t => t.name === "Cursor");
      const hasCopilot = tools.some(t => t.name === "GitHub Copilot");
      
      tools.forEach(tool => {
        totalCurrent += Number(tool.spend);
        let rec = null;

        if (tool.name === "Claude" && tool.plan === "Team" && tool.seats < 5) {
          const newSpend = tool.seats * 20; // Pro is 20
          const savings = tool.spend - newSpend;
          if(savings > 0) {
              totalSavings += savings;
              rec = { text: "Downgrade from Team to Pro (Min 5 seats required for Team value)", savings };
          }
        }
        else if (tool.name === "GitHub Copilot" && hasCursor) {
          totalSavings += Number(tool.spend);
          rec = { text: "Redundant tool. You are already paying for Cursor. Drop Copilot.", savings: tool.spend };
        }
        else if ((tool.name === "ChatGPT" || tool.name === "Claude") && useCase === "data" && !tool.plan.includes("API")) {
            const estApiSpend = 10; // rough estimate
            const savings = tool.spend - estApiSpend;
            if(savings > 0) {
                totalSavings += savings;
                rec = { text: "For data/scripting, use the direct API instead of UI subscriptions.", savings };
            }
        }

        if (rec) {
          recommendations.push({ tool: tool.name, ...rec });
        } else {
          recommendations.push({ tool: tool.name, text: "Optimized. Keep current plan.", savings: 0 });
        }
      });

      setAuditResult({
        totalCurrent,
        totalSavings,
        recommendations,
        aiSummary: totalSavings > 50 
            ? "Your team is running a bit heavy on subscriptions. We found significant overlap in your coding assistant tools and potential API arbitrage opportunities. Aggregating this spend through Credex could yield even deeper discounts."
            : "You're running a very tight ship! Your AI tool stack is highly optimized for your team size and use case. Keep up the good work."
      });
      setIsAuditing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
            Stop Overpaying for AI.
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Discover if you're bleeding cash on redundant AI subscriptions. Get a free, instant audit of your stack.
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Stack</CardTitle>
            <CardDescription className="text-neutral-400">Add the AI tools you currently pay for.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Team Size</Label>
                <Input type="number" min="1" value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} className="bg-neutral-900 border-neutral-800" />
              </div>
              <div className="space-y-2">
                <Label>Primary Use Case</Label>
                <Select value={useCase} onValueChange={(v) => v && setUseCase(v)}>
                  <SelectTrigger className="bg-neutral-900 border-neutral-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coding">Coding / Engineering</SelectItem>
                    <SelectItem value="writing">Writing / Content</SelectItem>
                    <SelectItem value="data">Data / Research</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              {tools.map((tool, i) => (
                <div key={tool.id} className="flex flex-col md:flex-row gap-4 items-end bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                  <div className="space-y-2 w-full">
                    <Label>Tool</Label>
                    <Select value={tool.name} onValueChange={(v: any) => updateTool(tool.id, "name", v)}>
                      <SelectTrigger className="bg-neutral-950 border-neutral-700"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TOOL_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Plan</Label>
                    <Input value={tool.plan} onChange={e => updateTool(tool.id, "plan", e.target.value)} className="bg-neutral-950 border-neutral-700" placeholder="e.g. Pro, Team" />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Seats</Label>
                    <Input type="number" value={tool.seats} onChange={e => updateTool(tool.id, "seats", Number(e.target.value))} className="bg-neutral-950 border-neutral-700" />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Monthly Spend ($)</Label>
                    <Input type="number" value={tool.spend} onChange={e => updateTool(tool.id, "spend", Number(e.target.value))} className="bg-neutral-950 border-neutral-700" />
                  </div>
                  <Button variant="destructive" onClick={() => removeTool(tool.id)} className="w-full md:w-auto mt-4 md:mt-0">Remove</Button>
                </div>
              ))}
              
              <Button onClick={addTool} variant="outline" className="w-full border-dashed border-neutral-700 bg-transparent hover:bg-neutral-900 text-neutral-300">
                + Add AI Tool
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={runAudit} 
              disabled={tools.length === 0 || isAuditing}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 transition-all shadow-lg shadow-red-900/20"
            >
              {isAuditing ? "Analyzing Stack..." : "Run Free Audit"}
            </Button>
          </CardFooter>
        </Card>

        {/* Results */}
        {auditResult && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="border-red-900/30 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-neutral-400 font-medium">Potential Savings</CardTitle>
                <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 py-4">
                  ${auditResult.totalSavings} <span className="text-2xl text-neutral-500 font-medium">/mo</span>
                </div>
                <div className="text-lg text-neutral-400">
                  That's <strong className="text-white">${auditResult.totalSavings * 12}</strong> annually.
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                
                <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 text-neutral-300 leading-relaxed">
                   <p className="flex items-start gap-3">
                     <span className="text-orange-500">✨</span> {auditResult.aiSummary}
                   </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold border-b border-neutral-800 pb-2">Per-Tool Breakdown</h3>
                  {auditResult.recommendations.map((rec: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-neutral-900/50 rounded-lg border border-neutral-800/50">
                      <div>
                        <div className="font-bold flex items-center gap-2">
                            {rec.tool}
                            {rec.savings > 0 ? <Badge className="bg-red-900/50 text-red-400 hover:bg-red-900/50">Needs Action</Badge> : <Badge variant="outline" className="text-neutral-500 border-neutral-700">Optimal</Badge>}
                        </div>
                        <div className="text-sm text-neutral-400 mt-1">{rec.text}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-white">
                            {rec.savings > 0 ? `-$${rec.savings}` : "$0"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {auditResult.totalSavings > 100 ? (
                    <div className="mt-8 p-6 bg-gradient-to-br from-red-950/40 to-black rounded-xl border border-red-900/30 text-center space-y-4">
                        <h4 className="text-2xl font-bold text-white">Capture these savings today.</h4>
                        <p className="text-neutral-400">Credex provides discounted AI infrastructure credits for tools like Claude, Cursor, and ChatGPT. Get a personalized consultation to lock in these savings.</p>
                        <div className="flex gap-2 max-w-md mx-auto pt-4">
                            <Input placeholder="Enter your work email" className="bg-neutral-950 border-neutral-700" />
                            <Button className="bg-white text-black hover:bg-neutral-200">Save Report & Book</Button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 text-center space-y-4">
                        <h4 className="text-xl font-bold text-white">Stay Optimized</h4>
                        <p className="text-neutral-400">You're doing great. Drop your email to get notified if pricing changes or better alternatives emerge for your stack.</p>
                        <div className="flex gap-2 max-w-md mx-auto pt-4">
                            <Input placeholder="Enter your work email" className="bg-neutral-950 border-neutral-700" />
                            <Button className="bg-white text-black hover:bg-neutral-200">Notify Me</Button>
                        </div>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
