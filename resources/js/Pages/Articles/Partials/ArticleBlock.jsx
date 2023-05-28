export default function ArticleBlock({ articles }) {
    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((article) => (
                <article key={article.id} className="flex flex-col items-start justify-between">
                    <div className="relative w-full">
                        <img
                            src={article.thumbnail}
                            alt=""
                            className="aspect-[16/9] w-full rounded-2xl bg-black object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="max-w-xl">
                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                            <time dateTime={article.created_at} className="text-gray-400">
                                {article.created_at}
                            </time>
                            <a
                                href={article.category.href}
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-400 hover:bg-gray-100"
                            >
                                {article.category.name}
                            </a>
                        </div>
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-300 group-hover:text-white">
                                <a href={article.href}>
                                    <span className="absolute inset-0" />
                                    {article.title}
                                </a>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">{article.excerpt}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                            <img src={article.author.picture} alt="" className="h-10 w-10 rounded-full bg-gray-900" />
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-white">
                                    <a href={article.author.href}>
                                        <span className="absolute inset-0" />
                                        {article.author.name}
                                    </a>
                                </p>
                                <p className="text-gray-400">{article.author.role}</p>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
