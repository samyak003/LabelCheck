import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {auth} from "@/firebase";
import {useStateValue} from "@/StateProvider";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {Loader2, TriangleAlert} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();
  const [_, dispatch] = useStateValue();

  const googleSignIn = () => {
    setError("");
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({
          type: "SET_USER",
          user: user,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
    setLoading(false);
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: "SET_USER",
          user: user,
        });
        // ...
      })
      .catch((error) => {
        setError(error.message);
      });
    setLoading(false);
  };

  return (
    <div className="w-full h-screen grid place-content-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={login}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                disabled={loading}
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link to="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                    </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <Button
              variant="outline"
              onClick={googleSignIn}
              className="w-full"
              disabled={loading}
            >
              Login with Google
            </Button>
          </form>
          {error && (
            <p className="text-red-500 flex gap-2 mt-4">
              <TriangleAlert />
              {error}
            </p>
          )}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
