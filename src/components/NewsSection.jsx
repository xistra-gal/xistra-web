import { useEffect, useState } from "react"
import Line from "./Line"
import SmallNewsAsset from "./SmallNewsAsset"
import fetchNews from "../scripts/fetchNews"

const NEWS_LIMIT_TO_RENDER= 4;

export default function NewsSection() {
    const [news, setNews] = useState([])

    useEffect(() => {
        async function loadNews() {
            const data = await fetchNews(NEWS_LIMIT_TO_RENDER);
            setNews(data || []);
        }
        loadNews()
    }, []);

    return (
        <section className="px-8 sm:px-8 md:px-8 lg:px-60 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-5 lg:pb-6 gap-6 lg:gap-0 min-h-[40vh]">
            <h2 className="font-semibold text-base uppercase tracking-wide">Noticias de Xistra</h2>

            <Line />

            <div className="flex flex-row justify-between items-end">
                <h3 className="font-bold text-2xl w-1/2 lg:w-1/3 uppercase">Conoce nuestros <br />
                    <span className="relative inline-block">
                        <span className="bg-main-green absolute bottom-0.5 left-0 w-full h-1.5 sm:h-3 -z-10"></span>
                        <span className="relative"> avances</span>
                    </span>
                </h3>

                <button className="uppercase tracking-wide hover:cursor-pointer text-xs underline hover:-translate-y-0.5 duration-500">
                    <a href="/noticias">Ver todas las noticias</a>
                </button>
            </div>

            <article
                className={`mt-5 min-h-[200px] w-full grid grid-cols-2 gap-6 md:flex md:flex-row md:gap-14 md:items-center ${news.length === 0 ? 'justify-center items-center' : ''}`} id="news_container">
                {news.length === 0 ? (
                    <p className="text-sm font-semibold italic text-center text-gray-600">
                        ¡Vaya, parece que todavía no tenemos ninguna publicación (o algo ha salido mal)!
                    </p>
                ) : (
                    news.map((item, index) => (
                        <SmallNewsAsset
                            key={index}
                            slug={item.slug}
                            imgUrl={item.image_url ?? '/dronFlying.png'}
                            title={item.title}
                            topic={item.topic}
                        />
                    ))
                )}
            </article>

        </section>
    );
}
