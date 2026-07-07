# Moderno — Home Decor E-Commerce

A modern, full-featured home decor e-commerce storefront built with **React 18**, **Tailwind CSS v3**, and **React Router v6**. Includes a customer-facing storefront, admin dashboard, blog with full article pages, live search, a multi-tier shipping cart, dark mode, and a new backend API for authentication, product management, and order processing.

---

## Live Features

| Feature | Description |
|---|---|
| 🏠 Homepage | Hero carousel, trust badges, category grid, sale banner, new arrivals |
| 🛍️ Shop | Product grid with category + price filters, sort, URL-based search |
| 🔍 Search | Live spotlight overlay — searches products, blog posts, and pages |
| 🛒 Cart | Add/remove/update qty, 3-tier KES shipping logic, progress bar |
| 📝 Blog | Filterable post grid, full article pages, author profiles, prev/next nav |
| 👤 About | Team profiles, values, stats bar |
| 📬 Contact | Form with success state |
| 📊 Dashboard | Admin stats cards and recent orders table |
| 🌙 Dark mode | Full site dark/light toggle via ThemeContext |
| 🛠️ Backend API | Express + PostgreSQL auth, product CRUD, and order handling |

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI components and state |
| React Router | v6 | Client-side routing |
| Tailwind CSS | v3 | Utility-first styling |
| Vite | Latest | Dev server and build tool |
| Express | Latest | Backend API server |
| PostgreSQL | Latest | Persistent data store |
| Lucide React | Latest | Icon library |

---

## Backend API

The project now includes a Node.js/Express backend with PostgreSQL-backed data for core commerce actions and it is still in  updation process for more features eventualy.

### Included API Features
- User registration, login, and profile lookup
- Product listing, detail retrieval, and admin CRUD operations
- Order creation, order history, and admin order status updates
- JWT-based authentication and protected routes

### Main Endpoints

| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Create a new user account |
| POST | /api/auth/login | Sign in and receive a JWT |
| GET | /api/auth/me | Get the authenticated user profile |
| GET | /api/products | List products with optional search/filter/sort |
| POST | /api/products | Create a product (admin only) |
| PUT | /api/products/:id | Update a product (admin only) |
| DELETE | /api/products/:id | Delete a product (admin only) |
| POST | /api/orders | Create a new order |
| GET | /api/orders/my | Get orders for the signed-in user |
| GET | /api/orders | View all orders (admin only) |
| PUT | /api/orders/:id/status | Update order status (admin only) |
| GET | /api/health | Health check for the API |

### Backend Environment Variables

Create a `.env` file in the project root with values such as:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=moderno
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Project Structure

```
moderno/
├── public/
│   └── images/
│       ├── products/        # Product photos
│       ├── categories/      # Category tile images
│       ├── blog/            # Blog cover images
│       ├── team/            # Team member photos
│       ├── about/           # About page images
│       └── placeholder.jpg  # Fallback image
│
├── src/
│   ├── main.jsx             # App entry point
│   ├── App.jsx              # Routes + global providers
│   ├── index.css            # Tailwind directives
│   │
│   ├── context/
│   │   ├── CartContext.jsx  # Global cart state (add, update, remove)
│   │   └── ThemeContext.jsx # Dark / light mode toggle
│   │
│   ├── hooks/
│   │   └── useSearch.js     # Live search logic across products + blog
│   │
│   ├── utils/
│   │   └── currency.js      # formatKES() — Kenyan Shilling formatter
│   │
│   ├── data/
│   │   ├── products.js      # allProducts, newArrivals, categoryList, priceRanges
│   │   ├── categories.js    # 5 room categories with images
│   │   ├── blogPosts.js     # 6 blog posts with full content
│   │   ├── team.js          # Shared team data (About + Blog author cards)
│   │   ├── trustBadges.js   # 4 trust badge items
│   │   └── dashboardStats.js # Admin stats and recent orders
│   │
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky capsule nav with search, cart, dark mode
│   │   ├── Footer.jsx       # Links, newsletter signup, social icons
│   │   ├── ProductCard.jsx  # Reusable product card with hover add-to-cart
│   │   └── SearchOverlay.jsx # Live search spotlight overlay
│   │
│   ├── sections/            # Homepage sections
│   │   ├── HeroBanner.jsx   # 3-slide carousel hero
│   │   ├── TrustBadges.jsx  # Free shipping, secure payment strip
│   │   ├── ShopByCategory.jsx # 5 category tiles
│   │   ├── SaleBanner.jsx   # Summer sale banner
│   │   └── NewArrivals.jsx  # 5 product cards
│   │
│   └── pages/
│       ├── Home.jsx         # Stacks all homepage sections
│       ├── Shop.jsx         # Product grid + filter sidebar + URL search
│       ├── About.jsx        # Story, values, stats, team
│       ├── Blog.jsx         # Post grid with category filter pills
│       ├── BlogPost.jsx     # Full article page with author card + related posts
│       ├── Contact.jsx      # Contact form with success state
│       ├── Cart.jsx         # Cart with qty controls + 3-tier shipping summary
│       └── Dashboard.jsx    # Admin stats + recent orders table
│
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- PostgreSQL running locally or remotely

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/moderno.git
cd moderno

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file with your PostgreSQL and JWT settings

# 4. Start the full app (frontend + backend)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
The backend API will be available at [http://localhost:5000/api/health](http://localhost:5000/api/health).

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview the production build locally:

```bash
npm run preview
```

---

## Key Concepts

### Cart (CartContext)

The cart is a global React Context. Any component can call `useCart()` to access:

```js
const { cartItems, addToCart, updateQty, removeFromCart, cartCount } = useCart()
```

### Currency

All prices are stored in **Kenyan Shillings (KES)**. Use `formatKES()` everywhere a price is displayed:

```js
import { formatKES } from '../utils/currency'

