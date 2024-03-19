import {
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';

export default function ArticleShare({ title, url, via, teaser, image }) {
    return (
        <div className="sticky left-0 top-8 mb-8 hidden w-20 rounded-r-2xl border-b border-r border-t border-sky-500/20 bg-sky-500/5 p-4 shadow-xl shadow-sky-500/10 transition duration-150 hover:bg-sky-500/10 lg:block">
            <div className="flex flex-col items-center justify-center gap-2 [&>button>svg]:h-8 [&>button>svg]:w-8 [&>button>svg]:rounded-lg">
                Share
                <FacebookShareButton url={url} quote={teaser}>
                    <FacebookIcon />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title} via={via}>
                    <TwitterIcon />
                </TwitterShareButton>
                <TelegramShareButton url={url} title={title}>
                    <TelegramIcon />
                </TelegramShareButton>
                <WhatsappShareButton url={url} title={title}>
                    <WhatsappIcon />
                </WhatsappShareButton>
                <PinterestShareButton url={url} media={image} description={teaser}>
                    <PinterestIcon />
                </PinterestShareButton>
                <LineShareButton url={url} title={title}>
                    <LineIcon />
                </LineShareButton>
                <LinkedinShareButton url={url} title={title}>
                    <LinkedinIcon />
                </LinkedinShareButton>
            </div>
        </div>
    );
}
