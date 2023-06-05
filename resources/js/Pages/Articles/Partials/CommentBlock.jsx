import Prose from '@/Components/Prose.jsx';

export default function CommentBlock({ comments }) {
    return (
        <>
            {comments.length > 0 && (
                <div className="mt-12 space-y-6">
                    {comments.map((comment) => (
                        <div className="flex" key={comment.id}>
                            <div className="mr-4 flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={comment.author.gravatar}
                                    alt={comment.author.name}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold">{comment.author.name}</h4>
                                <div className="mt-1 leading-relaxed text-gray-400">
                                    <Prose value={comment.body} />
                                </div>
                                <CommentBlock comments={comment.children} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
