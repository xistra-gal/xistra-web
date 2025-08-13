const APIURL = import.meta.env.PUBLIC_API_URL;

export default async function fetchNews(limit?: number) {
    const url = limit 
        ? `${APIURL}/api/news?limit=${limit}`
        : `${APIURL}/api/news`;
    const res = await fetch(url);
    return res.json();
}
