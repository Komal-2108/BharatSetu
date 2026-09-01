import { getServiceImages, getVendorAvatar } from "./unsplash";

export interface VendorData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessType: "homestay" | "guide" | "package" | "artisan";
  location: string;
  verified: boolean;
  trustTier: "Gold" | "Silver" | "Bronze" | "New";
  memberSince: string;
  responseTime: string;
  avatar: string;
  description?: string;
}

export interface ServiceData {
  id: string;
  vendorId: string;
  vendor_id?: string;
  vendorName?: string;
  vendor_name?: string;
  title: string;
  category: "homestay" | "guide" | "package" | "artisan";
  price: number;
  priceUnit: string;
  location: string;
  description: string;
  included: string[];
  inclusions?: string[];
  languages?: string[];
  groupSize?: string;
  duration?: string;
  images: string[];
  rating: number | null;
  avg_rating?: number;
  reviewCount: number;
  total_reviews?: number;
  availableDates?: string[];
  available_dates?: string[];
  cancellationPolicy?: string;
  vendor?: VendorData;
  vendor_verified?: boolean;
  vendor_trust_tier?: string;
}

export interface BookingData {
  id: string;
  serviceId: string;
  service_id?: string;
  customerName: string;
  customer_name?: string;
  customerPhone: string;
  customer_phone?: string;
  customerEmail?: string;
  customer_email?: string;
  date: string;
  booking_date?: string;
  people?: number;
  nights?: number;
  specialRequests?: string;
  cancellation_reason?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pay_on_arrival" | "advance_paid";
  totalPrice: number;
  total_price?: number;
  service?: ServiceData;
}

export interface ReviewData {
  id: string;
  bookingId: string;
  serviceId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  vendorReply?: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  category: "Vendor Spotlight" | "Travel Tips" | "Festival Guide" | "Platform Updates";
  coverImage: string;
  readTime: string;
  date: string;
  author?: string;
  excerpt?: string;
  body?: string;
  relatedServiceId?: string;
}

