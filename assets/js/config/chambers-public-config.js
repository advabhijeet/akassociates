/*
  Chambers Citadel public configuration v2.
  Every value in this file is intentionally public and safe for browser delivery.
*/
(function () {
  const config = {
    schemaVersion: "1.0.0",
    release: "chambers-citadel-1.1.0",
    baselineTag: "chambers-citadel-v1",
    canonical: {
      origin: "https://chambersofak.in",
      host: "chambersofak.in",
      duplicateHost: "advabhijeet.github.io",
      projectPath: "/akassociates"
    },
    site: {
      name: "Chambers of AK",
      locale: "en-IN",
      timeZone: "Asia/Kolkata",
      locationLabel: "Patna, India"
    },
    contact: {
      phoneDisplay: "+91 94712 14118",
      whatsappNumber: "919471214118",
      email: "chambersofakadmin@gmail.com",
      enquirySubject: "Chambers of AK - Structured Enquiry"
    },
    social: [
      {
        label: "Firm LinkedIn",
        href: "https://www.linkedin.com/company/chambersofak",
        icon: "linkedin"
      },
      {
        label: "WhatsApp Channel",
        href: "https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33",
        icon: "whatsapp",
        modifier: "is-channel"
      }
    ],
    theme: {
      selected: "citadel-of-ak",
      defaultMode: "light",
      allowedPreviewThemes: [
        "citadel-of-ak",
        "citadel",
        "citadel-of-ak-dark"
      ],
      previewStorageKey: "akThemePreview",
      modeStorageKey: "akCitadelColorMode",
      lightThemeName: "citadel-of-ak",
      darkThemeName: "citadel-of-ak-dark",
      lightThemeColor: "#111111",
      darkThemeColor: "#000000",
      fontsUrl: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Lato:wght@400;700;900&display=swap",
      logos: {
        navDark: "assets/img/performance/logo-navbar-dark-480.jpg?v=pa1",
        heroDark: "assets/img/performance/primary-logo-dark-720.jpg?v=pa1"
      }
    },
    analytics: {
      conversionEvents: {
        whatsapp: "whatsapp_click",
        phone: "phone_click",
        email: "email_click",
        case_enquiry: "case_enquiry_click",
        contact: "contact_click"
      }
    },
    integrations: {
      emailjs: {
        publicKey: "rivGZ1UliuSkSgFdm",
        serviceId: "chambersofak",
        templateId: "contactformtempid"
      }
    },
    insights: {
      registryPath: "assets/data/insights-registry.json",
      registryVersion: "registry-12",
      thumbnailBase: "assets/img/citadel/",
      defaultThumbnail: "assets/img/citadel/citadel-legal-documents-card.webp",
      defaultDate: "May 2026",
      fallbackThumbnails: {
        cheque: "assets/img/citadel/citadel-thumb-cheque-ni-act.webp",
        msme: "assets/img/citadel/citadel-thumb-msme-invoices.webp",
        rera: "assets/img/citadel/citadel-thumb-rera-property.webp",
        arbitration: "assets/img/citadel/citadel-thumb-arbitration.webp",
        commercial: "assets/img/citadel/citadel-thumb-commercial-recovery.webp",
        court: "assets/img/citadel/citadel-tribunal-room-card.webp"
      }
    },
    modules: {
      "globalShell": {
            "id": "citadel-global-shell-v5",
            "path": "assets/js/themes/citadel-of-kang/modules/shell/global-shell.js",
            "version": "global-shell-v5",
            "guard": "CitadelGlobalShell",
            "owner": "Global shell and navigation chrome",
            "activation": "All public pages"
      },
      "latestInsights": {
            "id": "citadel-latest-insights-section-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js",
            "version": "latest-insights-section-v2",
            "guard": "CitadelLatestInsights",
            "owner": "Homepage latest-insights cards",
            "activation": "[data-citadel-latest-insights] or [data-home-insights-limit]"
      },
      "insightsDirectory": {
            "id": "citadel-insights-directory-section-v3",
            "path": "assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js",
            "version": "insights-directory-section-v3",
            "guard": "CitadelInsightsDirectorySection",
            "owner": "Legal Insights directory sections",
            "activation": "[data-citadel-insights-directory]"
      },
      "blogPage": {
            "id": "citadel-blog-page-v5",
            "path": "assets/js/themes/citadel-of-kang/modules/blog/blog-page.js",
            "version": "blog-page-v5",
            "guard": "CitadelBlogPage",
            "owner": "Legal Insights filtering, search and pagination",
            "activation": "[data-citadel-blog-page]"
      },
      "articleIndex": {
            "id": "citadel-article-index-v23",
            "path": "assets/js/themes/citadel-of-kang/article-index-direct-rail.js",
            "version": "article-index-v23",
            "guard": "",
            "owner": "Article index rail and reading progress",
            "activation": "Article with at least three direct H2 headings"
      },
      "articleFooter": {
            "id": "citadel-article-footer-v3",
            "path": "assets/js/themes/citadel-of-kang/article-footer.js",
            "version": "article-footer-v3",
            "guard": "CitadelArticleFooter",
            "owner": "Article tags, navigation and recommendations",
            "activation": "article.article-body"
      },
      "enquiryForm": {
            "id": "citadel-enquiry-form-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js",
            "version": "enquiry-form-v2",
            "guard": "CitadelEnquiryForm",
            "owner": "Copy templates and structured enquiry form",
            "activation": "[data-copy-target] or [data-contact-dynamic-form]"
      },
      "contactPage": {
            "id": "citadel-contact-page-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/pages/contact-page.js",
            "version": "contact-page-v2",
            "guard": "CitadelContactPage",
            "owner": "Contact-page semantic hooks",
            "activation": "Contact page"
      },
      "enquiryPage": {
            "id": "citadel-enquiry-page-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js",
            "version": "enquiry-page-v2",
            "guard": "CitadelEnquiryPage",
            "owner": "Case-enquiry page semantic hooks",
            "activation": "Case-enquiry page"
      },
      "generalContentPage": {
            "id": "citadel-general-content-page-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js",
            "version": "general-content-page-v2",
            "guard": "CitadelGeneralContentPage",
            "owner": "General information and policy page hooks",
            "activation": "General content pages"
      },
      "homePage": {
            "id": "citadel-home-page-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/pages/home-page.js",
            "version": "home-page-v2",
            "guard": "CitadelHomePage",
            "owner": "Homepage semantic hooks",
            "activation": "Homepage"
      },
      "practicePage": {
            "id": "citadel-practice-page-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/pages/practice-page.js",
            "version": "practice-page-v2",
            "guard": "CitadelPracticePage",
            "owner": "Practice and service page semantic hooks",
            "activation": "Practice and service pages"
      },
      "articleFeaturedImage": {
            "id": "citadel-article-featured-image-v2",
            "path": "assets/js/themes/citadel-of-kang/modules/articles/article-featured-image.js",
            "version": "article-featured-image-v2",
            "guard": "CitadelArticleFeaturedImage",
            "owner": "Article featured-image handling",
            "activation": "Article pages, loaded by Global Shell"
      },
      "thumbnailFrames": {
            "id": "citadel-thumbnail-frames-v8",
            "path": "assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css",
            "version": "thumbnail-frames-v8",
            "guard": "",
            "owner": "Article and card thumbnail frames",
            "activation": "Loaded by Global Shell"
      }
}
  };

  window.ChambersPublicConfig = Object.freeze(config);
})();
