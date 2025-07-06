import { createClient } from '@supabase/supabase-js'

// Supabase配置
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ranpgctqojgcsloafkdf.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbnBnY3Rxb2pnY3Nsb2Fma2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzkyOTcsImV4cCI6MjA2NzM1NTI5N30.R2N9gY6OyQpg5AFzPIZVJkWmSbzUsllRaW-W23ClpFk'

export const supabase = createClient(supabaseUrl, supabaseKey)

// 数据库操作函数

// 获取所有分类（带翻译）
export const getCategories = async (language = 'zh') => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        category_translations!inner(name)
      `)
      .eq('category_translations.language', language)
      .order('sort_order')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// 获取所有产品（带翻译和分类信息）
export const getProducts = async (language = 'zh', categoryId = null) => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_translations!inner(name, description),
        categories(slug, category_translations!inner(name))
      `)
      .eq('product_translations.language', language)
      .eq('categories.category_translations.language', language)
      .eq('status', 'active')

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// 获取推荐产品
export const getFeaturedProducts = async (language = 'zh') => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_translations!inner(name, description),
        categories(slug, category_translations!inner(name))
      `)
      .eq('product_translations.language', language)
      .eq('categories.category_translations.language', language)
      .eq('featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// CMS 操作函数

// 创建分类
export const createCategory = async (categoryData, translations) => {
  try {
    // 创建分类
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single()

    if (categoryError) throw categoryError

    // 创建翻译
    const translationData = translations.map(translation => ({
      ...translation,
      category_id: category.id
    }))

    const { error: translationError } = await supabase
      .from('category_translations')
      .insert(translationData)

    if (translationError) throw translationError

    return { success: true, data: category }
  } catch (error) {
    console.error('Error creating category:', error)
    return { success: false, error: error.message }
  }
}

// 更新分类
export const updateCategory = async (categoryId, categoryData, translations) => {
  try {
    // 更新分类
    const { error: categoryError } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', categoryId)

    if (categoryError) throw categoryError

    // 删除旧翻译
    await supabase
      .from('category_translations')
      .delete()
      .eq('category_id', categoryId)

    // 创建新翻译
    const translationData = translations.map(translation => ({
      ...translation,
      category_id: categoryId
    }))

    const { error: translationError } = await supabase
      .from('category_translations')
      .insert(translationData)

    if (translationError) throw translationError

    return { success: true }
  } catch (error) {
    console.error('Error updating category:', error)
    return { success: false, error: error.message }
  }
}

// 删除分类
export const deleteCategory = async (categoryId) => {
  try {
    // 检查是否有产品使用此分类
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('category_id', categoryId)

    if (products && products.length > 0) {
      return { success: false, error: '无法删除包含产品的分类' }
    }

    // 删除翻译
    await supabase
      .from('category_translations')
      .delete()
      .eq('category_id', categoryId)

    // 删除分类
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: error.message }
  }
}

// 创建产品
export const createProduct = async (productData, translations) => {
  try {
    // 创建产品
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()

    if (productError) throw productError

    // 创建翻译
    const translationData = translations.map(translation => ({
      ...translation,
      product_id: product.id
    }))

    const { error: translationError } = await supabase
      .from('product_translations')
      .insert(translationData)

    if (translationError) throw translationError

    return { success: true, data: product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }
}

// 更新产品
export const updateProduct = async (productId, productData, translations) => {
  try {
    // 更新产品
    const { error: productError } = await supabase
      .from('products')
      .update(productData)
      .eq('id', productId)

    if (productError) throw productError

    // 删除旧翻译
    await supabase
      .from('product_translations')
      .delete()
      .eq('product_id', productId)

    // 创建新翻译
    const translationData = translations.map(translation => ({
      ...translation,
      product_id: productId
    }))

    const { error: translationError } = await supabase
      .from('product_translations')
      .insert(translationData)

    if (translationError) throw translationError

    return { success: true }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: error.message }
  }
}

// 删除产品
export const deleteProduct = async (productId) => {
  try {
    // 删除翻译
    await supabase
      .from('product_translations')
      .delete()
      .eq('product_id', productId)

    // 删除产品
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }
}

// 获取CMS用的完整数据（包含所有语言翻译）
export const getCategoriesForCMS = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        category_translations(*)
      `)
      .order('sort_order')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching categories for CMS:', error)
    return []
  }
}

export const getProductsForCMS = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_translations(*),
        categories(slug, category_translations(*))
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching products for CMS:', error)
    return []
  }
}