import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import { useForm,SubmitHandler } from "react-hook-form";
type Props = {
  post: Post;
};
type FormInput = {
  _id: string,
  name: string,
  email: string,
  comment:string
}
function Post({ post }: Props) {
  console.log(post)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body:JSON.stringify(data)
    }).then((res) => {
console.log(res)
    }).catch(err=>console.log(err))
  }

    return (
      <main>
        <img
          src={`${urlFor(post.mainImage.asset._ref)}`}
          className="w-full h-40 object-cover"
          alt=""
        />
        <article>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>{post.body[0]?.children[0].text}</p>
          <img className="h-96" src={`${urlFor(post.body[1]?.asset._ref)}`} />
        </article>
        <hr className="my-6 mx-auto border border-yellow-500" />

        <form
          className="flex flex-col p-5 my-10 mb-10"
          onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-sm text-yellow-500">Enjoyed this article</h3>
          <h3 className="text-3xl font-bold">Leave a comment below!</h3>
          <hr className="py-3 mt-2" />
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="outline-none shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring"
              placeholder="John"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              className="outline-none shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring"
              placeholder="John"
              type="email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-text-area mt-1 block w-full outline-none ring-yellow-500 focus:ring"
              placeholder="John"
            />
          </label>
          {/* Error */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">The name field is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                The comment field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">The email field is required</span>
            )}
          </div>
          <input
            type="submit"
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none cursor-pointer"
          />
        </form>
        {/* comments */}
        <div className="flex flex-col p-10 my-10 shadow-md shadow-yellow-500">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2"/>
          {post.comments.map((comment) => (
            <div>
              <p>
                <span className="text-yellow-500">{comment.name}:</span>
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
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
      'comments':*[
      _type == 'comment'&&
    post._ref==^._id&&approved==true
    ],
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
