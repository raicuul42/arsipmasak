import { Link } from '@inertiajs/react';
import {
    ChatBubbleLeftRightIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline/index.js';

export default function ArticleList({ articles }) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {articles.map((article) => (
                <Link
                    href={article.href}
                    key={article.id}
                    className="flex flex-col items-start justify-between rounded-2xl border border-transparent bg-sky-950/20 p-4 shadow-lg transition hover:border-sky-600 hover:shadow-sky-500/[0.15]"
                >
                    <div className="flex items-center gap-x-2 rounded-full bg-sky-900/50 px-2 py-1 text-xs">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 text-sky-400" />
                        <span className="text-sky-300">{article.comments_count}</span>
                    </div>
                    <div className="mt-2 max-w-xl space-y-3">
                        <div className="flex items-center justify-between gap-x-4 text-xs">
                            <time dateTime={article.published_at} className="text-gray-400">
                                {article.published_at}
                            </time>
                            <span className="text-sky-500 hover:underline">{article.category.name}</span>
                        </div>
                        <div className="group relative">
                            <h3 className="line-clamp-1 font-semibold leading-6 text-gray-300 group-hover:text-white">
                                {article.title}
                            </h3>
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">{article.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            {article.author ? (
                                <div className="relative flex items-center gap-x-2 text-xs font-semibold">
                                    <UserCircleIcon className="h-4 w-4" />
                                    <Link href={article.author.href}>{article.author.name}</Link>
                                </div>
                            ) : (
                                <Link
                                    href={article.href}
                                    className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-sky-600/20 hover:text-sky-400"
                                >
                                    <EyeIcon className="h-3.5 w-3.5" />
                                </Link>
                            )}

                            <div className="flex items-center gap-x-2">
                                {article?.delete && (
                                    <button className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-rose-600/20 hover:text-rose-400">
                                        <TrashIcon className="h-3.5 w-3.5" />
                                    </button>
                                )}
                                <Link
                                    href={route('articles.edit', [article])}
                                    className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-400"
                                >
                                    <PencilIcon className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
