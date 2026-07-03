# ShoppingCart

A small shopping cart demo built with React, TypeScript and Tailwind CSS. Product data comes live from the [DummyJSON](https://dummyjson.com) API.

**Demo:** [https://shopping-cart-mu-gules.vercel.app](#)

---

## Features

- Browse products fetched live from an external API, with a landing page showcasing featured items
- Search products (submit-to-search, not fired on every keystroke)
- Filter the full catalog by category
- Product detail page with add-to-cart
- Persistent cart (localStorage) — survives page refresh
- Slide-out cart drawer with quantity controls and running total

## Tech Stack

| Category | Choice |
|---|---|
| Framework | React + TypeScript (Vite) |
| Styling | Tailwind CSS |
| Routing | React Router (HashRouter) |
| Server state / caching | TanStack Query |
| Client state | React Context |
| Persistence | localStorage (custom `useLocalStorage` hook) |
| Data source | [DummyJSON](https://dummyjson.com) |

## Architecture Notes

- **Context vs. TanStack Query**: Context holds client-side state only (search input, cart item ids/quantities, drawer open/closed). Anything fetched from the network — product lists, product details, categories — goes through TanStack Query, so caching, loading, and error states don't have to be hand-rolled.
- **Shared cache keys**: the product detail page and the cart drawer both query a product by id under the same query key (`["product", id]`), so switching between them doesn't trigger duplicate network requests.
- **HashRouter**: used instead of `BrowserRouter` so client-side routes (`/store`, `/products/:id`) don't 404 on refresh when hosted as a static site on Vercel.

## Running Locally

```bash
git clone https://github.com/<your-username>/shopping-cart.git
cd shopping-cart
npm install
npm run dev
```

## Project Structure

```
src/
├── api/            # fetch functions + data normalization for the DummyJSON API
├── context/         # React Context providers (search state, cart state)
├── hooks/           # custom hooks (React Query wrappers, localStorage, context accessors)
├── components/      # reusable UI (Navbar, Cart drawer, product card/grid, etc.)
└── pages/           # route-level pages (Home, Store, ProductDetail, About)
```