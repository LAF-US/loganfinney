// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Logan Finney",
  title: "Logan Finney - CV",
  footer: context { [#emph[Logan Finney -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in Oct 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(74, 70, 65),
  colors-name: rgb(19, 18, 17),
  colors-headline: rgb(19, 18, 17),
  colors-connections: rgb(74, 70, 65),
  colors-section-titles: rgb(19, 18, 17),
  colors-links: rgb(31, 79, 57),
  colors-footer: rgb(74, 70, 65),
  colors-top-note: rgb(74, 70, 65),
  typography-line-spacing: 0.6em,
  typography-alignment: "left",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "DejaVu Sans",
  typography-font-family-name: "DejaVu Sans",
  typography-font-family-headline: "DejaVu Sans",
  typography-font-family-connections: "Cousine",
  typography-font-family-section-titles: "DejaVu Sans",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: left,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: false,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "·",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: true,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 10,
    day: 19,
  ),
)


= Logan Finney

  #headline([Documentary Journalist])

#connections(
  [Idaho, USA],
  [#link("mailto:loganfinney@proton.me", icon: false, if-underline: false, if-color: false)[loganfinney\@proton.me]],
  [#link("https://loganfinney.com/", icon: false, if-underline: false, if-color: false)[loganfinney.com]],
  [#link("https://instagram.com/loganfinney27", icon: false, if-underline: false, if-color: false)[loganfinney27]],
  [#link("https://bsky.app/profile/loganfinney.com", icon: false, if-underline: false, if-color: false)[loganfinney.com]],
  [#link("https://x.com/lfinneytweets", icon: false, if-underline: false, if-color: false)[lfinneytweets]],
  [#link("https://syringa.social/@Logan", icon: false, if-underline: false, if-color: false)[\@Logan\@syringa.social]],
  [#link("https://linkedin.com/in/loganfinney", icon: false, if-underline: false, if-color: false)[loganfinney]],
  [#link("https://youtube.com/@LoganFinney", icon: false, if-underline: false, if-color: false)[LoganFinney]],
  [#link("https://github.com/loganfinney27", icon: false, if-underline: false, if-color: false)[loganfinney27]],
  [#link("https://orcid.org/0009-0009-9584-0048", icon: false, if-underline: false, if-color: false)[0009-0009-9584-0048]],
)


== Summary

Logan Finney is an award-winning reporter who covers politics, elections, and government. He grew up hunting, hiking, and skiing in the Idaho Panhandle and remains forever fascinated by the people, history, and culture of his home state.

== Experience

#regular-entry(
  [
    #strong[#link("https://favs.news/")[FāVS News]], reporter

    - religion and ethics in Idaho

    - republished by the #emph[Idaho Capital Sun] and #emph[Big Country News Connection]

  ],
  [
    Jan 2026 – present

    

    10 months

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.idahoptv.org/")[Idaho Public Television]], producer\/writer

    - #emph[Idaho Reports] · producer and reporter

    - #emph[Idaho Experience] · associate producer and videographer

  ],
  [
    Nov 2025 – Sept 2026

    

    11 months

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.idahoptv.org/")[Idaho Public Television]], associate producer

    - #emph[Idaho Reports] · reporter, producer, and fill-in host

    - #emph[Idaho Reports] · #link("https://blog.idahoreports.idahoptv.org/")[blog], #link("https://pod.link/IdahoReports")[podcast], and social media manager

    - #emph[Dialogue] · associate producer · 2021–2024

    - #emph[Science Trek: The Podcast] · producer and editor · 2023–2024

    - #emph[FYIdaho] · producer, director, editor, and host · 2022

    - #emph[createid] and #emph[Outdoor Idaho] · digital producer · 2022–2024

  ],
  [
    May 2021 – Nov 2025

    

    4 years 7 months

  ],
)

#regular-entry(
  [
    #strong[Project FARE], freelance reporter and photographer

    - #link("https://web.archive.org/web/20230816194454/https://www.projectfare.org/farmstories/snow-rain-patterns-water-agriculture")[Idaho water and agriculture] · story and photos

  ],
  [
    July 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.idahoptv.org/")[Idaho Public Television]], production assistant

    - #emph[Idaho Reports] COVID-19 updates · writer, voice, and editor · #link("https://www.youtube.com/playlist?list=PLvDo4LDXnoaBgrKIrniQ-O7Rw5kOx0KVr")[watch], #link("https://soundcloud.com/idaho-reports/sets/coronavirus-updates")[listen]

    - #emph[Idaho Reports] #link("https://pod.link/IdahoReports")[podcast] · founder · under 300 plays a year to 44,000 in 2021

  ],
  [
    Mar 2020 – May 2021

    

    1 year 3 months

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.owyheeavalanche.com/")[#emph[The Owyhee Avalanche]]], freelance reporter

    - COVID-19 school reopening plans

  ],
  [
    July 2020

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.uidaho.edu/mcclure-center")[McClure Center for Public Policy Research]], legislative reporter

    - Idaho Public Radio State Capitol Bureau · #link("https://idahopublicradio.wordpress.com/?s=logan%20finney")[stories], #link("https://www.youtube.com/watch?v=bfBn5fl0GL4")[video]

    - printed in the #emph[Bonner County Daily Bee], #emph[Coeur d’Alene Press], #emph[Idaho County Free Press], #emph[Owyhee Avalanche], #emph[Power County Press], and #emph[Aberdeen Times]

  ],
  [
    Jan 2020 – May 2020

    

    5 months

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.idahoptv.org/")[Idaho Public Television]], student intern

    - #emph[Idaho Reports] · 2020 legislative session

  ],
  [
    Jan 2020 – Mar 2020

    

    3 months

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.uiargonaut.com/")[#emph[The Argonaut]]], staff member

    - copy editor and videographer · #link("https://www.uiargonaut.com/author/lfinney/")[archive]

  ],
  [
    Jan 2018 – Mar 2020

    

    2 years 3 months

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.blotmagazine.com/")[#emph[Blot]]], staff member

    - videographer · #link("https://www.youtube.com/playlist?list=PLaXjVGiQcSQW0wc2e6YUeLZsxsmPMopas")[videos]

  ],
  [
    Jan 2018 – Jan 2020

    

    2 years 1 month

  ],
)

#regular-entry(
  [
    #strong[#link("https://shscedarpost.com/")[#emph[The Cedar Post]]], multimedia editor

    - daily video announcements and video team · #link("https://shscedarpost.com/staff_name/logan-finney/")[archive]

  ],
  [
    2015 – 2016

    

    1 year

  ],
)

== Education

#education-entry(
  [
    #strong[#link("https://www.poynter.org/")[Poynter Institute and Corporation for Public Broadcasting]], Digital Transformation Program

  ],
  [
    2022

  ],
  degree-column: [
    
  ],
)

#education-entry(
  [
    #strong[#link("https://www.uidaho.edu/")[University of Idaho]], Broadcasting & Digital Media, School of Journalism and Mass Media

    - University Honors Program member

    - Dean’s List · fall 2016, spring 2017, fall 2017, spring 2018, fall 2018, spring 2019

  ],
  [
    2016 – 2020

  ],
  degree-column: [
    #strong[B.S.]
  ],
)

#education-entry(
  [
    #strong[Sandpoint High School], Idaho High School Diploma

  ],
  [
    2012 – 2016

  ],
  degree-column: [
    
  ],
)

== Honors and Awards

#regular-entry(
  [
    #strong[2026 Mid-Career Scholarship]

    #summary[Idaho Press Club]

    - NLGJA 2026 National Convention

  ],
  [
    May 2026

  ],
)

#regular-entry(
  [
    #strong[Best of 2025 Awards]

    #summary[Idaho Press Club]

    - 1st · Government \/ Political – TV · #emph[Idaho Reports] “#link("https://www.youtube.com/watch?v=xLigP6pHj2U")[An Adult-Only Library Sues the State]”

    - 2nd · Best Blog · #emph[#link("https://blog.idahoreports.idahoptv.org/")[Idaho Reports]]

    - 3rd · Public Affairs Program – TV – Studio · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/the-attorney-generals-take-may-9-2025-b0dufu/")[The Attorney General’s Take . . .]”

    - 3rd · Political Report – Weekly · #emph[Idaho Reports] “#link("https://blog.idahoreports.idahoptv.org/2025/01/28/idaho-grant-recipients-scrambling-for-clarity-after-federal-freeze/")[Idaho Grant Recipients Scrambling for Clarity after Federal Freeze]”

  ],
  [
    May 2026

  ],
)

#regular-entry(
  [
    #strong[Scholarships+]

    #summary[OpenNews]

    - NLGJA 2026 National Convention

  ],
  [
    Apr 2026

  ],
)

