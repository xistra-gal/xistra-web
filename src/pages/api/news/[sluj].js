import { newsData } from "../../../data/localNews";

export function GET({ params }) {
  const { slug } = params;
  const newsItem = newsData.find((item) => item.slug === slug);

  if (!newsItem) {
    return new Response(JSON.stringify({ error: 'Noticia no encontrada' }), { status: 404 });
  }

  return new Response(
    JSON.stringify(newsItem),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}