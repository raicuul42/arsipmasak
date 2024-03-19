import { AppLayout } from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Prose } from '@/components/prose';
import { Image } from '@/components/image';
import { useState } from 'react';
import ArticleShare from '@/components/sharing';
import { MetaTags } from '@/components/meta-tags';

export default function Show({ article }) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;
    const [attributes, setAttributes] = useState({
        body: '',
        url: '',
        method: 'post',
    });

    return (
        <div>
            <Head title={article.title} />
            <MetaTags title={article.title} description={article.excerpt} url={route('articles.show', [article])} image={article.thumbnail} />

            <div className="mb-4 border-b bg-background pb-8 pt-20 sm:py-32 lg:mb-16">
                <div className="grid lg:grid-cols-6 lg:gap-24">
                    <div className="flex h-full flex-col pl-4 pr-4 lg:col-span-3 lg:col-start-1 lg:pl-28">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{article.title}</h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <div className="space-y-6">
                                <div className="text-sm text-muted-foreground">
                                    Fill in:{' '}
                                    <Link className="font-medium text-sky-500" href={article.category.href}>
                                        {article.category.name}
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <div className="shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={article.author.gravatar} alt={article.author.name} />
                                </div>
                                <div>
                                    <h4>{article.author.name}</h4>
                                    <div className="text-sm text-muted-foreground">
                                        <span>Published on</span> <time dateTime={article.published_at}>{article.published_at}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:col-span-3 lg:col-start-4 lg:block">
                        <Image className="h-[26rem] w-full rounded-l-2xl object-cover object-center" src={article.thumbnail} alt={article.title} />
                    </div>
                </div>
            </div>

            <ArticleShare
                title={article.title}
                url={route('articles.show', [article])}
                image={article.thumbnail}
                teaser={article.excerpt}
                via="Your App Name"
            />
            <Container>
                <div className="relative flex flex-col gap-20 lg:flex-row">
                    <div className="hidden w-1/4 lg:block" />
                    <div className="mt-10 w-full lg:-mt-96 lg:w-2/3">
                        <Prose value={article.body} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