export const SEED_MOCK_DATA = {
  vendors: [
    {
      id: "v1",
      name: "Ramesh Sharma",
      phone: "+919876543210",
      email: "ramesh@ujjain.in",
      businessType: "guide" as const,
      location: "Ujjain, Madhya Pradesh",
      verified: true,
      trustTier: "Gold" as const,
      memberSince: "2023-04-12",
      responseTime: "Usually responds within 2 hours",
      avatar: getVendorAvatar("Ramesh Sharma"),
      description: "Government-certified Mahakaleshwar temple heritage walk storyteller & Jyotirlinga priest for 12+ years."
    },
    {
      id: "v2",
      name: "Priya Devi Homestays",
      phone: "+919876501234",
      email: "priya@omkareshwar.in",
      businessType: "homestay" as const,
      location: "Omkareshwar, Madhya Pradesh",
      verified: true,
      trustTier: "Silver" as const,
      memberSince: "2024-01-20",
      responseTime: "Usually responds within 4 hours",
      avatar: getVendorAvatar("Priya Devi"),
      description: "Dedicated to organic Malwi meals and sacred riverfront island pilgrimage hospitality."
    },
    {
      id: "v3",
      name: "Arun Trek & Tours",
      phone: "+919812345678",
      email: "arun@rishikesh.com",
      businessType: "guide" as const,
      location: "Rishikesh, Uttarakhand",
      verified: false,
      trustTier: "New" as const,
      memberSince: "2026-08-01",
      responseTime: "New vendor",
      avatar: getVendorAvatar("Arun"),
      description: "Safety-certified Ganga rafting and local trail guide based near Laxman Jhula."
    },
    {
      id: "v19",
      name: "Tashi Wangchuk Mountain Trails",
      phone: "+919899112233",
      email: "tashi@ladakh.in",
      businessType: "package" as const,
      location: "Leh, Ladakh",
      verified: true,
      trustTier: "Gold" as const,
      memberSince: "2022-09-10",
      responseTime: "Responds in 1h",
      avatar: getVendorAvatar("Tashi"),
      description: "Native Ladakhi monastery guide & high-altitude eco-expedition leader."
    },
    {
      id: "v20",
      name: "Laxmi Ammal Heritage Arts",
      phone: "+919844001122",
      email: "laxmi@tanjore.in",
      businessType: "artisan" as const,
      location: "Thanjavur, Tamil Nadu",
      verified: true,
      trustTier: "Gold" as const,
      memberSince: "2021-03-15",
      responseTime: "Responds in 30m",
      avatar: getVendorAvatar("Laxmi"),
      description: "National Award winning Tanjore gold foil painting & bronze casting master."
    }
  ],
  services: [
    {
      id: "s1",
      vendorId: "v1",
      vendor_id: "v1",
      vendorName: "Ramesh Sharma",
      vendor_name: "Ramesh Sharma",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Mahakaleshwar Temple Guide — Half Day",
      category: "guide" as const,
      price: 800,
      priceUnit: "per half-day",
      location: "Ujjain, Madhya Pradesh",
      description: "Skip the confusion and crowds — I'll guide you through Mahakaleshwar and 3 nearby temples with the right darshan timings.",
      included: ["Temple entry guidance", "Local transport between temples", "Historical context"],
      languages: ["Hindi", "English"],
      groupSize: "Up to 6 people",
      duration: "4 hours",
      images: getServiceImages("mahakaleshwar temple ujjain", 2),
      rating: 4.8,
      avg_rating: 4.8,
      reviewCount: 34,
      total_reviews: 34,
      availableDates: ["2026-09-04", "2026-09-05", "2026-09-06", "2026-09-07"]
    },
    {
      id: "s2",
      vendorId: "v2",
      vendor_id: "v2",
      vendorName: "Priya Devi Homestays",
      vendor_name: "Priya Devi Homestays",
      vendor_verified: true,
      vendor_trust_tier: "Silver",
      title: "Maa Narmada Riverside Homestay",
      category: "homestay" as const,
      price: 1200,
      priceUnit: "per night",
      location: "Omkareshwar, Madhya Pradesh",
      description: "2BHK home 5 minutes from the temple, home-cooked meals included, river view from the balcony.",
      included: ["Breakfast & dinner", "Free WiFi", "Riverside balcony"],
      groupSize: "Up to 4 guests",
      images: getServiceImages("omkareshwar narmada river", 2),
      rating: 4.6,
      avg_rating: 4.6,
      reviewCount: 21,
      total_reviews: 21,
      availableDates: ["2026-09-05", "2026-09-06", "2026-09-07", "2026-09-08"]
    },
    {
      id: "s3",
      vendorId: "v3",
      vendor_id: "v3",
      vendorName: "Arun Trek & Tours",
      vendor_name: "Arun Trek & Tours",
      vendor_verified: false,
      vendor_trust_tier: "New",
      title: "Rishikesh River Rafting + Local Trail",
      category: "guide" as const,
      price: 1500,
      priceUnit: "per day",
      location: "Rishikesh, Uttarakhand",
      description: "Full day combining rafting on the Ganga with a local trail hike — safety-certified.",
      included: ["Rafting equipment", "Trail guide", "Lunch"],
      languages: ["Hindi", "Garhwali", "English"],
      groupSize: "Up to 8 people",
      duration: "Full day",
      images: getServiceImages("rishikesh river rafting ganga", 2),
      rating: null,
      reviewCount: 0,
      availableDates: ["2026-09-06", "2026-09-07", "2026-09-08"]
    },
    {
      id: "s4",
      vendorId: "v19",
      vendor_id: "v19",
      vendorName: "Tashi Wangchuk Mountain Trails",
      vendor_name: "Tashi Wangchuk Mountain Trails",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Char Dham Mini Package — 4 Days 3 Nights",
      category: "package" as const,
      price: 9999,
      priceUnit: "per person",
      location: "Uttarakhand",
      description: "Small-group Char Dham circuit covering Kedarnath, Badrinath, Gangotri, and Yamunotri with comfortable stays and priority darshan slots.",
      included: ["AC transport", "3-star stays", "All meals", "Priority darshan pass"],
      groupSize: "Max 8 people",
      duration: "4 Days 3 Nights",
      images: getServiceImages("kedarnath temple himalayas", 2),
      rating: 4.9,
      avg_rating: 4.9,
      reviewCount: 12,
      total_reviews: 12,
      availableDates: ["2026-09-08", "2026-09-12", "2026-09-15"]
    },
    {
      id: "s5",
      vendorId: "v1",
      vendor_id: "v1",
      vendorName: "Ramesh Sharma",
      vendor_name: "Ramesh Sharma",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Khatu Shyam + Salasar 2-Day Darshan Trip",
      category: "package" as const,
      price: 3499,
      priceUnit: "per person",
      location: "Rajasthan",
      description: "Bus pickup from Jaipur, covers both Khatu Shyam and Salasar Balaji temples with darshan priority pass included.",
      included: ["Bus pickup from Jaipur", "1 night stay", "Darshan priority pass", "Breakfast"],
      groupSize: "Max 20 people",
      duration: "2 Days 1 Night",
      images: getServiceImages("khatu shyam temple rajasthan", 2),
      rating: 4.5,
      avg_rating: 4.5,
      reviewCount: 18,
      total_reviews: 18,
      availableDates: ["2026-09-05", "2026-09-12"]
    },
    {
      id: "s6",
      vendorId: "v20",
      vendor_id: "v20",
      vendorName: "Laxmi Ammal Heritage Arts",
      vendor_name: "Laxmi Ammal Heritage Arts",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Bhopal Handloom Sarees — Direct from Weaver",
      category: "artisan" as const,
      price: 2200,
      priceUnit: "starting price",
      location: "Bhopal, Madhya Pradesh",
      description: "Authentic Chanderi silk sarees, handwoven, direct from the weaver's family workshop. Cash-on-delivery for local pickup.",
      included: ["Certificate of authenticity", "Free minor alterations"],
      images: getServiceImages("chanderi silk saree handloom", 2),
      rating: 4.7,
      avg_rating: 4.7,
      reviewCount: 9,
      total_reviews: 9,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s7",
      vendorId: "v20",
      vendor_id: "v20",
      vendorName: "Laxmi Ammal Heritage Arts",
      vendor_name: "Laxmi Ammal Heritage Arts",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Pachmarhi Tribal Handicrafts",
      category: "artisan" as const,
      price: 150,
      priceUnit: "starting price",
      location: "Pachmarhi, Madhya Pradesh",
      description: "Bamboo and terracotta handicrafts made by local Gond artisans, made-to-order and shipped nationwide.",
      included: ["Custom sizing on request", "Eco-friendly packaging"],
      images: getServiceImages("bamboo terracotta handicraft india", 2),
      rating: 4.4,
      avg_rating: 4.4,
      reviewCount: 6,
      total_reviews: 6,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s8",
      vendorId: "v3",
      vendor_id: "v3",
      vendorName: "Arun Trek & Tours",
      vendor_name: "Arun Trek & Tours",
      vendor_verified: false,
      vendor_trust_tier: "New",
      title: "Himalayan View Cottage — Laxman Jhula",
      category: "homestay" as const,
      price: 1800,
      priceUnit: "per night",
      location: "Rishikesh, Uttarakhand",
      description: "Family-run cottage 5 minutes from Laxman Jhula, mountain views, optional morning yoga session with the host.",
      included: ["Breakfast", "Optional yoga session", "Mountain-view balcony"],
      groupSize: "Up to 3 guests",
      images: getServiceImages("laxman jhula rishikesh mountains", 2),
      rating: 4.9,
      avg_rating: 4.9,
      reviewCount: 27,
      total_reviews: 27,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s9",
      vendorId: "v1",
      vendor_id: "v1",
      vendorName: "Ramesh Sharma",
      vendor_name: "Ramesh Sharma",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Varanasi Ganga Aarti + Old City Walk",
      category: "guide" as const,
      price: 1000,
      priceUnit: "per group",
      location: "Varanasi, Uttar Pradesh",
      description: "Evening Ganga Aarti front-row viewing followed by a guided walk through Varanasi's oldest lanes and hidden temples.",
      included: ["Aarti viewing spot", "Old city walking tour", "Local snack tasting"],
      languages: ["Hindi", "English", "Bhojpuri"],
      groupSize: "Up to 10 people",
      duration: "3 hours",
      images: getServiceImages("varanasi ganga aarti evening", 2),
      rating: 4.7,
      avg_rating: 4.7,
      reviewCount: 41,
      total_reviews: 41,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s10",
      vendorId: "v1",
      vendor_id: "v1",
      vendorName: "Ramesh Sharma",
      vendor_name: "Ramesh Sharma",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Amritsar Golden Temple Heritage Walk",
      category: "guide" as const,
      price: 700,
      priceUnit: "per half-day",
      location: "Amritsar, Punjab",
      description: "Guided visit to the Golden Temple with langar experience, followed by Jallianwala Bagh and the old city market.",
      included: ["Temple guidance", "Langar experience", "Local transport"],
      languages: ["Punjabi", "Hindi", "English"],
      groupSize: "Up to 8 people",
      duration: "4 hours",
      images: getServiceImages("golden temple amritsar", 2),
      rating: 4.8,
      avg_rating: 4.8,
      reviewCount: 29,
      total_reviews: 29,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s11",
      vendorId: "v2",
      vendor_id: "v2",
      vendorName: "Priya Devi Homestays",
      vendor_name: "Priya Devi Homestays",
      vendor_verified: true,
      vendor_trust_tier: "Silver",
      title: "Kerala Backwater Homestay — Alleppey",
      category: "homestay" as const,
      price: 2500,
      priceUnit: "per night",
      location: "Alleppey, Kerala",
      description: "Traditional Kerala home on the backwaters with home-cooked Malayali meals and optional sunset canoe ride.",
      included: ["All meals", "Sunset canoe ride", "Free WiFi"],
      groupSize: "Up to 5 guests",
      images: getServiceImages("kerala backwaters houseboat alleppey", 2),
      rating: 4.9,
      avg_rating: 4.9,
      reviewCount: 33,
      total_reviews: 33,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s12",
      vendorId: "v19",
      vendor_id: "v19",
      vendorName: "Tashi Wangchuk Mountain Trails",
      vendor_name: "Tashi Wangchuk Mountain Trails",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Jaisalmer Desert Camp + Camel Safari",
      category: "package" as const,
      price: 4200,
      priceUnit: "per person",
      location: "Jaisalmer, Rajasthan",
      description: "Overnight desert camp with camel safari at sunset, folk music evening, and dinner under the stars.",
      included: ["Camel safari", "Desert camp stay", "Dinner & folk performance", "Breakfast"],
      groupSize: "Max 15 people",
      duration: "1 Night 2 Days",
      images: getServiceImages("jaisalmer desert camel safari", 2),
      rating: 4.6,
      avg_rating: 4.6,
      reviewCount: 15,
      total_reviews: 15,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s13",
      vendorId: "v20",
      vendor_id: "v20",
      vendorName: "Laxmi Ammal Heritage Arts",
      vendor_name: "Laxmi Ammal Heritage Arts",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Madhubani Painting Workshop Kit",
      category: "artisan" as const,
      price: 899,
      priceUnit: "per kit",
      location: "Madhubani, Bihar",
      description: "Learn traditional Madhubani painting with an at-home kit made by local artists — includes natural colors and a video tutorial link.",
      included: ["Painting materials", "Video tutorial access", "Artist-signed sample"],
      images: getServiceImages("madhubani painting art bihar", 2),
      rating: 4.5,
      avg_rating: 4.5,
      reviewCount: 11,
      total_reviews: 11,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s14",
      vendorId: "v19",
      vendor_id: "v19",
      vendorName: "Tashi Wangchuk Mountain Trails",
      vendor_name: "Tashi Wangchuk Mountain Trails",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Vaishno Devi Yatra Package — 3 Days",
      category: "package" as const,
      price: 6500,
      priceUnit: "per person",
      location: "Katra, Jammu & Kashmir",
      description: "Complete Vaishno Devi darshan package with helicopter ticket assistance, comfortable stay in Katra, and battery car pass for elderly travelers.",
      included: ["Stay in Katra", "Helicopter ticket assistance", "Battery car pass", "Breakfast & dinner"],
      groupSize: "Max 10 people",
      duration: "3 Days 2 Nights",
      images: getServiceImages("vaishno devi temple katra", 2),
      rating: 4.8,
      avg_rating: 4.8,
      reviewCount: 22,
      total_reviews: 22,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s15",
      vendorId: "v3",
      vendor_id: "v3",
      vendorName: "Arun Trek & Tours",
      vendor_name: "Arun Trek & Tours",
      vendor_verified: false,
      vendor_trust_tier: "New",
      title: "Goa Portuguese Quarter Heritage Walk",
      category: "guide" as const,
      price: 600,
      priceUnit: "per person",
      location: "Fontainhas, Goa",
      description: "Walk through Goa's colorful Latin Quarter with stories of Portuguese-era architecture, ending at a local café for authentic Goan snacks.",
      included: ["Guided walk", "Café snack tasting"],
      languages: ["Konkani", "English", "Hindi"],
      groupSize: "Up to 12 people",
      duration: "2.5 hours",
      images: getServiceImages("fontainhas goa portuguese houses", 2),
      rating: 4.6,
      avg_rating: 4.6,
      reviewCount: 19,
      total_reviews: 19,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s16",
      vendorId: "v20",
      vendor_id: "v20",
      vendorName: "Laxmi Ammal Heritage Arts",
      vendor_name: "Laxmi Ammal Heritage Arts",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Kutch Bandhani Textile Studio Visit",
      category: "artisan" as const,
      price: 1800,
      priceUnit: "starting price",
      location: "Bhuj, Gujarat",
      description: "Visit a family-run Bandhani tie-dye textile studio, watch the process live, and buy directly from the artisans.",
      included: ["Studio tour", "Tea with the family", "Direct artisan pricing"],
      images: getServiceImages("bandhani tie dye gujarat textile", 2),
      rating: 4.7,
      avg_rating: 4.7,
      reviewCount: 8,
      total_reviews: 8,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s17",
      vendorId: "v1",
      vendor_id: "v1",
      vendorName: "Ramesh Sharma",
      vendor_name: "Ramesh Sharma",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Hampi Ruins Sunrise Cycling Tour",
      category: "guide" as const,
      price: 950,
      priceUnit: "per person",
      location: "Hampi, Karnataka",
      description: "Cycle through the ancient ruins of Hampi at sunrise, avoiding heat and crowds, with a local historian guide.",
      included: ["Bicycle rental", "Guide", "Bottled water"],
      languages: ["Kannada", "Hindi", "English"],
      groupSize: "Up to 6 people",
      duration: "3 hours",
      images: getServiceImages("hampi ruins karnataka sunrise", 2),
      rating: 4.9,
      avg_rating: 4.9,
      reviewCount: 25,
      total_reviews: 25,
      availableDates: ["2026-09-05", "2026-09-06"]
    },
    {
      id: "s18",
      vendorId: "v19",
      vendor_id: "v19",
      vendorName: "Tashi Wangchuk Mountain Trails",
      vendor_name: "Tashi Wangchuk Mountain Trails",
      vendor_verified: true,
      vendor_trust_tier: "Gold",
      title: "Shirdi Sai Baba Darshan Package — 2 Days",
      category: "package" as const,
      price: 2999,
      priceUnit: "per person",
      location: "Shirdi, Maharashtra",
      description: "Comfortable 2-day Shirdi package with pre-booked darshan slots, stay near the temple, and local transport included.",
      included: ["Stay near temple", "Darshan slot booking", "Local transport", "Breakfast"],
      groupSize: "Max 12 people",
      duration: "2 Days 1 Night",
      images: getServiceImages("shirdi sai baba temple", 2),
      rating: 4.7,
      avg_rating: 4.7,
      reviewCount: 30,
      total_reviews: 30,
      availableDates: ["2026-09-05", "2026-09-06"]
    }
  ],
  bookings: [
    {
      id: "b1",
      serviceId: "s1",
      customerName: "Anjali Verma",
      customerPhone: "+919900112233",
      customerEmail: "anjali@gmail.com",
      date: "2026-09-10",
      people: 2,
      status: "confirmed" as const,
      paymentStatus: "pay_on_arrival" as const,
      totalPrice: 1600
    },
    {
      id: "b2",
      serviceId: "s2",
      customerName: "Rohit Malhotra",
      customerPhone: "+919900223344",
      customerEmail: "rohit@yahoo.com",
      date: "2026-09-15",
      nights: 2,
      status: "pending" as const,
      paymentStatus: "advance_paid" as const,
      totalPrice: 2400
    }
  ],
  reviews: [
    {
      id: "r1",
      bookingId: "b1",
      serviceId: "s1",
      reviewerName: "Kavita S.",
      rating: 5,
      comment: "Ramesh ji knew exactly when to visit each temple to avoid crowds. Made our Mahakal darshan so much smoother!",
      date: "2026-07-22",
      vendorReply: "Dhanyawad Kavita ji! Honored to assist you on your pilgrimage."
    }
  ],
  blogPosts: [
    {
      id: "bl1",
      title: "Meet Ramesh Ji: 12 Years Guiding Pilgrims Through Ujjain",
      category: "Vendor Spotlight" as const,
      coverImage: "https://images.unsplash.com/photo-1609946682042-870e6728416b?w=800&auto=format&fit=crop&q=80",
      readTime: "4 min read",
      date: "2026-08-10",
      author: "Team BharatSetu",
      excerpt: "Discover how Ramesh Sharma built a trusted network of temple walks in Ujjain, helping thousands experience Mahakaleshwar Bhasma Aarti with peace.",
      body: `Ujjain is one of India's most sacred pilgrimage destinations. For over 12 years, Ramesh Sharma has been a pillar of local hospitality and spiritual guidance.

From managing early morning Bhasma Aarti queue passes to sharing ancient stories of the Vikramaditya era along the Kshipra river, Ramesh Ji embodies what BharatSetu stands for: authentic, verified local expertise with a human touch.`,
      relatedServiceId: "s1"
    },
    {
      id: "bl2",
      title: "First-Time Guide to Char Dham Yatra: What to Pack, When to Go",
      category: "Travel Tips" as const,
      coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
      readTime: "6 min read",
      date: "2026-08-05",
      author: "Garhwal Himalayan Team",
      excerpt: "Everything you need to know before embarking on Yamunotri, Gangotri, Kedarnath & Badrinath pilgrimage.",
      body: `Embarking on the sacred Char Dham Yatra requires proper planning. Here are essential tips for first-time travelers:

1. **Best Time**: May to June for pleasant weather, September to November for clear skies after monsoon.
2. **Medical Fitness**: Ensure biometric registration and carrying oxygen canisters for high altitudes.
3. **Verified Local Stays**: Book through local operators with confirmed mountain homestays to ensure warm shelter.`,
      relatedServiceId: "s4"
    },
    {
      id: "bl3",
      title: "Best Time to Visit Rishikesh for the Ganga Aarti",
      category: "Festival Guide" as const,
      coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
      readTime: "5 min read",
      date: "2026-07-28",
      author: "Arun Trek & Tours",
      excerpt: "Plan your trip around Triveni Ghat evening aarti and optimal water levels for adventure sports.",
      body: `Rishikesh is the yoga capital of the world and a hub for white-water rafting. Autumn and spring offer ideal water conditions and pleasant evening temperatures at Triveni Ghat.`,
      relatedServiceId: "s8"
    },
    {
      id: "bl4",
      title: "How We Verify Every Vendor on BharatSetu",
      category: "Platform Updates" as const,
      coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      readTime: "3 min read",
      date: "2026-07-20",
      author: "BharatSetu Safety Team",
      excerpt: "Learn about our 3-step trust protocol: Government ID verification, local reference checks, and trust tiers.",
      body: `Trust is the backbone of hyperlocal travel. Every vendor on BharatSetu undergoes strict identity document verification (Aadhaar/PAN/Trade license) and starts at Bronze tier, upgrading to Silver & Gold as they successfully complete bookings.`
    },
    {
      id: "bl5",
      title: "The Weavers of Chanderi: A Family Craft Passed Down Four Generations",
      category: "Vendor Spotlight" as const,
      coverImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
      readTime: "5 min read",
      date: "2026-07-15",
      author: "Artisan Heritage Cell",
      excerpt: "Step inside the weaver workshops of Madhya Pradesh bringing traditional silk motifs to life.",
      body: `Chanderi silk is renowned across the globe for its lightweight texture and gold zari work. Learn how our artisan partners preserve this heritage craft.`,
      relatedServiceId: "s6"
    },
    {
      id: "bl6",
      title: "A Complete Guide to Varanasi's Evening Ganga Aarti",
      category: "Travel Tips" as const,
      coverImage: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&auto=format&fit=crop&q=80",
      readTime: "7 min read",
      date: "2026-07-08",
      author: "Kashi Cultural Trust",
      excerpt: "Best ghat viewpoints, boat bookings, and timings for the daily spiritual ceremony at Dashashwamedh Ghat.",
      body: `Experience the grand evening Ganga Aarti in Varanasi with local guides who secure front-row riverfront vantage points.`,
      relatedServiceId: "s9"
    }
  ]
};

// Aliases for legacy compatibility across existing pages
export type { VendorData as LegacyVendorData };
export const MOCK_VENDORS = SEED_MOCK_DATA.vendors.reduce((acc, v) => ({ ...acc, [v.id]: v }), {} as any);
export const MOCK_SERVICES = SEED_MOCK_DATA.services as any[];
export const MOCK_BOOKINGS = SEED_MOCK_DATA.bookings as any[];
export const MOCK_REVIEWS = SEED_MOCK_DATA.reviews as any[];
