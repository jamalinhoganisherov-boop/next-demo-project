export async function GET() {
    try {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 1919 }, (_, i) => `${currentYear - i}`);
        return new Response(JSON.stringify({ years }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