#regular-entry(
  [
    #strong[59th WorldFest Awards]

    #summary[WorldFest-Houston International Film Festival]

    - Bronze · Talk Shows · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-margaret-atwood-m9nw4m/")[Author Margaret Atwood]”

  ],
  [
    2026

  ],
)

#regular-entry(
  [
    #strong[58th WorldFest Awards]

    #summary[WorldFest-Houston International Film Festival]

    - Gold · Talk Show · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-david-grann-xx8ajp/")[Author David Grann]”

    - Silver · New Media – Video Podcast · #emph[Science Trek: The Podcast] “#link("https://www.youtube.com/watch?v=yS8te-9vyvI")[Rabbits]”

  ],
  [
    June 2025

  ],
)

#regular-entry(
  [
    #strong[46th Annual Telly Awards]

    #summary[Telly Awards]

    - Silver · General – Interview & Talk Show · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-david-grann-xx8ajp/")[Author David Grann]”

    - Bronze · General – Video Podcast · #emph[Science Trek: The Podcast] “#link("https://www.youtube.com/watch?v=yS8te-9vyvI")[Rabbits]”

  ],
  [
    May 2025

  ],
)

#regular-entry(
  [
    #strong[Best of 2024 Awards]

    #summary[Idaho Press Club]

    - 1st · Public Affairs Program – TV – Studio · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-margaret-atwood-m9nw4m/")[Author Margaret Atwood]”

    - 1st · Best Blog · #emph[#link("https://blog.idahoreports.idahoptv.org/")[Idaho Reports]]

    - 2nd · Best Audience Engagement · #emph[#link("https://sciencetrek.libsyn.com/")[Science Trek: The Podcast]]

    - 3rd · Public Affairs Program – TV – Studio · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/idaho-reports-special-proposition-one-october-25-2024-zgyvzz/")[Idaho Reports Special: Proposition One . . .]”

  ],
  [
    May 2025

  ],
)

