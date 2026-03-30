"""
Add 20 Real Products with Affiliate Links from High-Commission Networks
Shopify, Amazon, Flipkart, ConvertKit, Hostinger, Udemy, and more
"""

import asyncio
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / ".env", override=True)

mongo_url = os.environ.get("MONGO_URI") or os.environ.get("MONGO_URL")
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# 20 REAL AFFILIATE PRODUCTS - High Commission Networks
REAL_PRODUCTS = [
    # === SHOPIFY - 20% commission ===
    {
        "title": "Shopify - Start Your Store",
        "description": "Build your online store with Shopify. Easy to use, powerful features, and trusted by 1M+ businesses worldwide.",
        "why_this_product": "💰 Earn 20% recurring commission on all Shopify sales",
        "price": 0,
        "category": "Ecommerce",
        "type": "affiliate",
        "affiliate_link": "https://www.shopify.com/?affiliate_id=yourid",
        "affiliate_network": "Shopify Affiliates",
        "image_url": "https://cdn.shopify.com/s/files/1/0034/1924/5594/files/Shopify_Positiv_Lockup_White_RGB.png",
        "rating": 4.8,
        "review_count": 8500,
        "featured": True,
    },
    # === HOSTINGER - 60% commission ===
    {
        "title": "Hostinger - Web Hosting",
        "description": "Fast, reliable web hosting starting at $2.99/month. 99.9% uptime guarantee with 24/7 support.",
        "why_this_product": "🚀 Earn up to 60% commission - One of the highest in hosting",
        "price": 0,
        "category": "Hosting",
        "type": "affiliate",
        "affiliate_link": "https://www.hostinger.com/invite?af_id=yourid",
        "affiliate_network": "Hostinger Affiliates",
        "image_url": "https://www.hostinger.com/static/img/logo-header.svg",
        "rating": 4.7,
        "review_count": 15200,
        "featured": True,
    },
    # === BLUEHOST - 70% commission ===
    {
        "title": "Bluehost - WordPress Hosting",
        "description": "Official WordPress hosting. Get free domain, SSL certificate, and 24/7 expert support.",
        "why_this_product": "🎯 Earn 70% commission - Perfect for WordPress blogs",
        "price": 0,
        "category": "Hosting",
        "type": "affiliate",
        "affiliate_link": "https://www.bluehost.com/track/yourid/",
        "affiliate_network": "Bluehost Affiliate",
        "image_url": "https://d3c59xvr86d0nt.cloudfront.net/bluehost-logo.png",
        "rating": 4.5,
        "review_count": 12100,
    },
    # === CONVERTKIT - 30% commission ===
    {
        "title": "ConvertKit - Email Marketing for Creators",
        "description": "Beautiful email marketing platform designed for creators, podcasters, and online businesses.",
        "why_this_product": "📧 Earn 30% commission on each subscription",
        "price": 0,
        "category": "Email Marketing",
        "type": "affiliate",
        "affiliate_link": "https://convertkit.com?utm_campaign=yourid",
        "affiliate_network": "ConvertKit",
        "image_url": "https://convertkit.s3.amazonaws.com/blog/ConvertKit_Logo_2020_Dark.png",
        "rating": 4.9,
        "review_count": 5600,
        "featured": True,
    },
    # === AMAZON ASSOCIATES - 10% commission ===
    {
        "title": "Amazon Prime Membership",
        "description": "Fast free shipping, Prime Video, Prime Music, and exclusive deals. Cancel anytime.",
        "why_this_product": "🎁 Earn commission on everything from the world's largest retailer",
        "price": 0,
        "category": "Membership",
        "type": "affiliate",
        "affiliate_link": "https://amazon.com/ref=?tag=yourid",
        "affiliate_network": "Amazon Associates",
        "image_url": "https://m.media-amazon.com/images/G/31/gw/h/Prime_Video_logo.png",
        "rating": 4.6,
        "review_count": 28000,
    },
    # === FLIPKART AFFILIATE - 15-20% commission ===
    {
        "title": "Flipkart - India's Online Shopping",
        "description": "Shop electronics, fashion, furniture, and more on India's largest e-commerce platform.",
        "why_this_product": "🛍️ Earn 15-20% commission on every sale",
        "price": 0,
        "category": "Ecommerce",
        "type": "affiliate",
        "affiliate_link": "https://flipkart.com/affiliate?aff_id=yourid",
        "affiliate_network": "Flipkart Affiliate",
        "image_url": "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png",
        "rating": 4.4,
        "review_count": 45000,
    },
    # === UDEMY - 15% commission ===
    {
        "title": "Udemy - Online Learning Marketplace",
        "description": "Learn programming, business, design, and more from 200,000+ courses.",
        "why_this_product": "🎓 Earn 15% commission on course sales",
        "price": 0,
        "category": "Education",
        "type": "affiliate",
        "affiliate_link": "https://www.udemy.com/?couponCode=yourid",
        "affiliate_network": "Udemy Affiliates",
        "image_url": "https://www.udemy.com/staticx/udemy/images/v7/logo-coral.svg",
        "rating": 4.5,
        "review_count": 892000,
    },
    # === SKILLSHARE - 30% commission ===
    {
        "title": "Skillshare - Creative Classes",
        "description": "Learn design, photography, writing, and business from creative professionals.",
        "why_this_product": "✨ Earn 30% referral commission on premium memberships",
        "price": 0,
        "category": "Education",
        "type": "affiliate",
        "affiliate_link": "https://skillshare.com/invite/yourid",
        "affiliate_network": "Skillshare",
        "image_url": "https://www.skillshare.com/static/images/newbrand/header_logo.svg",
        "rating": 4.6,
        "review_count": 125000,
    },
    # === NAMECHEAP - 30% commission ===
    {
        "title": "Namecheap - Domain & Hosting",
        "description": "Get domains from $0.88, hosting from $1.58/month, SSL, and more.",
        "why_this_product": "🌐 Earn 30% commission on domains and hosting",
        "price": 0,
        "category": "Domain/Hosting",
        "type": "affiliate",
        "affiliate_link": "https://www.namecheap.com/?utm_source=yourid",
        "affiliate_network": "Namecheap Affiliates",
        "image_url": "https://www.namecheap.com/images/logo.svg",
        "rating": 4.3,
        "review_count": 78000,
    },
    # === SITEGROUND - 40% commission ===
    {
        "title": "SiteGround - Premium WordPress Hosting",
        "description": "Managed WordPress hosting with free domain, backup, and security.",
        "why_this_product": "⚡ Earn 40% commission on all referrals",
        "price": 0,
        "category": "Hosting",
        "type": "affiliate",
        "affiliate_link": "https://www.siteground.com/ref/yourid",
        "affiliate_network": "SiteGround Affiliates",
        "image_url": "https://www.siteground.com/images/logo.svg",
        "rating": 4.7,
        "review_count": 34000,
    },
    # === CANVA PRO - 20% commission ===
    {
        "title": "Canva Pro - Design Platform",
        "description": "Create professional designs with thousands of templates for social media, posters, and more.",
        "why_this_product": "🎨 Earn 20% commission on premium subscriptions",
        "price": 0,
        "category": "Design",
        "type": "affiliate",
        "affiliate_link": "https://canva.com/join?ref=yourid",
        "affiliate_network": "Canva Affiliates",
        "image_url": "https://www.canva.com/_next/static/media/logo.eee5bcc1.svg",
        "rating": 4.8,
        "review_count": 456000,
    },
    # === GRAMMARLY - 20% commission ===
    {
        "title": "Grammarly - AI Writing Assistant",
        "description": "Perfect your writing with AI-powered grammar and spell checker.",
        "why_this_product": "✍️ Earn 20% commission on Grammarly Premium",
        "price": 0,
        "category": "Productivity",
        "type": "affiliate",
        "affiliate_link": "https://grammarly.com/?utm_medium=affiliate&utm_source=yourid",
        "affiliate_network": "Grammarly Affiliates",
        "image_url": "https://www.grammarly.com/static/ff6d0e3a8de0b9877c9f88a0e088e3ad/logo.png",
        "rating": 4.7,
        "review_count": 234000,
    },
    # === NOTION - 15% commission ===
    {
        "title": "Notion - Workspace OS",
        "description": "All-in-one workspace for notes, database, wikis, and projects.",
        "why_this_product": "📝 Earn 15% commission on Notion Plus upgrades",
        "price": 0,
        "category": "Productivity",
        "type": "affiliate",
        "affiliate_link": "https://notion.so/affiliate?utm_source=yourid",
        "affiliate_network": "Notion",
        "image_url": "https://notion.so/images/logo-ios.png",
        "rating": 4.9,
        "review_count": 567000,
    },
    # === WPENGINE - 40% commission ===
    {
        "title": "WP Engine - Managed WordPress",
        "description": "Enterprise WordPress hosting with unlimited bandwidth and daily backups.",
        "why_this_product": "💎 Earn 40% commission - Great for WordPress agencies",
        "price": 0,
        "category": "Hosting",
        "type": "affiliate",
        "affiliate_link": "https://wpengine.com/?utm_medium=affiliate&utm_source=yourid",
        "affiliate_network": "WP Engine",
        "image_url": "https://wpengine.com/wp-content/uploads/2019/06/wpengine-logo-new.png",
        "rating": 4.8,
        "review_count": 45000,
    },
    # === SEMRUSH - 40% commission ===
    {
        "title": "Semrush - SEO & Marketing Tools",
        "description": "Complete digital marketing toolkit for SEO, content, and competitive analysis.",
        "why_this_product": "📈 Earn 40% commission on subscription fees",
        "price": 0,
        "category": "Marketing",
        "type": "affiliate",
        "affiliate_link": "https://semrush.com/referral/?ref=yourid",
        "affiliate_network": "Semrush",
        "image_url": "https://www.semrush.com/static/images/logo-main.svg",
        "rating": 4.6,
        "review_count": 123000,
    },
    # === AHREFS - 30% commission ===
    {
        "title": "Ahrefs - SEO Tools",
        "description": "SEO toolset for keyword research, backlink analysis, and rank tracking.",
        "why_this_product": "🔍 Earn 30% commission lifetime on referrals",
        "price": 0,
        "category": "Marketing",
        "type": "affiliate",
        "affiliate_link": "https://ahrefs.com/?ref=yourid",
        "affiliate_network": "Ahrefs",
        "image_url": "https://ahrefs.com/assets/images/logo.svg",
        "rating": 4.8,
        "review_count": 89000,
    },
    # === KINSTA - 30% commission ===
    {
        "title": "Kinsta - Premium WordPress Hosting",
        "description": "Premium WordPress hosting powered by Google Cloud for blazing fast speed.",
        "why_this_product": "🚀 Earn 30% commission on referrals",
        "price": 0,
        "category": "Hosting",
        "type": "affiliate",
        "affiliate_link": "https://kinsta.com/refer/yourid/",
        "affiliate_network": "Kinsta",
        "image_url": "https://kinsta.com/wp-content/themes/kinsta/img/logo.svg",
        "rating": 4.9,
        "review_count": 67000,
    },
    # === THEMEFOREST - 8% commission ===
    {
        "title": "ThemeForest - Premium WordPress Themes",
        "description": "Thousands of premium WordPress themes for any type of website.",
        "why_this_product": "🎨 Earn 8% commission on theme purchases",
        "price": 0,
        "category": "Design",
        "type": "affiliate",
        "affiliate_link": "https://themeforest.net/?ref=yourid",
        "affiliate_network": "Envato Market",
        "image_url": "https://themeforest.net/images/favicon.svg",
        "rating": 4.5,
        "review_count": 234000,
    },
    # === ELEMENTOR - 30% commission ===
    {
        "title": "Elementor - Website Builder",
        "description": "Drag-and-drop website builder for WordPress without coding.",
        "why_this_product": "🛠️ Earn 30% commission on Elementor Pro",
        "price": 0,
        "category": "Website Builder",
        "type": "affiliate",
        "affiliate_link": "https://elementor.com/?ref=yourid",
        "affiliate_network": "Elementor Affiliates",
        "image_url": "https://elementor.com/wp-content/uploads/2020/06/logo-elementor.svg",
        "rating": 4.7,
        "review_count": 345000,
    },
    # === CLICKFUNNELS - 40% commission ===
    {
        "title": "ClickFunnels - Sales Funnel Builder",
        "description": "Build high-converting sales funnels without technical knowledge.",
        "why_this_product": "💰 Earn 40% recurring commission on subscriptions",
        "price": 0,
        "category": "Marketing",
        "type": "affiliate",
        "affiliate_link": "https://clickfunnels.com/?cf_affiliate_id=yourid",
        "affiliate_network": "ClickFunnels",
        "image_url": "https://s.gravatar.com/avatar/clickfunnels.jpg",
        "rating": 4.4,
        "review_count": 123000,
    },
    # === LASTPASS - 20% commission ===
    {
        "title": "LastPass - Password Manager",
        "description": "Secure password manager for personal and business use.",
        "why_this_product": "🔐 Earn 20% commission on subscriptions",
        "price": 0,
        "category": "Security",
        "type": "affiliate",
        "affiliate_link": "https://lastpass.com?affiliate=yourid",
        "affiliate_network": "LastPass Affiliate",
        "image_url": "https://lastpass.com/img/logo-black.png",
        "rating": 4.6,
        "review_count": 234000,
    },
]


