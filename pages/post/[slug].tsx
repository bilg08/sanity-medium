import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
type Props = {
  post: Post;
};
function Post({ post }: Props) {
    return (
      <main>
            <img
            src={`${urlFor(post.mainImage.asset._ref)}`}
          className="w-full h-40 object-cover"
          alt=""
            />
            <article>

            </article>
      </main>
    );
}


export async function getStaticPaths() {
  const query = `*[_type=="post"]{
  slug   
}`;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }));
    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps({ params }:{params:{slug:string}}) {
const query = `*[_type=="post" &&slug.current==$slug][0]{
  _id,
    author -> {
      name,
      photo
    },
    title,
    _createdAt,
    mainImage,
    body
}`;
    const post = await sanityClient.fetch(query, {
        slug:params?.slug
    });
    return {
        props: { post },
        revalidate:60
    }
    
    
}
export default Post;
