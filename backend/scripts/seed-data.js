require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// ─── Products ────────────────────────────────────────────────────────────────
// Categories : men | women | kids | accessories | footwear
// Brands     : nike | adidas | puma | levi | zara | h&m

const dummyProducts = [
  // ── Men ──────────────────────────────────────────────────────────────────
  {
    title: "Nike Dri-FIT Training T-Shirt",
    description:
      "Sweat-wicking fabric keeps you dry and comfortable during any workout. Classic crew-neck cut with a slim, athletic fit.",
    category: "men",
    brand: "nike",
    price: 1299,
    salePrice: 999,
    totalStock: 80,
    averageReview: 4.5,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop",
  },
  {
    title: "Adidas Essentials Fleece Hoodie",
    description:
      "Soft fleece interior with an iconic 3-stripe design. A go-to choice for casual wear and light outdoor activity.",
    category: "men",
    brand: "adidas",
    price: 2499,
    salePrice: 1899,
    totalStock: 55,
    averageReview: 4.3,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
  },
  {
    title: "Levi's 511 Slim Fit Jeans",
    description:
      "A modern slim fit that sits below the waist and tapers from the thigh to the ankle. Made from stretch denim for all-day comfort.",
    category: "men",
    brand: "levi",
    price: 3499,
    salePrice: 0,
    totalStock: 40,
    averageReview: 4.6,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop",
  },
  {
    title: "Zara Structured Blazer",
    description:
      "Sharp tailoring meets contemporary style in this single-breasted blazer. Perfect for both office and evening wear.",
    category: "men",
    brand: "zara",
    price: 4999,
    salePrice: 3999,
    totalStock: 30,
    averageReview: 4.2,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop",
  },
  {
    title: "H&M Regular Fit Oxford Shirt",
    description:
      "Timeless oxford cotton shirt with a button-down collar and chest pocket. Versatile enough for work or weekends.",
    category: "men",
    brand: "h&m",
    price: 1599,
    salePrice: 1199,
    totalStock: 100,
    averageReview: 4.1,
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop",
  },
  {
    title: "Puma Evostripe Track Pants",
    description:
      "Tapered jogger with DryCell technology and a comfortable elastic waistband. Ideal for training or lounging.",
    category: "men",
    brand: "puma",
    price: 1999,
    salePrice: 1499,
    totalStock: 60,
    averageReview: 4.4,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop",
  },

  // ── Women ─────────────────────────────────────────────────────────────────
  {
    title: "Zara Floral Midi Dress",
    description:
      "Flowy midi dress with a v-neck and button-front detail. The all-over floral print makes it a wardrobe statement.",
    category: "women",
    brand: "zara",
    price: 3299,
    salePrice: 2499,
    totalStock: 45,
    averageReview: 4.7,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop",
  },
  {
    title: "H&M Conscious Linen Blouse",
    description:
      "Breathable linen blend blouse with a relaxed fit and roll-up sleeves. Part of the sustainable Conscious collection.",
    category: "women",
    brand: "h&m",
    price: 1499,
    salePrice: 0,
    totalStock: 70,
    averageReview: 4.3,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&auto=format&fit=crop",
  },
  {
    title: "Nike Yoga Luxe Leggings",
    description:
      "Buttery-soft Infinalon fabric with a high waist and secure waistband. Designed for yoga but comfortable enough for everyday wear.",
    category: "women",
    brand: "nike",
    price: 2799,
    salePrice: 2199,
    totalStock: 50,
    averageReview: 4.8,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop",
  },
  {
    title: "Adidas Originals Crop Top",
    description:
      "Sporty cropped tee with the classic trefoil logo. Pairs perfectly with high-waist bottoms for an athleisure look.",
    category: "women",
    brand: "adidas",
    price: 1199,
    salePrice: 899,
    totalStock: 90,
    averageReview: 4.2,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop",
  },
  {
    title: "Levi's High-Waisted Skinny Jeans",
    description:
      "Iconic high-waist skinny silhouette in classic blue denim. Made with a touch of stretch for the perfect fit all day long.",
    category: "women",
    brand: "levi",
    price: 3199,
    salePrice: 2599,
    totalStock: 35,
    averageReview: 4.5,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop",
  },

  // ── Kids ──────────────────────────────────────────────────────────────────
  {
    title: "Nike Kids' Sportswear T-Shirt",
    description:
      "Soft cotton tee with a fun graphic print. Durable enough for play and comfortable enough for school.",
    category: "kids",
    brand: "nike",
    price: 899,
    salePrice: 699,
    totalStock: 120,
    averageReview: 4.4,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop",
  },
  {
    title: "Adidas Kids' Tracksuit Set",
    description:
      "Two-piece tracksuit with a zip-up jacket and matching pants. Features moisture-wicking AEROREADY fabric.",
    category: "kids",
    brand: "adidas",
    price: 2299,
    salePrice: 1799,
    totalStock: 65,
    averageReview: 4.6,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&auto=format&fit=crop",
  },
  {
    title: "H&M Kids' Denim Overalls",
    description:
      "Cute and durable denim overalls with adjustable straps and multiple pockets. Perfect for active kids.",
    category: "kids",
    brand: "h&m",
    price: 1299,
    salePrice: 999,
    totalStock: 80,
    averageReview: 4.3,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop",
  },

  // ── Footwear ──────────────────────────────────────────────────────────────
  {
    title: "Nike Air Max 270",
    description:
      "Inspired by the Air Max 180 and Air Max 93, the 270 delivers a super-soft ride from heel to toe with a large Air unit.",
    category: "footwear",
    brand: "nike",
    price: 12999,
    salePrice: 10999,
    totalStock: 25,
    averageReview: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
  },
  {
    title: "Adidas Ultraboost 22",
    description:
      "Responsive BOOST midsole with a Primeknit+ upper for a sock-like fit. Built for everyday running and long distances.",
    category: "footwear",
    brand: "adidas",
    price: 14999,
    salePrice: 12499,
    totalStock: 20,
    averageReview: 4.8,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop",
  },
  {
    title: "Puma Suede Classic XXI",
    description:
      "The iconic suede sneaker that started it all. A timeless silhouette with a soft suede upper and cupsole construction.",
    category: "footwear",
    brand: "puma",
    price: 5999,
    salePrice: 4999,
    totalStock: 40,
    averageReview: 4.5,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&auto=format&fit=crop",
  },

  // ── Accessories ───────────────────────────────────────────────────────────
  {
    title: "Nike Swoosh Sports Cap",
    description:
      "Lightweight, structured cap with a curved brim and the iconic Swoosh logo. Available in multiple colourways.",
    category: "accessories",
    brand: "nike",
    price: 999,
    salePrice: 799,
    totalStock: 150,
    averageReview: 4.3,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop",
  },
  {
    title: "Adidas Sport Backpack",
    description:
      "Spacious main compartment with multiple pockets and a padded laptop sleeve. Water-resistant shell for everyday use.",
    category: "accessories",
    brand: "adidas",
    price: 2999,
    salePrice: 2499,
    totalStock: 35,
    averageReview: 4.4,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop",
  },
  {
    title: "Zara Leather Belt",
    description:
      "Genuine leather belt with a brushed metal buckle. A minimalist accessory that completes any outfit.",
    category: "accessories",
    brand: "zara",
    price: 1499,
    salePrice: 0,
    totalStock: 60,
    averageReview: 4.1,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop",
  },
];

