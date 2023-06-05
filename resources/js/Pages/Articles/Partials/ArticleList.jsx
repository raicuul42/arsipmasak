import Image from '@/Components/Image.jsx';
import { Link } from '@inertiajs/react';
import { EyeIcon, PencilIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline/index.js';

export default function ArticleList({ articles }) {
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {articles.map((article) => (
                <article key={article.id} className="flex flex-col items-start justify-between">
                    <div className="relative w-full">
                        <Image
                            src={article.thumbnail}
                            alt=""
                            className="aspect-[16/9] w-full rounded-2xl bg-black object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="mt-6 max-w-xl space-y-3">
                        <div className="flex items-center justify-between gap-x-4 text-xs">
                            <time dateTime={article.published_at} className="text-gray-400">
                                {article.published_at}
                            </time>
                            <Link href={article.category.href} className="text-sky-500 hover:underline">
                                {article.category.name}
                            </Link>
                        </div>
                        <div className="group relative">
                            <h3 className="line-clamp-1 font-semibold leading-6 text-gray-300 group-hover:text-white">
                                <Link href={article.href}>
                                    <span className="absolute inset-0" />
                                    {article.title}
                                </Link>
                            </h3>
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">{article.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            {article.author ? (
                                <div className="relative flex items-center gap-x-2 text-sm">
                                    <UserCircleIcon className="h-4 w-4" />
                                    <Link href={article.author.href}>{article.author.name}</Link>
                                </div>
                            ) : (
                                <Link
                                    href={article.href}
                                    className="grid h-8 w-8 place-items-center rounded-xl text-gray-400 hover:bg-sky-600/20 hover:text-sky-400"
                                >
                                    <EyeIcon className="h-4 w-4" />
                                </Link>
                            )}

                            <div className="flex items-center gap-x-2">
                                <button className="grid h-8 w-8 place-items-center rounded-xl text-gray-400 hover:bg-rose-600/20 hover:text-rose-400">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                                <Link
                                    href={route('articles.edit', [article])}
                                    className="grid h-8 w-8 place-items-center rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-400"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
