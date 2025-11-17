import {
    Dialog,
    DialogContent,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React, { useRef, useState } from "react";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AiwithImage from "@/lib/ai";



export default function NewCheckDialog({ uid }: { uid: string }) {
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("food")
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState({title : "", message: "", open: false})
    const navigate = useNavigate()

    const openAlert = (title: string, message: string) => setError({title, message, open : true}) 
    const closeAlert = () => setError({title : "", message: "", open: false})


    function validateImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        if (!file) {
            openAlert("File Error", "No file selected");
            fileInputRef.current!.value = ""
            return false;
        }

        const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
        if (!validImageTypes.includes(file.type)) {
            openAlert("Invalid file type","Please select an image (JPEG/PNG/WEBP/HEIC/HEIF).");
            fileInputRef.current!.value = ""
            return false;
        }
        
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
            openAlert("File Size Error","File size exceeds 5MB. Please select a smaller image.");
            fileInputRef.current!.value = ""
            return false;
        }
        setImage(file)
    }
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (image === null) {
            openAlert("File Size Error","File size exceeds 5MB. Please select a smaller image.");
            alert("No image found")
            return
        }
        setLoading(true)
        try {
            const aiResponse = await AiwithImage(image, type)
            if (aiResponse.verified === false) {
                throw new Error("Cannot analyse this image, kindly use a different one.");
            }
            addDoc(collection(db, "users", uid, "checks"), {
                name: name,
                type: type,
                timestamp: serverTimestamp(),
                maxScore: 10,
                ...aiResponse
            }).then((snapshot) => {
                navigate(`/check/${snapshot.id}`)
            }).catch(() => {throw new Error("Something went wrong. Please try again later.")})
        } catch(error) {
            openAlert("Error", error.message);
        } finally{
            setName("");
            setType("");
            fileInputRef.current!.value = ""
            setImage(null);
            setLoading(false);
        }
        
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="icon">
                    <Plus className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <AlertDialog open={error.open} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>{error.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {error.message}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction onClick={closeAlert}>Okay</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
                        <Input id="picture" type="file" ref={fileInputRef}  onChange={validateImage} disabled={loading} accept="image/*" required />

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
