import { useEffect, useState } from 'react'
import { Spinner } from '@/components/Spinner'
import { getAll, Posts, Post } from '@/functions/posts'
import { useBool } from '@/hooks/useUtils'


type PostItemProps = {
  post: Post
}

type PostListProps = {
  posts: Posts | undefined
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <>
      <article className='border-2 bg-secondary p-2'>
        <div>
          <div>
            <h3 className='line-clamp-2 min-h-[calc(calc(1.5*2)*1.17rem)]'>
              {post.title}
            </h3>
            <p className="line-clamp-4 min-h-[6rem]">
              {post.body}
            </p>
          </div>
          <div className='flex justify-between'>
            <div className="caption flex gap-2 items-center">
              <p>
                {`USER: ${post.userId}`}
              </p>
              <p>
                {`ID: ${post.id}`}
              </p>
            </div>
            <button className='bg-inherit text-pink-600 font-bold'>
              more then
            </button>
          </div>
        </div>
      </article>
    </>
  )
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <>
      {posts && posts.length !== 0
        ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {posts.map(item => (
              <PostItem
                key={item.id}
                post={item}
              />
            ))}
          </div>
        )
        : (
          <div className='w-max mx-auto'>
            <Spinner/>
          </div>
        )
      }
    </>

  )
}

export const FetchStateRendering = () => {
  const [posts, setPosts] = useState<Posts | undefined>(undefined)
  const [open, handleOpen, handleClose] = useBool()

  useEffect(() => {
    (async () => {
      setPosts(await getAll())
    })()
  }, [])

  return (
    <>
      <h2>
        Fetching inner useEffect
      </h2>
      {open
        ? (
          <>
            <button
              onClick={handleClose}
              className='mb-2'
            >
              close
            </button>
            <PostList posts={posts}/>
          </>
        ): (
          <button
            onClick={handleOpen}
            className='mb-2'
          >
            open
          </button>
        )
      }
    </>
  )
}
