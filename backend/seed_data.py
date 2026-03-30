"""
Seed data script to populate FineZ with 50+ money-making products
Run this once to populate the database
"""

import asyncio
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv  # type: ignore
from motor.motor_asyncio import AsyncIOMotorClient  # type: ignore

# Load environment variables from .env file
ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / ".env", override=True)

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]


# 50+ Curated Products with Real Affiliate Potential
SEED_PRODUCTS = [
    # ========== AI TOOLS (Featured) ==========
    {
        "title": "ChatGPT Plus",
        "description": "Advanced AI assistant powered by GPT-5.2. Get instant "
                       "answers, write content, code, and more with the most powerful AI.",
        "why_this_product": "⚡ 10x your productivity with AI that actually "
        "understands context",
        "price": 20.0,
        "category": "AI Tools",
        "type": "affiliate",
        "affiliate_link": "https://openai.com/chatgpt?ref=yourid",
        "affiliate_network": "OpenAI Partners",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
        "featured": True,
        "premium": True,
    },
    {
        "title": "Jasper AI",
        "description": "AI copywriting tool trusted by 100,000+ marketers. "
                       "Create blog posts, ads, emails, and social media content in seconds.",
        "why_this_product": "🚀 Generate $10k+ worth of content for just $49/month",
        "price": 49.0,
        "category": "AI Tools",
        "type": "affiliate",
        "affiliate_link": "https://jasper.ai?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Midjourney",
        "description": "Create stunning AI art and images in seconds. Perfect for "
                       "content creators, designers, and businesses.",
        "why_this_product": "🎨 Save $1000s on stock photos - create custom images instantly",
        "price": 30.0,
        "category": "AI Tools",
        "type": "affiliate",
        "affiliate_link": "https://midjourney.com?ref=yourid",
        "affiliate_network": "Direct",
        "image_url": "https://images.unsplash.com/photo-1686191128892-3b4673725b27?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Notion AI",
        "description": "Smart workspace with built-in AI. Organize your life, take notes, "
                       "manage projects, and automate tasks.",
        "why_this_product": "📝 Replace 5 different tools with one AI-powered workspace",
        "price": 10.0,
        "category": "AI Tools",
        "type": "affiliate",
        "affiliate_link": "https://notion.so?ref=yourid",
        "affiliate_network": "Notion Partners",
        "image_url": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Copy.ai",
        "description": "AI-powered copywriter. Generate marketing copy, product descriptions, "
                       "blog posts, and social media content.",
        "why_this_product": "✍️ Write 10x faster with AI - never face writer's block again",
        "price": 49.0,
        "category": "AI Tools",
        "type": "affiliate",
        "affiliate_link": "https://copy.ai?ref=yourid",
        "affiliate_network": "PartnerStack",
        "image_url": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== TECH & SOFTWARE ==========
    {
        "title": "Shopify - Start Your Store",
        "description": "Build your online store and start selling in minutes. "
                       "No coding required. 3-day free trial.",
        "why_this_product": "💰 Launch your ecommerce business and start earning today",
        "price": 29.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://shopify.com?ref=yourid",
        "affiliate_network": "Shopify Partners",
        "image_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
        "featured": True,
        "premium": True,
    },
    {
        "title": "Hostinger Web Hosting",
        "description": "Fast, reliable web hosting with 99.9% uptime. Perfect for WordPress, "
                       "ecommerce, and business websites.",
        "why_this_product": "🌐 Start your website for just $2.99/month - cheapest hosting deal",
        "price": 2.99,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://hostinger.com?ref=yourid",
        "affiliate_network": "Hostinger Partners",
        "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Canva Pro",
        "description": "Design graphics, presentations, posters, and social media content like a pro. "
                       "No design skills needed.",
        "why_this_product": "🎨 Create professional designs in minutes - no designer needed",
        "price": 12.99,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://canva.com/pro?ref=yourid",
        "affiliate_network": "Canva Partners",
        "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Grammarly Premium",
        "description": "AI-powered writing assistant. Fix grammar, improve clarity, "
                       "and write confidently anywhere.",
        "why_this_product": "✅ Write like a pro - eliminate embarrassing typos forever",
        "price": 12.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://grammarly.com?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "NordVPN",
        "description": "Secure VPN for online privacy and security. Access content from anywhere, "
                       "stay anonymous online.",
        "why_this_product": "🔒 Protect your privacy for just $3.49/month - 68% OFF deal",
        "price": 3.49,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://nordvpn.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== SIDE HUSTLES & EARNING ==========
    {
        "title": "Fiverr Pro",
        "description": "Sell your skills and services online. Freelance in design, writing, "
                       "programming, marketing, and more.",
        "why_this_product": "💵 Turn your skills into $1000+ per month - start today",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://fiverr.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Upwork Freelancing",
        "description": "Find freelance jobs and clients worldwide. Work remotely and earn money "
                       "doing what you love.",
        "why_this_product": "🌍 Access $3.9B worth of annual freelance work opportunities",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://upwork.com?ref=yourid",
        "affiliate_network": "Direct",
        "image_url": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Amazon Associates",
        "description": "Join Amazon's affiliate program and earn up to 10% commission "
                       "promoting millions of products.",
        "why_this_product": "🎯 Earn passive income promoting products people already buy",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://affiliate-program.amazon.in?ref=yourid",
        "affiliate_network": "Amazon",
        "image_url": "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Printful Print-on-Demand",
        "description": "Start a print-on-demand business. Sell custom t-shirts, mugs, "
                       "posters without inventory.",
        "why_this_product": "👕 Start an online store with $0 upfront - no inventory risk",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "dropshipping",
        "affiliate_link": "https://printful.com?ref=yourid",
        "affiliate_network": "Printful Partners",
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Teachable - Create Online Course",
        "description": "Turn your knowledge into income. Create and sell online courses "
                       "with zero technical skills.",
        "why_this_product": "📚 Earn $10k+ per month teaching what you already know",
        "price": 39.0,
        "category": "Side Hustles",
        "type": "affiliate",
        "affiliate_link": "https://teachable.com?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== LEARNING & COURSES ==========
    {
        "title": "Coursera Plus",
        "description": "Unlimited access to 7,000+ courses from top universities like Stanford, "
                       "Yale, and Google.",
        "why_this_product": "🎓 Invest in yourself - get certified skills worth $100k+ career value",
        "price": 59.0,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://coursera.org/courseraplus?ref=yourid",
        "affiliate_network": "Coursera Partners",
        "image_url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Udemy Business",
        "description": "Learn job-ready skills with 210,000+ courses in programming, design, "
                       "marketing, and business.",
        "why_this_product": "💼 Learn high-income skills for just $13.99 per course",
        "price": 13.99,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://udemy.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Skillshare Premium",
        "description": "Unlimited access to 40,000+ classes in design, photography, "
                       "business, and more.",
        "why_this_product": "🎨 Learn creative skills that can earn you $5k+ per month",
        "price": 8.25,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://skillshare.com?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "LinkedIn Learning",
        "description": "16,000+ courses in business, tech, and creative skills. "
                       "Get certified and boost your career.",
        "why_this_product": "🚀 Add in-demand skills to your LinkedIn - get noticed by recruiters",
        "price": 29.99,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://linkedin.com/learning?ref=yourid",
        "affiliate_network": "LinkedIn",
        "image_url": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Masterclass",
        "description": "Learn from the world's best. Gordon Ramsay, Neil deGrasse Tyson, "
                       "and 180+ experts teach you their crafts.",
        "why_this_product": "⭐ Learn from legends - $180 gets you ALL classes",
        "price": 180.0,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://masterclass.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== FITNESS ==========
    {
        "title": "MyFitnessPal Premium",
        "description": "Track calories, macros, and exercise. Get personalized meal plans "
                       "and achieve your fitness goals.",
        "why_this_product": "💪 Lose weight and get fit - 200M+ users can't be wrong",
        "price": 9.99,
        "category": "Fitness",
        "type": "affiliate",
        "affiliate_link": "https://myfitnesspal.com?ref=yourid",
        "affiliate_network": "Direct",
        "image_url": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Headspace Meditation App",
        "description": "Guided meditation and mindfulness app. Reduce stress, sleep better, "
                       "and improve mental health.",
        "why_this_product": "🧘 Reduce stress by 32% in just 10 days - scientifically proven",
        "price": 12.99,
        "category": "Fitness",
        "type": "affiliate",
        "affiliate_link": "https://headspace.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Fitbit Premium",
        "description": "Advanced health tracking with personalized insights, guided programs, "
                       "and mindfulness sessions.",
        "why_this_product": "⌚ Transform your health with data-driven insights",
        "price": 9.99,
        "category": "Fitness",
        "type": "affiliate",
        "affiliate_link": "https://fitbit.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== FASHION & STYLE ==========
    {
        "title": "ASOS Fashion Deals",
        "description": "Trendy fashion for men and women. 850+ brands, free shipping over $50.",
        "why_this_product": "👗 Get runway looks without the runway prices - 70% OFF deals",
        "price": 0.0,
        "category": "Fashion",
        "type": "affiliate",
        "affiliate_link": "https://asos.com?ref=yourid",
        "affiliate_network": "AWIN",
        "image_url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Zalando Premium Fashion",
        "description": "Shop 2,000+ fashion brands. Free delivery and returns. "
                       "Sustainable fashion options available.",
        "why_this_product": "✨ Premium fashion at affordable prices - free returns always",
        "price": 0.0,
        "category": "Fashion",
        "type": "affiliate",
        "affiliate_link": "https://zalando.com?ref=yourid",
        "affiliate_network": "AWIN",
        "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== HOME & LIFESTYLE ==========
    {
        "title": "IKEA Home Furnishing",
        "description": "Affordable furniture and home accessories. Design your dream home "
                       "without breaking the bank.",
        "why_this_product": "🏠 Transform your space for less - quality furniture under $100",
        "price": 0.0,
        "category": "Home",
        "type": "affiliate",
        "affiliate_link": "https://ikea.com?ref=yourid",
        "affiliate_network": "AWIN",
        "image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Wayfair Home Decor",
        "description": "Shop millions of products for your home. Furniture, decor, kitchen, "
                       "outdoor, and more.",
        "why_this_product": "🛋️ Up to 70% OFF home furniture - free shipping over $35",
        "price": 0.0,
        "category": "Home",
        "type": "marketplace",
        "affiliate_link": "https://wayfair.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=300&fit=crop",
        "featured": False,
    },
    # ========== ADDITIONAL HIGH-VALUE PRODUCTS ==========
    {
        "title": "Bluehost Web Hosting",
        "description": "Start your WordPress website in minutes. Recommended by WordPress.org. "
                       "Free domain included.",
        "why_this_product": "🌐 Build your website for $2.95/month + free domain worth $15",
        "price": 2.95,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://bluehost.com?ref=yourid",
        "affiliate_network": "Bluehost Partners",
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Semrush SEO Tools",
        "description": "All-in-one SEO tool. Keyword research, competitor analysis, "
                       "and rank tracking for your website.",
        "why_this_product": "📈 Grow your traffic by 300% - used by 10M+ marketers",
        "price": 119.95,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://semrush.com?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "ConvertKit Email Marketing",
        "description": "Email marketing for creators. Build your email list and automate your marketing.",
        "why_this_product": "📧 Grow your audience and earn $10k+ per month with email",
        "price": 29.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://convertkit.com?ref=yourid",
        "affiliate_network": "ConvertKit Partners",
        "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Dropbox Business",
        "description": "Cloud storage and file sharing for teams. Access your files anywhere, "
                       "collaborate in real-time.",
        "why_this_product": "☁️ Never lose a file again - 2TB storage for $12/month",
        "price": 12.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://dropbox.com/business?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Mailchimp Marketing Platform",
        "description": "Email marketing, automation, and CRM. Grow your business with smart marketing tools.",
        "why_this_product": "🚀 Free for 2,000 contacts - start email marketing today",
        "price": 0.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://mailchimp.com?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Elementor Pro",
        "description": "WordPress page builder. Create stunning websites with drag-and-drop. "
                       "No coding required.",
        "why_this_product": "🎨 Build a $5k website for just $49 - no developer needed",
        "price": 49.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://elementor.com?ref=yourid",
        "affiliate_network": "Elementor Partners",
        "image_url": "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Audible Audiobooks",
        "description": "Listen to 500,000+ audiobooks and podcasts. First month free, then $14.95/month.",
        "why_this_product": "🎧 Learn on the go - free 30-day trial with 1 free audiobook",
        "price": 14.95,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://audible.com?ref=yourid",
        "affiliate_network": "Amazon",
        "image_url": "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Kindle Unlimited",
        "description": "Read unlimited ebooks and magazines. Over 3 million titles available.",
        "why_this_product": "📚 Read unlimited books for $9.99/month - 30-day free trial",
        "price": 9.99,
        "category": "Learn",
        "type": "affiliate",
        "affiliate_link": "https://amazon.com/kindle-unlimited?ref=yourid",
        "affiliate_network": "Amazon",
        "image_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Zoom Pro",
        "description": "Video conferencing for teams. Host unlimited meetings up to 30 hours long.",
        "why_this_product": "💼 Stay connected - essential tool for remote work",
        "price": 14.99,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://zoom.us?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Stripe Payment Gateway",
        "description": "Accept payments online. Process credit cards, subscriptions, "
                       "and marketplace payments.",
        "why_this_product": "💳 Start accepting payments in 10 minutes - used by millions",
        "price": 0.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://stripe.com?ref=yourid",
        "affiliate_network": "Stripe Partners",
        "image_url": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Trello Project Management",
        "description": "Organize your projects with boards, lists, and cards. "
                       "Simple project management for teams.",
        "why_this_product": "📋 Stay organized - free for unlimited boards and users",
        "price": 0.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://trello.com?ref=yourid",
        "affiliate_network": "Atlassian",
        "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Squarespace Website Builder",
        "description": "Build a beautiful website in minutes. Templates designed by world-class designers.",
        "why_this_product": "✨ Launch a stunning website in 1 hour - no coding needed",
        "price": 16.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://squarespace.com?ref=yourid",
        "affiliate_network": "Squarespace Partners",
        "image_url": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Wix Website Builder",
        "description": "Create your website with AI. Free hosting, templates, "
                       "and everything you need to succeed online.",
        "why_this_product": "🚀 Free website + AI builder - start in 5 minutes",
        "price": 0.0,
        "category": "Tech",
        "type": "affiliate",
        "affiliate_link": "https://wix.com?ref=yourid",
        "affiliate_network": "Wix Partners",
        "image_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Fiverr Business",
        "description": "Hire freelance professionals for any task. Logo design, content writing, "
                       "video editing, and more.",
        "why_this_product": "👨‍💼 Outsource tasks from $5 - focus on what matters",
        "price": 5.0,
        "category": "Side Hustles",
        "type": "marketplace",
        "affiliate_link": "https://fiverr.com/business?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "99designs Logo Design",
        "description": "Get a custom logo designed by professional designers. 100% money-back guarantee.",
        "why_this_product": "🎨 Professional logo for $299 - worth $2,000+ from agencies",
        "price": 299.0,
        "category": "Tech",
        "type": "marketplace",
        "affiliate_link": "https://99designs.com?ref=yourid",
        "affiliate_network": "CJ Affiliate",
        "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Flipkart Affiliate Program",
        "description": "Earn commissions promoting India's #1 shopping site. "
                       "Millions of products across all categories.",
        "why_this_product": "🇮🇳 Earn up to 15% commission on India's biggest marketplace",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://affiliate.flipkart.com?ref=yourid",
        "affiliate_network": "Flipkart",
        "image_url": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Meesho Reselling Business",
        "description": "Start reselling products with zero investment. Earn ₹10,000-₹50,000 per month from home.",
        "why_this_product": "💰 Start earning from day 1 - no investment, no risk",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "dropshipping",
        "affiliate_link": "https://meesho.com?ref=yourid",
        "affiliate_network": "Meesho",
        "image_url": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Cuelinks Affiliate Network",
        "description": "Monetize your content with automatic affiliate links. "
                       "Works with 500+ Indian brands.",
        "why_this_product": "💡 Convert any link into earnings - works on all Indian sites",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://cuelinks.com?ref=yourid",
        "affiliate_network": "Cuelinks",
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        "featured": True,
    },
    {
        "title": "Alibaba Wholesale Sourcing",
        "description": "Source products directly from manufacturers in China. "
                       "Perfect for dropshipping and reselling.",
        "why_this_product": "📦 Buy wholesale at 70% OFF retail - huge profit margins",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "dropshipping",
        "affiliate_link": "https://alibaba.com?ref=yourid",
        "affiliate_network": "Alibaba",
        "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "YouTube Creator Studio",
        "description": "Start a YouTube channel and monetize with ads, memberships, and sponsorships.",
        "why_this_product": "📺 Top YouTubers earn $10M+ per year - start today for free",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://youtube.com/creators?ref=yourid",
        "affiliate_network": "Google",
        "image_url": "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Instagram Creator Tools",
        "description": "Grow your Instagram and monetize with sponsored posts, affiliate marketing, "
                       "and digital products.",
        "why_this_product": "📸 Influencers with 10k followers earn $100-$500 per post",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://instagram.com/creators?ref=yourid",
        "affiliate_network": "Meta",
        "image_url": "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Gumroad Sell Digital Products",
        "description": "Sell ebooks, courses, software, and digital art. Keep 90% of every sale.",
        "why_this_product": "💼 Turn your knowledge into $10k+ per month passive income",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "marketplace",
        "affiliate_link": "https://gumroad.com?ref=yourid",
        "affiliate_network": "Gumroad",
        "image_url": "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=500&h=300&fit=crop",
        "featured": False,
    },
    {
        "title": "Patreon Creator Membership",
        "description": "Build a membership business. Get recurring revenue from your biggest fans.",
        "why_this_product": "🎨 Top creators earn $100k+ per month with memberships",
        "price": 0.0,
        "category": "Side Hustles",
        "type": "idea",
        "affiliate_link": "https://patreon.com?ref=yourid",
        "affiliate_network": "Impact",
        "image_url": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=300&fit=crop",
        "featured": False,
    },
]


async def seed_database():
    """Seed the database with products"""
    try:
        # Check if products already exist
        # existing_count = await db.products.count_documents({})

        # if existing_count > 0:
        #     print(f"⚠️ Database already has {existing_count} products.")
        #     response = input("Do you want to clear and reseed? (yes/no): ")
        #     if response.lower() != 'yes':
        #         print("❌ Seeding cancelled.")
        #         return

        # Clear existing products
        await db.products.delete_many({})
        print("✅ Cleared existing products")

        # Insert seed products
        products_to_insert = []
        for product_data in SEED_PRODUCTS:
            product_data["id"] = str(uuid.uuid4())
            product_data["clicks"] = 0
            product_data["rating"] = round(
                4.0 + (hash(product_data["title"]) % 10) / 10, 2
            )
            product_data["review_count"] = (
                hash(product_data["title"]) % 500
            ) + 50  # Random reviews 50-550
            product_data["created_at"] = datetime.now(timezone.utc).isoformat()
            product_data["updated_at"] = datetime.now(timezone.utc).isoformat()
            products_to_insert.append(product_data)

        result = await db.products.insert_many(products_to_insert)

        print(f"\n🚀 SUCCESS! Seeded {len(result.inserted_ids)} products")
        print(
            f"📊 Featured products: {sum(1 for p in SEED_PRODUCTS if p.get('featured'))}"
        )
        print(
            f"⭐ Premium products: {sum(1 for p in SEED_PRODUCTS if p.get('premium'))}"
        )
        print("\n✅ Your FineZ platform is ready to make money!")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    print("🌱 FineZ Database Seeder")
    print("=" * 50)
    asyncio.run(seed_database())


async def seed_database():
    """Seed the database with products"""
    try:
        # Check if products already exist
        # existing_count = await db.products.count_documents({})

        # if existing_count > 0:
        #     print(f"⚠️ Database already has {existing_count} products.")
        #     response = input("Do you want to clear and reseed? (yes/no): ")
        #     if response.lower() != 'yes':
        #         print("❌ Seeding cancelled.")
        #         return

        # Clear existing products
        await db.products.delete_many({})
        print("✅ Cleared existing products")

        # Insert seed products
        products_to_insert = []
        for product_data in SEED_PRODUCTS:
            product_data["id"] = str(uuid.uuid4())
            product_data["clicks"] = 0
            product_data["rating"] = round(
                4.0 + (hash(product_data["title"]) % 10) / 10, 2
            )
            product_data["review_count"] = (
                hash(product_data["title"]) % 500
            ) + 50  # Random reviews 50-550
            product_data["created_at"] = datetime.now(timezone.utc).isoformat()
            product_data["updated_at"] = datetime.now(timezone.utc).isoformat()
            products_to_insert.append(product_data)

        result = await db.products.insert_many(products_to_insert)

        print(f"\n🚀 SUCCESS! Seeded {len(result.inserted_ids)} products")
        print(
            f"📊 Featured products: {sum(1 for p in SEED_PRODUCTS if p.get('featured'))}"
        )
        print(
            f"⭐ Premium products: {sum(1 for p in SEED_PRODUCTS if p.get('premium'))}"
        )
        print("\n✅ Your FineZ platform is ready to make money!")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    print("🌱 FineZ Database Seeder")
    print("=" * 50)
    asyncio.run(seed_database())
