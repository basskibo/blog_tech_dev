import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const postView = async (post) => {
    try {
        const data = JSON.parse(post.query.data)
        const title = data.title;
        // await prisma.PageViews.create({ data: { name: title } })
        const res = await prisma.PageViews.update(
            {
                data: {
                    views: {
                        increment: 1,
                    },
                }, where: {
                    name: title
                }
            }
        );
    } catch (err) {
        console.error("error executing query:", err);
    } finally {
        prisma.$disconnect();
        return true
    }
};

export default postView;