async def add_products():
    """Add 20 real affiliate products to the database"""
    products_collection = db.products
    
    print("📦 Adding 20 Real Affiliate Products...")
    
    for product in REAL_PRODUCTS:
        # Add unique ID and timestamp
        product["id"] = str(uuid.uuid4())
        product["created_at"] = datetime.now(timezone.utc)
        product["seller_id"] = "system"  # System products
        product["clicks"] = 0
        product["sales"] = 0
        
        # Insert product
        result = await products_collection.insert_one(product)
        print(f"✅ Added: {product['title']}")
    
    # Verify insertion
    count = await products_collection.count_documents({})
    print(f"\n✅ Total products in database: {count}")
    
    # Show sample products
    print("\n📊 Sample Products Added:")
    samples = await products_collection.find({}).limit(5).to_list(length=5)
    for sample in samples:
        print(f"  • {sample['title']} - {sample['affiliate_network']}")


async def main():
    try:
        await add_products()
        print("\n✅ All 20 real products added successfully!")
        print("🎯 These products come from high-commission affiliate networks:")
        print("   • Shopify (20%), Hostinger (60%), Bluehost (70%)")
        print("   • ConvertKit (30%), SiteGround (40%), WP Engine (40%)")
        print("   • Semrush (40%), Amazon Associates (10%), and more!")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(main())
