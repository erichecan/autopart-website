export const productCategories = [
  {
    id: 'engine',
    nameKey: 'engineSystem',
    icon: '🔧',
    products: [
      {
        id: 'pistons',
        nameKey: 'pistons',
        price: 25,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'engine',
        oemCode: 'PST-4001-STD'
      },
      {
        id: 'piston-rings',
        nameKey: 'pistonRings',
        price: 8,
        moq: 500,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'engine',
        oemCode: 'PRG-2050-SET'
      },
      {
        id: 'cylinder-liners',
        nameKey: 'cylinderLiners',
        price: 45,
        moq: 50,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'engine',
        oemCode: 'CYL-8500-LNR'
      },
      {
        id: 'crankshafts',
        nameKey: 'crankshafts',
        price: 180,
        moq: 20,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'engine',
        oemCode: 'CRK-1200-ASM'
      },
      {
        id: 'connecting-rods',
        nameKey: 'connectingRods',
        price: 35,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'engine',
        oemCode: 'CON-6700-ROD'
      }
    ]
  },
  {
    id: 'brake',
    nameKey: 'brakeSystem',
    icon: '🛑',
    products: [
      {
        id: 'brake-pads',
        nameKey: 'brakePads',
        price: 15,
        moq: 200,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'brake',
        oemCode: 'BRK-3400-PAD'
      },
      {
        id: 'brake-discs',
        nameKey: 'brakeDiscs',
        price: 65,
        moq: 50,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'brake',
        oemCode: 'BRK-5600-DSC'
      },
      {
        id: 'brake-drums',
        nameKey: 'brakeDrums',
        price: 85,
        moq: 30,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'brake',
        oemCode: 'BRK-7800-DRM'
      },
      {
        id: 'brake-fluid',
        nameKey: 'brakeFluid',
        price: 12,
        moq: 500,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'brake',
        oemCode: 'BRK-1100-FLD'
      }
    ]
  },
  {
    id: 'suspension',
    nameKey: 'suspensionSystem',
    icon: '🔩',
    products: [
      {
        id: 'shock-absorbers',
        nameKey: 'shockAbsorbers',
        price: 55,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'suspension'
      },
      {
        id: 'springs',
        nameKey: 'springs',
        price: 28,
        moq: 200,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'suspension'
      },
      {
        id: 'stabilizer-bars',
        nameKey: 'stabilizerBars',
        price: 42,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'suspension'
      }
    ]
  },
  {
    id: 'electrical',
    nameKey: 'electricalSystem',
    icon: '⚡',
    products: [
      {
        id: 'spark-plugs',
        nameKey: 'sparkPlugs',
        price: 6,
        moq: 1000,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'electrical'
      },
      {
        id: 'ignition-coils',
        nameKey: 'ignitionCoils',
        price: 35,
        moq: 200,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'electrical'
      },
      {
        id: 'batteries',
        nameKey: 'batteries',
        price: 85,
        moq: 50,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'electrical'
      },
      {
        id: 'alternators',
        nameKey: 'alternators',
        price: 125,
        moq: 30,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'electrical'
      }
    ]
  },
  {
    id: 'filter',
    nameKey: 'filterSystem',
    icon: '🔍',
    products: [
      {
        id: 'oil-filters',
        nameKey: 'oilFilters',
        price: 8,
        moq: 500,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'filter'
      },
      {
        id: 'air-filters',
        nameKey: 'airFilters',
        price: 12,
        moq: 300,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'filter'
      },
      {
        id: 'fuel-filters',
        nameKey: 'fuelFilters',
        price: 15,
        moq: 200,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'filter'
      }
    ]
  },
  {
    id: 'lighting',
    nameKey: 'lightingSystem',
    icon: '💡',
    products: [
      {
        id: 'headlights',
        nameKey: 'headlights',
        price: 95,
        moq: 50,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'lighting'
      },
      {
        id: 'tail-lights',
        nameKey: 'tailLights',
        price: 45,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'lighting'
      },
      {
        id: 'turn-signals',
        nameKey: 'turnSignals',
        price: 25,
        moq: 200,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
        category: 'lighting'
      },
      {
        id: 'led-light-bars',
        nameKey: 'ledLightBars',
        price: 75,
        moq: 100,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        category: 'lighting'
      }
    ]
  }
];

export const featuredProducts = [
  {
    id: 'brake-pads',
    nameKey: 'brakePads',
    price: 15,
    moq: 200,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'brake',
    featured: true
  },
  {
    id: 'spark-plugs',
    nameKey: 'sparkPlugs',
    price: 6,
    moq: 1000,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    category: 'electrical',
    featured: true
  },
  {
    id: 'oil-filters',
    nameKey: 'oilFilters',
    price: 8,
    moq: 500,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
    category: 'filter',
    featured: true
  },
  {
    id: 'headlights',
    nameKey: 'headlights',
    price: 95,
    moq: 50,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'lighting',
    featured: true
  },
  {
    id: 'shock-absorbers',
    nameKey: 'shockAbsorbers',
    price: 55,
    moq: 100,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    category: 'suspension',
    featured: true
  },
  {
    id: 'pistons',
    nameKey: 'pistons',
    price: 25,
    moq: 100,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
    category: 'engine',
    featured: true
  }
];