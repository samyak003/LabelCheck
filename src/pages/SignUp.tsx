import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/firebase"
import { useStateValue } from "@/StateProvider"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Loader2, TriangleAlert } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export function SignUpForm() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>()
    const [_, dispatch] = useStateValue();

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: `${firstName} ${lastName}`
                })
                // Signed up 
                const user = userCredential.user;
                dispatch({
                    type: "SET_USER",
                    user: user,
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                // ..
            });
        setLoading(false)

    }

    return (
        <div className="w-full h-screen grid place-content-center">

            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={signUp}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="Max" disabled={loading} required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Robinson" disabled={loading} required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                disabled={loading}
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} disabled={loading}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create an account
                        </Button>
                    </form>
                    {error && (
                        <p className="text-red-500 flex gap-2 mt-4"><TriangleAlert />{error}</p>
                    )}
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
