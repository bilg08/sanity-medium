// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'


const config = {
    dataset: 'production',
    projectId: "oqne7xej",
    useCdn: true,
    token:"skqunvpbTWClhv2kPbMRvgMUzPdSGGo7pg6mQbXPe3JPt8G2va57x1x23MznWj3bfPsqJgg07QOnAZAa7leFK8ub8jaLlYIjcwCOmnOi5fQLvVMe6WR1NZdPJTYO4eQwFQGDJngdoLtSKOZAZYkG97938K90WHXUDsM0zpjAj5SyTjp239cz"
}
const client = sanityClient(config);
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { _id, name, email, comment } = JSON.parse(req.body);
    try {
        await client.create({
            _type: 'comment',
            post: {
                _type: "reference",
                _ref:_id
            },
            name,email,comment
        })
    } catch (error) {
        return res.status(500).json({message:'error',error})
    }
  res.status(200).json({ name: 'John Doe' })
}
