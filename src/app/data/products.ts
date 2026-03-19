import { Product } from '@/app/types';

export const allProducts: Product[] = [
  {
    id: 1, name: 'Nike Air Force 1', category: 'Fashion', subCategory: 'Male',
    location: 'Garki, Abuja', price: '₦45,000',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop',
    ],
    description: 'Classic Nike Air Force 1 in pristine white. Worn only twice, still has the original box. Perfect for casual or streetwear styling. No visible scuffs or marks.',
    condition: 'Like New', size: 'UK 10', quality: 'Excellent', dateListed: 'Listed 3 days ago',
    ratings: [
      { id: 1, user: 'Chukwuma E.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', stars: 5, comment: 'Seller was honest. Shoes exactly as described!', date: 'Feb 12, 2025' },
      { id: 2, user: 'Bayo A.', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', stars: 4, comment: 'Great condition, fast response from seller.', date: 'Jan 30, 2025' },
    ],
  },
  {
    id: 2, name: 'Black Leather Jacket', category: 'Fashion', subCategory: 'Male',
    location: 'Wuse 2, Abuja', price: '₦120,000',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop',
    ],
    description: 'Premium genuine leather jacket imported from Italy. Slim fit with inner lining. Perfect for formal or semi-formal occasions.',
    condition: 'New', size: 'L', quality: 'Premium', dateListed: 'Listed 1 week ago',
    ratings: [
      { id: 1, user: 'Sola M.', avatar: 'https://randomuser.me/api/portraits/men/56.jpg', stars: 5, comment: 'Amazing quality! Worth every penny.', date: 'Mar 1, 2025' },
    ],
  },
  {
    id: 3, name: 'Slim Fit Chinos', category: 'Fashion', subCategory: 'Male',
    location: 'Maitama, Abuja', price: '₦18,000',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop'],
    description: 'Khaki slim-fit chinos, brand new, never worn. Waist 32, inseam 30. Great for office or casual outings.',
    condition: 'New', size: '32', quality: 'Good', dateListed: 'Listed 2 days ago',
    ratings: [
      { id: 1, user: 'Adaeze K.', avatar: 'https://randomuser.me/api/portraits/women/21.jpg', stars: 3, comment: 'Decent quality for the price.', date: 'Feb 28, 2025' },
    ],
  },
  {
    id: 4, name: 'Floral Midi Dress', category: 'Fashion', subCategory: 'Female',
    location: 'Asokoro, Abuja', price: '₦32,000',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop',
    ],
    description: 'Beautiful floral midi dress, perfect for summer outings. Worn only once to a birthday party. Size M, fits true to size.',
    condition: 'Like New', size: 'M', quality: 'Excellent', dateListed: 'Listed 5 days ago',
    ratings: [
      { id: 1, user: 'Chisom N.', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', stars: 5, comment: 'Beautiful dress, exactly as pictured!', date: 'Feb 22, 2025' },
    ],
  },
  {
    id: 5, name: 'Designer Handbag', category: 'Fashion', subCategory: 'Female',
    location: 'Jabi, Abuja', price: '₦85,000',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop'],
    description: 'Authentic designer tote bag in tan leather. Comes with dust bag and authenticity card. Lightly used.',
    condition: 'Good', size: 'One Size', quality: 'Premium', dateListed: 'Listed 2 weeks ago',
    ratings: [
      { id: 1, user: 'Blessing O.', avatar: 'https://randomuser.me/api/portraits/women/45.jpg', stars: 5, comment: 'Absolutely gorgeous bag!', date: 'Mar 5, 2025' },
    ],
  },
  {
    id: 6, name: "Women's Heel Sandals", category: 'Fashion', subCategory: 'Female',
    location: 'Kubwa, Abuja', price: '₦22,000',
    image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=500&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&auto=format&fit=crop'],
    description: 'Elegant strappy heel sandals in nude. 4-inch heel, perfect for weddings. Size 38, barely used.',
    condition: 'Like New', size: 'EU 38', quality: 'Excellent', dateListed: 'Listed 1 day ago',
    ratings: [
      { id: 1, user: 'Toyin R.', avatar: 'https://randomuser.me/api/portraits/women/57.jpg', stars: 4, comment: 'Very comfortable heels!', date: 'Mar 10, 2025' },
    ],
  },
  {
    id: 7, name: 'Sony WH-1000XM5', category: 'Electronics',
    location: 'Garki, Abuja', price: '₦185,000',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
    ],
    description: 'Industry-leading noise cancelling headphones. Bought 6 months ago, perfect working condition. Comes with carry case.',
    condition: 'Good', size: 'One Size', quality: 'Excellent', dateListed: 'Listed 4 days ago',
    ratings: [
      { id: 1, user: 'Ifeanyi B.', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', stars: 5, comment: 'Best headphones ever!', date: 'Mar 8, 2025' },
    ],
  },
  {
    id: 8, name: 'JBL Flip 6 Speaker', category: 'Electronics',
    location: 'Wuse, Abuja', price: '₦55,000',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop'],
    description: 'Portable Bluetooth speaker with 12 hours battery. Works perfectly, no dents or scratches.',
    condition: 'Good', size: 'N/A', quality: 'Good', dateListed: 'Listed 1 week ago',
    ratings: [
      { id: 1, user: 'Obinna C.', avatar: 'https://randomuser.me/api/portraits/men/23.jpg', stars: 4, comment: 'Great sound quality for the price.', date: 'Mar 2, 2025' },
    ],
  },
  {
    id: 9, name: 'iPhone 14 Pro Max', category: 'Mobile Phones & Tablets',
    location: 'Maitama, Abuja', price: '₦850,000',
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop',
    ],
    description: '256GB Deep Purple iPhone 14 Pro Max. No scratches, 100% battery health. UK used, comes with original charger and box.',
    condition: 'Like New', size: '256GB', quality: 'Excellent', dateListed: 'Listed 2 days ago',
    ratings: [
      { id: 1, user: 'Taiwo S.', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', stars: 5, comment: 'Phone is in immaculate condition!', date: 'Mar 12, 2025' },
    ],
  },
  {
    id: 10, name: 'Samsung Galaxy Tab S9', category: 'Mobile Phones & Tablets',
    location: 'Kado, Abuja', price: '₦420,000',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop'],
    description: '11-inch tablet with S Pen. 128GB storage, Wi-Fi + 5G. Perfect for drawing and note-taking.',
    condition: 'Good', size: '128GB', quality: 'Good', dateListed: 'Listed 3 weeks ago',
    ratings: [
      { id: 1, user: 'Funke P.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', stars: 4, comment: 'Tablet works great.', date: 'Mar 7, 2025' },
    ],
  },
  {
    id: 11, name: 'MacBook Pro 14"', category: 'Computer & Accessories',
    location: 'Gudu, Abuja', price: '₦1,250,000',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
    ],
    description: 'M1 Pro chip, 16GB RAM, 512GB SSD. Used 8 months. Battery at 89%. Original charger included.',
    condition: 'Good', size: '512GB', quality: 'Excellent', dateListed: 'Listed 6 days ago',
    ratings: [
      { id: 1, user: 'Damilola K.', avatar: 'https://randomuser.me/api/portraits/men/78.jpg', stars: 5, comment: 'Laptop was as described!', date: 'Mar 9, 2025' },
    ],
  },
  {
    id: 12, name: 'LG Side-by-Side Fridge', category: 'Home Appliances',
    location: 'Lokogoma, Abuja', price: '₦380,000',
    image: 'https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=800&auto=format&fit=crop'],
    description: '600L side-by-side refrigerator with ice maker. Works perfectly, being sold due to relocation.',
    condition: 'Good', size: '600L', quality: 'Good', dateListed: 'Listed 2 weeks ago',
    ratings: [
      { id: 1, user: 'Grace T.', avatar: 'https://randomuser.me/api/portraits/women/79.jpg', stars: 5, comment: 'Fridge works perfectly!', date: 'Mar 3, 2025' },
    ],
  },
  {
    id: 13, name: 'L-Shaped Sectional Sofa', category: 'Furniture',
    location: 'Lugbe, Abuja', price: '₦180,000',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
    ],
    description: 'Velvet L-shaped sectional sofa in grey. Barely used. 280cm x 200cm. Delivery available within Abuja.',
    condition: 'Like New', size: '280cm x 200cm', quality: 'Excellent', dateListed: 'Listed 10 days ago',
    ratings: [
      { id: 1, user: 'Precious O.', avatar: 'https://randomuser.me/api/portraits/women/89.jpg', stars: 5, comment: 'Beautiful sofa!', date: 'Feb 25, 2025' },
    ],
  },
  {
    id: 14, name: 'PS5 Console', category: 'Games',
    location: 'Gwarinpa, Abuja', price: '₦645,000',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop'],
    description: 'PS5 Disc Edition with 2 controllers and 5 games: FIFA 24, NBA 2K24, GTA V, God of War, Spider-Man 2.',
    condition: 'Good', size: 'N/A', quality: 'Good', dateListed: 'Listed 1 week ago',
    ratings: [
      { id: 1, user: 'Kingsley D.', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', stars: 5, comment: 'Great PS5, works like new!', date: 'Mar 11, 2025' },
    ],
  },
  {
    id: 15, name: 'Philips Beard Trimmer', category: 'Personal Care',
    location: 'Nyanya, Abuja', price: '₦22,000',
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop'],
    description: 'Cordless beard trimmer with 20 length settings. Used only 3 times. Comes with all attachments.',
    condition: 'Like New', size: 'N/A', quality: 'Excellent', dateListed: 'Listed 4 days ago',
    ratings: [
      { id: 1, user: 'Hassan Y.', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', stars: 5, comment: 'Works perfectly!', date: 'Mar 6, 2025' },
    ],
  },
  {
    id: 16, name: 'Treadmill', category: 'Gym & Sports',
    location: 'Apo, Abuja', price: '₦280,000',
    image: 'https://images.unsplash.com/photo-1637579674775-7f868ee3c92d?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1637579674775-7f868ee3c92d?w=800&auto=format&fit=crop'],
    description: 'Electric treadmill with 15 speed settings and incline control. Max speed 16km/h. Built-in heart rate monitor.',
    condition: 'Good', size: 'N/A', quality: 'Good', dateListed: 'Listed 3 weeks ago',
    ratings: [
      { id: 1, user: 'Ifeoma A.', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', stars: 4, comment: 'Treadmill works great!', date: 'Mar 4, 2025' },
    ],
  },
];