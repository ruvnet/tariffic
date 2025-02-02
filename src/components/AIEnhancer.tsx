import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AIResponse {
  content: string;
}

export const AIEnhancer = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const streamCompletion = async (prompt: string): Promise<AIResponse> => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Company Analysis'
        },
        body: JSON.stringify({
          model: 'deepseek-ai/deepseek-r1',
          messages: [
            { role: 'user', content: prompt }
          ],
          stream: false,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return {
        content: data.choices[0]?.message?.content || ''
      };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key to use this feature.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await streamCompletion(
        "Analyze the technology sector's impact on global GDP in 2024"
      );
      toast({
        title: "Analysis Complete",
        description: result.content.slice(0, 100) + "..."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI analysis. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Enhanced Analysis</CardTitle>
        <CardDescription>
          Enter your OpenRouter API key to get AI-powered insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your OpenRouter API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Your API key is only stored temporarily in memory
          </p>
        </div>
        <Button 
          onClick={handleAnalyze} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing..." : "Analyze with AI"}
        </Button>
      </CardContent>
    </Card>
  );
};