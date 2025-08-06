// src/pages/api/news.js
import { newsData } from "../../../data/localNews";

// renders in index all first possibles news
export function GET() {
  return new Response(
    JSON.stringify(newsData),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
