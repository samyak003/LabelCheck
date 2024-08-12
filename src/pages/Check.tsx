import { ChevronLeft, Loader2, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PieChartWText } from "@/components/PieChart";
import IngredientList from "@/components/IngredientList";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useStateValue } from "@/StateProvider";
import { db } from "@/firebase";
import { GeminiScore } from "@/components/GeminiScore";

export default function Check() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [data, setData] = useState({});
    const [loading, setLoading] = useState<boolean>(true);
    const [{ user }] = useStateValue();
    useEffect(() => {
        setLoading(true);
        getDoc(doc(db, `users/${user.uid}/checks/${id}`))
            .then((doc) => {
                if (!doc.exists()) {
                    throw "Document does not exist";
                } else {
                    setData(doc.data());
                    setName(doc.data().name)
                    setType(doc.data().type)
                    setLoading(false);
                }
            })
            .catch(() => navigate("/*"));
    }, [id]);

    const deleteCheck = () => {
        if (confirm("Are you sure ?")) {
            deleteDoc(doc(db, `users/${user.uid}/checks/${id}`))
            navigate("/")
        }
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateDoc(doc(db, `users/${user.uid}/checks/${id}`), {
            name: name,
            type: type
        }).then(() => {
            navigate("/")
        }).catch(() => {
            alert("Something went wrong")
        })
    }

    if (loading)
        return (
            <div className="w-full h-screen grid place-content-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
        );
    return (
        <>
            <Header />
            <div className="my-4">
                <h1 className="text-4xl  text-center mt-2 font-semibold">Check</h1>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => {
                                    navigate(-1);
                                }}
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Button>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                {data.name}
                            </h1>
                            <Badge variant="secondary" className="ml-auto sm:ml-0 ">
                                {data.type}
                            </Badge>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="destructive" size="sm" onClick={deleteCheck}>
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Product Details</CardTitle>
                                        <CardDescription>
                                            Edit product details                                    </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form action="" onSubmit={submit}>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        className="w-full"
                                                        value={name}
                                                        onChange={(e) => { setName(e.target.value) }}
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="type">Type</Label>
                                                    <Select value={type}
                                                        onValueChange={(e) => { setType(e) }}
                                                    >
                                                        <SelectTrigger id="type" aria-label="Select type">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="food">Food</SelectItem>
                                                            <SelectItem value="cosmetic">Cosmetic</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="items-center gap-2 md:ml-auto md:flex">
                                                    {/* <Button variant="outline" size="sm">
                                                Discard
                                            </Button> */}
                                                    <Button size="sm" type="submit">Save</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-3">
                                    <GeminiScore data={data} />
                                </Card>
                            </div>
                        </div>
                        <IngredientList data={data} />
                    </div>
                </main >
            </div>
        </>
    );
}
