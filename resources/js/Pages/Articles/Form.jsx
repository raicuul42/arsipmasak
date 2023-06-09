import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Editor from '@/Components/Editor';
import Select from '@/Components/Select';
import Textarea from '@/Components/Textarea';
import PrimaryButton from '@/Components/PrimaryButton';
import UploadImage from '@/Components/UploadImage';

export default function Form({ page_settings, categories, statuses, article }) {
    const { auth } = usePage().props;
    const { data, setData, processing, errors, reset, post } = useForm({
        title: article.title ?? '',
        body: article.body ?? '',
        excerpt: article.excerpt ?? '',
        category: article.category_id ?? '',
        status: article.status ?? '',
        thumbnail: article.thumbnail ?? '',
        scheduled_at: article.scheduled_at ?? '',
        _method: page_settings.method,
    });

    function onChange(e) {
        setData(e.target.name, e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        post(page_settings.url);
    }

    return (
        <>
            <Head title={page_settings.title} />
            <header className="bg-gray-950 pb-10 pt-16">
                <Container>
                    <h2 className="text-2xl font-bold tracking-tight text-white">{page_settings.title}</h2>
                    <p className="text-lg leading-8 text-gray-400">{page_settings.subtitle}</p>
                </Container>
            </header>

            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-gray-900 p-4 sm:rounded-lg sm:p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="max-w-xl space-y-6">
                            <UploadImage label="Thumbnail" onChange={setData} value="thumbnail" model={article} />
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput id="title" type="text" name="title" value={data.title} onChange={onChange} />
                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <Select
                                    id="category"
                                    type="text"
                                    name="category"
                                    value={data.category}
                                    options={categories}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="excerpt" value="Excerpt" />
                                <Textarea id="excerpt" name="excerpt" value={data.excerpt} onChange={onChange} />
                            </div>
                        </div>
                        <div>
                            <InputLabel htmlFor="body" value="Body" />
                            <Editor value={data.body} onChange={(value) => setData('body', value)} />
                        </div>

                        {auth.user?.is_admin && (
                            <div className="flex max-w-3xl gap-6">
                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <Select
                                        id="status"
                                        type="text"
                                        name="status"
                                        value={data.status}
                                        options={statuses}
                                        onChange={onChange}
                                    />
                                </div>

                                {data.status === '3' ||
                                    (data.status === 3 && (
                                        <div>
                                            <InputLabel htmlFor="scheduled_at" value="Scheduled At" />
                                            <TextInput
                                                id="scheduled_at"
                                                type="datetime-local"
                                                name="scheduled_at"
                                                value={data.scheduled_at}
                                                onChange={onChange}
                                            />
                                        </div>
                                    ))}
                            </div>
                        )}
                        <div>
                            <PrimaryButton disabled={processing} type="submit">
                                {page_settings.submit_text}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Form.layout = (page) => <AppLayout children={page} />;
