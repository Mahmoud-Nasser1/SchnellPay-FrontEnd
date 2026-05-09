import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordPage() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-xl"
          >
            <div className="gradient-accent flex h-8 w-8 items-center justify-center rounded-lg">
              <Shield className="h-4 w-4 text-accent-foreground" />
            </div>
            Schnell<span className="text-accent">Pay</span>
          </Link>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {!done ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

              <div>
                <Label>New Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                  <Input type={show ? "text" : "password"} className="pl-10" />
                  <button
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {show ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                variant="accent"
                onClick={() => setDone(true)}
              >
                Update Password <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="text-center">
              <Check className="mx-auto text-green-500 h-10 w-10 mb-3" />
              <h2 className="text-xl font-bold">Password Updated</h2>

              <Link to="/login">
                <Button className="w-full mt-4" variant="accent">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
