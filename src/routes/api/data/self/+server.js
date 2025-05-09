import { db } from '$lib/server/db';
import { dataPost } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const userId = request.user.id;
    const { value } = await request.json(); // Hent værdien fra request body

    // Valider værdien
    if (typeof value !== 'number' || value < 1 || value > 10) {
        return json({ error: 'Value must be an integer between 1 and 10' }, { status: 400 });
    }

    // Indsæt den nye datapost i databasen
    const newPosts = await db
        .insert(dataPost)
        .values({
            user_id: userId, // Brug brugerens ID fra request
            value
        })
        .returning(); // Returner den nyoprettede post

    return json(newPosts[0], { status: 201 }); // Returner den nyoprettede post med en 201-statuskode
}

export async function GET({ request }) {
    const userId = request.user.id;

    // Hent alle dataposter for brugeren fra databasen
    const posts = await db.query.dataPost.findMany({
        where: eq(dataPost.user_id, userId) // Filtrer efter bruger-ID
    });
    return json(posts); // Returner posterne som JSON
}
