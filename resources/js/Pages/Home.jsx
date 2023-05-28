import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout.jsx';
import Container from '@/Components/Container.jsx';
import ArticleBlock from '@/Pages/Articles/Partials/ArticleBlock.jsx';
import Header from '@/Components/Header.jsx';

export default function Home() {
    const { data: articles, meta, links } = usePage().props.articles;
    return (
        <div>
            <Head title="Read it when you relax" />
            <Header />
            <div className="bg-gray-950 px-6 py-24 sm:py-32 lg:px-8">
                <Container>
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Point of You</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Read it when you relax is a knowledge base for all the questions you have about our
                            products.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="py-24">
                    <ArticleBlock articles={articles} />
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
