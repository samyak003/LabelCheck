import { Header } from "@/components/Header";
import { Loader2, Pizza, Sparkles } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";
import NewCheckDialog from "@/components/NewCheckDialog";
import { useStateValue } from "@/StateProvider";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

const bgDeterminer = (score: number, maxScore: number = 10) => {
    if (score <= 3) {
        return "bg-dangerous"
    }
    else if (score > 3 && score <= 7) {
        return "bg-moderateRisk"
    }
    else {
        return "bg-safe"
    }
}

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState<any[]>([])
    const [{ user }, dispatch] = useStateValue()
    useEffect(() => {
        getDocs(query(collection(db, "users", user.uid, "checks"), orderBy("timestamp", "desc"))).then(snapshot => {
            setHistory(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
            setLoading(false)
        })
    }, [])

    if (loading) return (
        <>
            <Header />
            <div className="w-full h-screen grid place-content-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            </div>
        </>
    )

    return (
        <>
            <Header />
            {history.length <= 0 ? (
                <>
                    <div className="w-full grid place-content-center h-screen text-center">
                        <h1 className="text-4xl">You haven't checked any product yet!</h1>
                        <p>Tap on the + button to check your first product</p>
                    </div>

                </>
            ) : (<>
                <div className="">
                    <h1 className="text-4xl  text-center mt-6 font-semibold">Product History</h1>
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                            {history.map(({ id, data }) => (
                                <Link to={`/check/${id}`}>
                                    <Card x-chunk="dashboard-01-chunk-0" className={bgDeterminer(data.score)}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {data.name}
                                            </CardTitle>
                                            {data.type === "food" ? <Pizza className="h-4 w-4 text-muted-foreground" /> :
                                                <Sparkles className="h-4 w-4 text-muted-foreground" />}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{data.score}/{data.maxScore}</div>
                                            <p className="text-xs text-muted-foreground">
                                                {data.shortMessage}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}

                        </div>
                    </main>
                </div>
            </>)}
            <div className="fixed bottom-8 right-8">
                <NewCheckDialog uid={user.uid} />
            </div>
        </>
    );
}
