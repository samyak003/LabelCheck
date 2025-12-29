import { ChevronLeft, Loader2, Save, Trash } from "lucide-react";

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
	const [name, setName] = useState<string>("");
	const [type, setType] = useState<string>("");
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
					setName(doc.data().name);
					setType(doc.data().type);
					setLoading(false);
				}
			})
			.catch(() => navigate("/*"));
	}, [id]);

	const deleteCheck = () => {
		if (confirm("Are you sure ?")) {
			deleteDoc(doc(db, `users/${user.uid}/checks/${id}`));
			navigate("/");
		}
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateDoc(doc(db, `users/${user.uid}/checks/${id}`), {
			name: name,
			type: type,
		})
			.then(() => {
				navigate("/");
			})
			.catch(() => {
				alert("Something went wrong");
			});
	};

	if (loading)
		return (
			<div className="w-full h-screen grid place-content-center">
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			</div>
		);
	return (
		<>
			<Header />
			<div className="container mx-auto py-6 px-4">
				<h1 className="text-4xl text-center mb-6 font-semibold">Check</h1>
				<main className="flex flex-col gap-6">
					<div className="mx-auto w-full max-w-7xl">
						<div className="flex items-center gap-4 mb-6">
							<Button
								onClick={() => {
									navigate(-1);
								}}
								variant="outline"
								size="icon"
								className="h-8 w-8"
							>
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
							<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
								{data.name}
							</h1>
							<Badge variant="secondary" className="ml-auto sm:ml-0">
								{data.type}
							</Badge>
						</div>
						<div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[2fr_1fr]">
							<Card >
								<CardHeader>
									<CardTitle>Product Details</CardTitle>
									<CardDescription>Edit product details</CardDescription>
								</CardHeader>
								<CardContent className="h-full">
									<form onSubmit={submit} className="flex flex-col justify-between h-full">
										<div className="grid gap-6">
											<div className="grid gap-3">
												<Label htmlFor="name">Name</Label>
												<Input
													id="name"
													type="text"
													className="w-full"
													value={name}
													onChange={(e) => {
														setName(e.target.value);
													}}
												/>
											</div>
											<div className="grid gap-3">
												<Label htmlFor="type">Type</Label>
												<Select
													value={type}
													onValueChange={(e) => {
														setType(e);
													}}
												>
													<SelectTrigger
														id="type"
														aria-label="Select type"
														className="w-full"
													>
														<SelectValue placeholder="Select type" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="food">Food</SelectItem>
														<SelectItem value="cosmetic">Cosmetic</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className="flex items-center justify-end gap-3 pt-2">
												<Button
													variant="destructive"
													size="sm"
													onClick={deleteCheck}
													type="button"
													className="gap-2"
												>
													<Trash className="h-4 w-4" />
													Delete
												</Button>
												<Button size="sm" type="submit" className="gap-2">
													<Save className="h-4 w-4" />
													Save
												</Button>
											</div>
										</div>
									</form>
								</CardContent>
							</Card>
							<GeminiScore data={data} />
						</div>
						<div className="mt-6">
							<IngredientList data={data} />
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
