import AppLayout from '@/Layouts/AppLayout.jsx';
import { Head } from '@inertiajs/react';
import Container from '@/Components/Container.jsx';
import Prose from '@/Components/Prose.jsx';

export default function Show({ article }) {
    return (
        <div>
            <Head title={article.title} />

            <div className="bg-gray-950 px-6 py-24 sm:py-32 lg:px-8">
                <Container>
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                            {article.category.name}
                        </p>
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{article.title}</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">{article.excerpt}</p>
                    </div>
                </Container>
            </div>
            <Container>
                <Prose value={article.body} />
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
