import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'
import { getAuthor } from '../data/team'

export default function BlogPost() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const post         = blogPosts.find((p) => p.id === Number(id))
  const currentIndex = blogPosts.findIndex((p) => p.id === Number(id))
  const prevPost     = blogPosts[currentIndex - 1] || null
  const nextPost     = blogPosts[currentIndex + 1] || null
  const morePosts    = blogPosts.filter((p) => p.id !== Number(id)).slice(0, 3)

  if (!post) {
    return (
      <div className="bg-[#F5F0E8] min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-4">📄</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Post not found</h2>
        <Link to="/blog" className="text-[#8B6C42] underline text-sm">← Back to Blog</Link>
      </div>
    )
  }

  // Look up full author profile from shared team data
  const author = getAuthor(post.author)

  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* Hero image */}
      <div className="w-full h-[320px] md:h-[460px] overflow-hidden relative">
        <img
          src={post.image}
          alt={post.title}
          onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-6 left-6 flex items-center gap-2 text-white text-sm bg-black/30 px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Blog
        </button>
        <div className="absolute bottom-6 left-6">
          <span className="bg-[#8B6C42] text-white text-xs px-3 py-1 rounded-full font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-stone-500 mb-6">
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-8">
          {post.title}
        </h1>

        {/* ── Author card with real photo ── */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-stone-200">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-200 shadow-md shrink-0">
            <img
              src={author.image}
              alt={author.name}
              onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-0.5">Written by</p>
            <p className="text-sm font-semibold text-stone-900">{author.name}</p>
            <p className="text-xs text-stone-500 mt-0.5">{author.role}</p>
          </div>
        </div>

        {/* Content blocks */}
        <div className="space-y-5">
          {post.content.map((block, i) =>
            block.type === "heading" ? (
              <h2 key={i} className="text-xl font-bold text-stone-900 mt-8">{block.text}</h2>
            ) : (
              <p key={i} className="text-stone-600 leading-relaxed text-base">{block.text}</p>
            )
          )}
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between gap-4 mt-16 pt-10 border-t border-stone-200">
          {prevPost ? (
            <Link to={`/blog/${prevPost.id}`} className="flex-1 bg-white rounded-lg p-4 hover:shadow-md transition-shadow group">
              <p className="text-xs text-stone-400 mb-1">← Previous</p>
              <p className="text-sm font-medium text-stone-800 group-hover:text-[#8B6C42]">{prevPost.title}</p>
            </Link>
          ) : <div className="flex-1" />}
          {nextPost ? (
            <Link to={`/blog/${nextPost.id}`} className="flex-1 bg-white rounded-lg p-4 hover:shadow-md transition-shadow group text-right">
              <p className="text-xs text-stone-400 mb-1">Next →</p>
              <p className="text-sm font-medium text-stone-800 group-hover:text-[#8B6C42]">{nextPost.title}</p>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* More posts */}
        <div className="mt-16">
          <h3 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-8">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {morePosts.map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-32 overflow-hidden">
                  <img
                    src={p.image} alt={p.title}
                    onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Mini author row */}
                <div className="p-4">
                  <span className="text-xs text-[#8B6C42]">{p.category}</span>
                  <p className="text-sm font-medium text-stone-800 mt-1 group-hover:text-[#8B6C42] leading-snug">{p.title}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <img
                      src={getAuthor(p.author).image}
                      alt={p.author}
                      onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs text-stone-400">{p.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}