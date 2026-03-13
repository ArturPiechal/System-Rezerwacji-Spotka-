"use server"

import { db } from "@/lib/db";
import { events } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { success, z } from "zod";

const eventSchema = z.object({
    text: z.string().min(1, "Text is required").max(255, "Text must be at most 255 characters long"),
    duration: z.number().min(1, "Duration is required").max(255, "Duration must be at most 255 characters long"),
    description: z.string().max(255, "Description must be at most 255 characters long"),
    slug: z.string().min(1, "Slug is required").max(255, "Slug must be at most 255 characters long"),
});

export async function CreateEvent(formData : z.infer<typeof eventSchema>) {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("You must be logged in to create an event");
    }

    const validateFields = eventSchema.safeParse(formData);

    if (!validateFields.success) {
        return validateFields.error.flatten().fieldErrors;
    }

    try {
        await db.insert(events).values({
            userId: userId,
            text: validateFields.data.text,
            duration: validateFields.data.duration,
            description: validateFields.data.description,
            slug: validateFields.data.slug,
        })   
        
        revalidatePath("/dashboard");
        return {success: true};
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Failed to create event"
        };
    }

}