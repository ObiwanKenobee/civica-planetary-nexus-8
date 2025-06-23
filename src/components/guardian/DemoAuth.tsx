import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2, Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useGuardianAuth } from "../../hooks/useGuardianAuth";
import { GuardianCredentials } from "../../types/guardian";

export function DemoAuth() {
  const { login, isLoading } = useGuardianAuth();
  const [credentials, setCredentials] = useState<GuardianCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }

    const success = await login(credentials);
    if (!success) {
      setError("Invalid credentials. Please check the demo credentials below.");
    }
  };

  const fillDemoCredentials = () => {
    setCredentials({
      username: "guardian-demo",
      password: "sacred-oversight-2024",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🧬 Guardian Intelligence Layer
            </h1>
            <p className="text-cyan-200 text-lg">
              Sacred Intelligence & Revenue Oversight
            </p>
            <p className="text-indigo-300 text-sm mt-2">
              A sacred membrane for planetary systems
            </p>
          </div>
        </div>

        {/* Authentication Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Demo Access Portal
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Enter credentials to access the Guardian Intelligence Layer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="bg-white/20 border-cyan-500/30 text-white placeholder:text-white/50"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="bg-white/20 border-cyan-500/30 text-white placeholder:text-white/50 pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="bg-red-500/20 border-red-500/30">
                  <AlertDescription className="text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Access Guardian Layer"
                )}
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="space-y-3 pt-4 border-t border-cyan-500/30">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20"
              >
                {showDemoCredentials ? "Hide" : "Show"} Demo Credentials
              </Button>

              {showDemoCredentials && (
                <Alert className="bg-cyan-500/20 border-cyan-500/30">
                  <AlertDescription className="text-cyan-200 space-y-2">
                    <div className="font-medium">Demo Credentials:</div>
                    <div className="font-mono text-sm">
                      <div>Username: guardian-demo</div>
                      <div>Password: sacred-oversight-2024</div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={fillDemoCredentials}
                      className="mt-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/20"
                    >
                      Auto-fill Credentials
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feature Preview */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-white font-medium">
                Guardian Layer Features
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-cyan-300">⚖️ Balance Control</div>
                <div className="text-cyan-300">🌍 Regional Oversight</div>
                <div className="text-cyan-300">🧾 Audit Logs</div>
                <div className="text-cyan-300">🧠 AI Ethics</div>
                <div className="text-cyan-300">🕊️ Dispute Mediation</div>
                <div className="text-cyan-300">🛡️ Ritual Failsafes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
