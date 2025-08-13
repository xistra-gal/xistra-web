import Line from "./Line"
import { useState, useEffect } from "react"
import fetchNews from "../scripts/fetchNews";
import BigNewsAsset from "./BigNewsAsset";

export default function NewsDashboard() {

    const [news, setNews] = useState([])

    useEffect(() => {
        async function loadNews() {
            const data = await fetchNews();
            setNews(data || []);
        }
        loadNews()
    }, []);
    return (
        <article
            className={`mt-5 min-h-[200px] w-full grid grid-cols-2 gap-6 md:flex md:flex-col md:items-left ${news.length === 0 ? 'justify-center items-center' : ''}`} id="news_container">
            {news.length === 0 ? (
                <p className="text-sm font-semibold italic text-center text-gray-600">
                    ¡Vaya, parece que todavía no tenemos ninguna publicación (o algo ha salido mal)!
                </p>
            ) : (
                news.map((item, index) => (
                    <>
                        <BigNewsAsset
                            key={index}
                            slug={item.slug}
                            imgUrl={item.image_url}
                            title={item.title}
                            topic={item.topic}
                            content={item.content} />
                        <Line />
                    </>
                ))
            )}
        </article>
    )
}