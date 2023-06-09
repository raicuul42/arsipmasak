import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import ArticleBlock from '@/Pages/Articles/Partials/ArticleBlock';
import Pagination from '@/Components/Pagination';
import Filter from '@/Pages/Articles/Partials/Filter';
import MetaTags from '@/Components/MetaTags';
import Header from '@/Components/Header';

export default function Index({ params }) {
    const { data: articles, meta, links } = usePage().props.articles;
    return (
        <div>
            <Head title={params.title} />
            <MetaTags title={params.title} description={params.subtitle} url={route('articles.index')} />
            <Header title={params.title} subtitle={params.subtitle} />
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
