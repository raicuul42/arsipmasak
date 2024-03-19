import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head, Link, usePage } from '@inertiajs/react';
import ArticleList from '@/pages/articles/partials/article-list';
import { Pagination } from '@/components/pagination';
import { useState } from 'react';
import { useFilter } from '@/hooks/useFilter.js';
import { Select } from '@/components/select';
import { ArrowPathIcon } from '@heroicons/react/24/outline/index.js';
import clsx from 'clsx';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function List({ filters }) {
    const { auth } = usePage().props;
    const { data: articles, meta, links } = usePage().props.articles;
    const [params, setParams] = useState(filters.state);
    useFilter({
        route: route('articles.list'),
        values: params,
        only: ['articles'],
    });

    return (
        <div>
            <Head title="List article" />
            <header className="bg-background pb-10 pt-16">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">List article</h2>
                            <p className="text-lg leading-8 text-muted-foreground">All articles will be displayed here.</p>
                        </div>

                        <div>
                            <Link className={buttonVariants()} href={route('articles.create')}>
                                New article
                            </Link>
                        </div>
                    </div>
                    <div className={clsx('ml-auto mt-8 grid max-w-4xl items-center gap-x-1', auth.user.is_admin ? 'grid-cols-5' : 'grid-cols-4')}>
                        {!Array.isArray(params) ? (
                            <div className="col-span-1 grid place-items-end">
                                <Link
                                    href={route('articles.list')}
                                    className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                >
                                    <ArrowPathIcon className="h-6 w-6" />
                                </Link>
                            </div>
                        ) : (
                            <div className="col-span-1" />
                        )}
                        <Select
                            value={params.category}
                            placeholder="Select a category"
                            onValueChange={(val) => setParams({ ...params, category: val })}
                            options={filters.categories}
                        />
                        {auth.user.is_admin && (
                            <Select
                                value={params.user}
                                placeholder="Select an author"
                                onValueChange={(val) => setParams({ ...params, user: val })}
                                options={filters.users}
                            />
                        )}
                        <Select
                            value={params.status}
                            placeholder="Select a status"
                            onValueChange={(val) => setParams({ ...params, status: val })}
                            options={filters.statuses}
                        />
                        <Input value={params.search} onChange={(e) => setParams({ ...params, search: e.target.value })} />
                    </div>
                </Container>
            </header>

            <Container>
                {articles.length > 0 ? (
                    <ArticleList articles={articles} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <h2 className="text-2xl font-bold tracking-tight text-muted-foreground">No articles found</h2>
                        <p className="text-lg leading-8 text-muted-foreground">There are no articles to display.</p>
                    </div>
                )}
                {meta.has_pages && (
                    <div className="mt-16">
                        <Pagination meta={meta} links={links} />
                    </div>
                )}
            </Container>
        </div>
    );
}

List.layout = (page) => <AppLayout children={page} />;
