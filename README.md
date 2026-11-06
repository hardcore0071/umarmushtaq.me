# Umar Mushtaq — Portfolio

Personal cybersecurity portfolio for [umarmushtaq.me](https://umarmushtaq.me), built as a lightweight static site for GitHub Pages.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Portfolio interactions

- Certification marquee: continuously scrolls in a seamless loop. Hover or focus pauses the motion. Swipe or scroll horizontally to explore manually. Reduced-motion preferences start the marquee paused.
- The blue text ticker uses two identical, viewport-filling groups without a track gap. Its animation travels exactly one group width so the loop boundary remains seamless.
- Assessment explorer: select a focus area using a mouse, touch, or arrow keys.
- Resume download and email copy controls.
- Two restrained typewriter accents cycle through typing, holding, and backspacing at the hero role line and contact prompt. They pause offscreen or in background tabs. Full static text remains accessible in the HTML; reduced-motion preferences show that text without animation.
- The radar uses a full-circle sweep centered on the dial, with three contacts and echo pulses timed to the sweep's six-second revolution.
- The whoami section includes gaming, PC building, anime, CTFs, and bug hunting. The header and footer use the lime/blue Luffy graffiti mascot in `assets/luffy-blue-logo.png`, with matching blue 16px/32px favicons and a 180px touch icon. The whoami accents stay green. Full-resolution artwork and generation prompts are retained in `assets/`.

Certification artwork is original SVG portfolio artwork, not issuer-issued digital badges. Certification claims come from the supplied resume and the user's addition of CRTO2 (CRTL); the issuer links explain the programs and are not individual credential-verification links. Historical versions and names are retained where supplied, including eCPPT v2 and CBBH. The CBBH card notes the issuer's transition to CWES.

## Search readiness

The page includes a descriptive title and meta description, canonical production URL, ProfilePage/Person JSON-LD, social metadata, semantic headings, static HTML professional content, a sitemap, and robots.txt. Without JavaScript, the profile and credential names remain visible. The custom error page is marked noindex and should be served with HTTP 404 by GitHub Pages.

This is currently a local preview. After public deployment:

1. Connect the domain to GitHub Pages and enable HTTPS. Confirm the homepage returns HTTP 200 and an unknown path returns HTTP 404.
2. Verify the domain in Google Search Console using the record Google supplies. No verification token is included yet.
3. Submit `https://umarmushtaq.me/sitemap.xml`, inspect the production homepage, and request indexing.
4. Validate the production structured data with Google's Rich Results Test and monitor Search Console for crawl/indexing errors.

Update the sitemap's lastmod and ProfilePage dateModified when the profile content materially changes. Neither SEO markup nor sitemap submission guarantees indexing or ranking.

Issuer references: [OffSec](https://help.offsec.com/hc/en-us/articles/360051719632-Certification-Badges-and-Pins-FAQ), [HTB](https://academy.hackthebox.com/preview/certifications), [CBBH transition](https://academy.hackthebox.com/news/the-transition-from-htb-cbbh-to-htb-cwes-has-officially-started), [Zero-Point Security](https://training.zeropointsecurity.co.uk/pages/exams), [Altered Security](https://www.alteredsecurity.com/post/redlabs), [TCM Security](https://certifications.tcm-sec.com/PNPT/), [INE](https://security.ine.com/certifications/ecppt-certification/).
