# Haywood Universal - Next.js Site

Professional construction and property management website built with Next.js 15.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
next-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/contact/        # Contact form API route
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Homepage
│   │   ├── services/           # Services page
│   │   ├── gallery/            # Gallery page
│   │   ├── contact/            # Contact page
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   └── robots.ts           # Robots.txt
│   ├── components/             # React components (Atomic Design)
│   │   ├── atoms/              # Basic components
│   │   ├── molecules/          # Composite components
│   │   ├── organisms/          # Complex components
│   │   └── pages/              # Page templates
│   ├── content/                # Content data layer
│   │   ├── data.ts             # Site content
│   │   └── types.ts            # Content types
│   └── lib/                    # Utilities
│       └── seo.ts              # SEO metadata generator
├── public/
│   └── images/                 # Optimized images
├── tailwind.config.ts          # Design tokens
└── package.json
```

## 🌐 Environment Variables

Create `.env.local`:

```bash
# Required for contact form
RESEND_API_KEY=your_resend_api_key_here

# Optional: Rate limiting
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## 🔧 Configuration

### Contact Form Setup

1. Sign up for [Resend](https://resend.com) (free 100 emails/day)
2. Get your API key
3. Add to `.env.local`
4. Uncomment Resend code in `/src/app/api/contact/route.ts`

### Email Configuration

Update the recipient email in `/src/app/api/contact/route.ts`:

```typescript
to: ['your-email@haywooduniversal.com'],
from: 'noreply@yourdomain.com', // Must be verified domain
```

## 📦 Dependencies

- Next.js 15 - React framework
- TypeScript 5 - Type safety
- TailwindCSS 3 - Styling
- Zod - Form validation
- Resend - Email service

## 🚀 Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables on Vercel

Add in Project Settings → Environment Variables:

- `RESEND_API_KEY` (Production)

## 📊 Performance

- **Lighthouse Score**: Target 90+
- **Image Optimization**: WebP format, 33% size reduction
- **Core Web Vitals**: All green
- **SEO**: Sitemap, robots.txt, Open Graph tags

## 📱 Contact Information

Update contact details in `/src/content/data.ts`:

```typescript
contactInfo: {
  phone: "+1 (678) 274-9182",
  email: "info@haywooduniversal.com",
  address: "Atlanta Metro Area, GA",
  hours: "Monday - Friday: 9AM - 6PM"
}
```

## 🔗 Live Site

- **Production**: https://haywooduniversal.com
- **Staging**: https://haywooduniversal-staging.vercel.app

## 📝 License

© 2009 Haywood Universal LLC. All Rights Reserved.