// ─── Seed Function ────────────────────────────────────────────────────────────

async function seedDummyData() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  // ── 1. Seed Products ──────────────────────────────────────────────────────
  const existingProductCount = await Product.countDocuments();
  let insertedProducts = [];

  if (existingProductCount === 0) {
    insertedProducts = await Product.insertMany(dummyProducts);
    console.log(`✅ Inserted ${insertedProducts.length} products.`);
  } else {
    console.log(
      `ℹ️  Products already exist (${existingProductCount} found) — skipping product seed.`
    );
    insertedProducts = await Product.find({});
  }

  // ── 2. Resolve or create a dummy buyer user ───────────────────────────────
  let buyer = await User.findOne({ role: "user" });
  if (!buyer) {
    const hashedPw = await bcrypt.hash("buyer123", 12);
    buyer = await User.create({
      userName: "demobuyer",
      email: "buyer@demo.com",
      password: hashedPw,
      role: "user",
    });
    console.log("✅ Created demo buyer user: buyer@demo.com / buyer123");
  }

  // ── 3. Seed Orders ────────────────────────────────────────────────────────
  const existingOrderCount = await Order.countDocuments();

  if (existingOrderCount === 0) {
    const productMap = insertedProducts.reduce((acc, p) => {
      acc[p.title] = p;
      return acc;
    }, {});

    // Helper to pick a product safely
    const pick = (title) =>
      productMap[title] || insertedProducts[0];

    const now = new Date();
    const daysAgo = (n) => new Date(now - n * 86400000);

    const dummyOrders = [
      {
        userId: buyer._id.toString(),
        cartId: new mongoose.Types.ObjectId().toString(),
        cartItems: [
          {
            productId: pick("Nike Dri-FIT Training T-Shirt")._id.toString(),
            title: "Nike Dri-FIT Training T-Shirt",
            image: pick("Nike Dri-FIT Training T-Shirt").image,
            price: "999",
            quantity: 2,
          },
          {
            productId: pick("Adidas Essentials Fleece Hoodie")._id.toString(),
            title: "Adidas Essentials Fleece Hoodie",
            image: pick("Adidas Essentials Fleece Hoodie").image,
            price: "1899",
            quantity: 1,
          },
        ],
        addressInfo: {
          addressId: new mongoose.Types.ObjectId().toString(),
          address: "12, MG Road",
          city: "Bengaluru",
          pincode: "560001",
          phone: "9876543210",
          notes: "Leave at the door",
        },
        orderStatus: "delivered",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        totalAmount: 3897,
        orderDate: daysAgo(15),
        orderUpdateDate: daysAgo(12),
        paymentId: "PAY-DEMO001",
        payerId: buyer._id.toString(),
      },
      {
        userId: buyer._id.toString(),
        cartId: new mongoose.Types.ObjectId().toString(),
        cartItems: [
          {
            productId: pick("Nike Air Max 270")._id.toString(),
            title: "Nike Air Max 270",
            image: pick("Nike Air Max 270").image,
            price: "10999",
            quantity: 1,
          },
        ],
        addressInfo: {
          addressId: new mongoose.Types.ObjectId().toString(),
          address: "45, Park Street",
          city: "Kolkata",
          pincode: "700016",
          phone: "9123456780",
          notes: "",
        },
        orderStatus: "inShipping",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        totalAmount: 10999,
        orderDate: daysAgo(5),
        orderUpdateDate: daysAgo(3),
        paymentId: "PAY-DEMO002",
        payerId: buyer._id.toString(),
      },
      {
        userId: buyer._id.toString(),
        cartId: new mongoose.Types.ObjectId().toString(),
        cartItems: [
          {
            productId: pick("Zara Floral Midi Dress")._id.toString(),
            title: "Zara Floral Midi Dress",
            image: pick("Zara Floral Midi Dress").image,
            price: "2499",
            quantity: 1,
          },
          {
            productId: pick("H&M Conscious Linen Blouse")._id.toString(),
            title: "H&M Conscious Linen Blouse",
            image: pick("H&M Conscious Linen Blouse").image,
            price: "1499",
            quantity: 2,
          },
        ],
        addressInfo: {
          addressId: new mongoose.Types.ObjectId().toString(),
          address: "7, Linking Road",
          city: "Mumbai",
          pincode: "400054",
          phone: "9988776655",
          notes: "Call before delivery",
        },
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "pending",
        totalAmount: 5497,
        orderDate: daysAgo(1),
        orderUpdateDate: daysAgo(1),
        paymentId: "PAY-DEMO003",
        payerId: buyer._id.toString(),
      },
      {
        userId: buyer._id.toString(),
        cartId: new mongoose.Types.ObjectId().toString(),
        cartItems: [
          {
            productId: pick("Adidas Ultraboost 22")._id.toString(),
            title: "Adidas Ultraboost 22",
            image: pick("Adidas Ultraboost 22").image,
            price: "12499",
            quantity: 1,
          },
          {
            productId: pick("Adidas Sport Backpack")._id.toString(),
            title: "Adidas Sport Backpack",
            image: pick("Adidas Sport Backpack").image,
            price: "2499",
            quantity: 1,
          },
        ],
        addressInfo: {
          addressId: new mongoose.Types.ObjectId().toString(),
          address: "22, Anna Nagar",
          city: "Chennai",
          pincode: "600040",
          phone: "9000011112",
          notes: "",
        },
        orderStatus: "confirmed",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        totalAmount: 14998,
        orderDate: daysAgo(3),
        orderUpdateDate: daysAgo(2),
        paymentId: "PAY-DEMO004",
        payerId: buyer._id.toString(),
      },
      {
        userId: buyer._id.toString(),
        cartId: new mongoose.Types.ObjectId().toString(),
        cartItems: [
          {
            productId: pick("Levi's 511 Slim Fit Jeans")._id.toString(),
            title: "Levi's 511 Slim Fit Jeans",
            image: pick("Levi's 511 Slim Fit Jeans").image,
            price: "3499",
            quantity: 1,
          },
          {
            productId: pick("H&M Regular Fit Oxford Shirt")._id.toString(),
            title: "H&M Regular Fit Oxford Shirt",
            image: pick("H&M Regular Fit Oxford Shirt").image,
            price: "1199",
            quantity: 2,
          },
        ],
        addressInfo: {
          addressId: new mongoose.Types.ObjectId().toString(),
          address: "3, Civil Lines",
          city: "Delhi",
          pincode: "110054",
          phone: "9876001234",
          notes: "Ring the bell twice",
        },
        orderStatus: "rejected",
        paymentMethod: "paypal",
        paymentStatus: "failed",
        totalAmount: 5897,
        orderDate: daysAgo(20),
        orderUpdateDate: daysAgo(19),
        paymentId: "PAY-DEMO005",
        payerId: buyer._id.toString(),
      },
    ];

    await Order.insertMany(dummyOrders);
    console.log(`✅ Inserted ${dummyOrders.length} orders.`);
  } else {
    console.log(
      `ℹ️  Orders already exist (${existingOrderCount} found) — skipping order seed.`
    );
  }

  await mongoose.disconnect();
  console.log("Done! Database disconnected.");
}

seedDummyData().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
