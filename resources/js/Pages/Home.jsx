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
            <Header
                title="Point of You"
                subtitle="Read it when you relax is a knowledge base for all the questions you have about our products."
            />
            <Container>
                <div className="py-24">
                    <ArticleBlock articles={articles} />
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
