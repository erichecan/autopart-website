-- 汽车配件网站数据库架构
-- 请在您的Supabase项目中执行这些SQL语句

-- 启用UUID扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 创建分类表
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL, -- 用于URL和代码引用，如 'engine', 'brake'
    icon TEXT, -- 表情符号图标
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. 创建分类翻译表
CREATE TABLE category_translations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    language TEXT NOT NULL CHECK (language IN ('zh', 'en', 'fr', 'es', 'ar')),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(category_id, language)
);

-- 3. 创建产品表
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL, -- 产品标识符
    oemCode TEXT, -- OEM代码
    price DECIMAL(10,2), -- 价格
    moq INTEGER, -- 最小起订量
    image TEXT, -- 图片URL
    featured BOOLEAN DEFAULT FALSE, -- 是否推荐
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. 创建产品翻译表
CREATE TABLE product_translations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    language TEXT NOT NULL CHECK (language IN ('zh', 'en', 'fr', 'es', 'ar')),
    name TEXT NOT NULL,
    description TEXT,
    specifications TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(product_id, language)
);

-- 5. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. 为需要的表添加更新时间触发器
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. 创建索引以提高查询性能
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);
CREATE INDEX idx_category_translations_category_language ON category_translations(category_id, language);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_product_translations_product_language ON product_translations(product_id, language);

-- 8. 插入初始分类数据
INSERT INTO categories (slug, icon, sort_order) VALUES
    ('engine', '🔧', 1),
    ('brake', '🛑', 2),
    ('suspension', '🔩', 3),
    ('electrical', '⚡', 4),
    ('filter', '🔍', 5),
    ('lighting', '💡', 6);

-- 9. 插入分类翻译数据
INSERT INTO category_translations (category_id, language, name) VALUES
    ((SELECT id FROM categories WHERE slug = 'engine'), 'zh', '发动机系统'),
    ((SELECT id FROM categories WHERE slug = 'engine'), 'en', 'Engine System'),
    ((SELECT id FROM categories WHERE slug = 'engine'), 'fr', 'Système Moteur'),
    ((SELECT id FROM categories WHERE slug = 'engine'), 'es', 'Sistema del Motor'),
    ((SELECT id FROM categories WHERE slug = 'engine'), 'ar', 'نظام المحرك'),
    
    ((SELECT id FROM categories WHERE slug = 'brake'), 'zh', '制动系统'),
    ((SELECT id FROM categories WHERE slug = 'brake'), 'en', 'Brake System'),
    ((SELECT id FROM categories WHERE slug = 'brake'), 'fr', 'Système de Freinage'),
    ((SELECT id FROM categories WHERE slug = 'brake'), 'es', 'Sistema de Frenos'),
    ((SELECT id FROM categories WHERE slug = 'brake'), 'ar', 'نظام الفرامل'),
    
    ((SELECT id FROM categories WHERE slug = 'suspension'), 'zh', '悬挂系统'),
    ((SELECT id FROM categories WHERE slug = 'suspension'), 'en', 'Suspension System'),
    ((SELECT id FROM categories WHERE slug = 'suspension'), 'fr', 'Système de Suspension'),
    ((SELECT id FROM categories WHERE slug = 'suspension'), 'es', 'Sistema de Suspensión'),
    ((SELECT id FROM categories WHERE slug = 'suspension'), 'ar', 'نظام التعليق'),
    
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'zh', '电气系统'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'en', 'Electrical System'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'fr', 'Système Électrique'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'es', 'Sistema Eléctrico'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'ar', 'النظام الكهربائي'),
    
    ((SELECT id FROM categories WHERE slug = 'filter'), 'zh', '过滤系统'),
    ((SELECT id FROM categories WHERE slug = 'filter'), 'en', 'Filter System'),
    ((SELECT id FROM categories WHERE slug = 'filter'), 'fr', 'Système de Filtration'),
    ((SELECT id FROM categories WHERE slug = 'filter'), 'es', 'Sistema de Filtros'),
    ((SELECT id FROM categories WHERE slug = 'filter'), 'ar', 'نظام المرشحات'),
    
    ((SELECT id FROM categories WHERE slug = 'lighting'), 'zh', '照明系统'),
    ((SELECT id FROM categories WHERE slug = 'lighting'), 'en', 'Lighting System'),
    ((SELECT id FROM categories WHERE slug = 'lighting'), 'fr', 'Système d\'Éclairage'),
    ((SELECT id FROM categories WHERE slug = 'lighting'), 'es', 'Sistema de Iluminación'),
    ((SELECT id FROM categories WHERE slug = 'lighting'), 'ar', 'نظام الإضاءة');

