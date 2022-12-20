import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import {sanityClient, urlFor} from '../sanity.js'
import { Post } from '../typing';
type Props = {
  posts: Post[]
};

function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Create Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millons of readers
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-80"
          src="https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png"
          alt=""
        />
      </div>
      {/*Posts*/}
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6 p-6 ">
        {posts?.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className="border rounded-lg cursor-pointer overflow-hidden group">
              <img
                className="w-full object-cover transition-all duration-300 group-hover:scale-105 h-60 rounded-lg "
                alt=""
                src={`${urlFor(post.mainImage.asset._ref)}`}
              />
              <div className="flex  justify-between p-5 bg-white">
                <div>
                  <p>{post.title}</p>
                </div>
                <img
                  className="h012 w-12 rounded-full"
                  src={`${urlFor(post.author.image.asset._ref)}`}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home

export async function getServerSideProps() {
  const query = `*[_type=="post"]{
  _id,
  title,
    body,
     slug,
    mainImage,
  author -> {
    name,
    image
  },
  categories[] -> {
          title,
          
  }
}`;



  const posts = await sanityClient.fetch(query);
  return {
    props:{
      posts
    }
  }
}