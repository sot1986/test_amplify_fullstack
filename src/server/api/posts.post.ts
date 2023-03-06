export default defineEventHandler(async (event) => {
    const newPosts = await readBody<{ title?: string, content?: string}>(event)

    const {content, title } = newPosts

    if (content && title) {

        try {
            const posts = await $fetch('/api/posts', { method: 'GET' })

            const maxId = posts.data.reduce((maxId, p) => p.id > maxId ? p.id : maxId, 0)

            posts.data.push({ id: maxId+1, content, title })

            return {
                data: posts
            }
        } catch (error) {
            
        }
        
    }

    throw createError({
        message: 'error on parsing body.',
        statusCode: 422
    })
})