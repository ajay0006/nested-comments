import fastify from "fastify"
import sensible from '@fastify/sensible'
import cors from "@fastify/cors";
import dotenv from "dotenv"
import {PrismaClient} from "@prisma/client"

dotenv.config()

const app = fastify()
app.register(sensible)
app.register(cors, {
    origin: process.env.CLIENT_URL,
    credentials: true
})
const prisma = new PrismaClient()

app.get('/posts', async (req, res) => {
    return await commitToDb(
        prisma.post.findMany({
            select: {
                id: true,
                content: true
            }
        })
    )
})

app.get('/posts/:id', async (req, res) => {
    return await commitToDb(
        prisma.post.findUnique({
            where: {id: req.params.id},
            select: {
                id: true,
                content: true,
                comments: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    select: {
                        id: true,
                        content: true,
                        parentId: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                userName: true
                            }
                        }
                    }
                }
            }
        })
    )
})

async function commitToDb(promise) {
    const [error, data] = await app.to(promise)
    if (error) return app.httpErrors.internalServerError(error.message())
    return data
}


app.listen({port: process.env.PORT})