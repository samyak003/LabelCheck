import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
    const navigate = useNavigate()
    return (
        <div className="grid place-content-center gap-8 h-screen w-full">
            <TriangleAlert className="h-10 w-10 mx-auto animate-pulse" />
            <p className="text-2xl">Opps! The page you are trying to access is not found.</p>
            <Button className="w-fit mx-auto" onClick={() => navigate("/")}>Go To Home</Button>
        </div>
    )
}