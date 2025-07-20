import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SEO_CONFIG, seoUtils } from '../../config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  category,
  noIndex = false,
  structuredData
}) => {
  const { i18n } = useTranslation();
  
  // 生成优化后的SEO数据
  const seoTitle = seoUtils.generateTitle(title);
  const seoDescription = description || SEO_CONFIG.DEFAULT_DESCRIPTION;
  const seoKeywords = seoUtils.generateKeywords(keywords);
  const seoImage = image || seoUtils.generateOGImage(title);
  const canonicalUrl = url || window.location.href;
  
  // 生成hreflang标签
  const hreflangTags = Object.entries(SEO_CONFIG.I18N.HREFLANG_MAPPING).map(([locale, hreflang]) => (
    <link
      key={locale}
      rel="alternate"
      hrefLang={hreflang}
      href={`${SEO_CONFIG.SITE_URL}/${locale}${window.location.pathname}`}
    />
  ));
  
  return (
    <Helmet>
      {/* 基础Meta标签 */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || SEO_CONFIG.AUTHOR} />
      <meta name="language" content={i18n.language} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots标签 */}
      <meta 
        name="robots" 
        content={noIndex ? 'noindex, nofollow' : 'index, follow'} 
      />
      
      {/* Open Graph标签 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.SITE_NAME} />
      <meta property="og:locale" content={i18n.language} />
      
      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content={SEO_CONFIG.SOCIAL.TWITTER_HANDLE} />
      
      {/* 文章特定标签 */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && (
            <meta property="article:author" content={author} />
          )}
          {category && (
            <meta property="article:section" content={category} />
          )}
        </>
      )}
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* 搜索引擎验证 */}
      {SEO_CONFIG.VERIFICATION.GOOGLE && (
        <meta name="google-site-verification" content={SEO_CONFIG.VERIFICATION.GOOGLE} />
      )}
      {SEO_CONFIG.VERIFICATION.BAIDU && (
        <meta name="baidu-site-verification" content={SEO_CONFIG.VERIFICATION.BAIDU} />
      )}
      {SEO_CONFIG.VERIFICATION.BING && (
        <meta name="msvalidate.01" content={SEO_CONFIG.VERIFICATION.BING} />
      )}
      
      {/* 国际化标签 */}
      {hreflangTags}
      
      {/* 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* 网站结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(SEO_CONFIG.STRUCTURED_DATA.WEBSITE)}
      </script>
      
      {/* 组织结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(SEO_CONFIG.STRUCTURED_DATA.ORGANIZATION)}
      </script>
    </Helmet>
  );
};

export default SEO;