-- 10. 插入示例产品数据
INSERT INTO products (category_id, slug, oemCode, price, moq, image, featured, status) VALUES
    ((SELECT id FROM categories WHERE slug = 'brake'), 'brake-pads-premium', 'BRK-3400-PAD', 15.00, 200, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', true, 'active'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'spark-plugs-platinum', 'SPK-1100-PLT', 6.00, 1000, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop', true, 'active'),
    ((SELECT id FROM categories WHERE slug = 'filter'), 'oil-filter-premium', 'OIL-2200-FLT', 8.00, 500, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop', true, 'active');

-- 11. 插入产品翻译数据
INSERT INTO product_translations (product_id, language, name, description) VALUES
    ((SELECT id FROM products WHERE slug = 'brake-pads-premium'), 'zh', '高级刹车片', '采用优质材料制造，确保卓越的制动性能和耐用性'),
    ((SELECT id FROM products WHERE slug = 'brake-pads-premium'), 'en', 'Premium Brake Pads', 'Made with high-quality materials for superior braking performance and durability'),
    ((SELECT id FROM products WHERE slug = 'brake-pads-premium'), 'fr', 'Plaquettes de Frein Premium', 'Fabriquées avec des matériaux de haute qualité pour des performances de freinage supérieures'),
    ((SELECT id FROM products WHERE slug = 'brake-pads-premium'), 'es', 'Pastillas de Freno Premium', 'Fabricadas con materiales de alta calidad para un rendimiento de frenado superior'),
    ((SELECT id FROM products WHERE slug = 'brake-pads-premium'), 'ar', 'أقراص فرامل فاخرة', 'مصنوعة من مواد عالية الجودة لأداء فرملة متفوق ومتانة'),
    
    ((SELECT id FROM products WHERE slug = 'spark-plugs-platinum'), 'zh', '铂金火花塞', '高性能铂金火花塞，提供稳定的点火性能'),
    ((SELECT id FROM products WHERE slug = 'spark-plugs-platinum'), 'en', 'Platinum Spark Plugs', 'High-performance platinum spark plugs for reliable ignition'),
    ((SELECT id FROM products WHERE slug = 'spark-plugs-platinum'), 'fr', 'Bougies Platine', 'Bougies d\'allumage platine haute performance pour un allumage fiable'),
    ((SELECT id FROM products WHERE slug = 'spark-plugs-platinum'), 'es', 'Bujías de Platino', 'Bujías de platino de alto rendimiento para encendido confiable'),
    ((SELECT id FROM products WHERE slug = 'spark-plugs-platinum'), 'ar', 'شمعات إشعال بلاتينية', 'شمعات إشعال بلاتينية عالية الأداء للإشعال الموثوق'),
    
    ((SELECT id FROM products WHERE slug = 'oil-filter-premium'), 'zh', '高级机油滤清器', '优质过滤材料，有效保护发动机'),
    ((SELECT id FROM products WHERE slug = 'oil-filter-premium'), 'en', 'Premium Oil Filter', 'Quality filtration material for effective engine protection'),
    ((SELECT id FROM products WHERE slug = 'oil-filter-premium'), 'fr', 'Filtre à Huile Premium', 'Matériau de filtration de qualité pour une protection efficace du moteur'),
    ((SELECT id FROM products WHERE slug = 'oil-filter-premium'), 'es', 'Filtro de Aceite Premium', 'Material de filtración de calidad para protección efectiva del motor'),
    ((SELECT id FROM products WHERE slug = 'oil-filter-premium'), 'ar', 'مرشح زيت فاخر', 'مواد ترشيح عالية الجودة لحماية فعالة للمحرك');

-- 12. 设置行级安全策略 (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_translations ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取数据
CREATE POLICY "Allow read access for everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow read access for everyone" ON category_translations FOR SELECT USING (true);
CREATE POLICY "Allow read access for everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Allow read access for everyone" ON product_translations FOR SELECT USING (true);

-- 只允许认证用户写入数据 (用于CMS)
CREATE POLICY "Allow write access for authenticated users" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow write access for authenticated users" ON category_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow write access for authenticated users" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow write access for authenticated users" ON product_translations FOR ALL USING (auth.role() = 'authenticated');