import AppLayout from '@/Layouts/AppLayout.jsx';
import Container from '@/Components/Container.jsx';
import { Head, Link, usePage } from '@inertiajs/react';
import ArticleList from '@/Pages/Articles/Partials/ArticleList.jsx';
import Pagination from '@/Components/Pagination.jsx';

export default function List() {
    const { data: articles, meta, links } = usePage().props.articles;
    return (
        <div>
            <Head title="List article" />
            <header className="bg-gray-950 pb-10 pt-16">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">List article</h2>
                            <p className="text-lg leading-8 text-gray-400">All articles will be displayed here.</p>
                        </div>

                        <div>
                            <Link
                                href={route('articles.create')}
                                className="text-sky-500 hover:text-sky-400 hover:underline"
                            >
                                New article
                            </Link>
                        </div>
                    </div>
                </Container>
            </header>

            <Container>
                <ArticleList articles={articles} />
                {meta.last_page && (
                    <div className="mt-16">
                        <Pagination meta={meta} links={links} />
                    </div>
                )}
            </Container>
        </div>
    );
}

List.layout = (page) => <AppLayout children={page} />;
