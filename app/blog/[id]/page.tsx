export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params


  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>This is the content of blog post {id}.</p>
    </div>
  )
}