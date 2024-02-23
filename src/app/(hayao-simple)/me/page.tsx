import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/elements/Heading";
import { getFetchedBlogPostList } from "@/lib/blog/post";
import { PostData } from "@/lib/markdown/post";
import { getFetchedProjectPostList } from "@/lib/projects";

const Separator = () => <hr className="my-3 border-t-[1px] border-[#9a9a9a]" />;

export default function Me() {
    return (
        <div className="w-fit">
            <div className="text-center child:mx-auto">
                <Heading level={1} className="my-12 block text-3xl font-bold">
                    山田ハヤオのホームページ
                </Heading>
                <div className="md:flex">
                    <div className="flex-[1]">
                        <Image alt="アイコン" className="mx-auto" src="/icons/newicon.jpeg" width={350} height={200} />
                        <div className="m-5 text-left">
                            <p>山田 ハヤオ (やまだ はやお)</p>
                            <p>生年月日 2004年8月19日</p>
                            <p>血液型 O型</p>
                            <Link className="text-blue-400 underline" href="/portfolio">
                                ポートフォリオ
                            </Link>
                        </div>
                    </div>
                    <div className="mx-2 flex-[2]">
                        <span className="flex justify-center gap-6">
                            <span>★★★</span>
                            <span>最新情報</span>
                            <span>★★★</span>
                        </span>
                        <Separator />
                        <News />
                        <Separator />
                        <div className="text-balance text-left font-bold child:leading-tight">
                            <p>当サイトの内容、テキスト、画像等はMITライセンスの基で自由に再利用できます。</p>
                            <p>
                                ソースコードは
                                <Link href="https://github.com/Hayao0819/hayao0819.com" className="underline">
                                    こちら
                                </Link>
                                で公開されています。
                            </p>
                            <p>お問い合わせはメールまたはTwitterでご連絡をお願い致します。</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-2">
                <p className="w-52 leading-5">
                    If you have any enquiries regarding my codes or posts, or would like to make an enquiry concerning future
                    projects, please do not hesitate to concact me through the following email address or Twitter.
                </p>
                <p>
                    mail: <span className="text-blue-500 underline">shun819.mail at gmail.com</span>
                </p>
                <p>
                    twitter:{" "}
                    <Link href="https://twitter.com/Hayao0819" className="text-blue-500 underline">
                        @Hayao0819
                    </Link>
                </p>
            </div>
        </div>
    );
}

const News = async () => {
    const blogposts = (await getFetchedBlogPostList()).getPosts().slice(0, 4);
    const projects = (await getFetchedProjectPostList()).getPosts().slice(0, 4);

    return (
        <>
            <section className="text-left">
                <p className="font-bold">・ブログ</p>
                <PostLinkList posts={blogposts} linkbase="/blog/posts" />
            </section>
            <Separator />
            <section className="text-left">
                <p className="font-bold">・Projects</p>
                <PostLinkList posts={projects} linkbase="/something" />
            </section>
        </>
    );
};

const PostLinkList = ({ posts, linkbase }: { posts: PostData[]; linkbase: string }) => {
    return (
        <ul className="pl-10">
            {posts.map((post) => (
                <li key={post.url}>
                    <Link href={`${linkbase}/${post.url}`}>
                        <span className="text-balance">{post.meta.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
