// 统一的商品数据类型和 dummyjson API 封装
// 把"请求 + 数据整形"集中在一处，UI 组件和 hooks 都不用关心 dummyjson 原始字段长什么样

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[]; // 注意：dummyjson 的 images 字段本身就是数组，不是单张图 string
  description: string;
  category: string;
}

interface DummyJsonProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: string;
}

function normalize(item: DummyJsonProduct): Product {
  return {
    id: String(item.id), // 统一成字符串，跟项目里其他地方（cartItems 的 id）保持一致
    title: item.title,
    price: item.price,
    images: item.images,
    description: item.description,
    category: item.category,
  };
}

interface FetchProductsParams {
  search?: string;
  category?: string;
}

/**
 * 获取商品列表。三种情况按优先级处理：
 * 1. search 非空 -> 走搜索接口（此时忽略 category，dummyjson 不支持两者组合查询）
 * 2. category 非空且不是 "all" -> 走分类接口
 * 3. 都没有 -> 返回默认商品列表
 */
export async function fetchProducts({
  search = "",
  category = "",
}: FetchProductsParams): Promise<Product[]> {
  let url: string;

  if (search.trim()) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
      search.trim()
    )}`;
  } else if (category && category !== "all") {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(
      category
    )}`;
  } else {
    url = `https://dummyjson.com/products?limit=12`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }
  const data = await res.json();
  return (data.products as DummyJsonProduct[]).map(normalize);
}

export interface Category {
  slug: string;
  name: string;
}

/** dummyjson 的 /products/categories 返回 {slug, name, url} 对象数组 */
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories");
  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`);
  }
  const data = await res.json();
  return (data as Array<{ slug: string; name: string }>).map((c) => ({
    slug: c.slug,
    name: c.name,
  }));
}

/** 获取单个商品详情，用于购物车抽屉里补全 title/price/images */
export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (${res.status})`);
  }
  const data = await res.json();
  return normalize(data as DummyJsonProduct);
}
