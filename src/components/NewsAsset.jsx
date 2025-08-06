export default function NewsAsset({ slug, imgUrl, title, topic }) {
    return (
        <div className="w-3xs h-80 flex flex-col items-center justify-center gap-5">
            <img className="w-full h-1/2 rounded object-cover" src={imgUrl} alt="" />
            <div>
                <h4 className="uppercase font-semibold text-base">{title}</h4>

                <div className="mt-8 flex flex-row w-full items-center justify-between">
                    <p className="uppercase font-semibold text-xs">{topic}</p>
                    <a className="hover:-translate-y-0.5 duration-300" href={`news/${slug}`}>
                        <svg className="h-3 w-[15px] transition duration-200 group-hover:translate-x-1 md:-translate-y-px ease-circ-out" xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                        <path d="M10.4286 0.5L16.4286 6.5M16.4286 6.5L10.4286 12.5M16.4286 6.5H1" stroke="currentColor"></path>
                    </svg></a>
                </div>
            </div>
        </div>
    )
}