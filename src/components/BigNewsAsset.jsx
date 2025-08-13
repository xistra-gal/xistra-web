export default function BigNewsAsset({ slug, imgUrl, title, topic, content, maxContentLength = 100 }) {
    // if content is too long, it does not render more
    const shortContent = content && content.length > maxContentLength
        ? content.slice(0, maxContentLength) + "..."
        : content;

    return (
        <div className="w-3/4 h-40 flex flex-row items-start gap-3">
            <img className="w-1/3 h-full rounded object-cover" src={imgUrl ?? '/dronFlying.png'} alt={title} />

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="uppercase font-semibold text-sm w-3/4">{title}</h4>
                    {shortContent && <p className="mt-1 text-xs text-gray-700">{shortContent}</p>}
                </div>

                <div className="flex flex-row justify-between items-end mt-2">
                    <p className="uppercase font-semibold text-[10px]">{topic}</p>
                    <div className="ml-auto">
                        <a className="hover:-translate-y-0.5 duration-300" href={`news/${slug}`}>
                            <svg
                                className="h-3 w-[15px] transition duration-200 group-hover:translate-x-1 md:-translate-y-px ease-circ-out"
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="13"
                                viewBox="0 0 17 13"
                                fill="none"
                            >
                                <path d="M10.4286 0.5L16.4286 6.5M16.4286 6.5L10.4286 12.5M16.4286 6.5H1" stroke="currentColor"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