formatKES(102000) // → "KSh 102,000"
```

### Shipping Tiers

| Cart Value | Shipping Fee |
|---|---|
| Under KSh 50,000 | KSh 800 |
| KSh 50,000 – 99,999 | KSh 300 |
| KSh 100,000 and above | FREE |

### Search

The search overlay uses `useSearch()` to instantly query:
- All products (by name and category)
- All blog posts (by title, category, and excerpt)
- Static pages (About, Contact, Blog, Dashboard)

Pressing Enter navigates to `/shop?search=query` which the Shop page reads via `useSearchParams()`.

### Blog Post Routing

Blog posts use dynamic routing:

```
/blog        → Blog.jsx      (grid of all posts)
/blog/:id    → BlogPost.jsx  (full article for post with that id)
```

`useParams()` reads the `:id` and finds the matching post in `blogPosts.js`.

### Author Profiles

Team data lives in `src/data/team.js` — a single source of truth used by both `About.jsx` and `BlogPost.jsx`. To update a team member's photo, change it once in `team.js` and it updates everywhere.

### Dark Mode

Dark mode is managed by `ThemeContext`. Components use Tailwind's `dark:` prefix:

```jsx
<div className="bg-white dark:bg-stone-900">
```

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | Home | Homepage with all sections |
| `/shop` | Shop | Product catalogue with filters |
| `/shop?search=query` | Shop | Pre-filtered by search term |
| `/about` | About | About page |
| `/blog` | Blog | Blog post grid |
| `/blog/:id` | BlogPost | Full article |
| `/contact` | Contact | Contact form |
| `/cart` | Cart | Shopping cart |
| `/dashboard` | Dashboard | Admin panel |

---

## Adding Products

Open `src/data/products.js` and add an entry to `allProducts`:

```js
{
  id: 16,
  name: "Bamboo Side Table",
  price: 18500,           // price in KES
  category: "Living Room",
  image: "/images/products/bamboo-side-table.jpg",
}
```

Place the image in `public/images/products/`. It will appear immediately in the shop and search results.

---

## Adding Blog Posts

Open `src/data/blogPosts.js` and add a new post object. Make sure the `author` field exactly matches a `name` in `src/data/team.js` so the author photo resolves correctly.

---

## Image Placeholder

If an image fails to load, all `<img>` tags fall back to `/images/placeholder.jpg`. Make sure this file exists in `public/images/` — any neutral grey image works.

---

## Recommended Free Image Sources

- [Unsplash](https://unsplash.com) — search "sofa", "dining table", "bedroom interior"
- [Pexels](https://pexels.com) — free for commercial use, no attribution required.
-[Pintrest](https://pintrest.com) - for ideas and overally images also.

---

*Built for the Kenyan home decor market.*
