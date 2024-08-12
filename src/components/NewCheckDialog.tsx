import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { db } from "@/firebase";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ai_run from "@/lib/ai";
import AiwithImage from "@/lib/ai";



export default function NewCheckDialog({ uid }: { uid: string }) {
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [image, setImage] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    function validateImage(input) {
        const file = input.files[0];
        if (!file) {
            alert("No file selected");
            return false;
        }

        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(file.type)) {
            alert("Invalid file type. Please select an image (JPEG, PNG, GIF).");
            return false;
        }

        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
            alert("File size exceeds 5MB. Please select a smaller image.");
            return false;
        }
        setImage(file)
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (image === null) {
            alert("No image found")
            return
        }
        setLoading(true)

        const aiResponse = JSON.parse(await AiwithImage(image, type))
        if (aiResponse.verified === "false") {
            alert("Cannot analyse this image, kindly use a different one.")
            setName("")
            setType("")
            setImage(null)
            setLoading(false)
            return
        }
        addDoc(collection(db, "users", uid, "checks"), {
            name: name,
            type: type,
            timestamp: serverTimestamp(),
            maxScore: 10,
            ...aiResponse
        }).then((snapshot) => {
            setName("")
            setType("")
            setImage(null)
            setLoading(false)
            navigate(`/check/${snapshot.id}`)
        }).catch(() => alert("Something went wrong. Please try again later."))
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="default" size="icon">
                    <Plus className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">New Product Check</DialogTitle>
                    <form className="grid gap-4 " onSubmit={submit}>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" disabled={loading} id="name" required placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Label htmlFor="type">Type</Label>
                        <Select required disabled={loading} value={type} onValueChange={(e) => setType(e)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a product type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="cosmetic">Cosmetic</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Label htmlFor="picture">Product label picture</Label>
                        <Input id="picture" type="file" onChange={input => validateImage(input.target)} disabled={loading} accept="image/*" required />

                        <Button type="submit" disabled={loading}>
                            {loading &&
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Submit</Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
