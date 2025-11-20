"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { /*Controller ,*/ useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
import {
    Field,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@/components/ui/input-group"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    name: z
        .string()
        .min(5, "Name of the companion is required."),
    subject: z
        .string()
        .min(6, "Subject of the companion is required."),
    topic: z
        .string()
        .min(6, "Topic of the companion is required."),
    voice: z
        .string()
        .min(1, "Voice of the companion is required."),
    style: z
        .string()
        .min(6, "Style of the companion is required."),
    duration: z
        .number()
        .min(1, "Duration of the companion is required."),
});

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects, voices } from "@/constants";
import { createCompanion } from "@/lib/actions/companion.action";

function CompanionForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const companion = await createCompanion(values);

        if (companion) {
            toast("Companion Created Successfully", {
                style: {
                    color: "green",
                    backgroundColor: "white"
                }
            });
            redirect(`/companions/${companion.id}`);
        } else {
            toast("Faild to Create a Companion", {
                style: {
                    color: "red",
                    backgroundColor: "white"
                }
            });
            redirect(`/`);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Companion Name" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Select Subject</SelectItem>
                                        {subjects.map((subject) => {
                                            return (
                                                <SelectItem key={subject} value={subject} className="capitalize">{subject}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ex. Derivatives & Integrals" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male" className="capitalize">Male</SelectItem>
                                        <SelectItem value="female" className="capitalize">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal" className="capitalize">Formal</SelectItem>
                                        <SelectItem value="casual" className="capitalize">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="15" 
                                    type="number" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                                    className="input" 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Field orientation="vertical">
                    <Button type="submit" className="cursor-pointer w-full">
                        Submit
                    </Button>
                    <Button type="button" variant="outline" onClick={() => form.reset()} className="cursor-pointer w-full">
                        Reset
                    </Button>
                </Field>
            </form>
        </Form>
    )
}

export default CompanionForm