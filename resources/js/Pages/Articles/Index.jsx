import { Head, usePage } from '@inertiajs/react';
import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { ArticleBlock } from '@/pages/articles/partials/article-block';
import { Pagination } from '@/components/pagination';
import { Filter } from '@/pages/articles/partials/filter';
import { MetaTags } from '@/components/meta-tags';
import { Header } from '@/components/header';

export default function Index({ params }) {
    const { data: articles, meta, links } = usePage().props.articles;
    return (
        <div>
            <Head title={params.title} />
            <MetaTags title={params.title} description={params.subtitle} url={route('articles.index')} />
            <Header title={params.title} subtitle={params.subtitle} />
            <div className="bg-gray-950 pb-10 pt-16">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">{params.title}</h2>
                            <p className="text-lg leading-8 text-muted-foreground">{params.subtitle}</p>
                        </div>

                        <Filter />
                    </div>
                </Container>
            </div>

            <Container>
                <div className="py-24">
                    <ArticleBlock articles={articles} />
                    {meta.has_pages && (
                        <div className="mt-24">
                            <Pagination meta={meta} links={links} />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} />;
