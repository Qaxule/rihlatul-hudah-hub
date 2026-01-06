import { useEffect } from 'react';

const SITE_NAME = 'Rihlatul Hudah';
const BASE_URL = 'https://rihlatulhudah.com';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/**
 * Sets document head meta tags for SEO
 * Title format: Page Name | Site Name
 * Canonical URL: https://rihlatulhudah.com/path
 */
export const useSEO = ({ title, description, path, noIndex = false }: SEOProps) => {
  useEffect(() => {
    // Set document title
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Helper to set/update meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Set meta description
    setMetaTag('description', description);

    // Set canonical URL (ensure no trailing slash except for root)
    const canonicalUrl = path === '/' ? BASE_URL : `${BASE_URL}${path}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Set Open Graph tags
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', SITE_NAME, true);

    // Set Twitter tags
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);

    // Handle noindex for private pages
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noIndex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    // Cleanup function
    return () => {
      // Reset title to default when component unmounts (optional)
    };
  }, [title, description, path, noIndex]);
};

// SEO data for all public pages
export const SEO_DATA = {
  home: {
    title: 'Your Comprehensive Islamic Knowledge Hub',
    description: 'Explore the Quran with translation and tafsir, learn the 99 Names of Allah, discover authentic Hadith, and find comprehensive guides for new Muslims. Your spiritual journey starts here.',
    path: '/',
  },
  quran: {
    title: 'Read the Holy Quran',
    description: 'Read the Holy Quran with Arabic text, English translation, and tafsir. Browse all 114 Surahs with verse-by-verse recitation and study tools.',
    path: '/quran',
  },
  popular: {
    title: 'Popular Quran Verses',
    description: 'Discover the most beloved and frequently recited verses from the Holy Quran. Beautiful Arabic calligraphy with English translation and meaning.',
    path: '/popular',
  },
  hadith: {
    title: 'Hadith Collections',
    description: 'Explore authentic Hadith collections including Sahih Bukhari, Sahih Muslim, and more. Search and browse the sayings of Prophet Muhammad (PBUH).',
    path: '/hadith',
  },
  duas: {
    title: 'Islamic Duas & Supplications',
    description: 'Collection of authentic Islamic duas for daily life, protection, guidance, and special occasions. Learn supplications from the Quran and Sunnah.',
    path: '/duas',
  },
  names: {
    title: '99 Names of Allah',
    description: 'Learn the 99 Beautiful Names of Allah (Asma ul Husna) with meanings, explanations, and benefits. Deepen your understanding of Allah\'s attributes.',
    path: '/names',
  },
  prayerTimes: {
    title: 'Prayer Times',
    description: 'Accurate prayer times for your location. Get Fajr, Dhuhr, Asr, Maghrib, and Isha times with Qibla direction and prayer tracking.',
    path: '/prayer-times',
  },
  dhikr: {
    title: 'Dhikr Counter',
    description: 'Digital dhikr counter for remembrance of Allah. Track your daily adhkar with morning and evening supplications.',
    path: '/dhikr',
  },
  learning: {
    title: 'Islamic Learning Hub',
    description: 'Structured Islamic lessons for beginners and beyond. Learn about faith, prayer, fasting, and core Islamic principles with quizzes.',
    path: '/learning',
  },
  yasarna: {
    title: 'Learn Arabic & Quran Reading',
    description: 'Yasarna Quran - Learn to read Arabic and the Quran from scratch. Master Arabic letters, vowels, and Tajweed rules step by step.',
    path: '/yasarna',
  },
  calendar: {
    title: 'Islamic Calendar',
    description: 'Hijri calendar with Islamic dates, holidays, and important events. Track Ramadan, Eid, and other significant dates in the Islamic year.',
    path: '/calendar',
  },
  guides: {
    title: 'Islamic Guides for New Muslims',
    description: 'Step-by-step guides for new Muslims. Learn how to pray, perform wudu, and understand the basics of Islam with illustrated instructions.',
    path: '/guides',
  },
  bookmarks: {
    title: 'Your Bookmarks',
    description: 'Access your saved Quran verses and Hadith bookmarks. Keep track of your favorite Islamic content for easy reference.',
    path: '/bookmarks',
  },
  support: {
    title: 'Support Our Mission',
    description: 'Support Rihlatul Hudah in spreading Islamic knowledge. Your contribution helps us maintain and improve this free Islamic resource.',
    path: '/support',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    description: 'Read the privacy policy of Rihlatul Hudah. Learn how we collect, use, and protect your personal information.',
    path: '/privacy-policy',
  },
  termsOfUse: {
    title: 'Terms of Use',
    description: 'Terms and conditions for using Rihlatul Hudah. Understand your rights and responsibilities as a user of our Islamic platform.',
    path: '/terms-of-use',
  },
  disclaimer: {
    title: 'Disclaimer',
    description: 'Legal disclaimer for Rihlatul Hudah. Important information about the use of content on this Islamic knowledge platform.',
    path: '/disclaimer',
  },
  login: {
    title: 'Sign In',
    description: 'Sign in to your Rihlatul Hudah account to access bookmarks, track progress, and personalize your Islamic learning journey.',
    path: '/login',
  },
  signup: {
    title: 'Create Account',
    description: 'Create a free Rihlatul Hudah account. Save bookmarks, track your Quran reading progress, and access personalized features.',
    path: '/signup',
  },
} as const;

export default useSEO;
