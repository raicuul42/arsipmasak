import { AppLayout } from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Editor } from '@/components/editor';
import { Textarea } from '@/components/ui/textarea';
import { UploadImage } from '@/components/upload-image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { TimePicker } from '@/components/time-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/container';

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

    const [date, setDate] = useState();

    function onChange(e) {
        setData(e.target.name, e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        post(page_settings.url);
    }

    useEffect(() => {
        if (date) {
            setData('scheduled_at', new Date(date).toISOString());
        }
    }, [date]);
    return (
        <>
            <Head title={page_settings.title} />
            <Header title={page_settings.title} subtitle={page_settings.subtitle} />

            <div className="mt-16">
                <Container>
                    <Card className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-6">
                                <div className="max-w-2xl">
                                    <UploadImage label="Thumbnail" onChange={setData} value="thumbnail" model={article} />
                                </div>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input className="mt-1" id="title" type="text" name="title" value={data.title} onChange={onChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select onValueChange={(value) => setData('category', value)} value={data.category}>
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.value} value={category.value.toString()}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea id="excerpt" name="excerpt" value={data.excerpt} onChange={onChange} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="body">Body</Label>
                                <Editor value={data.body} onChange={(value) => setData('body', value)} />
                            </div>

                            {auth.user?.is_admin && (
                                <div className="flex max-w-3xl flex-col gap-6 md:flex-row md:items-center">
                                    <div>
                                        <Label htmlFor="status">Status</Label>

                                        <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                            <SelectTrigger className="mt-1 w-full md:w-56">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem key={status.value} value={status.value.toString()}>
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {data?.status === '3' && (
                                        <div className="mt-2">
                                            <Label className="block" htmlFor="scheduled_at">
                                                Scheduled At {data.scheduled_at}
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'mt-1 w-full justify-start text-left font-normal md:w-[280px]',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP HH:mm:ss') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                                    <div className="border-t border-border p-3">
                                                        <TimePicker setDate={setDate} date={date} />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div>
                                <Button disabled={processing} type="submit">
                                    {page_settings.submit_text}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </Container>
            </div>
        </>
    );
}

Form.layout = (page) => <AppLayout children={page} />;
