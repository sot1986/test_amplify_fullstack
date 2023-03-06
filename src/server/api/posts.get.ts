export default defineEventHandler((_event) => {
    return {
        data: [
            { id: 1, title: 'third Post', content: 'First Content' },
            { id: 2, title: 'Second Post', content: 'Second Content' },
            { id: 3, title: 'Third Post', content: 'Third Content' }
        ]
    }
})