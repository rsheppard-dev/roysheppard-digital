const Blog = ({ posts }) => {
    console.log(posts)
    return (
        <main className="container">
            <h1>Blog Test Page</h1>
        </main>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://royshepparddigital.local/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query blogListQuery {
                    posts {
                        nodes {
                            slug
                            title
                        }
                    }
                }
            `
        })
    })

    const json = await res.json()

    return {
        props: {
            posts: json.data.posts
        }
    }
}
 
export default Blog