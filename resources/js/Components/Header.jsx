import { Container } from '@/components/container';

export function Header({ title, subtitle }) {
    return (
        <div className="border-y bg-background pb-10 pt-24 sm:py-20">
            <Container>
                <div className="max-w-xl">
                    <div>
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground">{title}</h2>
                        <p className="text-lg leading-8 text-muted-foreground">{subtitle}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
