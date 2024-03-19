import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { ArticleBlock } from '@/pages/articles/partials/article-block';
import { MetaTags } from '@/components/meta-tags';

export default function Home({ articles, popularArticles, gotoLatestArticle }) {
    return (
        <div>
            <Head title="Home" />
            <MetaTags title="Arsip Masak" description="Ensiklopedia Masakan Nusantara" url={route('home')} />

            <header className="relative isolate z-0 overflow-hidden border-b bg-background lg:-mt-20 lg:border-transparent">
                <svg
                    className="absolute inset-0 -z-10 hidden h-full w-full stroke-foreground/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] lg:block"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-foreground/5">
                        <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth={0} />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
                </svg>
                <div
                    className="absolute left-[calc(50%-4rem)] top-10 -z-10 hidden transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] lg:block xl:left-[calc(50%-24rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-sky-500 to-blue-600 opacity-20"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 pb-10 pt-10 sm:pb-24 lg:flex lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <div className="mt-16 sm:mt-32 lg:mt-16">
                            <Link href={gotoLatestArticle} className="inline-flex space-x-6">
                                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold leading-6 text-sky-400 ring-1 ring-inset ring-sky-500/20">
                                    What's new
                                </span>
                            </Link>
                        </div>
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Arsip Masak</h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Ensiklopedia Masakan Nusantara: Jelajahi Kelezatan Nusantara di Ujung Jari Anda. Temukan Warisan Kuliner dalam Satu Aplikasi!
                        </p>
                    </div>
                </div>
            </header>

            <Container>
                <div className="py-24">
                    <div className="mb-6">
                        <h4 className="text-xl font-semibold">Weekly Popular</h4>
                        <p className="text-gray-500">The most popular articles over the past 7 days</p>
                    </div>
                    <ArticleBlock articles={popularArticles} />
                    <div className="mt-12 text-right">
                        <Link className="text-sky-500 hover:underline" href={route('articles.filter', ['week'])}>
                            See more popular articles
                        </Link>
                    </div>

                    <div className="mb-6 mt-24">
                        <h4 className="text-xl font-semibold">Latest Articles</h4>
                        <p className="text-gray-500">The most recent articles on the site</p>
                    </div>

                    <ArticleBlock articles={articles} />
                    <div className="mt-12 text-right">
                        <Link className="text-sky-500 hover:underline" href={route('articles.index')}>
                            See more articles
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
