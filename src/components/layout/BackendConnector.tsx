import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export function BackendConnector() {
  const { backendUrl, setBackendUrl, isBackendConnected, setBackendConnected } = useAppStore();
  const [inputUrl, setInputUrl] = useState(backendUrl || '');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Check if there's a stored URL on component mount
    if (backendUrl) {
      checkConnection(backendUrl);
    }
  }, [backendUrl]);

  const checkConnection = async (url: string) => {
    setIsChecking(true);
    try {
      const response = await fetch(`${url}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBackendConnected(true);
        toast({
          title: 'Connection Successful',
          description: `Connected to AI Engine using ${data.device} device`,
          variant: 'default',
        });
      } else {
        throw new Error('Failed to connect to backend');
      }
    } catch (error) {
      setBackendConnected(false);
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to the AI Engine. Please check the URL and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleConnect = () => {
    // Normalize URL (ensure it has no trailing slash)
    const normalizedUrl = inputUrl.endsWith('/')
      ? inputUrl.slice(0, -1)
      : inputUrl;
    
    setBackendUrl(normalizedUrl);
    checkConnection(normalizedUrl);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          AI Engine Connection
          {isBackendConnected && <Badge variant="outline" className="bg-green-500/20 text-green-600">Connected</Badge>}
          {!isBackendConnected && <Badge variant="outline" className="bg-yellow-500/20 text-yellow-600">Not Connected</Badge>}
        </CardTitle>
        <CardDescription>
          Connect to your AI Engine running in Google Colab
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="backendUrl" className="text-sm font-medium">
              Backend URL
            </label>
            <div className="flex gap-2">
              <Input
                id="backendUrl"
                placeholder="https://your-tunnel-url.trycloudflare.com"
                className="flex-1"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <Button 
                onClick={handleConnect}
                disabled={!inputUrl || isChecking || (inputUrl === backendUrl && isBackendConnected)}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking
                  </>
                ) : isBackendConnected ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Paste the URL provided by the Google Colab notebook (ends with .trycloudflare.com)
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 bg-muted/50">
        <div className="flex items-center text-sm">
          {isBackendConnected ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>AI Engine is connected and ready to generate videos</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Not connected to AI Engine. Video generation is unavailable.</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 