#regular-entry(
  [
    #strong[Northwest Regional Emmy® Awards 2025 Nominations]

    #summary[Northwest Chapter of the National Academy of Television Arts and Sciences]

    - Children\/Youth\/Teens · #emph[Science Trek: The Podcast] “#link("https://www.youtube.com/watch?v=_znfRwMchEI")[The Earth]”

    - Interview\/Discussion · #emph[Dialogue] “#link("https://video.idahoptv.org/video/journalist-clarissa-ward-f6z8zw/")[Journalist Clarissa Ward]”

  ],
  [
    Apr 2025

  ],
)

#regular-entry(
  [
    #strong[Elevation Award]

    #summary[Mountain States Policy Center]

    - #emph[#link("https://www.idahoptv.org/shows/idahoreports/")[Idaho Reports]]

  ],
  [
    Oct 2024

  ],
)

#regular-entry(
  [
    #strong[45th Annual Telly Awards]

    #summary[Telly Awards]

    - Bronze · General – Political & Commentary · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/idaho-reports-remembering-phil-batt-epokxz/")[Idaho Reports Special: Remembering Phil Batt]”

  ],
  [
    May 2024

  ],
)

#regular-entry(
  [
    #strong[Best of 2023 Awards]

    #summary[Idaho Press Club]

    - 1st · Public Affairs Program – TV – Studio · #emph[Dialogue] “#link("https://video.idahoptv.org/video/journalist-andrea-elliott-omtkqe/")[Journalist Andrea Elliott]”

    - 1st · Best Blog · #emph[#link("https://blog.idahoreports.idahoptv.org/")[Idaho Reports]]

    - 2nd · Best Audience Engagement · #emph[#link("https://sciencetrek.libsyn.com/")[Science Trek: The Podcast]]

    - 3rd · Public Affairs Program – TV – Studio · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/idaho-reports-remembering-phil-batt-epokxz/")[Idaho Reports Special: Remembering Phil Batt]”

  ],
  [
    May 2024

  ],
)

#regular-entry(
  [
    #strong[57th WorldFest Awards]

    #summary[WorldFest-Houston International Film Festival]

    - Gold · Public Affairs Programs · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/idaho-reports-remembering-phil-batt-epokxz/")[Idaho Reports Special: Remembering Phil Batt]”

    - Gold · Talk Shows · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-rebecca-donner-gcrptn/")[Author Rebecca Donner]”

  ],
  [
    Apr 2024

  ],
)

#regular-entry(
  [
    #strong[Northwest Regional Emmy® Awards 2023 Nominations]

    #summary[Northwest Chapter of the National Academy of Television Arts and Sciences]

    - Politics\/Government – Short Form Content · #emph[Idaho Reports] “#link("https://www.youtube.com/watch?v=KKe5dXBFluA")[Cleaning Up the Legacy of Silver Valley Mining]”

    - Politics\/Government – Long Form Content · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/one-bill-one-day-one-billion-dollars-sept-2nd-2022-8dkbau/")[One Bill, One Day, One Billion Dollars]”

    - Politics\/Government – Long Form Content · #emph[Idaho Reports] “#link("https://www.youtube.com/watch?v=Zccno2Ubdgw")[A Look Back on Our 50 Years of Political Reporting in Idaho]”

    - Interview\/Discussion · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-rebecca-donner-gcrptn/")[Author Rebecca Donner]”

  ],
  [
    Apr 2023

  ],
)

#regular-entry(
  [
    #strong[56th WorldFest Awards]

    #summary[WorldFest-Houston International Film Festival]

    - Platinum · Interviews · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-catherine-grace-katz-xyutqq/")[Author Catherine Grace Katz]”

    - Silver · Historical Programming – Segment · #emph[Idaho Reports] “#link("https://www.youtube.com/watch?v=Zccno2Ubdgw")[A Look Back on Our 50 Years of Political Reporting in Idaho]”

  ],
  [
    Apr 2023

  ],
)

#regular-entry(
  [
    #strong[Best of 2022 Awards]

    #summary[Idaho Press Club]

    - 1st · Public Affairs Program – TV – Studio · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-rebecca-donner-gcrptn/")[Author Rebecca Donner]”

    - 1st · Best Blog · #emph[#link("https://blog.idahoreports.idahoptv.org/")[Idaho Reports]]

    - 1st · Interview – Audio · #emph[Idaho Reports] “#link("https://soundcloud.com/idaho-reports/episode-property-tax-problems")[Property Tax Problems]”

    - 1st · Election Report – Weekly · #emph[Idaho Reports] “#link("https://blog.idahoreports.idahoptv.org/2022/11/16/how-does-idaho-get-unofficial-election-results-out-so-quickly/")[How Does Idaho Get Unofficial Election Results Out So Quickly?]”

    - 2nd · Best Online-Only Video Program – Public Affairs · #emph[Idaho Reports] “#link("https://www.youtube.com/watch?v=lbo7OYdyvuk")[Idaho Has Election Day, Not Election Week]”

    - 2nd · Political Report – Weekly · #emph[Idaho Reports] “#link("https://blog.idahoreports.idahoptv.org/2022/09/01/special-session-tax-bill-passed-into-law/")[Special Session Tax Bill Passed into Law]”

    - 3rd · Public Affairs Program – TV – Studio · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/one-bill-one-day-one-billion-dollars-sept-2nd-2022-8dkbau/")[One Bill, One Day, One Billion Dollars]”

    - 3rd · Best Online-Only Video Program – Public Affairs · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/a-conversation-with-inl-july-19th-2022-lhgmld/")[A Conversation with INL]”

    - 3rd · Election Report – Audio · #emph[Idaho Reports] “#link("https://soundcloud.com/idaho-reports/episode-judges-on-the-ballot")[Judges on the Ballot]”

    - 3rd · Election Report – Weekly · #emph[Idaho Reports] “#link("https://blog.idahoreports.idahoptv.org/2022/06/16/arguments-approved-for-and-against-measure-to-let-legislature-call-itself-into-session/")[Arguments Approved for and against Measure to Let Legislature Call Itself into Session]”

    - 3rd · Political Report – Weekly · #emph[Idaho Reports] “#link("https://blog.idahoreports.idahoptv.org/2022/06/23/idaho-democrats-prepare-for-general-election-and-beyond/")[Idaho Democrats Prepare for General Election and Beyond]”

    - 3rd · Best Use of Social Media · #link("https://www.facebook.com/outdoor.idaho/")[#emph[Outdoor Idaho] Facebook page]

  ],
  [
    Apr 2023

  ],
)

#regular-entry(
  [
    #strong[2022 Best in Broadcasting Awards]

    #summary[Idaho State Broadcasters Association]

    - 3rd · Best Spot News Story · #emph[Idaho Reports] “#link("https://www.youtube.com/watch?v=WltDtVskh1Y")[Can We Do More with One Penny?]”

  ],
  [
    Aug 2022

  ],
)

#regular-entry(
  [
    #strong[Northwest Regional Emmy® Awards 2022 Nominations]

    #summary[Northwest Chapter of the National Academy of Television Arts and Sciences]

    - Interview\/Discussion · #emph[Dialogue] “#link("https://video.idahoptv.org/video/author-catherine-grace-katz-xyutqq/")[Author Catherine Grace Katz]”

  ],
  [
    Apr 2022

  ],
)

#regular-entry(
  [
    #strong[55th WorldFest Awards]

    #summary[WorldFest-Houston International Film Festival]

    - Bronze · Interview\/Discussion · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/a-conversation-with-governor-little-june-4-2021-1mwslk/")[A Conversation with Governor Little]”

  ],
  [
    Apr 2022

  ],
)

#regular-entry(
  [
    #strong[Best of 2021 Awards]

    #summary[Idaho Press Club]

    - 2nd · Public Affairs Program – TV – Studio · #emph[Dialogue] “#link("https://video.idahoptv.org/video/public-historian-tom-ikeda-dkok8l/")[Public Historian Tom Ikeda]”

    - 3rd · Political Report – Weekly Print · #emph[Idaho Reports] “#link("https://blog.idahoreports.idahoptv.org/2021/11/16/senate-moving-methodically-on-covid-legislation/")[Senate Moving Methodically on COVID Legislation]”

  ],
  [
    Apr 2022

  ],
)

#regular-entry(
  [
    #strong[Best of 2020 Awards]

    #summary[Idaho Press Club]

    - 2nd · Election Report – TV · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/applying-lessons-learned-15lczq/")[Applying Lessons Learned]”

    - 3rd · Public Affairs Program – TV – Studio · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/the-2020-extra-special-tumultuous-session-m57job/")[The 2020 Extra Special Tumultuous Session]”

  ],
  [
    Apr 2021

  ],
)

#regular-entry(
  [
    #strong[42nd Annual Telly Awards]

    #summary[Telly Awards]

    - Bronze · General – Political\/Commentary · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/the-2020-extra-special-tumultuous-session-m57job/")[The 2020 Extra Special Tumultuous Session]”

  ],
  [
    2021

  ],
)

#regular-entry(
  [
    #strong[54th WorldFest Awards]

    #summary[WorldFest-Houston International Film Festival]

    - Bronze · Government Relations · #emph[Idaho Reports] “#link("https://video.idahoptv.org/video/the-2020-extra-special-tumultuous-session-m57job/")[The 2020 Extra Special Tumultuous Session]”

  ],
  [
    2021

  ],
)

#regular-entry(
  [
    #strong[Audience Choice Award]

    #summary[KINO Short Film Festival]

    - 2nd · student · #emph[#link("https://www.youtube.com/watch?v=zFi0sYGJ22U")[Personal Day]]

  ],
  [
    May 2019

  ],
)

#regular-entry(
  [
    #strong[Spring 2016 National Student Media Contests]

    #summary[Journalism Education Association]

    - Honorable Mention · Video Package Editing

  ],
  [
    Apr 2016

  ],
)

#regular-entry(
  [
    #strong[Spring 2016 Best of Show]

    #summary[National Scholastic Press Association]

    - 3rd · Newspaper Broadsheet 16 or Fewer Pages · #emph[#link("https://shscedarpost.com/")[The Cedar Post]]

  ],
  [
    Apr 2016

  ],
)

#regular-entry(
  [
    #strong[Honors Presidential Scholar]

    #summary[University of Idaho Honors Program]

    - one of 12 chosen from 300 students admitted to the Honors Program for fall 2016

  ],
  [
    Mar 2016

  ],
)

== Publications

#regular-entry(
  [
    #strong[Idaho Grant Recipients Scrambling for Clarity after Federal Freeze]

    #strong[Logan Finney], Melissa Davlin

    #link("https://blog.idahoreports.idahoptv.org/2025/01/28/idaho-grant-recipients-scrambling-for-clarity-after-federal-freeze/")[blog.idahoreports.idahoptv.org\/2025\/01\/28\/idaho-grant-recipients-scrambling-for-clarity-after-federal-freeze] (#emph[Idaho Reports])

  ],
  [
    Jan 2025

  ],
)

#regular-entry(
  [
    #strong[How Does Idaho Get Unofficial Election Results Out So Quickly?]

    #strong[Logan Finney]

    #link("https://blog.idahoreports.idahoptv.org/2022/11/16/how-does-idaho-get-unofficial-election-results-out-so-quickly/")[blog.idahoreports.idahoptv.org\/2022\/11\/16\/how-does-idaho-get-unofficial-election-results-out-so-quickly] (#emph[Idaho Reports])

  ],
  [
    Nov 2022

  ],
)

#regular-entry(
  [
    #strong[Special Session Tax Bill Passed into Law]

    #strong[Logan Finney]

    #link("https://blog.idahoreports.idahoptv.org/2022/09/01/special-session-tax-bill-passed-into-law/")[blog.idahoreports.idahoptv.org\/2022\/09\/01\/special-session-tax-bill-passed-into-law] (#emph[Idaho Reports])

  ],
  [
    Sept 2022

  ],
)

#regular-entry(
  [
    #strong[Idaho water and agriculture]

    #strong[Logan Finney]

    #link("https://web.archive.org/web/20230816194454/https://www.projectfare.org/farmstories/snow-rain-patterns-water-agriculture")[web.archive.org\/web\/20230816194454\/www.projectfare.org\/farmstories\/snow-rain-patterns-water-agriculture] (Project FARE)

  ],
  [
    July 2022

  ],
)

#regular-entry(
  [
    #strong[Idaho Democrats Prepare for General Election and Beyond]

    #strong[Logan Finney]

    #link("https://blog.idahoreports.idahoptv.org/2022/06/23/idaho-democrats-prepare-for-general-election-and-beyond/")[blog.idahoreports.idahoptv.org\/2022\/06\/23\/idaho-democrats-prepare-for-general-election-and-beyond] (#emph[Idaho Reports])

  ],
  [
    June 2022

  ],
)

#regular-entry(
  [
    #strong[Arguments Approved for and against Measure to Let Legislature Call Itself into Session]

    #strong[Logan Finney]

    #link("https://blog.idahoreports.idahoptv.org/2022/06/16/arguments-approved-for-and-against-measure-to-let-legislature-call-itself-into-session/")[blog.idahoreports.idahoptv.org\/2022\/06\/16\/arguments-approved-for-and-against-measure-to-let-legislature-call-itself-into-session] (#emph[Idaho Reports])

  ],
  [
    June 2022

  ],
)

#regular-entry(
  [
    #strong[Senate Moving Methodically on COVID Legislation]

    #strong[Logan Finney]

    #link("https://blog.idahoreports.idahoptv.org/2021/11/16/senate-moving-methodically-on-covid-legislation/")[blog.idahoreports.idahoptv.org\/2021\/11\/16\/senate-moving-methodically-on-covid-legislation] (#emph[Idaho Reports])

  ],
  [
    Nov 2021

  ],
)

== Folio

#regular-entry(
  [
    #strong[#link("https://www.idahoptv.org/shows/idahoreports/")[#emph[Idaho Reports]]]

    #summary[Idaho Public Television · show]

  ],
  [
    Jan 2020 – Sept 2026

  ],
)

#regular-entry(
  [
    #strong[#link("https://blog.idahoreports.idahoptv.org/")[#emph[Idaho Reports]]]

    #summary[#emph[Idaho Reports] · blog]

  ],
  [
    Nov 2020 – Feb 2026

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/the-attorney-generals-take-may-9-2025-b0dufu/")[“The Attorney General’s Take . . .”]]

    #summary[#emph[Idaho Reports] · episode]

  ],
  [
    May 2025

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=xLigP6pHj2U")[“An Adult-Only Library Sues the State”]]

    #summary[#emph[Idaho Reports] · segment]

  ],
  [
    Feb 2025

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/journalist-clarissa-ward-f6z8zw/")[“Journalist Clarissa Ward”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Nov 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/author-margaret-atwood-m9nw4m/")[“Author Margaret Atwood”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Nov 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=_znfRwMchEI")[“The Earth”]]

    #summary[#emph[Science Trek] · podcast episode]

    - editor

  ],
  [
    Nov 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/idaho-reports-special-proposition-one-october-25-2024-zgyvzz/")[“Idaho Reports Special: Proposition One . . .”]]

    #summary[#emph[Idaho Reports] · episode]

  ],
  [
    Oct 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=yS8te-9vyvI")[“Rabbits”]]

    #summary[#emph[Science Trek] · podcast episode]

    - editor

  ],
  [
    Apr 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://sciencetrek.libsyn.com/")[#emph[Science Trek: The Podcast]]]

    #summary[#emph[Science Trek] · podcast]

  ],
  [
    Aug 2023 – 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.facebook.com/outdoor.idaho/")[#emph[Outdoor Idaho] Facebook page]]

    #summary[#emph[Outdoor Idaho] · Facebook page]

  ],
  [
    2022 – 2024

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/journalist-andrea-elliott-omtkqe/")[“Journalist Andrea Elliott”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Dec 2023

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/author-david-grann-xx8ajp/")[“Author David Grann”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Dec 2023

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/idaho-reports-remembering-phil-batt-epokxz/")[“Idaho Reports Special: Remembering Phil Batt”]]

    #summary[#emph[Idaho Reports] · special]

    - producer

  ],
  [
    Mar 2023

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=KKe5dXBFluA")[“Cleaning Up the Legacy of Silver Valley Mining”]]

    #summary[#emph[Idaho Reports] · segment]

    - producer

  ],
  [
    Dec 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=lbo7OYdyvuk")[“Idaho Has Election Day, Not Election Week”]]

    #summary[#emph[Idaho Reports] · web video]

  ],
  [
    Nov 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/author-rebecca-donner-gcrptn/")[“Author Rebecca Donner”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Nov 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://soundcloud.com/idaho-reports/episode-judges-on-the-ballot")[“Judges on the Ballot”]]

    #summary[#emph[Idaho Reports] · podcast episode]

  ],
  [
    Oct 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/one-bill-one-day-one-billion-dollars-sept-2nd-2022-8dkbau/")[“One Bill, One Day, One Billion Dollars”]]

    #summary[#emph[Idaho Reports] · special]

    - producer

  ],
  [
    Sept 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/a-conversation-with-inl-july-19th-2022-lhgmld/")[“A Conversation with INL”]]

    #summary[#emph[Idaho Reports] · special]

  ],
  [
    July 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://soundcloud.com/idaho-reports/episode-property-tax-problems")[“Property Tax Problems”]]

    #summary[#emph[Idaho Reports] · podcast episode]

  ],
  [
    June 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=Zccno2Ubdgw")[“A Look Back on Our 50 Years of Political Reporting in Idaho”]]

    #summary[#emph[Idaho Reports] · segment]

    - associate producer

  ],
  [
    May 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/author-catherine-grace-katz-xyutqq/")[“Author Catherine Grace Katz”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Dec 2021

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/public-historian-tom-ikeda-dkok8l/")[“Public Historian Tom Ikeda”]]

    #summary[#emph[Dialogue] · episode]

    - associate producer

  ],
  [
    Dec 2021

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=WltDtVskh1Y")[“Can We Do More with One Penny?”]]

    #summary[#emph[Idaho Reports] · segment]

  ],
  [
    Nov 2021

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/a-conversation-with-governor-little-june-4-2021-1mwslk/")[“A Conversation with Governor Little”]]

    #summary[#emph[Idaho Reports] · episode]

  ],
  [
    June 2021

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/applying-lessons-learned-15lczq/")[“Applying Lessons Learned”]]

    #summary[#emph[Idaho Reports] · episode]

  ],
  [
    Sept 2020

  ],
)

#regular-entry(
  [
    #strong[#link("https://video.idahoptv.org/video/the-2020-extra-special-tumultuous-session-m57job/")[“The 2020 Extra Special Tumultuous Session”]]

    #summary[#emph[Idaho Reports] · episode]

  ],
  [
    Aug 2020

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=zFi0sYGJ22U")[#emph[Personal Day]]]

    #summary[short film]

    - art director, casting director, cinematographer, director, editor, locations, producer, production manager, script, set decorator, audio, writer

  ],
  [
    May 2019

  ],
)

== Media Appearances

#regular-entry(
  [
    #strong[#emph[Idaho Matters] · #link("https://www.boisestatepublicradio.org/show/idaho-matters/2026-04-03/reporter-roundtable-idaho-legislature-hunting")[Reporter Roundtable]]

    #summary[Boise State Public Radio · panelist]

  ],
  [
    Apr 2023 – Apr 2026

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=vr8nKjKmd8E")[Candidates for Idaho Superintendent of Public Instruction debate live on KTVB]]

    #summary[KTVB · debate panelist]

  ],
  [
    Oct 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.youtube.com/watch?v=ThwjlA3APdQ")[Republican candidates for Idaho superintendent]]

    #summary[KTVB · debate panelist]

  ],
  [
    Apr 2022

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.ktvb.com/article/news/local/viewpoint/viewpoint-breaking-down-idaho-superintendent-of-public-instruction-debate-critchfield-durst-ybarra/277-8ed457e0-2575-4f97-bd8f-6826577735ee")[#emph[Viewpoint]]]

    #summary[KTVB · debate analyst]

  ],
  [
    Apr 2022

  ],
)

== Professional Memberships

#regular-entry(
  [
    #strong[Documentary Producers Alliance]

  ],
  [
    2025 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.archivalproducersalliance.com/")[Archival Producers Alliance]]

  ],
  [
    2025 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.nlgja.org/")[NLGJA: The Association of LGBTQ+ Journalists]]

  ],
  [
    Dec 2022 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://natasnw.org/")[Northwest Chapter of the National Academy of Television Arts and Sciences]]

  ],
  [
    2022 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.ire.org/")[Investigative Reporters & Editors]]

  ],
  [
    2021 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://idahopressclub.org/")[Idaho Press Club]]

  ],
  [
    2020 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://idahopressclub.org/capitol-correspondents-association/")[Capitol Correspondents Association]]

  ],
  [
    2020 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.spj.org/")[Society of Professional Journalists]]

  ],
  [
    2020 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://freelancejournalistsunion.org/")[Freelance Journalists Union, Industrial Workers of the World]]

  ],
  [
    2020 – present

  ],
)

== Service and Leadership

#regular-entry(
  [
    #strong[#link("https://idahopressclub.org/capitol-correspondents-association/")[Capitol Correspondents Association]]

    #summary[standing committee member]

  ],
  [
    Jan 2023 – present

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.sinfonia.org/")[Phi Mu Alpha Sinfonia]]

    #summary[alumni relations officer]

  ],
  [
    Apr 2019 – 2020

  ],
)

#regular-entry(
  [
    #strong[Vandal Marching Band]

    #summary[section leader]

  ],
  [
    2016 – 2020

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.sinfonia.org/")[Phi Mu Alpha Sinfonia]]

    #summary[treasurer]

  ],
  [
    Aug 2017 – Apr 2019

  ],
)

#regular-entry(
  [
    #strong[Idaho Boys State]

    #summary[Supreme Court chief justice]

  ],
  [
    June 2015

  ],
)

== Conferences

#regular-entry(
  [
    #strong[NLGJA 2026 National Convention]

    #summary[NLGJA: The Association of LGBTQ+ Journalists]

  ],
  [
    Sept 2026

  ],
)

#regular-entry(
  [
    #strong[NICAR 2025]

    #summary[Investigative Reporters & Editors]

  ],
  [
    2025

  ],
)

#regular-entry(
  [
    #strong[ATI 2024 Annual Conference]

    #summary[Associated Taxpayers of Idaho]

  ],
  [
    Dec 2024

  ],
)

#regular-entry(
  [
    #strong[ATI 2023 Annual Conference]

    #summary[Associated Taxpayers of Idaho]

  ],
  [
    Nov 2023

  ],
)

#regular-entry(
  [
    #strong[PNWER 2023 Annual Summit]

    #summary[Pacific NorthWest Economic Region]

  ],
  [
    July 2023

  ],
)

#regular-entry(
  [
    #strong[SEJ 2023 Annual Conference]

    #summary[Society of Environmental Journalists]

  ],
  [
    Apr 2023

  ],
)

#regular-entry(
  [
    #strong[NICAR 2023]

    #summary[Investigative Reporters & Editors]

  ],
  [
    2023

  ],
)

#regular-entry(
  [
    #strong[ATI 2022 Annual Conference]

    #summary[Associated Taxpayers of Idaho]

  ],
  [
    Nov 2022

  ],
)

#regular-entry(
  [
    #strong[ATI 2021 Annual Conference]

    #summary[Associated Taxpayers of Idaho]

  ],
  [
    Dec 2021

  ],
)

#regular-entry(
  [
    #strong[Spring 2016 National High School Journalism Convention]

    #summary[Journalism Education Association & National Scholastic Press Association]

  ],
  [
    Apr 2016

  ],
)
