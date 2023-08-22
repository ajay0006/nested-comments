import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function seed() {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
    const dami = await prisma.user.create({data: {userName: "Dami"}})
    const augustine = await prisma.user.create({data: {userName: "Augustine"}})
    const veronica = await prisma.user.create({data: {userName: "Veronica"}})

    const post1 = await prisma.post.create({
        data: {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.",
        },
    })
    const post2 = await prisma.post.create({
        data: {
            content: "Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.",
        },
    })
    const post3 = await prisma.post.create({
        data: {
            content: "Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.",
        },
    })

    const comment1 = await prisma.comment.create({
        data: {
            content: "I am a root comment",
            userId: dami.id,
            postId: post1.id,
        },
    })

    const comment3 = await prisma.comment.create({
        data: {
            content: "I am another root comment",
            userId: augustine.id,
            postId: post1.id,
        },
    })

    const comment2 = await prisma.comment.create({
        data: {
            parentId: comment1.id,
            content: "I am a nested comment by augustine",
            userId: augustine.id,
            postId: post1.id,
        },
    })
    const comment4 = await prisma.comment.create({
        data: {
            content: "I am another root comment by veronica",
            userId: veronica.id,
            postId: post2.id,
        },
    })

    const comment5 = await prisma.comment.create({
        data: {
            parentId: comment4.id,
            content: "I am another nested comment created by augustine",
            userId: augustine.id,
            postId: post2.id,
        },
    })
    const comment6 = await prisma.comment.create({
        data: {
            parentId: comment5.id,
            content: "I am another nested comment created by dami",
            userId: dami.id,
            postId: post2.id,
        },
    })
}

seed().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })