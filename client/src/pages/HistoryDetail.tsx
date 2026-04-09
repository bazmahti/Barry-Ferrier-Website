import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Star, Globe, Theater, Disc, ArrowLeft, ArrowRight, Calendar, Quote, Users, X } from "lucide-react";
import { FadeIn, AnimatedGradientText } from "@/components/AnimatedElements";
import { sanitizeHtml, isHtmlContent } from "@/lib/sanitize";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import jcsHeroImage from "@assets/Barry_Ferrier_Jesus_Chrst_Superstar_1770151597294.JPG";
import expo88CostumeImage from "@assets/costume_expo-888_1770153889422.jpg";
import jcs1Image from "@assets/jcs_1_1770154880937.jpg";
import jcsSetImage from "@assets/jesus_christ_superstar_set_1770154880937.jpg";
import jcsScene1Image from "@assets/jesus_christ_superstar_1_1770154880937.jpg";
import jcsApostlesImage from "@assets/Jesus_Christ_Superstar_Apostles_1770154880937.jpg";
import jcsTrevorWhiteImage from "@assets/jesus_trevor_white_1770154880937.jpg";
import jcsCrucifixionImage from "@assets/jesus4_1770154880938.jpg";
import jcsJoeDickerImage from "@assets/joe-dicker_jcSS_1770154880938.jpg";
import jcsMarciaArthurImage from "@assets/Macia_Hines_Arthur_Dignam_1770154880938.jpg";
import jcsMichelleFawdonImage from "@assets/michelle_Fawdon_1770154880938.jpg";
import jcsPontiusPilateImage from "@assets/pontius_pilot_Robin_Ramsay_1770154880938.jpg";
import jcsPreachingImage from "@assets/Preaching_Jesus_Christ_Superstar_1770154880938.jpg";
import jcsPriestsImage from "@assets/Priests_dressing_room_JCSS_1770154880938.jpg";
import jcsStageImpsImage from "@assets/stage-imps_frank_howson_beverly_irwin_1770154880939.jpg";
import jcsTerminationImage from "@assets/termination_notice-melbourne_jcss_1770154880939.jpg";
import jcsRehearsalImage from "@assets/rehearsal_jeus_christ_superstar_1770155298410.jpg";
import optimissimosPosterImage from "@assets/Astounding_Optimissimos_Poster_1770156304275.jpg";
import jeanPierreMignonImage from "@assets/Jean_Pierre_Mignon_1770156304277.jpg";
import pramFactoryImage from "@assets/Pram_Factory_1770156304277.jpg";
import timGoodingImage from "@assets/Tim_Gooding_1770156304277.jpg";
import giantStepsImage1 from "@assets/Giant-Steps_1770157343581.jpg";
import giantStepsImage2 from "@assets/Giant-Steps2_1770157343581.jpg";
import pocoLocoImage1 from "@assets/amigos9_1770186447021.jpeg";
import pocoLocoImage2 from "@assets/amigos3_1770186447022.jpeg";
import pocoLocoImage3 from "@assets/2amigos5_1770186447022.jpeg";
import pocoLocoImage4 from "@assets/2amigos4_1770186447023.jpeg";
import pocoLocoImage5 from "@assets/Baz-Bossa_Dorado_1770245575644.jpg";
import pocoLocoImage6 from "@assets/Poco_Loco_Syrock_Festival_Norway_1770245592478.jpg";

interface HistoryContent {
  slug: string;
  title: string;
  year: string;
  category: string;
  heroImage: string;
  summary: string;
  fullContent: string[];
  images: { url: string; caption: string }[];
  highlights?: string[];
  collaborators?: string[];
  quote?: { text: string; author: string };
  youtubeId?: string;
  youtubeVideos?: { id: string; title: string }[];
}

const historyContentData: HistoryContent[] = [
  {
    slug: "jesus-christ-superstar",
    title: "Jesus Christ Superstar",
    year: "Early 1970s",
    category: "theatre",
    heroImage: jcsHeroImage,
    summary: "Original Harry M. Miller production at Capitol Theatre, Sydney and Palais Theatre, Melbourne.",
    fullContent: [
      "Barry gained early recognition in music theatre, appearing in the original Harry M. Miller production of Jesus Christ Superstar at the Capitol Theatre in Sydney and the Palais Theatre in Melbourne. This groundbreaking production ran for 2 years with 8 shows per week.",
      "The cast was a who's who of Australian entertainment, featuring legends Jon English (as Judas), Marcia Hines (as Mary Magdalene), John Paul Young, Stevie Wright, Trevor White (as Jesus), Robin Ramsay (as Pilate), Peter North (as Caiaphus), and Michael Caton. Working alongside such talented performers was an incredible experience that shaped Barry's approach to live performance.",
      "This Tim Rice and Andrew Lloyd Webber rock opera was revolutionary for its time, bringing contemporary music to the theatrical stage in a way that had never been done before. The production was a defining moment in Australian theatre history.",
      "The staging featured an innovative dodecahedron set design that could unfold dramatically during performances. The experience of performing in such an intense, high-energy production night after night honed Barry's skills as a performer and gave him invaluable experience in large-scale theatrical productions.",
      "A wonderful aspect of all the many shows and bands worked with is the great friends made. Over the years Barry has enjoyed and valued knowing a fascinating cast of talented and quirky characters from the Australian performing arts industry."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/jon-english-jcs5E212F54-2271-1826-C6D5-D4F70A343318.jpg", caption: "Jon English as Judas" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/apostles-jesus-christ-superstarBD33B167-BA15-EF71-68D5-0B310C9C0BB3.jpg", caption: "Apostles ready for overture" },
      { url: jcsHeroImage, caption: "Barry Ferrier as an Apostle" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/last-supper-jesus-christ-superstar255D9B0A-B8FD-7B0E-64BB-1AC92FF72B4A.jpg", caption: "The Last Supper" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/jesus460836DCE-B5A5-CBBC-44CD-742F44E19A89.jpg", caption: "The Crucifixion" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/robin-ramsay-pontius-pilateF197C52E-7347-47B2-B804-F94A0F5CD4CB.jpg", caption: "Robin Ramsay as Pilate" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/the-pharisees-jesus-christ-superstar-capitol-theatre01590507-A385-BEFE-53B0-DCA4EEBC07F8.jpg", caption: "Peter North as Caiaphus" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/michael-carlos-reg-livermore-jon-english-jesus-christ-superstar597236C0-CC64-5E05-0521-81C71207451F.jpg", caption: "Michael Carlos, Reg Livermore, Jon English" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/lepers-jesus-christ-superstar-2A78EC1EB-3254-D1DD-CD94-FB7F8CAB1902.jpg", caption: "Lepers scene" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/barry-ferrier-dressing-room-jesus-christ-superstarC1F7FAE8-D084-9C4B-8A00-85EAEE5E32F3.jpg", caption: "Barry Ferrier backstage Capitol Theatre" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/dodecahedron-jesus-christ-superstar-capitol-theatre-sydneyB506A18C-6C03-C35A-D0E4-4A81FC99E6D6.jpg", caption: "The Dodecahedron set" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-2/original/stevie6EAB1155-F7EA-AF62-1B7D-B7AAF84FA510.jpg", caption: "Stevie Wright & Trevor White" },
      { url: jcs1Image, caption: "Finale - Soul Girls in red" },
      { url: jcsSetImage, caption: "The iconic Dodecahedron set design" },
      { url: jcsScene1Image, caption: "Stage performance with cast" },
      { url: jcsApostlesImage, caption: "The Apostles - full cast" },
      { url: jcsTrevorWhiteImage, caption: "Trevor White as Jesus" },
      { url: jcsCrucifixionImage, caption: "The Crucifixion scene" },
      { url: jcsJoeDickerImage, caption: "Joe Dicker as Herod with dancers" },
      { url: jcsMarciaArthurImage, caption: "Marcia Hines & Arthur Dignam" },
      { url: jcsMichelleFawdonImage, caption: "Michelle Fawdon backstage" },
      { url: jcsPontiusPilateImage, caption: "Robin Ramsay as Pontius Pilate" },
      { url: jcsPreachingImage, caption: "Jesus preaching to the crowds" },
      { url: jcsPriestsImage, caption: "Priests in the dressing room" },
      { url: jcsStageImpsImage, caption: "Frank Howson & Beverly Irwin backstage" },
      { url: jcsTerminationImage, caption: "Melbourne season termination notice - July 1973" },
      { url: jcsRehearsalImage, caption: "Orchestra rehearsal with full cast" },
      { url: "/attached_assets/IMG_2469_1770181657171.jpeg", caption: "Backstage dressing room mirror" },
      { url: "/attached_assets/english-rose_1770505063218.jpeg", caption: "Jon English & Tony Rose" },
      { url: "/attached_assets/herod_1770505063218.jpeg", caption: "Joe Dicker as Herod" },
      { url: "/attached_assets/Peter_North_2_1770505063218.jpeg", caption: "Peter North (Caiaphus) applying make up" },
      { url: "/attached_assets/Pharisees_1770505063218.jpeg", caption: "The Pharisees" }
    ],
    highlights: [
      "2 years, 8 shows per week",
      "Capitol Theatre, Sydney",
      "Palais Theatre, Melbourne",
      "Original Harry M. Miller production",
      "Revolutionary dodecahedron set design"
    ],
    collaborators: ["Jon English", "Marcia Hines", "John Paul Young", "Stevie Wright", "Trevor White", "Robin Ramsay", "Peter North", "Michael Caton", "Reg Livermore", "Michael Carlos"],
    quote: {
      text: "A wonderful aspect of all the many shows and bands I have worked with is the great friends I have made. Over the years I have so enjoyed and valued knowing a fascinating cast of talented and quirky characters from the Australian performing arts industry.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "africa-savage-musical",
    title: "Africa: The Savage Musical",
    year: "1970s",
    category: "theatre",
    heroImage: "https://barryferrier.com/media/k2/items/cache/9ecd376e5371efaef9aad9bc9143aed8_Generic.jpg",
    summary: "Original cast member of Steve J. Spears' politically charged satirical musical about apartheid and Indigenous rights.",
    fullContent: [
      "After performing in Jesus Christ Superstar, Barry Ferrier joined the original cast of Africa: The Savage Musical, a politically charged theatrical work written by Steve J. Spears. The show drew sharp parallels between South African apartheid and the treatment of Indigenous Australians, using catchy songs, slapstick, and physical satire to deliver its message.",
      "Barry's theatrical funk rock band Skeleton Crew (featuring Peter Leighton on drums, Chris Doyle on bass, and keyboardist Andrew Thomas Wilson) later performed in a revival season at the VCA Theatre in Melbourne. At that time, Skeleton Crew was popular on the Sydney music scene and had even been supported by a young Icehouse at a NSW Uni Roundhouse concert.",
      "After the show, Barry worked with cast members Rod Freeman Smith and Glenda Lum on a rock cabaret called \"Kabaratz\" at the Flying Trapeze Theatre Restaurant in Melbourne.",
      "The musical combined political commentary with highly melodic songs and physical theater, critiquing both apartheid and Indigenous Australian issues through satire and funk/rock sensibility."
    ],
    images: [
      { url: "https://barryferrier.com/media/k2/items/cache/9ecd376e5371efaef9aad9bc9143aed8_Generic.jpg", caption: "Africa: The Savage Musical" }
    ],
    highlights: [
      "Written by Steve J. Spears",
      "Political satire on apartheid",
      "Skeleton Crew revival at VCA Theatre",
      "Supported by young Icehouse",
      "Led to Kabaratz rock cabaret"
    ],
    collaborators: ["Steve J. Spears", "Peter Leighton", "Chris Doyle", "Andrew Thomas Wilson", "Rod Freeman Smith", "Glenda Lum"]
  },
  {
    slug: "joseph-dreamcoat",
    title: "Joseph & the Amazing Technicolour Dreamcoat",
    year: "1975",
    category: "theatre",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-8/original/joseph-the-technicolour-dreamcoatB6373F73-856B-178E-7C64-15BB1A1E8B89.jpg",
    summary: "Performed at the brand new Seymour Centre, Sydney with Mark Holden, directed by the acclaimed Rufus Collins.",
    fullContent: [
      "In 1975 I auditioned for a production of 'Joseph & the Amazing Technicolour Dreamcoat' to be staged at the, then, 'brand new' Seymour Centre, in Sydney. I flew up from Melbourne for the audition arranged by my agent Faith Martin, and just 'scraped in' to the show as chorus understudy... and when the show opened spent a few frustrating weeks having to be there for the call - but not appearing, till finally someone left and I joined the cast full time.",
      "Director Rufus Collins really impressed me - a gentle African American with gold rimmed glasses, a soft voice but a quiet confidence. He went on to become an eminent actor, known for The Hunger (1983), Shock Treatment (1981) and Saving Souls (1995). He was also influential in introducing Black Theatre to Europe. He died in 1996 in Amsterdam, Netherlands.",
      "Rufus visualised the show as a cartoon and he had 5 tons of pure white river sand installed as the stage, which guaranteed the physicality of the show. It starred a young Mark Holden as Joseph, who had won Starsearch (the 70s equivalent of Australian Idol) with his golden voice and boy next door looks, but was yet to throw roses as a pop star. We became firm friends for a while and I used to travel with him from Manly to Redfern each night in his yellow Mini Minor.",
      "I went on to understudy the eminent and charming Arthur Dignam's Potiphar, but never got to perform the role except in rehearsal. It was a highly physical romp with twelve brothers (including the burly Joe Dicker, Paul 'P.J.' Johnstone, Robert Forza to name a few) diving recklessly around in the sand like a rock n roll footy team.",
      "The band was a cracker, with Jimmy Duke-Younge, later of Bullamakanka, on drums. Gordon Waller of the pop duo 'Peter & Gordon' fame (Peter Asher was Jane Asher's brother and friend of Paul McCartney who wrote 'World Without Love' for them) played Pharaoh and Jacob. Patrick Flynn was Musical Director with arrangements by Michael Carlos."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/joseph-the-technicolour-dreamcoatB6373F73-856B-178E-7C64-15BB1A1E8B89.jpg", caption: "The only surviving photo of the show" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/mark-holden06CDFA57-E0FC-FC40-0154-07AD55C0C1EB.jpg", caption: "Mark Holden - Joseph" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/arthur-dignam68F45CAE-2FA9-603F-5340-52E135C9FAC0.jpg", caption: "Arthur Dignam" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/rufus-collinsA4B3E8D7-87B6-BB95-631A-0CC2A4B1B4D0.jpeg", caption: "Rufus Collins - Director" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/brian-thomson5A80F2CD-1447-F893-72C0-F5693991019F.jpg", caption: "Brian Thomson - Designer" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/patrick-flynn376A168C-9696-7B6D-72BF-D0C8364F9828.jpg", caption: "Patrick Flynn - Music Director" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/gillian-jones319A894D-DA08-4698-853E-2842E6AA3C40.jpg", caption: "Gillian Jones" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/joe-dicker9DE1FFB6-47C9-EA74-9BE1-7C6D4387B9F4.jpg", caption: "Joe Dicker" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-8/original/seyyt-yorkauditorium6EABBC7A-6A9D-9330-9AA0-7AEA92D53B39.jpg", caption: "The Seymour Centre" }
    ],
    highlights: [
      "Brand new Seymour Centre, Sydney (1975)",
      "5 tons of white river sand as the stage",
      "Directed by Rufus Collins",
      "Starred Mark Holden as Joseph",
      "Understudied Arthur Dignam's Potiphar",
      "Gordon Waller (Peter & Gordon) as Pharaoh"
    ],
    collaborators: ["Mark Holden", "Rufus Collins", "Arthur Dignam", "Gordon Waller", "Joe Dicker", "Paul Johnstone", "Robert Forza", "John McTernan", "Patrick Flynn", "Michael Carlos", "Jimmy Duke-Younge", "Brian Thompson", "Eve Ritscher"],
    quote: {
      text: "It was a highly physical romp with twelve brothers diving recklessly around in the sand like a rock n roll footy team.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "lindsay-kemp",
    title: "Lindsay Kemp Company",
    year: "Late 1970s",
    category: "theatre",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-3/original/lindsay-kemp-flowers-salome223091110-ECF0-6FC1-FF75-2EC50D6C3FE5.jpg",
    summary: "Composer for the world-famous mime company. Composed music for 'Salome' at London's Roundhouse - an 18-month sell-out season.",
    fullContent: [
      "Lindsay Kemp is an influential British dancer, actor, teacher, mime artist and choreographer who had a major impact on the Australian Theatre scene when his Company performed in Sydney and Melbourne in the 70s. He passed away in 2018.",
      "After meeting music director Andrew Thomas Wilson at a cast party for 'Joseph & the Amazing Technicolour Dreamcoat' and spending a weekend jamming with Andrew at my flat in Manly, I was invited to join his internationally celebrated Lindsay Kemp Company and worked with this ensemble in Kemp's adaption of Jean Genet's 'Flowers' at the Comedy and Her Majesties Theatres in Melbourne.",
      "I had been offered a part in the original Mad Max film just about to be shot through my agent Faith Martin, but it was then just a low budget film project with unknown stars, such as a fledgling Mel Gibson, so I turned down my opportunity to become an international film star to take on what was, at the time, the biggest 'break' a young composer could have in Australia.",
      "I went on to spend some months composing the musical score (in collaboration with Andrew Wilson) for the Oscar Wilde play 'Salome', which we performed at the New Arts Cinema, Glebe, and which later went on to a sell out season at the Roundhouse in London. The London Times described the music for this production as 'thrilling'.",
      "The score was partly prepared quadrophonic tape, mixed at the Sydney Conservatorium of Music quadrophonic studio, with myself performing a range of pseudo middle eastern music on my collection of exotic instruments with Andrew contributing then futuristic spaciousness on his huge Modular Moog.",
      "I was the only 'straight' guy in an ensemble of eccentric and gay theatrical divas, chosen for their stunning physical beauty and artistic abilities as dance/mime performers, at the very dawn of the Gay Revolution. I spent much of my downtime during rehearsals and later performances in a flat adjoining the theatre with the blind dancer Jack Birkett, or 'The Great Orlando'. He was a charismatic performer with powerful singing voice. Jack became a great friend - I remember how cast members would have to subtly point him towards the audience at times, as he groped around in his darkness, always stealing the show."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/lindsay-kemp-flowers-salome223091110-ECF0-6FC1-FF75-2EC50D6C3FE5.jpg", caption: "Lindsay Kemp as Salome" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/david-salomeE00395E5-A7D6-55B0-120D-200736443BB4.jpg", caption: "David Haughton as John the Baptist" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/jack-heroditus27BA53EA-40D5-BA6C-1963-B9DBF9412571.jpg", caption: "Jack Birkett as Heroditus" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/jack-kemp-company222959726-16B3-8B09-9233-A9318CFBAE89.jpg", caption: "The Great Orlando" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/flowersCF7A9159-4ED9-F027-C664-6A0AD4B4B04C.jpg", caption: "Flowers production" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/roundhouse376D9C51-16F4-A21A-BBA4-08F1E0BD688E.jpg", caption: "The Roundhouse, London" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/australian-flowers-poster391DA037-1CD8-0EF3-8A7A-89E16481406C.jpg", caption: "Australian Flowers poster" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/david-bowie693AD4C9-FB63-F3FF-DD6B-0F3B44AED03C.jpg", caption: "David Bowie connection" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-3/original/jack-birkettB89E7535-00EB-1F3E-821A-54D910B1722D.jpg", caption: "Jack Birkett" }
    ],
    highlights: [
      "18-month sell-out at London's Roundhouse",
      "Composed music for 'Salome' - described as 'thrilling' by The London Times",
      "Performed in 'Flowers' in Melbourne",
      "Collaborated with theatrical visionary Lindsay Kemp",
      "Quadrophonic score mixed at Sydney Conservatorium",
      "Turned down role in original Mad Max to join the company"
    ],
    collaborators: ["Lindsay Kemp", "Andrew Thomas Wilson", "Jack Birkett (The Great Orlando)", "David Haughton"],
    videos: [
      { id: "cCwwzQreNuU", title: "Lindsay Kemp Company" },
      { id: "tYgXMYrVJM0", title: "Lindsay Kemp Company" }
    ],
    quote: {
      text: "I turned down my opportunity to become an international film star (Mad Max) to take on what was, at the time, the biggest 'break' a young composer could have in Australia.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "lindon-ferrier",
    title: "Cammie Lindon & Barry Ferrier",
    year: "1970s-80s",
    category: "recording",
    heroImage: "https://barryferrier.com/images/slideshow/Barry_Ferrier-7.jpg",
    summary: "Music duo with Cammie Lindon. ABC's 'Countdown' appearance, RCA recording artist.",
    fullContent: [
      "Lindon Ferrier was a music duo formed with Cammie Lindon that achieved national recognition in the Australian music scene during the late 1970s and early 1980s.",
      "The duo appeared on ABC's legendary 'Countdown' program, the most influential music television show in Australian history, reaching millions of viewers across the country.",
      "As RCA recording artists, Lindon Ferrier released music that showcased their unique blend of contemporary sounds and sophisticated songwriting. They appeared on Channel 9's Midday Show and toured with the Norman Gunston Christmas Show.",
      "One of the career highlights was opening for guitar maestro Ry Cooder at the Palais Theatre in Melbourne - an unforgettable experience performing alongside such a legendary musician.",
      "The partnership with Cammie Lindon was musically fruitful and helped establish Barry's reputation as a versatile and accomplished recording artist. Cammie passed away on June 21st 1999 in Sydney at the age of 42, after a four-year long battle with cancer."
    ],
    images: [
      { url: "https://barryferrier.com/media/k2/galleries/8/Lindon%20Ferrier%20Press.jpg", caption: "Lindon Ferrier press photo" },
      { url: "https://barryferrier.com/media/k2/galleries/8/Barry-Ferrier---Sleepy-Albert---Milky-Way-Cabaret.jpg", caption: "Barry Ferrier as Sleepy Albert - Milky Way Cabaret" },
      { url: "https://barryferrier.com/media/k2/galleries/8/Cammie-Lindon--Peter-Leighton.jpg", caption: "Cammie Lindon & Peter Leighton" },
      { url: "https://barryferrier.com/media/k2/galleries/8/Chris-Doyle--Peter-Leighton.jpg", caption: "Chris Doyle & Peter Leighton" },
      { url: "https://barryferrier.com/media/k2/galleries/8/andrew%20thomas%20wilson.jpg", caption: "Andrew Thomas Wilson" },
      { url: "https://barryferrier.com/media/k2/galleries/8/cooder%20%20lindley.jpg", caption: "Ry Cooder & David Lindley - Palais Theatre" },
      { url: "https://barryferrier.com/media/k2/galleries/8/The%20Sydney%20Morning%20Herald%20%20Lindon%20Ferrier.png", caption: "Sydney Morning Herald feature" },
      { url: "https://barryferrier.com/media/k2/galleries/8/p1aotdnv62ci01ur41ui31tca1urs4.png", caption: "Archive photo 1" },
      { url: "https://barryferrier.com/media/k2/galleries/8/p1aotdo4smsja1osgn8s69d1njd5.png", caption: "Archive photo 2" },
      { url: "https://barryferrier.com/media/k2/galleries/8/p1aotdo9735er18gg1mv91v21eq56.png", caption: "Archive photo 3" }
    ],
    highlights: [
      "ABC's 'Countdown' appearance",
      "Channel 9 Midday Show",
      "RCA Records recording artist",
      "Opened for Ry Cooder at Palais Theatre",
      "Norman Gunston Christmas Show tour",
      "Milky Way Cabaret at Flying Trapeze Cafe"
    ],
    collaborators: ["Cammie Lindon", "Ry Cooder (support act)", "Peter Leighton", "Chris Doyle", "Andrew Thomas Wilson", "Roderick Morgan", "Spencer Lee (producer)"],
    youtubeVideos: [
      { id: "2hBzxZ1CyoA", title: "Lindon Ferrier - 'I'm Alive' on Countdown (1979)" },
      { id: "KKrwNxyzaUs", title: "Lindon Ferrier Performance" },
      { id: "dQT7-SW4NAA", title: "Second Time Straight - Film starring Cammie Lindon & Barry Ferrier" }
    ]
  },
  {
    slug: "astounding-optimissimos",
    title: "The Astounding Optimissimos",
    year: "1977",
    category: "theatre",
    heroImage: optimissimosPosterImage,
    summary: "Surrealist musical 'Paradise: Depression Style' at Melbourne's legendary Pram Factory, directed by Jean Pierre Mignon.",
    fullContent: [
      "In 1977, Barry successfully auditioned for 'The Astounding Optimissimos', subtitled 'Paradise: Depression Style' - a bizarre surrealist musical staged at Melbourne's legendary Pram Factory.",
      "This production holds the distinction of being the first play in Australia directed by acclaimed French theatre director Jean Pierre Mignon, who later gained considerable success with Anthill at the Australian National Theatre.",
      "Barry played piano and performed a Peter Allen parody, dancing and singing 'I Go to Rio'. He recalls that Mignon worked with him 'tirelessly, line by line, to help motivate and add nuance' to his eccentric part in this madcap, surrealist comedy.",
      "The production was written by Tim Gooding, an Australian playwright who would later gain recognition for writing the film 'Heatwave' starring Judy Davis.",
      "One memorable scene featured a choreographed sequence that combined elements of a ballroom dancing marathon and dodgem cars - typical of the show's surrealist style.",
      "Despite the brilliance and passion of the director and cast, the production was unfortunately a huge flop with virtually no audiences after several nights. Some cast members staged a boycott, which angered Mignon, who believed in the theatrical ideal that 'the show must go on' - leading to a tense standoff.",
      "The Pram Factory was a legendary alternative theatre space in Melbourne, known for experimental and politically engaged productions during the 1970s. This production represented an early collaboration between Australian experimental theatre and European directorial vision."
    ],
    images: [
      { url: optimissimosPosterImage, caption: "The Astounding Optimissimos - original poster" },
      { url: pramFactoryImage, caption: "Pram Factory Theatre, Melbourne 1976" },
      { url: jeanPierreMignonImage, caption: "Director Jean Pierre Mignon" },
      { url: timGoodingImage, caption: "Playwright Tim Gooding" }
    ],
    highlights: [
      "First Australian production by director Jean Pierre Mignon",
      "Surrealist musical comedy",
      "Performed Peter Allen parody",
      "Melbourne's legendary Pram Factory",
      "Written by Tim Gooding (Heatwave)"
    ],
    collaborators: ["Jean Pierre Mignon (Director)", "Tim Gooding (Playwright)", "Camille Gardner", "David Price", "Elizabeth Lancaster", "Bruce Keller"]
  },
  {
    slug: "40-years-byron-bay",
    title: "40 Years in Byron Bay",
    year: "1980s-Present",
    category: "local",
    heroImage: "https://barryferrier.com/images/Doctor-baz/2/Doctor-Baz-Solo.jpg",
    summary: "Pioneer of the local music scene since the early 1980s.",
    fullContent: [
      "As a long-time resident of the Byron Bay region, Barry established himself as a pioneer of the local music scene in the early 1980s, becoming a consistent and popular entertainer at all the leading local venues.",
      "Over four decades, he has performed at countless venues throughout Byron Bay, the Gold Coast, and Brisbane, building a devoted following and contributing to the region's vibrant cultural life.",
      "He performs regularly as a soloist and in an interesting variety of musical combinations which showcase his versatility - from intimate acoustic sets to full band performances.",
      "Barry has had great success as an entertainer for many beautiful Byron Bay weddings, bringing his professional experience and warm personality to countless celebrations.",
      "Described as 'the Charles Bronson of swamp blues' by someone who ought to know better, Barry has become a beloved fixture of the Byron Bay entertainment scene, known for his rich, deep voice reminiscent of Nick Cave, Johnny Cash, and Leonard Cohen.",
      "As an accomplished electric and acoustic guitarist with exciting flamenco skills, he also turns his hand to boogie and swing style piano, making him one of the most versatile performers in the region."
    ],
    images: [
      { url: "https://barryferrier.com/images/Doctor-baz/2/Doctor-Baz-Solo.jpg", caption: "Doctor Baz Solo" },
      { url: "https://barryferrier.com/images/Barry-Ferrier-2015.jpg", caption: "Byron Bay legend" },
      { url: "https://barryferrier.com/images/Barry-Ferrier-2017.jpg", caption: "Four decades of music" },
      { url: "/attached_assets/IMG_2507_1770504999102.jpeg", caption: "Doctor Baz on stage" },
      { url: "/attached_assets/IMG_2508_1770504999102.jpeg", caption: "Doctor Baz" }
    ],
    highlights: [
      "40+ years entertaining in Byron Bay",
      "Pioneer of the local music scene",
      "Popular wedding entertainer",
      "Versatile multi-instrumentalist"
    ],
    quote: {
      text: "Byron Bay has been my home and my muse for over four decades. The community here has supported my music through every evolution and experiment.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "eartha-kitt",
    title: "Eartha Kitt - Australian Tour",
    year: "1994",
    category: "touring",
    heroImage: "/attached_assets/IMG_4064_1770241128581.jpeg",
    summary: "Band leader and guitarist for the legendary diva Eartha Kitt during her 1994 Concert Tour of Australia.",
    fullContent: [
      "I had the privilege of working with and becoming friends with the great diva Eartha Kitt, working as her band leader and guitarist during her 1994 Concert Tour of Australia (August - October 1994).",
      "Performances included the Perth, Adelaide and Canberra and Penrith Entertainment Centres, The State Theatre Sydney, and the Brisbane and Melbourne Hilton, the tour produced by Gavan Evans. They headlined at the Gold Coast International Jazz Festival, which was televised nationally live by the ABC.",
      "This was a very intense period as Barry had also taken a contract to compose and direct the music for 'Dreamtime People', a large stage hi-tech production depicting the Australian Aboriginal Dreamtime for tourists at Sanctuary Cove Queensland, featuring a cast of 9 aboriginal actors.",
      "Eartha Kitt (January 17, 1927 – December 25, 2008) was a living legend - an American actress, singer, cabaret star, dancer, stand-up comedian, activist and voice artist, known for her highly distinctive singing style and her 1953 recordings of 'C'est Si Bon' and the enduring Christmas novelty smash 'Santa Baby'.",
      "She starred in 1967 as Catwoman in the third and final season of the television series Batman. Orson Welles once called her 'the most exciting woman in the world'.",
      "In 1968, her career in America suffered dramatically after she made anti-war statements to President Johnson at a White House luncheon. Asked by Lady Bird Johnson about the Vietnam War, she replied: 'You send the best of this country off to be shot and maimed. No wonder the kids rebel and take pot.' She was forced to move to Europe for some years at the peak of her career.",
      "Barry subsequently worked as band leader for child prodigy guitarist Nathan Cavaleri, further cementing his reputation as a sought-after musical director for high-profile artists."
    ],
    images: [
      { url: "/attached_assets/IMG_4064_1770241128581.jpeg", caption: "Eartha Kitt Live in Australia" },
      { url: "https://barryferrier.com/media/k2/galleries/14/800px-Eartha_Kitt_Allan_Warren.jpg", caption: "Eartha Kitt" },
      { url: "https://barryferrier.com/media/k2/galleries/14/eartha.jpg", caption: "The legendary diva" },
      { url: "https://barryferrier.com/media/k2/galleries/14/fred_cole.jpg", caption: "Fred Cole - Piano" },
      { url: "https://barryferrier.com/media/k2/galleries/14/bob%20birtles.jpg", caption: "Bob Birtles - Saxophone" },
      { url: "https://barryferrier.com/media/k2/galleries/14/warwick%20alder.jpg", caption: "Warwick Alder - Trumpet" },
      { url: "https://barryferrier.com/media/k2/galleries/14/maurice%20cernigoi.jpg", caption: "Maurice Cernigoi - Bass" },
      { url: "/attached_assets/John-Hoffman_1770240806383.png", caption: "John Hoffman - Trumpet" },
      { url: "/attached_assets/warwick_alder_1770240836123.jpeg", caption: "Warwick Alder - Trumpet" },
      { url: "/attached_assets/bob_birtles_1770240918817.jpeg", caption: "Bob Birtles - Saxophone" },
      { url: "/attached_assets/Eartha_Kitt_Catwoman_Batman_1967_1770240954073.jpeg", caption: "Eartha Kitt as Catwoman (1967)" }
    ],
    highlights: [
      "Band leader and guitarist for Eartha Kitt",
      "1994 Australian Concert Tour",
      "Gold Coast International Jazz Festival (ABC live telecast)",
      "State Theatre Sydney",
      "Perth, Adelaide, Canberra Entertainment Centres",
      "Brisbane and Melbourne Hilton"
    ],
    collaborators: ["Eartha Kitt", "Fred Cole (piano)", "Maurice Cernigoi (bass)", "Warwick Alder (trumpet)", "Bob Birtles (saxophone)", "Tony Buchanan (saxophone)"],
    videos: [
      { id: "Ibg89qhBsxM", title: "Eartha Kitt - I Want to Be Evil" },
      { id: "waBFnShAnlA", title: "Eartha Kitt - Old Fashioned Girl" },
      { id: "XdFP2dkvXnY", title: "Eartha Kitt - Where is My Man" },
      { id: "b_iM4oWRK70", title: "Eartha Kitt - Santa Baby" }
    ],
    quote: {
      text: "Orson Welles once called her 'the most exciting woman in the world'. Working with Eartha was a career highlight.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "slim-pickens",
    title: "Slim Pickens & Dr. Baz",
    year: "2000s",
    category: "touring",
    heroImage: "https://barryferrier.com/images/Pete_C__Dr_Baz_sm.jpg",
    summary: "Long-term musical partnership with European tours and multiple festival appearances.",
    fullContent: [
      "Slim Pickens & Dr. Baz represents one of Barry's most enduring and successful musical partnerships, producing some of the most memorable performances of his career.",
      "Together, they embarked on European tours with 60+ gigs in Norway, bringing Australian blues and roots music to appreciative Scandinavian audiences. They also performed in London and undertook a Northern Ireland tour.",
      "The duo released albums including 'Cactus' and 'Next Time', which showcase their unique blend of blues, country, and roots music. These recordings capture the chemistry and musical understanding built over years of performing together.",
      "The 2007 Poco Loco tour through Scandinavia was a particular highlight, introducing their sound to new audiences across multiple countries.",
      "Multiple festival appearances at Gympie Muster and Tamworth Country Music Festival cemented their reputation as one of Australia's premier roots music acts."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/baz-slim-vaeroyEB4A320E-79DF-167F-E0F7-34BE941769D2.jpg", caption: "Sjyrock Festival" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/japan11885031F-27B3-C04E-1131-170A05D2FF8B.jpg", caption: "Japan" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slimbaz-gympieA0CFAE6C-8FB1-F255-5E07-23C74884565D.jpg", caption: "Gympie Muster" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-and-baz-in-paris2AFDBAF0-06D9-7B79-9093-753364F79E5E.jpg", caption: "Paris" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-baz28D57D9FD-4E6E-BCFA-6578-739851C8EF17.jpg", caption: "Byron Blues Fest" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-pickens-dr-baz422D5BBE-BE82-8CF4-1E86-F84830A6BDF2.jpg", caption: "Slim & Baz" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-n-baz-airportD2F6C7D0-C9F0-E11B-6E41-735B0E109D7C.jpg", caption: "Vaeroy Airport" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/shooflys176C4FB6B-A275-D0BF-F63D-BE362B2C62A6.jpg", caption: "The Rails, Byron Bay" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/waiting93514A37-6D5A-667A-4A41-4D93EC912E33.jpg", caption: "Amsterdam" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/sjyrock192949A67-9975-F69C-ED30-2115D9826E7A.jpg", caption: "Sjyrock Festival Norway" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/on-tour28D4C9654-CF6E-04DD-84A9-5FCEDA0FB4E8.jpg", caption: "On tour in Norway" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/magherefelt2B44C6B1F-CA60-4878-102A-6FAA8CFD0F68.jpg", caption: "Northern Ireland" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/belfast1CEB14C2E-1B0B-1D99-0624-48A66DA28C09.jpg", caption: "Madden's Bar Belfast" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/bluescruise76994A72-C9C2-105E-491E-F065365651BA.jpg", caption: "Blues Cruise" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/dolphin-awards-2009140E320B-B1F5-FF15-C42C-1FB821FF0663.jpg", caption: "Dolphin Awards" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-pickens-drbaz3FEC143C5-8E8F-50B6-D2AF-83CF7FCF871A.jpg", caption: "Our Beginning Mullumbimby" },
      { url: "/attached_assets/DrBaz_Accordian_1770158202252.jpg", caption: "Dr. Baz on Accordion" },
      { url: "/attached_assets/DRBaz_Nei_McCann_Slim_Pickens_2_1770158202252.jpg", caption: "Dr. Baz, Neil McCann & Slim Pickens" },
      { url: "/attached_assets/DRBaz_Nei_McCann_Slim_Pickens_3_1770158202252.jpg", caption: "The Shooflys Live" },
      { url: "/attached_assets/DRBaz_Nei_McCann_Slim_Pickens_1770158202252.jpg", caption: "The Shooflys on Stage" },
      { url: "/attached_assets/Slim_Pickens_&_Dr_Baz_1770158202252.JPG", caption: "Slim Pickens & Dr. Baz" },
      { url: "/attached_assets/Slim-Pickens-&-DrBaz4_1770158202252.jpg", caption: "Festival Performance" },
      { url: "/attached_assets/slim&baz-in-Vaeroy-2006_1770158202252.jpg", caption: "Vaeroy Norway 2006" },
      { url: "/attached_assets/SlimPickens_&_Dr_Baz_Slipway_Hotel_1770158202253.jpeg", caption: "Slipway Hotel Irish Pub" },
      { url: "/attached_assets/The-ShooFlys_1770158202253.jpg", caption: "The Shooflys Promo" },
      { url: "/attached_assets/DR_Baz_in+Amsterdam_1770173991696.JPG", caption: "Dr. Baz in Amsterdam" },
      { url: "/attached_assets/DrBaz_Norway_1770173991696.jpg", caption: "Dr. Baz in Norway" },
      { url: "/attached_assets/Next_Time_Album_Cover_1770173991696.JPG", caption: "Next Time Album Cover" },
      { url: "/attached_assets/Slim_Pickens_Dr_Baz_Poster_1_1770173991696.JPG", caption: "Bangalow Markets Poster" },
      { url: "/attached_assets/Slim_Pickens_Dr_Baz_Poster_2_1770173991697.JPG", caption: "Club Banora Poster" },
      { url: "/attached_assets/Slim_Pickens_Dr_Baz_Poster_3_1770173991697.JPG", caption: "Royal Mail Hotel Poster" },
      { url: "/attached_assets/Slim_Pickens_Dr_Baz_Poster_4_1770173991697.JPG", caption: "Bangalow Markets Blues & Roots" },
      { url: "/attached_assets/Slim_Pickens_Dr_Baz_Poster_5_1770173991697.JPG", caption: "Lennox Point Hotel Poster" },
      { url: "/attached_assets/Slim_Pickens_Dr_Baz_Poster_6_1770173991697.JPG", caption: "Club Lennox Poster" },
      { url: "/attached_assets/Slim-Pickens-&-DrBaz-in_Norway_1_1770173991697.jpg", caption: "Norway Tour - Safety Suits" },
      { url: "/attached_assets/Slim-Pickens-&-DrBaz-in_Norway_2_1770173991697.jpg", caption: "Norway Tour - On the Road" },
      { url: "/attached_assets/Slim-Pickens-&-DrBaz-in_Norway_3_1770173991697.jpg", caption: "Norway Performance" },
      { url: "/attached_assets/Slim-Pickens-&-DrBaz-in_Norway_4_1770173991698.jpg", caption: "Norway Festival Stage" },
      { url: "/attached_assets/The-ShooFlys-Poster-1_1770173991698.jpg", caption: "The Shooflys Poster - The Rails Byron Bay" },
      { url: "/attached_assets/The-ShooFlys_1770173991698.jpg", caption: "The Shooflys Band Photo" }
    ],
    highlights: [
      "60+ gigs in Norway",
      "London performances",
      "Northern Ireland tour",
      "Albums: 'Cactus' and 'Next Time'",
      "Gympie Muster appearances",
      "Tamworth Country Music Festival",
      "Blues Cruise performances",
      "N.C.E.I.A. Dolphin Awards"
    ],
    collaborators: ["Slim Pickens", "Neil McCann", "Rod Coe"],
    youtubeVideos: [
      { id: "vjXYxNFZS1Y", title: "Slim Pickens & Dr. Baz" },
      { id: "MbiX4BB6us8", title: "Slim Pickens & Dr. Baz Live" },
      { id: "4R9Q9K7Cgtw", title: "Performance" },
      { id: "ak-yGe2zPgg", title: "Blues Session" },
      { id: "YRT5Y8kdhaw", title: "Live Set" },
      { id: "bDVFdoiq5yg", title: "Slim Pickens & Dr. Baz Performance" }
    ]
  },
  {
    slug: "pete-c-dr-baz",
    title: "Pete C. & Dr. Baz",
    year: "2017-Present",
    category: "bands",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-11/original/baz-pete4E72B963-A8DB-46B3-7FD6-B8CBEB212841.jpg",
    summary: "Blues duo with Peter Claydon performing original and classic blues.",
    fullContent: [
      "Since Dr. Baz was asked to fill in for John Hill in the Byron Bay soul band \"The Propellers\", Doctor Baz has found a great connection with their frontman and highly respected Byron Bay based blues singer and guitarist Peter Claydon who is known widely as Pete C. (also frontman to the local legends \"The Soul Shakers\").",
      "They hit it off so well they have gone on to form a unique blues duo and begun performing locally after a debut gig at the legendary Railway Friendly Bar in Byron Bay. With diverse and mature music skills, powerful authentic blues feel, their classy and full bodied gritty sound immediately shone with all the hallmarks of a classic blues outfit.",
      "They kicked off with a residency at Mullumbimby Ex-Serviceman's Club billed as \"Acoustic Lounge Adventures\" and have performed regularly at local markets, pubs and clubs throughout the Northern Rivers region."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-11/original/baz-pete4E72B963-A8DB-46B3-7FD6-B8CBEB212841.jpg", caption: "Pete C. & Dr. Baz" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-11/original/dr-baz-petec-mullum145A919E-5A26-0DCD-2ACF-B5C2ED29DCC1.jpg", caption: "Live at Mullumbimby" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-11/original/pete-c-baz-pianoman-no-text5D1C2A3F-A5E2-E677-89F4-1A1A284C8856.jpg", caption: "Blues Session" }
    ],
    highlights: [
      "Debut at Railway Friendly Bar Byron Bay",
      "Residency at Mullumbimby Ex-Services Club",
      "Acoustic Lounge Adventures",
      "Northern Rivers blues circuit",
      "Classic blues duo sound"
    ],
    collaborators: ["Peter Claydon (Pete C.)"],
    youtubeVideos: [
      { id: "PL-H2G0rnnqqV65KAV_RBYvXynFZ_wm1lM", title: "Pete C. & Dr. Baz Playlist", isPlaylist: true },
      { id: "YQSm3rSjhTk", title: "Pete C. & Dr. Baz" },
      { id: "aze9n2aeJk0", title: "Pete C. & Dr. Baz Performance" },
      { id: "jcrF85mn0UM", title: "Pete C. & Dr. Baz Live" }
    ]
  },
  {
    slug: "the-propellers",
    title: "The Propellers",
    year: "2017-Present",
    category: "bands",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-11/original/propellers34D48C019-07A2-5E4C-A504-35D7AC723A1A.jpg",
    summary: "Byron Bay-based blues band featuring Pete C., Dr. Baz, Belle Hendrik and Jason Caspen.",
    fullContent: [
      "Byron Bay based blues band \"The Propellers\" features Pete C. (vocals, guitar), Belle Hendrik (bass), Dr. Baz (aka Barry Ferrier - piano) and Jason Caspen (drums). They regularly perform at the Railway Friendly Bar in Byron Bay and other venues throughout the Northern Rivers region.",
      "The band delivers powerful blues performances with a repertoire that includes original songs and classic covers from artists like Robert Cray and Tony Joe White. Their energetic live shows showcase the combined talents of four of the region's most accomplished musicians.",
      "Dr. Baz was asked to fill in for John Hill in the band, and the connection with frontman Pete C. led to the formation of their popular blues duo \"Pete C. & Dr. Baz\". The Propellers continue to be one of Byron Bay's most respected live blues acts."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-11/original/propellers34D48C019-07A2-5E4C-A504-35D7AC723A1A.jpg", caption: "The Propellers" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-11/original/propellers-rails-with-rod0EBC97FE-01FF-2A69-7C2F-FA35ED09C321.jpg", caption: "Live at The Rails with Rod Coe" },
      { url: "/attached_assets/Propellors_&_Hoey_Moey_3_1770361656042.jpg", caption: "The Propellers at the Hoey Moey" }
    ],
    highlights: [
      "Railway Friendly Bar Byron Bay",
      "Pete C. on vocals and guitar",
      "Belle Hendrik on bass",
      "Dr. Baz on piano",
      "Jason Caspen on drums"
    ],
    collaborators: ["Pete C.", "Belle Hendrik", "Jason Caspen"],
    youtubeVideos: [
      { id: "5e3mnpV7GBs", title: "It All Comes Back - The Propellers live @ The Rails" },
      { id: "WwpCLH9fTXo", title: "A Night at the Rails - The Propellers Live" },
      { id: "KNNnSmwArQ0", title: "Phone Booth - The Propellers, Robert Cray Cover" },
      { id: "CcHsRdSXrs8", title: "Polk Salad Annie - The Propellers" },
      { id: "di_Yvaj8l5o", title: "Willowtree - The Propellers Live" },
      { id: "fhbQ-MKAQ6U", title: "The Propellers Live Performance" },
      { id: "yz5gYIM3624", title: "The Propellers Blues Session" }
    ]
  },
  {
    slug: "musical-theatre",
    title: "Musical Theatre Works",
    year: "1970s-1990s",
    category: "composition",
    heroImage: "https://barryferrier.com/media/k2/galleries/21/Boy%20Who%20Dared%20to%20Dream%202.jpg",
    summary: "Original musicals and jazz opera compositions with legendary Australian performers including John Paul Young, Reg Livermore, and Colin Hay.",
    fullContent: [
      "Barry Ferrier met playwright and later filmmaker Frank Howson in the cast of Jesus Christ Superstar through a mutual acquaintance with opera singer Peter North who played the deep-voiced Caiaphus in the show. They first collaborated on the children's rock musical 'The Faraway Land of Magical Frank'.",
      "Frank Howson submitted the demo tape (which Barry made with Billy Miller, later of The Ferrets fame, Shayna Stewart - known for her work with the progressive rock band Tully, and other cast members and musicians from Jesus Christ Superstar, recorded live on a two-track TEAC at an old house on the harbour at Manly) to Alberts Productions in Sydney. It found its way to the desk of the head of classical music Dr. Franz Holford.",
      "A distinguished figure in Australian classical music, Holford saw great merit in the musical compositions and took on the project with passion. In an unusual move for the staid Alberts classical music catalogue, the company began recording an LP album of the music. The featured singers were Billy Miller as 'Magical Frank', Arthur Dignam as 'Merlin', Reg Livermore as 'The Owl', John Paul Young as 'The Kid' and Shayna Stewart as 'The Princess', with Barry and Frank also playing cameo roles.",
      "CEO Ted Albert, who as a teenager had been the engineer on The Easybeats recordings, took time out from his huge commitments heading up the Alberts Music corporation to take a personal interest in the project and took on the role of recording engineer with Barry Ferrier producing. Ted Albert and the very young and inexperienced Barry Ferrier formed an unusual friendship from hours in the studio together, and Ted began mentoring Barry's career.",
      "The album was completed including the cover art but at this crucial point Alberts were swamped by the huge success of AC/DC and shelved all projects as tax write-offs. The album was never released and still languishes in their vaults, Ted Albert having died prematurely from a life-long heart issue.",
      "Frank Howson secured a season for the musical at the Total Theatre in Melbourne and the show was performed for a six-week season with The Ferrets supplying the musical backing, actress Lisa Peers as the Owl, Graham Matters as Frank, Frank Howson as the narrator, and Bill Binks, Peter Noble and Tommy Dysart (both cast members of the original Jesus Christ Superstar) also appearing.",
      "Because of a contractual dispute, Barry also wrote, in record time (one week!), the music for a second children's musical with Frank's libretto entitled 'The Boy Who Dared to Dream'. This was later recorded by Crest International featuring the voices of Trevor White (Jesus in Jesus Christ Superstar), John Waters, Brenda Kristen, and Barry Ferrier, and it too was performed for a season in Melbourne.",
      "Barry and Frank also collaborated on a jazz opera based on the life of notorious Melbourne underworld figure and gangster Leslie 'Squizzy' Taylor. The original demo featured Colin Hay of Men at Work as Squizzy and Frank secured an album deal with Mushroom Records which was to star Wendy Matthews and John Paul Young. Pre-publicity during the 10BA tax period for filmmaking turned out to be a mistake as a movie on the same theme was rushed into production which scuttled the album project.",
      "In the 1990s Frank secured funding for a film version of the opera, and a second demo was made of an updated version which Barry was using as a PhD project. However, a house fire destroyed these recordings and simultaneously Frank's film company was driven into bankruptcy through embezzlement of funds by a director, and the project stalled for a second time."
    ],
    images: [
      { url: "https://barryferrier.com/media/k2/galleries/21/Billy%20Miller%20The%20Ferrets.jpg", caption: "Billy Miller (The Ferrets) - Magical Frank, Total Theatre Melbourne" },
      { url: "https://barryferrier.com/media/k2/galleries/21/Boy%20Who%20Dared%20to%20Dream%202.jpg", caption: "The Boy Who Dared to Dream Album Cover (Crest International)" },
      { url: "https://barryferrier.com/media/k2/galleries/21/Brenda%20Kristen.jpg", caption: "Brenda Kristen - The Boy Who Dared to Dream" },
      { url: "https://barryferrier.com/media/k2/galleries/21/John%20Waters.jpg", caption: "John Waters - Narrator, The Boy Who Dared to Dream" },
      { url: "https://barryferrier.com/media/k2/galleries/21/Lisa-Peers.jpg", caption: "Lisa Peers, The Owl - Magical Frank, Total Theatre Melbourne" },
      { url: "https://barryferrier.com/media/k2/galleries/21/Tommy%20Dysart.jpg", caption: "Tommy Dysart - The Boy Who Dared to Dream" },
      { url: "https://barryferrier.com/media/k2/galleries/21/Trevor%20White.jpg", caption: "Trevor White - The Boy Who Dared to Dream" },
      { url: "https://barryferrier.com/media/k2/galleries/21/ferrets.jpg", caption: "The Ferrets - Magical Frank, Total Theatre Melbourne" },
      { url: "https://barryferrier.com/media/k2/galleries/21/graham%20matters.jpg", caption: "Grahame Matters as Magical Frank, Total Theatre Melbourne" },
      { url: "https://barryferrier.com/media/k2/galleries/21/p1ap9a49bn1no61sbmjcq1igs112e4.jpg", caption: "Magical Frank Production" },
      { url: "https://barryferrier.com/media/k2/galleries/21/p1ap9a4e9215551nh12pj26b1qc85.png", caption: "Musical Theatre Artwork" }
    ],
    highlights: [
      "The Faraway Land of Magical Frank",
      "The Boy Who Dared to Dream",
      "Squizzy Taylor Jazz Opera",
      "Recorded at Alberts Productions",
      "Produced with Ted Albert",
      "Featured John Paul Young",
      "Featured Reg Livermore",
      "Featured Colin Hay (Men at Work)",
      "Total Theatre Melbourne season"
    ],
    collaborators: ["Frank Howson", "Billy Miller", "John Paul Young", "Reg Livermore", "Arthur Dignam", "Colin Hay", "Trevor White", "John Waters", "Tommy Dysart", "Shayna Stewart", "Ted Albert"],
    youtubeVideos: [
      { id: "bADDmMFs9AE", title: "Musical Theatre Works Performance" },
      { id: "Z27qLYgemeI", title: "Musical Theatre Works Live" },
      { id: "nVPJyklXOXQ", title: "Musical Theatre Works Production" },
      { id: "URW8XYjUkYM", title: "Musical Theatre Works Recording" }
    ]
  },
  {
    slug: "jeff-st-john",
    title: "Working with Jeff St John",
    year: "1970s",
    category: "touring",
    heroImage: "/attached_assets/jeff_st_john_1770242219265.jpeg",
    summary: "Barry Ferrier worked with Australian rock legend Jeff St John during the mid-1970s, one of Australia's finest rock vocalists.",
    fullContent: [
      "During the period following Jesus Christ Superstar, Barry began working with Jeff St John, one of Australia's most legendary rock vocalists.",
      "Jeff St John (born Jeffrey Leo Newton; 22 April 1946 – 6 March 2018) was an Australian musician known for his local hit singles 'Big Time Operator' (1967), 'Teach Me How to Fly' (1970) and 'A Fool in Love' (1977). Born with spina bifida, he was an advocate for disabled people throughout his career.",
      "A chance meeting of four young men at the Sydney Musicians Club in 1965 marked the beginning of Jeff's professional singing career. He had been singing since the age of eight in talent quests staged by radio station 2GB. At 15 he had a role as a featured vocalist on Nine Network's 'Opportunity Knocks' and was seen often on television.",
      "The product of that meeting at the Musoes Club was The Syndicate, later renamed The Wild Oats and eventually The Id – hailed then as the 'finest soul/rhythm & blues outfit that Sydney had been blessed to contain'. They opened at the city's first real discotheque, Whiskers, and cut their debut single 'Lindy Lou'.",
      "Word soon spread about this mind-blowing funky band and their freak-voiced singer who could scorch the paint off walls with his high notes. Every night the venue would be packed to the gunwales and each night the roaring, finely-controlled voice of Jeff St John would win more converts for life.",
      "A fourth Id single, 'Big Time Operator', exploded in February 1967, streaking to No.7 nationally. They opened for the Roy Orbison/Walker Brothers/Yardbirds tour and undertook a riotous season at Melbourne's Thumpin' Tum.",
      "Jeff St John's Copperwine was hailed as 'a truly magical outfit', with an exhilarating mixture of fine musicianship, intense emotional vocals and a definite uncompromising direction. They soon trekked across the continent to become founding fathers, with Tully and Tamam Shud, of a flowering Sydney progressive concert scene.",
      "These bands ruled the all-important 'head' circuit, including the pioneering and pivotal 1970 Ourimbah festival. Alongside Melbourne heavyweights like Chain, Billy Thorpe & the Aztecs and Max Merritt & the Meteors, St John's crew picked up Ourimbah's 10,000 happy hippies, crumpled them with searing heartfelt vocals and hurled them, metaphorically, across the field.",
      "St John's disability had never made it easy for him to pursue a career as physical as live rock, though he rarely allowed it to conquer him. As a member of the spina bifida support group Mosaic, he was involved in educating people about disabilities.",
      "He sang the national anthem at the 2000 Paralympics in Sydney. 'I love my country,' he would say, 'and this allowed me to be crazy for more years than I can remember.'",
      "In 2015 his autobiography 'The Jeff St John Story: The Inside Outsider' was published. He is survived by his wife Marilyn and a daughter from a previous marriage."
    ],
    images: [
      { url: "/attached_assets/jeff_st_john_1770242219265.jpeg", caption: "Jeff St John performing live in the 1970s" },
      { url: "/attached_assets/Jeff_St_John_CU_1770242255869.jpeg", caption: "Jeff St John close-up" },
      { url: "/attached_assets/Jeff_St_John_on_stage_1770242279634.jpeg", caption: "Jeff St John on stage" },
      { url: "/attached_assets/jeff_st_john_&_Sacha_1770242353337.jpeg", caption: "Jeff St John & Sacha with the band" },
      { url: "/attached_assets/jeff_st_john_&_sacha_with_Barry_Ferrier_1770259720098.jpg", caption: "Jeff St John & Sacha with Barry Ferrier" },
      { url: "/attached_assets/jeff_st_john_obit_1770242307305.jpeg", caption: "Jeff St John obituary - 'Heart of the Id overcame adversity'" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/191000_-_Opening_Ceremony_Jeff_St_John_performs_-_3b_-_2000_Sydney_opening_ceremony_photo.jpg/250px-191000_-_Opening_Ceremony_Jeff_St_John_performs_-_3b_-_2000_Sydney_opening_ceremony_photo.jpg", caption: "Jeff St John at 2000 Sydney Paralympics" }
    ],
    highlights: [
      "Australian rock legend",
      "Big Time Operator (1967)",
      "Teach Me How to Fly (1970)",
      "A Fool in Love (1977)",
      "2000 Sydney Paralympics performer",
      "Soul, R&B and rock vocalist"
    ],
    collaborators: ["Jeff St John", "The Id", "Copperwine", "Red Cloud"],
    quote: {
      text: "Jeff's roaring, finely controlled voice was unlike anything else in Australian music. He was Australia's finest rock vocalist of his era.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "dreams-and-machines",
    title: "Dreams & Machines",
    year: "1985",
    category: "composition",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-12/original/dreams-machines-programme-front-cover2D648A67-2E42-8CA8-847C-D4B73C5F46E5.jpg",
    summary: "Pioneering multimedia electronic music concert at QPAC featuring the Fairlight CMI and Video Instrument.",
    fullContent: [
      "The Fairlight CMI (Computer Musical Instrument) is one of the earliest complete music workstations with embedded digital sampling synthesizer. It was introduced in 1979 by the founders of Fairlight, Peter Vogel and Kim Ryrie, in Sydney, Australia.",
      "Barry Ferrier, who had taken an interest in electronic music since working with pioneering Moog Synthesist Andrew Thomas Wilson in the 70s composing the music for Lindsay Kemp's 'Salome', was introduced to composing on the Fairlight during downtime while working as a recording session musician for producer Ian Mason at the iconic Music Farm Studios in Mullumbimby NSW.",
      "He later became a regular commissioned composer for the Queensland Performing Arts Trust at Brisbane's QPAC. A Fairlight CMI had been purchased by the Trust and Barry's unique knowledge of the groundbreaking computer music instrument was utilised in many theatre shows, workshops and installations during the mid to late 80s.",
      "Barry Ferrier was commissioned by the Queensland Performing Arts Trust to compose and perform a concert in September 1985 at the QPAC Concert Hall that was to be an exposition of state of the art digital technology in a performing arts context, featuring the then cutting edge Fairlight CMI IIX and the newly released Fairlight Video Instrument (CVI).",
      "The performances featured the Fairlight CMI as part of a rock band (performing the song Android from Ferrier's rock musical 'Goodnight World'), as a fifth 'member' of a wind quintet, and as the soundtrack to a modern dance piece, choreographed by Ginny Bradley with the Vision Dance ensemble, entitled 'Chrysalis', all composed by Ferrier on the Fairlight.",
      "The performance included prepared video clips on a giant screen borrowed from the Sydney Opera House as well as live video processed through a Fairlight Video Instrument. The prepared videos used text performed by Ferrier from the writings of Australian composer Percy Grainger who had written a prescient piece on future music technology at the turn of the 19th century which described in uncanny detail a concept that pre-imagined the Fairlight CMI.",
      "Barry Ferrier has recently been recognised for his pioneering work as an electronic music composer by inclusion of one of his compositions in an exhibition mounted as a celebration of the birth of the Fairlight Computer Music Instrument at the National Film and Sound Archive in Canberra on Sept 2nd, 2016."
    ],
    images: [
      { url: "/attached_assets/Dreams_&_Machines-Still-from-Giant-Video_Screen_1770158635166.jpg", caption: "Still from Giant Video Screen" },
      { url: "/attached_assets/Dreams_&_Machines_Cassette_Cover_1770158635165.jpg", caption: "Dreams & Machines Cassette Cover" },
      { url: "/attached_assets/Dreams_&_Machines_Programme_1770158635165.jpg", caption: "Original Programme Cover" },
      { url: "/attached_assets/Dreams_&_Machines_Programme_2_1770158635165.jpg", caption: "Programme Details" },
      { url: "/attached_assets/Dreams_&_Machines_Promotion_1770158635166.jpg", caption: "Newspaper Promotion" },
      { url: "/attached_assets/Dreams_&_Machines_Promotion_2_1770158635165.jpg", caption: "Concert Poster" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-12/original/dreams-machines-programme-front-cover2D648A67-2E42-8CA8-847C-D4B73C5F46E5.jpg", caption: "Dreams & Machines Programme Cover" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-12/original/dreams-machines-media-24FEB32FB-A44C-F41E-1846-A7F670A05A7C.jpg", caption: "Media Coverage" },
      { url: "https://barryferrier.com/media/k2/galleries/16/Dreams%20Machines.jpg", caption: "Dreams & Machines" },
      { url: "https://barryferrier.com/media/k2/galleries/16/Fairlight%20CVI.jpg", caption: "Fairlight CVI" },
      { url: "https://barryferrier.com/media/k2/galleries/16/Queensland-Performing-Arts-Centre.jpg", caption: "QPAC Concert Hall" },
      { url: "https://barryferrier.com/media/k2/galleries/16/fairlightcmi.jpg", caption: "Fairlight CMI" },
      { url: "/attached_assets/Barry_Ferrier_&_Frank_Howson_2_1770177882648.jpg", caption: "Barry Ferrier & Frank Howson" },
      { url: "/attached_assets/Barry_Ferrier_&_Frank_Howson_3_1770177882650.jpg", caption: "Barry Ferrier & Frank Howson" },
      { url: "/attached_assets/Barry_Ferrier_&_Frank_Howson_4_1770177882650.jpg", caption: "Barry Ferrier & Frank Howson" },
      { url: "/attached_assets/Barry_Ferrier_&_Frank_Howson_5_1770177882650.jpg", caption: "Barry Ferrier & Frank Howson" },
      { url: "/attached_assets/Barry_Ferrier_&_Frank_Howson_6_1770177882650.jpg", caption: "Barry Ferrier & Frank Howson" },
      { url: "/attached_assets/Faraway_Land_of_Magical_Frank_1770177882651.jpg", caption: "The Faraway Land of Magical Frank - Theatre Poster" },
      { url: "/attached_assets/Faraway_Land_of_Magical_Frank-clipping_1770177882651.png", caption: "Post-haste to Musical Fame - Press Clipping" },
      { url: "/attached_assets/Faraway_Land_of_Magical_Frank-clipping_2_1770177882651.jpg", caption: "The Story of Magical Frank - Press Clipping" },
      { url: "/attached_assets/Faraway_Land_of_Magical_Frank-clipping_3_1770177882651.png", caption: "The Age Review - Press Clipping" },
      { url: "/attached_assets/Howson_Squizzy_Opera_clipping_1770177882651.png", caption: "Squizzy Taylor Opera - Press Clipping" },
      { url: "/attached_assets/IMG_0087_1770178231460.png", caption: "Goodnight World - A Musical Comedy of Terrors" }
    ],
    highlights: [
      "QPAC Concert Hall premiere September 1985",
      "Fairlight CMI IIX digital synthesizer",
      "Fairlight Video Instrument (CVI)",
      "Vision Dance ensemble collaboration",
      "Giant screen from Sydney Opera House",
      "National Film and Sound Archive recognition 2016"
    ],
    collaborators: ["Ginny Bradley", "Vision Dance", "Queensland Performing Arts Trust"],
    youtubeVideos: [
      { id: "i-sNphrfEsM", title: "Chrysalis - Electronic Dance Music by Barry Ferrier" }
    ],
    externalLinks: [
      { url: "/electronic-music", label: "View Electronic Music Video Gallery" }
    ]
  },
  {
    slug: "goodnight-world",
    title: "Goodnight World - The Musical",
    year: "1984",
    category: "theatre",
    heroImage: "/attached_assets/IMG_0087_1770178231460.png",
    summary: "Musical comedy of terrors co-written with Gerald Frape, staged at La Boite Theatre Brisbane.",
    fullContent: [
      "In 1983 Barry co-wrote (with journalist, social issue campaign specialist and media lecturer Gerald Frape) the musical comedy of terrors \"Goodnight World\", which enjoyed a 4 week season at Brisbane's historic La Boite Theatre in October 1984 (a suitably Orwellian year).",
      "Directed by the talented award winning writer/director Mary Hickson and with a cast of 16 young actors, the show was set in a television studio on the eve of Armageddon. \"Goodnight World\" is a current affairs program that goes to air at midnight, and tonight the show is dedicated to Doomsday Theories - however, as fate would have it, Atomic Annihilation swept the world. The cast is trapped in the underground tv studio - and the show must go on.",
      "Barry Ferrier played Professor E.H. Bagwash (complete with bad Russian accent) who was there to demonstrate the future of humanity - an android.",
      "\"Is the real purpose of the human race to breed a race of perfect Androids - a being that doesn't hate, that makes rational decisions not influenced by greed and xenophobia, an intelligent creature that doesn't destroy its own environment?\"",
      "The Android was played by Tracey Tainsh (known for films Frenchman's Farm, The Power, the Passion and Bootleg). Rebecca Frith, another outstanding Australian actress known for Love Serenade and Me Myself I, and NIDA graduate Jeremy Godwin also appeared in the cast. Prominent Brisbane multi instrumentalist Donald Hall was band leader and vocal coach.",
      "The show received a rave review from The Australian celebrating its pop melodies and recommending it move to other capitol cities."
    ],
    images: [
      { url: "/attached_assets/IMG_0087_1770178231460.png", caption: "Goodnight World - A Musical Comedy of Terrors" },
      { url: "/attached_assets/1984-goodnight-world-pm02_800-fit_1770179412063.jpeg", caption: "Goodnight World Programme - World Premiere November 21, 1984" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-7/original/la-boite-1-oct-20028DAC8BE4-8E62-2F68-7AC0-7BCC543D4516.jpg", caption: "La Boite Theatre" },
      { url: "/attached_assets/Tracey_Tainsh_-_Android_in_Good_Night_World_1770246827558.jpg", caption: "Tracey Tainsh - Android in Goodnight World" },
      { url: "/attached_assets/IMG_2512_1770444740357.jpeg", caption: "Jeremy Godwin" }
    ],
    highlights: [
      "4-week season at La Boite Theatre, October 1984",
      "Co-written with Gerald Frape",
      "Directed by Mary Hickson",
      "Cast of 16 actors including Rebecca Frith",
      "Rave review from The Australian"
    ],
    collaborators: ["Gerald Frape", "Mary Hickson", "Donald Hall", "Tracey Tainsh", "Rebecca Frith", "Jeremy Godwin"],
    quote: {
      text: "Is the real purpose of the human race to breed a race of perfect Androids - a being that doesn't hate, that makes rational decisions not influenced by greed and xenophobia?",
      author: "Professor E.H. Bagwash, Goodnight World"
    },
    youtubeVideos: [
      { id: "qpMHgkyXntY", title: "Android - from Goodnight World composed by Barry Ferrier" }
    ]
  },
  {
    slug: "gig-poster-archive",
    title: "Dr. Baz Gig Poster Archive",
    year: "1980s-Present",
    category: "design",
    heroImage: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/big-bad-baz12398BBD-2018-4BAD-B160-D06E9D771AB8.jpg",
    summary: "A collection of promotional artwork and gig posters created by Dr. Baz throughout his 40+ year music career.",
    fullContent: [
      "Throughout his extensive music career, Barry Ferrier has combined his skills as a performer with his talents as a graphic designer and multimedia artist to create a distinctive collection of promotional materials.",
      "With a PhD in Multimedia and experience designing over 200 websites, Barry brings a unique artistic vision to his gig posters, often incorporating stylized portraits, vintage aesthetics, and creative typography.",
      "The poster archive showcases promotional materials for his various musical projects including solo performances, Slim Pickens & Dr. Baz, Pete C. & Dr. Baz, Heaven & Hell, and festival appearances at venues across Australia and internationally.",
      "Many of the posters feature Barry's signature artistic style, combining hand-drawn elements with digital design techniques to create eye-catching promotional materials that stand out in the crowded live music scene.",
      "From the iconic 'Piano Man' series to blues-inspired artwork and festival announcements, this collection represents decades of creative output that extends beyond music into visual art."
    ],
    images: [
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/doctorbaz-in-heaven3C75187B-2FAE-37C8-A4A9-7C6595B613FD.jpg", caption: "Doctor Baz in Heaven" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/big-bad-baz12398BBD-2018-4BAD-B160-D06E9D771AB8.jpg", caption: "Big Bad Baz" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-beautiful-music-ocean-square6234CEFE-0968-6D0B-AF92-02AC5F621F69.jpg", caption: "Beautiful Music Ocean" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/the-guitar-manF5D5059E-F99C-A491-9605-ADDDFD34B85E.jpg", caption: "The Guitar Man" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/man-with-electric-guitarE120EB03-ADDF-7C3B-060A-FD8957AC2739.jpg", caption: "Man with Electric Guitar" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-blues-brotherEBA14EA4-4EC8-D1D5-C932-662082F94350.jpg", caption: "Baz Blues Brother" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-ferrier-sketch83854C7D-8C07-1F25-B828-F590850E4CCC.jpg", caption: "Baz Ferrier Sketch" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-gremlin-guitarE4BE8404-D250-EF14-5C9C-A8EDEC922085.jpg", caption: "Gremlin Guitar" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-guitar-sketch-431AAE108-8B0A-6182-EB9B-EE68476336FA.jpg", caption: "Guitar Sketch" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-pianoman33ECD5BA4-92F7-A155-CB11-BE57CAA0C586.jpg", caption: "Baz Piano Man" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-nouveau26A9E588-3E43-D45A-D740-CA77EDBC85A9.jpg", caption: "Baz Nouveau" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-retro-background3C1BDDEF-ED95-A665-A857-E6DE42BA5685.jpg", caption: "Baz Retro" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/doctoe-baz-the-piano-manC3BB0F1E-242A-DD9B-B2BF-C330B43A5E91.jpg", caption: "Doctor Baz The Piano Man" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/wicked-guitar-player1538774A-F8E6-D479-2E14-7942353E60F1.jpg", caption: "Wicked Guitar Player" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-the-piano-man7F3AB2A8-7809-BB02-405D-FC207EEF9672.jpg", caption: "Dr. Baz The Piano Man" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-sketch64DB1822-3736-0123-CC21-53532DF053D0.jpg", caption: "Dr. Baz Sketch" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-pianoman39959F52-CEFD-32D6-EB8F-A16F94AC349F.jpg", caption: "Dr. Baz Pianoman" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/airlie-beach-festivalC6B78149-F283-B7FB-3C11-1A48C2E6969B.jpg", caption: "Airlie Beach Festival" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/bangalow-nyeB939EE5F-87F0-0E4E-A094-6E7E79A6E0AC.jpg", caption: "Bangalow NYE" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/barry-ferrier-aka-dr-baz-musicB229BDF4-F643-84CF-E939-51B4615FA77C.jpg", caption: "Barry Ferrier aka Dr. Baz" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-arty50125A55-052A-E99A-0C2C-C61C4E245F9A.jpg", caption: "Baz Arty" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-dobro52489008-1377-E507-C2B4-AF82376266DF.jpg", caption: "Baz Dobro" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-mural49B41966-B9CA-4855-AE4C-FCB64126169F.jpg", caption: "Baz Mural" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-naiveA1A91982-D41D-A096-2385-345C77490FFE.jpg", caption: "Baz Naive" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-on-tracks82D5D300-3A22-945C-657A-5B97BC03A7B2.jpg", caption: "Baz on Tracks" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-bluesman8520B9AF-27EE-4AEA-6C30-9381CC9998A5.jpg", caption: "Baz Bluesman" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/guru-bazmahtiAA06C0CD-58B8-14CB-117B-E4A103163569.jpg", caption: "Guru Bazmahti" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-pianoman-sketchFF8FE6FD-9219-6576-C0D4-4ED39D64049C.jpg", caption: "Pianoman Sketch" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/man-with-electric-guitar7DFABC94-D125-A0D0-59A5-DF34683FB972.jpg", caption: "Electric Guitar" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/piano-dudeD10F124D-E343-C371-A703-B40970AB1BF2.jpg", caption: "Piano Dude" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/porcelein-pianomanC6937F94-FEB6-53D2-1649-E425A61256AB.jpg", caption: "Porcelain Pianoman" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/the-pianist-bazEB692150-EBC7-80C0-091D-19F034BBD9AF.jpg", caption: "The Pianist Baz" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-on-tracks218710462-4153-C4FB-7602-A8798BED9FD5.jpg", caption: "Baz on Tracks 2" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/urban-guitaristED16F5CA-8D37-BE9B-11F8-A4216A512834.jpg", caption: "Urban Guitarist" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-picasso912E9B90-07D7-95BB-B9CD-62037B725D73.jpg", caption: "Baz Picasso" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/baz-the-guitaristaBF83F8E7-A837-A9D6-F402-6B597EB475CC.jpg", caption: "Baz The Guitarist" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/bazguitarman28BB6082-22C2-AF31-E16A-AAE1176896D7.jpg", caption: "Baz Guitar Man" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-liveD3972142-1E2A-E7D4-B75E-030D51A0F2D1.jpg", caption: "Dr. Baz Live" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz-hipster13A4C860-31EF-B19C-1847-5DF54B93C334.jpg", caption: "Dr. Baz Hipster" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/dr-baz1172AF70-5840-1C66-62E8-8E834AA88772.jpg", caption: "Dr. Baz" },
      { url: "https://byronbaymusic.com.au/images/com_osgallery/gal-13/original/guitaro1161E626-E57C-FB7C-61EA-1E95894645FE.jpg", caption: "Guitaro" },
      { url: "/attached_assets/KK-DAZE-Cartoon_1770505194326.jpeg", caption: "Kellie Knight and the Daze" },
      { url: "/attached_assets/Baz&KK2_1770505194326.jpeg", caption: "Dr. Baz & Kellie Knight - Acoustic Funk" }
    ],
    highlights: [
      "40+ years of promotional artwork",
      "PhD in Multimedia Design",
      "Over 200 websites designed",
      "Festival promotional materials",
      "Signature artistic style",
      "Hand-drawn and digital techniques"
    ],
    collaborators: []
  },
  {
    slug: "kobya-dr-baz",
    title: "Kobya & Dr. Baz - African Beats, World Music & Classic Reggae",
    year: "2010s-Present",
    category: "recording",
    heroImage: "https://byronbaymusic.com.au/images/Kobya--Dr.-Baz.jpg",
    summary: "A dynamic world music and reggae duo blending African roots with classic reggae, formed through a chance meeting at an anti-CSG rally in Byron Bay.",
    fullContent: [
      "Kobya (Carlos X Panguana) grew up in the African township in Maputo, the capital city of Mozambique, a country gripped by war for many years. He became the youngest member of Xingombela youth dance troupe at age of 7.",
      "After playing professional soccer as a teenager, he headed to Johannesburg, South Africa, to join his family. As he had damaged his knees playing soccer, he joined the fashion world and studied photography. The struggle for the right to be recognized as a human being intensified as the South African government imposed a state of emergency. Kobya had no other choice but to join the struggle as a freelance photojournalist and reporter. He was later forced to flee as a political refugee.",
      "Music remained his lifeblood throughout the journey. He evolved into a gifted performer, singer-songwriter and versatile multi-instrumentalist. In his unique and vibrant music he mixes roots (Marrabenta - Mozambique popular dance music) and classic reggae, occasionally throwing in some lovers rock, to create his own original blend of contemporary world music and pop.",
      "The salt of the Earth journeyman, Kobya learnt how to abstract his craft, turning pain to joy. This amazingly down to earth, warm character combines his sense of humor with powerful soulful and rich tenor voice, to reach out to his young and old fans across race, age and culture.",
      "In recent years he moved to the musical Mecca of Byron Bay, Australia and at a local anti-CSG rally he met a kindred soul in fellow musician and celebrated local character Barry Ferrier, aka Dr. Baz. Their instant rapport led to a spontaneous musical chemistry and firm friendship that set them on a path to create ecstatic fusion music together.",
      "Dr. Baz has a pedigree of top level music credits and brings soaring lead guitar and keyboard pyrotechnics and a soulful musical feel to their exciting shows. These two men from such different worlds demonstrate through their obvious affinity and camaraderie how music can be a bond that transcends cultural barriers.",
      "Their music puts a smile on your face and makes you want to sing and dance! Kobya continues to explore and express his soul on this musical journey, working on a new album 'MoFyah' dedicating his work to the Highest Force, giving thanks through his lyrics as a free man and advocate of Truth, with the collaboration of Dr. Baz's wizardry on soaring guitar and keyboard pyrotechnics.",
      "This fascinating World Music and reggae duo performs with a dynamic rhythm section and guest players, drawn from the impressive ranks of the Byron Bay music community."
    ],
    images: [
      { url: "https://byronbaymusic.com.au/images/Kobya--Dr.-Baz.jpg", caption: "Kobya & Dr. Baz" },
      { url: "https://byronbaymusic.com.au/media/k2/items/cache/af2ef6a0e2c9c528b09655df79f3b312_Generic.jpg", caption: "Kobya & Dr. Baz promotional photo" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Kobya%20%20Dr%20Baz%20Artisan%20Markets.jpg", caption: "Kobya & Dr. Baz at Artisan Markets" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Kobya%20%20Dr.%20Baz%20Bangalow%20Brackets.jpg", caption: "Kobya & Dr. Baz at Bangalow Brackets" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Kobya%20Baz%20Cisco%20Richard.jpg", caption: "Kobya, Baz, Cisco & Richard" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Kobya%20Cisco%20Dr%20Baz.jpg", caption: "Kobya, Cisco & Dr. Baz" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Kobya%20Dr%20Baz%20Slo-mo%20joes.jpg", caption: "Kobya & Dr. Baz at Slo-Mo Joe's" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Kobya-Dr-Baz-Nimbin-Bowls.jpg", caption: "Kobya & Dr. Baz at Nimbin Bowls Club" },
      { url: "https://byronbaymusic.com.au/media/k2/galleries/25/Oz4Moz-Web.jpg", caption: "Oz4Moz concert" }
    ],
    highlights: [
      "African roots meets reggae fusion",
      "Mozambique Marrabenta rhythms",
      "Byron Bay music community",
      "Album 'MoFyah' in production",
      "Transcending cultural barriers through music",
      "Dynamic rhythm section with guest players"
    ],
    collaborators: ["Kobya (Carlos X Panguana)", "Cisco", "Richard", "Byron Bay rhythm section"],
    quote: {
      text: "Their music puts a smile on your face and makes you want to sing and dance! These two men from such different worlds demonstrate through their obvious affinity and camaraderie how music can be a bond that transcends cultural barriers.",
      author: "Barry Ferrier"
    },
    youtubeVideos: [
      { id: "tiHlfRqb0-E", title: "Kobya & Dr. Baz - Live Performance" },
      { id: "u_VK1oWn0H4", title: "Kobya & Dr. Baz - World Music" },
      { id: "QQdSJjxnnUM", title: "Kobya & Dr. Baz - Reggae Session" },
      { id: "dcWJeKrFtRQ", title: "Kobya & Dr. Baz - African Roots" },
      { id: "MbH-NYW7Fls", title: "Kobya & Dr. Baz - Mo'Fyah" }
    ]
  },
  {
    slug: "a-thousand-bands",
    title: "A Thousand Bands - 50 Years of Musical Collaborations",
    year: "1970s-Present",
    category: "recording",
    heroImage: "https://barryferrier.com/images/42BC9072-6F9F-4C8D-9D91-CC3A7CE9B600.jpeg",
    summary: "A retrospective journey through countless bands, duos, and musical ensembles spanning five decades of Australian music.",
    fullContent: [
      "How many bands, duos and musical ensembles have I played in? The time when I could count them all is long past.",
      "It began at high school with school mates Michael Edwards (piano), Leo Botham (bass), and Roy (drums). We played instrumentals made famous by The Shadows and some of my early instrumental compositions influenced by those surf guitar hits. Later I answered an ad in the local Manly Daily and, while still at school, landed a job as lead guitarist with a local rock band, playing at hotels while still underage with my Vibratone guitar and a homemade guitar amp which once sent me flying across the room with electric shock.",
      "I met Sydney songwriter and UK ex-pat Roderick Morgan during my first year at the University of Sydney, who was a big influence on my songwriting and we began jamming together. I still jam with Roderick four decades later when I visit Sydney. It was at a concert at Hyde Park where I met my future wife, the extraordinarily talented vocalist Cammie Lindon, who was headlining the show.",
      "I was studying Psychology at Sydney Uni, but fate intervened and I successfully auditioned for Jesus Christ Superstar. This fork in the road changed my life forever. After Superstar I joined the cast of Steve J. Spears' Africa: the Savage Musical.",
      "I had formed the art rock band 'Passage' with Billy Miller, Richard Kaal and Martin Falls during my years with JCS, and this was to be a precursor to The Ferrets, recording a single for Jon English's new label produced by Michael Carlos. I later toured with The Ferrets as bass player.",
      "During my season with Joseph and the Amazing Technicolour Dreamcoat, I formed a band with Malcolm Smith and went on to back Phil Jones as Shiva's Fire, playing regularly at the legendary French's Winebar in Oxford Street, the legendary Bondi Lifesaver and venues across Sydney and Newcastle. I worked with Jeff St. John and Sasha for two years - I was playing the headline with Jeff at Cheqeurs the very first night Cold Chisel played (as our support) in Sydney.",
      "In 1980 I travelled to Mullumbimby for a Christmas holiday and met the members of The Feelers at Durrumbul Hall. They offered me a position in the band and a room at Possum Creek. I loved the natural beauty of the region and decided to move up here to refresh myself. I'm still on that holiday 40 years later!",
      "The Feelers eventually morphed into Innerspring with the addition of Fred Cole on keys, Peter Jaggle taking over drums, and Doug Rea on bass. In 1981, Rusty Miller and I formed Soft Surfing and played the debut music gig at what is now The Rails - we played there every weekend for a few months and pretty soon there were enthusiastic crowds. In the 80s I formed Giant Steps - maybe the best band I ever had the privilege of working with.",
      "A wonderful aspect of all the many shows and bands I have worked with is the great friends I have made. Over the years I have so enjoyed and valued knowing a fascinating cast of talented and quirky characters from the Australian performing arts industry."
    ],
    images: [
      { url: "https://barryferrier.com/media/k2/users/2.jpg", caption: "Doctor Baz" },
      { url: "https://barryferrier.com/media/k2/items/cache/c99e3db826c0f4cc2688a36ce3b60e1a_M.jpg", caption: "Barry Ferrier with Rusty Miller - Soft Surfing" },
      { url: "https://barryferrier.com/images/Rod_Coe3.jpg", caption: "Rod Coe - double bass legend" },
      { url: "https://barryferrier.com/images/Jason_Caspen_2.jpg", caption: "Jason Caspen - drums" },
      { url: "/attached_assets/IMG_2467_1770181695643.jpeg", caption: "Free Radicals" },
      { url: "/attached_assets/Kellie_Knight_&_the_Daze_1770504053994.jpeg", caption: "Kellie Knight & the Daze" },
      { url: "/attached_assets/Barry_Ferrier&Kellie_Knight_1770504053997.jpeg", caption: "Kellie Knight & Dr Baz" },
      { url: "/attached_assets/DrBaz&KellieKnight_1770505270005.jpeg", caption: "Kellie Knight & Dr. Baz at Peppers Coorabell" },
      { url: "/attached_assets/DrBaz-KellieKnight_1770505270006.jpeg", caption: "Dr. Baz & Kellie Knight at The Rails Byron Bay" }
    ],
    highlights: [
      "50+ years of musical collaborations",
      "Jesus Christ Superstar original cast",
      "The Feelers, Innerspring, Giant Steps",
      "Soft Surfing with Rusty Miller",
      "Jeff St. John & Sasha",
      "40+ years in Byron Bay music scene",
      "Cold Chisel opening support act"
    ],
    collaborators: ["Roderick Morgan", "Cammie Lindon", "Billy Miller", "Jeff St. John", "Rusty Miller", "Phil Jones", "Michael Barnes", "Gordon Heazlewood", "Lisa Spence", "Rod Coe"],
    quote: {
      text: "How many bands, duos and musical ensembles have I played in? The time when I could count them all is long past. A wonderful aspect of all the many shows and bands I have worked with is the great friends I have made.",
      author: "Barry Ferrier"
    },
    youtubeVideos: [
      { id: "PL-H2G0rnnqqVtUUwJL1AyhLAWIT2ygSwT", title: "The Purple Drippers live at Bond University", isPlaylist: true },
      { id: "Ihjip5xP6e8", title: "1970 - earliest recording of Dr Baz" },
      { id: "8CBZq_oH90A", title: "Capitol Theatre" },
      { id: "jGt92oFQjhM", title: "The Feelers @ Great Northern Hotel Byron Bay, 1980" },
      { id: "DkeGvgEUMqM", title: "Innerspring - I've Heard that Story Before, Nimbin 1982" },
      { id: "yYrFr4-i1qM", title: "Devil in Me - featuring Tommy Dysart" },
      { id: "KgJrUuAp-gA", title: "Aysha & Dr Baz at the Rails Byron Bay" },
      { id: "tHGZWpqrmxY", title: "Kathryn Jones & Dr Baz" },
      { id: "-9zr75Wrw5E", title: "Barry Ferrier Band, the Beach Hotel 1995" },
      { id: "bDVFdoiq5yg", title: "The Shooflys, the Rails Byron Bay" }
    ]
  },
  {
    slug: "the-camel-man",
    title: "The Camel Man",
    year: "1980s",
    category: "festivals",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-4/original/camelsF1EC2409-01AC-5FCB-2DF6-BA726ABFF01E.jpg",
    summary: "Owner of four camels, featured in Byron Bay Oleander Festival parade and Sydney publicity stunts with Rodney Gooch.",
    fullContent: [
      "Barry Ferrier once was the proud owner of four camels - Bunji (the bull camel), Isabelle, Shanti, and one other. He became known as \"The Camel Man\" during the early 1980s in Byron Bay.",
      "In 1981, Barry was invited to ride his camels up Jonson Street as part of the Byron Bay Oleander Festival Parade. Mounted on Bunji with Robyn Bekker riding Isabelle, the procession was going well until the fire engine at the head of the parade let off its siren. The camels took fright and bolted onto the footpath, galloping down the sidewalk as shocked onlookers scattered in pandemonium. Barry had to crouch down and actually bumped his head on a shop awning.",
      "In 1984, Barry was hired through an advertising agency to bring the camel team to Sydney for a publicity stunt promoting the opening of the Shell Building in North Sydney. An eccentric crew crossed Sydney Harbour on a barge with two large blue and gold cut-out palm trees, half a tonne of white sand, the camels in splendid regalia, belly dancers, and Barry and his friend Rodney Gooch dressed as fugitives from the Arabian Nights. They made the Channel 9 news when they were drenched by torrential rain.",
      "Barry first met the inimitable Rodney Gooch while performing at a restaurant called The Palms in Bangalow. Rodney had made an epic year-long journey from Alice Springs to Byron Bay with four camels and a dog, crossing the Simpson Desert unassisted. When Rodney was over his camel adventure, Barry became the guardian of those foot-sore camels, giving camel-rides at local markets and being booked for children's parties.",
      "Rodney and Barry had many adventures together, including theatrical productions at The Palms such as 'It's No Picture Show' starring Barry, Rodney in drag, singer/actress Glenda Lum, and journalist Gerald Frape.",
      "Rodney Gooch went on to be influential in establishing the first aboriginal recording studio and assisted the earliest contemporary aboriginal bands to be recorded. He encouraged artists of the Utopia community, including the late Emily Kame Kngwarreye, now regarded as one of Australia's most significant artists of all time."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/camelsF1EC2409-01AC-5FCB-2DF6-BA726ABFF01E.jpg", caption: "Barry Ferrier & Rodney Gooch at Byron Bay" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/oleander-festivalA52FDE46-E282-8F6E-0AA8-8756CE4559CF.jpg", caption: "Byron Bay Oleander Festival 1981" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/baz-camelman-2D7846B17-B1FE-7732-298D-B87CCA9A6803.jpg", caption: "Baz the Camel Man" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/the-camel-team2B94B4715-080A-D3B2-F2BE-7D14E1A8970D.jpg", caption: "The Camel Team" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/baz-the-cameleer-byron-oleander-festivalD95EB328-D57E-8E16-C0D5-2C598D0B4EC5.jpg", caption: "Baz the Cameleer at Byron Oleander Festival" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/camel-trip-north-sydney-chelsea-brownC19E6204-207D-AC03-564A-89E219DB230C.jpg", caption: "Chelsea Brown & the Belly Dancers - Sydney publicity stunt" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-4/original/rodneygooch-with-bunji-alicespringsjuly1998-photo-louisehaighCB986D91-3F0D-A8EF-61C4-D10C8F3138DD.jpg", caption: "Rodney Gooch with Bunji" },
      { url: "/attached_assets/IMG_2468_1770182283558.jpeg", caption: "Barry Ferrier playing guitar with camel" },
      { url: "/attached_assets/Baz_&_Camel_1770505523233.jpeg", caption: "Barry Ferrier with camel in full regalia" },
      { url: "/attached_assets/B.J.-Ferrier-Camelman_1770505523233.jpeg", caption: "B.J. Ferrier - The Camelman at The Beresford Hotel" }
    ],
    highlights: [
      "Owner of four camels - Bunji, Isabelle, Shanti",
      "Byron Bay Oleander Festival parade 1981",
      "Shell Building publicity stunt Sydney 1984",
      "Channel 9 News coverage",
      "Adventures with Rodney Gooch",
      "Camel rides at local markets"
    ],
    collaborators: ["Rodney Gooch", "Robyn Bekker", "Chelsea Brown", "Gerald Frape", "Glenda Lum"],
    quote: {
      text: "Have you ever seen a camel gallop? I had to crouch down and actually bumped my head on a shop awning as shocked onlookers scattered in all directions in pandemonium.",
      author: "Barry Ferrier"
    }
  },
  {
    slug: "poco-loco-norway",
    title: "Poco Loco - Norway Tour",
    year: "2007",
    category: "touring",
    heroImage: "https://barryferrier.com/media/k2/items/cache/c99e3db826c0f4cc2688a36ce3b60e1a_M.jpg",
    summary: "Australian nuevo flamenco trio touring Norway with Billy Miller from The Ferrets, performing 28 shows including Sjyrock Festival.",
    fullContent: [
      "Poco Loco was an Australian vocal and nuevo flamenco trio that existed for a remarkable single tour of Norway in 2007. The band comprised Barry Ferrier on vocals and lead guitar, Billy Miller (from The Ferrets) on vocals and bass guitar, and Brian Watt on vocals, rhythm guitar and percussion.",
      "After rehearsing via mail and a face-to-face session at Billy Miller's Yarraville home in Melbourne, the trio made their debut at Melbourne's Spanish Club before departing for Norway.",
      "The highlight of the tour was performing at the Sjyrock Music Festival on the remote and stunning island of Vaeroy in the Lofoten Islands, above the Arctic Circle. The band then toured across northern Norway, performing an impressive 28 shows total across the region.",
      "The Lofoten Islands, known for their dramatic scenery with towering mountains rising from the sea, provided an unforgettable backdrop for this unique musical adventure. The tour represented a reunion of sorts for Barry and Billy Miller, who had previously worked together in Passage and The Ferrets during the 1970s.",
      "This was a once-in-a-lifetime musical adventure that brought Australian nuevo flamenco sounds to the far reaches of northern Norway."
    ],
    images: [
      { url: pocoLocoImage1, caption: "Poco Loco trio with guitars" },
      { url: pocoLocoImage2, caption: "The trio performing" },
      { url: pocoLocoImage3, caption: "Barry & Brian duo" },
      { url: pocoLocoImage4, caption: "Barry Ferrier & Brian Watt" },
      { url: pocoLocoImage5, caption: "Baz Bossa Dorado" },
      { url: pocoLocoImage6, caption: "Poco Loco at Sjyrock Festival, Norway" }
    ],
    highlights: [
      "Sjyrock Music Festival, Vaeroy Island",
      "Lofoten Islands, Arctic Circle",
      "28 shows across northern Norway",
      "Nuevo flamenco trio",
      "Reunion with Billy Miller (The Ferrets)"
    ],
    collaborators: ["Billy Miller", "Brian Watt"],
    youtubeVideos: [
      { id: "nSlKdtt3_XA", title: "Poco Loco - Performance 1" },
      { id: "MNdCnvTz01Q", title: "Poco Loco - Performance 2" },
      { id: "YENxL3vkW5Q", title: "Poco Loco - Performance 3" },
      { id: "2L6HnCNTzJY", title: "Poco Loco - Performance 4" },
      { id: "WTiqbM4x1ik", title: "Poco Loco - Performance 5" }
    ]
  },
  {
    slug: "expo-88",
    title: "Expo 88 Brisbane Animatronic Parades",
    year: "1988",
    category: "composition",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-nightparade10B3B2B944-BCB3-8D7D-0B08-A4AA4FF24651.jpg",
    summary: "Composed quadrophonic soundtracks for the QANTAS Light Fantastic Night Parade at Australia's landmark World Expo.",
    fullContent: [
      "For some there are two Brisbanes – the one before World Expo '88 and the new more confident and progressive one that emerged after. Many performers and musicians found an exciting forum for their work at this vibrant hi-tech showcase with a Festival atmosphere and exhibits from many nations of the world.",
      "Barry Ferrier won the prestigious contract to compose and produce hi-tech music quadrophonic soundtracks for the QANTAS sponsored 'Light Fantastic' Night Parade which travelled through the Expo '88 site daily.",
      "Designed to rival the famous Disneyland Parades, World Expo '88 featured two daily parades - the 'Food!'-themed Expo Day Parade and the 'Hermaphro - Queen of the Night'-themed QANTAS Light Fantastic Night Parade. Each parade featured over 15 animatronic floats - all totally computer controlled - larger-than-life electronically animated, moving diorama presentations reflecting on the inane, mysterious, whimsy of our day-to-day Aussie life.",
      "The parades were surrounded by swirling clowns, musicians, performers on uni-cycles, roller-skates, and user-made mobiles, in the guise of each of the Expo's theme weeks - and led by the 66-strong Expo City Marching Band, closely behind a clown on stilts carrying a banner of the name of the Expo's changing weekly theme.",
      "The QANTAS Light Fantastic Night Parade had its own extra charm - where its magical illuminations and individual quadrophonic soundtracks amplified from a battery powered PA system on each float (these innovative hi-tech music tracks created by Barry Ferrier to produce a kaleidoscopic cross fading sound collage) would envelope the Expo site every evening from 6.30 p.m.",
      "Barry also created, in collaboration with Paul Rainsford Towner, an art video for Expo '88 that was projected on a giant screen as a backdrop to the UNESCO Youth Orchestra's performance of George Gershwin's 'An American in Paris' on the Riverstage.",
      "In 2013 Brisbane Museum presented a retrospective of the Light Fantastic Parade, celebrating the impact this landmark event had on Brisbane's cultural identity."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/qantaslightfantasticparade9812D8B3-ACF7-3A74-B967-D09FA654A1AB.jpg", caption: "QANTAS Light Fantastic Parade" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-nightparade10B3B2B944-BCB3-8D7D-0B08-A4AA4FF24651.jpg", caption: "Night Parade illuminations" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/klight-fantastic-parade-expo-88-1FFF13BAC-938D-D77D-B2A7-BE0540B10C67.jpg", caption: "Light Fantastic in motion" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/qantas2-expo-8843FDC6F5-B4E0-A076-BDF3-43F5DD96EBEA.jpg", caption: "QANTAS sponsored float" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-riverstage4FFF3471-F366-A209-EA72-5F5444508B5C.jpg", caption: "Expo 88 Riverstage" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/dayparade3A7453B23-2F79-6295-B2A5-4CBFA05EC824.jpg", caption: "Day Parade" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-brisbane-dayparade4185FA335-94B8-6C21-22EB-EBFA1731A959.jpg", caption: "Brisbane Day Parade" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/frillie-expo-88B7535288-2588-8DDC-B6AB-CA2B4DD30D9F.jpg", caption: "Expo 88 performer" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/light-fantastic-float-concept0C4B8103-066B-0536-1A17-FB80F62A6BBB.png", caption: "Animated float concept design" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-float-17C83FD2C-56CC-7AFF-809B-CFD1DACC800D.jpg", caption: "Animatronic float" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-float-2F43EFF6E-04FC-32C7-7AE2-514D8FD4719C.jpg", caption: "Light Fantastic float" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-float-37CE9E860-443B-07AC-4FBA-5B1FCE1833CB.jpg", caption: "Parade float design" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/paul-rainsford-townerE71BEC2F-3B37-461E-3B74-9B0FD04BF616.jpg", caption: "Paul Rainsford Towner" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/mike-mullinsD1C2A8BB-4E82-585E-BF75-38FC1A870C5D.jpg", caption: "Mike Mullins" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/1200px-aerial-photograph-of-the-expo-88-siteBE6FCF2D-4AA9-EDD3-0E0A-ED3BC3DF2D5A.jpg", caption: "Aerial photo of Expo 88 site" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/expo-88-50BB4AF83-8D36-8E11-68D8-04A2910A1F31.jpg", caption: "Crowds at Brisbane Expo '88" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/world-expo-88-2DF35D4AE-C69C-9F00-B406-90766E82C273.jpg", caption: "World Expo '88" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/62519629-10156628800733983-358060355336798208-n54D3F80C-F8D7-66C5-EE77-97650F4B79DB.jpg", caption: "Expo 88 Light Fantastic" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/light-fantastic-2013D9A442E0-4636-E430-1A3A-4578504F38F7.jpg", caption: "Light Fantastic 2013 retrospective" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-5/original/mullins-sketch-brainF04057FA-525C-9806-68B4-B01F9CBE73D5.jpeg", caption: "Mike Mullins concept sketch" },
      { url: expo88CostumeImage, caption: "Butterfly stilt walker - Expo 88 Day Parade" }
    ],
    highlights: [
      "QANTAS Light Fantastic Night Parade composer",
      "Quadrophonic hi-tech soundtracks on each float",
      "15+ animatronic computer-controlled floats",
      "66-strong Expo City Marching Band",
      "UNESCO Youth Orchestra video backdrop",
      "18 million visitors",
      "2013 Brisbane Museum retrospective"
    ],
    collaborators: ["Paul Rainsford Towner", "Mike Mullins", "UNESCO Youth Orchestra"],
    quote: {
      text: "These innovative hi-tech music tracks produced a kaleidoscopic cross-fading sound collage that would envelope the Expo site every evening.",
      author: "Barry Ferrier"
    },
    youtubeId: "k2-OTVly07M"
  },
  {
    slug: "johnny-cash-show",
    title: "I Hear That Train a-Comin': The Johnny Cash Story",
    year: "2010s",
    category: "theatre",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-tribute-showDABF2C8C-9155-3D76-F7D7-B9803BBD9B3A.jpg",
    summary: "Writer and star of the acclaimed music theatre production celebrating the legendary Man in Black.",
    fullContent: [
      "Country Superstar Johnny Cash was a music industry legend for half a century with an instantly recognisable voice and style. The hit movie 'Walk the Line' introduced his dramatic life story and his unmistakeable, tough music to a younger generation of music lovers. Johnny Cash fans now cover three generations.",
      "Even people who might secretly confess to hating Country Music are nevertheless fired up with enthusiasm about his legendary up-tempo hits such as Folsom Prison Blues, Ring of Fire, Get Rhythm, I Walk the Line - there are just so many great and unique songs in the Johnny Cash repertoire.",
      "Those familiar with the highly successful bio-pic will know of the enduring love story between Johnny Cash and June Carter. A member of the iconic country music group The Carter Family, June grew up in showbiz and became an accomplished comedienne, singer, and songwriter - a true music professional and star in her own right. Together they were a towering force in American Music.",
      "Vocalist and writer Barry Ferrier has brought together a team of talented performers to create an immersive music theatre show based on the Cash Story and interaction between these two gifted and unique music artists, told in the first person with insights into Johnny & the Tennessee Two's wild ride from obscurity to stardom.",
      "Barry has the vocal depth to emulate the unique Johnny Cash sound and the vivacious and versatile Ilona Harker plays the 3 women in Johnny's life as she 'hoots and hollers' her way through this toe-tapping, side-slapping mix of great songs and stories.",
      "Johnny Cash covered songs by many of the greatest 20th Century songwriters such as Bob Dylan, Kris Kristopherson, and Willie Nelson and in later life brought his unique authority to a later generation of songwriters such as Nine Inch Nails, U2 and Tom Petty, so the repertoire is extremely broad and interesting.",
      "The show has been performed to great acclaim at the Gympie Muster, the Alice Springs and Darwin Entertainment Centres, and in Sydney at Panthers Penrith, Souths Sydney Juniors Club, the Blacktown Workers Club and the Camelot Lounge."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-tribute-showDABF2C8C-9155-3D76-F7D7-B9803BBD9B3A.jpg", caption: "The Cast" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/baz-as-johnny21A968BC-15D9-F302-13A0-3A3AE71380F2.jpg", caption: "Baz as Johnny Cash" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-twin-towns-1FB3B5F59-55EE-6AEC-4B61-70D0EF7517C1.jpg", caption: "June & Johnny" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/barry-cash-ilona-carterFBAB5484-358D-6DD3-0489-9B07F5A8004B.jpg", caption: "Baz & Ilona" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-proposes-to-june-carterA03F15CF-6E3C-1C6D-4F63-8994C1A08A5C.jpg", caption: "Johnny Proposes" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/ilona-harker-and-barry-ferrier-twin-towns-club-showD831F063-665B-FD9F-6CE4-32F666F5BA55.jpg", caption: "Twin Towns Auditorium" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-show-starcourt-27868A0E1-A50A-A420-E7E0-40259BBF5CC3.jpg", caption: "Starcourt Theatre Lismore" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-show-starcourt-1803FCBCB-E23D-3980-95F5-3B466C9E342F.jpg", caption: "Starcourt performance" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/tennesee-threeEF205116-2E96-92F8-3D58-7B75670D9AC7.jpg", caption: "The Tennessee Two" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/slim-markjpg43039975-1E54-06B2-DC48-E1242DFC7201.jpg", caption: "Slim & Mark" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-cast-bay-fm8C4CAA6C-3480-D1D8-5557-3685C7142428.jpg", caption: "Bay FM Promo" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-show-cast-plane-singingD9149BA8-BD27-4F5E-DD90-1E0985945371.jpg", caption: "Cast singing on plane" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/johnny-cash-show-cast-wall-smiling87C400CE-019B-12A1-FE60-7C9854898CC5.jpg", caption: "Cast photo" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/gallery3CBE972FB-9056-4E88-E7A1-B2C1C2A5E84D.png", caption: "South Grafton Golf Club" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/gallery514813A37-ADD3-ECA2-CC6A-2AC8FE49161F.png", caption: "Press Promo Performance" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-9/original/with-neil-mccann-pre-johnny-cash-show-banter-at-yamba-golf-country-club812E5EB2-2658-41B6-C06D-C6530209401C.jpg", caption: "Yamba Golf Club Pre-show" },
      { url: "/attached_assets/IMG_2511_1770444794820.jpeg", caption: "Johnny Cash Tribute Cast" },
      { url: "/attached_assets/IMG_2510_1770444794820.jpeg", caption: "Johnny Cash Tribute Cast" }
    ],
    highlights: [
      "Written and starred in by Barry Ferrier",
      "Gympie Muster performances",
      "Alice Springs & Darwin Entertainment Centres",
      "Panthers Penrith, Sydney",
      "Blacktown Workers Club",
      "Camelot Lounge, Sydney",
      "Twin Towns Auditorium"
    ],
    collaborators: ["Ilona Harker (June Carter)", "Slim Pickens (Marshall Grant - Bass)", "Mark Heazlitt (Luther Perkins - Guitar)"],
    quote: {
      text: "Barry has the vocal depth to emulate the unique Johnny Cash sound - this is not just a bunch of songs, this is a music theatre experience.",
      author: "Northern Star"
    },
    youtubeId: "RNMjS5FSd2g"
  },
  {
    slug: "heaven-hell",
    title: "Heaven & Hell - Music Theatre",
    year: "2010s",
    category: "theatre",
    heroImage: "https://barryferrier.com/images/Pete_C__Dr_Baz_sm.jpg",
    summary: "A fantasy tribute show weaving together the stories of two legendary friends at the Pearly Gates.",
    fullContent: [
      "One of rock music's most gifted singers, Roy Orbison grew up in Texas and worked in the oil fields, dreaming of music success. He was gifted with a clear tenor that soared into an angelic falsetto, later adored the world over. After a chance meeting with Johnny Cash, he was introduced to Sun Records by this new friend, and went on to enjoy a string of hits from the late 1950's through the mid-1960s.",
      "Johnny Cash, the Man in Black, was a singer, guitarist and songwriter whose prolific music innovatively mixed country, rock, blues and gospel influences. Born in 1932 in Arkansas, Johnny Cash grew up on a poor cotton farm and joined the Air Force in 1950.",
      "Roy Orbison first met Johnny Cash when they both performed live to air at a small Texas radio station - Roy was the lead vocalist with a rising local band who had won a resident spot on the show, while Johnny was in Texas with Carl Perkins to promote his first chart success 'Cry Cry Cry'. Johnny heard Roy sing and was so impressed he offered to help him get in front of legendary Sam Phillips at Sun Records. It was the beginning of a lifetime friendship.",
      "Both these wonderful musical talents have left us now, and in this fantasy show, we meet our two legends in the Waiting Room at the Pearly Gates, where they discover that they each have serious misgivings about how they will be received by Saint Peter... and they begin to recount stories of their lives, both men concerned at how the excesses of their youth will be measured in the Great Big Ledger of Life.",
      "Johnny Cash was a wildman in his youth and with a deep, dark voice and a penchant for women, drugs and drinking there is no doubt he had a devil to deal with. Roy, with the voice of an angel was a different kind of man, and that contrast in singing style and lifestyle makes for a fascinating story.",
      "It is not widely known that, at the time of Roy Orbison's greatest personal tragedy - two of his three young sons were killed when his house burnt down while he was touring the UK - Johnny stepped in to help his friend who could not face returning to the scene of his loss, and he bought the property from Roy and preserved it as a tribute to these lost innocents. In a macabre twist, Johnny later built another house on the property and it too was consumed by fire.",
      "Byron Bay based musicians Barry Ferrier and Slim Pickens met in 2002 at the weekly open mic night at a hotel in the quaint rural town of Bangalow and immediately forged a friendship and creative partnership that has endured 15+ years. Barry's ability to emulate the unique deep voice of Johnny Cash is mirrored by Slim's powerful tenor that soars effortlessly to the vocal range made famous by Roy Orbison."
    ],
    images: [
      { url: "https://barryferrier.com/images/Pete_C__Dr_Baz_sm.jpg", caption: "Slim Pickens & Dr. Baz" },
      { url: "https://barryferrier.com/images/Barry-Ferrier-2017.jpg", caption: "The performance" }
    ],
    highlights: [
      "Two legendary friends - one show",
      "Live musical backing (no backing tracks)",
      "Barry as Johnny Cash, Slim as Roy Orbison",
      "Multi-instrumentalist performance",
      "Tea Gardens Country Club premiere"
    ],
    collaborators: ["Slim Pickens (Roy Orbison)"],
    quote: {
      text: "We became like brothers, right from the start... and it stayed that way right to the end.",
      author: "Johnny Cash (about Roy Orbison)"
    },
    youtubeId: "OdXrczbnh9c"
  },
  {
    slug: "poco-loco",
    title: "Poco Loco Norway Tour",
    year: "2007",
    category: "touring",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-14/original/2-amigos-12CD94161-7298-A919-9EAD-F20B0330A12A.jpg",
    summary: "Australian nuevo flamenco trio touring the remote Lofoten Islands of Norway and performing at the Sjyrock Festival.",
    fullContent: [
      "Australian vocal and nuevo flamenco trio 'Poco Loco' existed for a single tour of Norway in 2007 after a debut gig in Australia at Melbourne's Spanish Club.",
      "Featuring Barry Ferrier on vocals and lead guitar, Billy Miller (The Ferrets) on vocals and bass guitar, and Brian Watt on vocals, rhythm guitar and percussion, Poco Loco brought a unique blend of flamenco and Latin sounds to Scandinavian audiences.",
      "In 2007, after rehearsing through the mail, a frantic face to face session at Billy's Yarraville home, and a crazy debut gig at the Spanish Club, Poco Loco traveled to the remote island of Vaeroy in the Lofoten Islands in the north of Norway to perform at the Sjyrock Music Festival.",
      "From there they travelled across northern Norway performing 28 shows, experiencing the midnight sun and the stunning arctic landscapes of Scandinavia.",
      "The tour was a remarkable adventure, bringing Australian nuevo flamenco to the edge of the Arctic Circle and creating lasting memories of musical exploration in one of the world's most beautiful regions."
    ],
    images: [
      { url: pocoLocoImage1, caption: "Poco Loco trio with guitars" },
      { url: pocoLocoImage2, caption: "The trio performing" },
      { url: pocoLocoImage3, caption: "Barry & Brian duo" },
      { url: pocoLocoImage4, caption: "Barry Ferrier & Brian Watt" },
      { url: pocoLocoImage5, caption: "Baz Bossa Dorado" },
      { url: pocoLocoImage6, caption: "Poco Loco at Sjyrock Festival, Norway" }
    ],
    highlights: [
      "Sjyrock Music Festival, Vaeroy",
      "28 shows across northern Norway",
      "Lofoten Islands performances",
      "Debut at Melbourne's Spanish Club",
      "Nuevo flamenco meets Arctic Circle"
    ],
    collaborators: ["Billy Miller (The Ferrets)", "Brian Watt"],
    quote: {
      text: "We brought nuevo flamenco to the land of the midnight sun.",
      author: "Barry Ferrier"
    },
    youtubeVideos: [
      { id: "nSlKdtt3_XA", title: "Poco Loco - Performance 1" },
      { id: "MNdCnvTz01Q", title: "Poco Loco - Performance 2" },
      { id: "YENxL3vkW5Q", title: "Poco Loco - Performance 3" },
      { id: "2L6HnCNTzJY", title: "Poco Loco - Performance 4" },
      { id: "WTiqbM4x1ik", title: "Poco Loco - Performance 5" }
    ]
  },
  {
    slug: "giant-steps",
    title: "Giant Steps - 80s Indie Rock",
    year: "1980s",
    category: "bands",
    heroImage: "https://barryferrier.com/images/slideshow/Barry_Ferrier-7.jpg",
    summary: "'Maybe the best band I ever had the privilege of working with.'",
    fullContent: [
      "'Maybe the best band I ever had the privilege of working with.' Giant Steps was an indie rock band that represented a period of artistic experimentation and musical growth for Barry in the 1980s.",
      "The band was known for innovative music video production that pushed creative boundaries, embracing the visual possibilities that the MTV era brought to music. Barry was lecturing at Southern Cross Uni in those days and used to 'borrow' the Uni's outside broadcast bus on weekends, getting students to work the 5 cameras for experience.",
      "Under the direction of Paul Rainsford Towner they attempted to make a video of Barry's song 'Bureaucracy' in one long camera take (no post production or editing), at a specially built set at the Alstonville chicken farm. This set consisted of 6 separate 'rooms' built in a circle with the camera at the centre, making three complete passes as production teams changed set designs.",
      "Like many 'almost' bands, they broke up just on the verge of 'making it' - after a huge tour of Sydney, and page two photos in mainstream Sydney papers, they had major labels and publishers flying up to see them.",
      "The production became a large community event with a large number of local youth volunteering as performers and support staff, creating a festival-like atmosphere."
    ],
    images: [
      { url: giantStepsImage1, caption: "Giant Steps band photo" },
      { url: giantStepsImage2, caption: "Giant Steps - the band" }
    ],
    highlights: [
      "Innovative indie rock band",
      "Creative music video production",
      "One-take 'Bureaucracy' video at Alstonville",
      "Major labels interest after Sydney tour",
      "Page two photos in mainstream Sydney papers",
      "Southern Cross Uni outside broadcast bus"
    ],
    collaborators: ["Lisa Spence (vocals)", "Jen Anderson (violin)", "Gordon Heazelwood (drums)", "Richard Rummery (keyboards)", "Paul Rainsford Towner (vision mix)"],
    quote: {
      text: "Maybe the best band I ever had the privilege of working with. Like many 'almost' bands, we broke up just on the verge of 'making it' - after a huge tour of Sydney, and page two photos in mainstream Sydney papers, we had major labels and publishers flying up to see us.",
      author: "Barry Ferrier"
    },
    youtubeVideos: [
      { id: "FT2kmiMYInA", title: "Break the Ice - Giant Steps Live" },
      { id: "X1LhnUERgzo", title: "Giant Steps Live Performance" },
      { id: "8PwY-Qo7_oI", title: "Missionary Man - Eurythmics Cover at Lennox Head Beach" },
      { id: "AJK8wR_YBQU", title: "Monument - Giant Steps Live" },
      { id: "r6-l-8WFvoA", title: "Making of Bureaucracy - Documentary" }
    ]
  },
  {
    slug: "three-legends-kra",
    title: "Three Legends of Kra",
    year: "1985",
    category: "composition",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-6/original/3-legends-of-kra-set9451277A-9BC6-5805-B7D2-B2027F124387.jpeg",
    summary: "Music Director & composer for QPAC opening ceremonies. Robyn Archer playwright, Nigel Triffitt designer, Diane Cilento star.",
    fullContent: [
      "In 1985 I became Music Director and composer for the epic Robyn Archer penned production entitled 'The Three Legends of Kra' which was a feature of the opening ceremonies for the then brand new Queensland Performing Arts Complex.",
      "The theme was women heroes in various cultural contexts using craft to avoid impending disaster. The production was designed on a monumental scale by the genius of Australian theatre design Nigel Triffitt and starred Diane Cilento (of 'Goldfinger' fame, ex-wife of Sean Connery and the daughter of Lady Cilento who introduced vitamin supplements to the world).",
      "I wrote the third section of music for the Brisbane Youth Orchestra in the style of Sibelius and conducted this awesome young orchestra for the nine performances - my one chance so far to write for and conduct an orchestra.",
      "The production was mounted outdoors with a massive complex of scaffolding and machinery. For the Japanese section composed by Nick Lyons I had to learn to play the 13 string Japanese harp or Koto. This section also featured a 10 metre high puppet in the style of a Japanese line drawing, which Diane Cilento - as Kra - hypnotised with a small hand mirror.",
      "Lisa Spence featured as the vocalist in the American Indian section in which I played hand drums and wooden flutes. The production included a choir of 150 teenagers descending a ramp in a full size balsawood Viking ship singing a song I composed near the finale. There was also a giant bird which flew across the set as kids high on the scaffolding sounded primitive buffalo horns."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-6/original/3-legends-of-kra-set9451277A-9BC6-5805-B7D2-B2027F124387.jpeg", caption: "Triffitt's set model" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-6/original/diane-cilento8AE2A874-F0AC-9377-3496-1FF08AAD6042.jpg", caption: "Diane Cilento" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-6/original/robyn-archer426EBCA8-1825-2A43-3A58-E95F8EB2E8C0.jpeg", caption: "Robyn Archer - Playwright" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-6/original/nigel-triffitFAD8E046-D4CE-958D-EB09-5A7CA9510ADF.jpg", caption: "Nigel Triffitt - Director" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-6/original/1984-mary-hickson-resident-directorC1F36E24-28B4-F899-97E4-E8DF3C057B40.jpg", caption: "Mary Hickson - Dramaturg" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-6/original/queensland-performing-arts-centre-92153088ABF6467-3A1F-5766-924B-6B2466D4D447.jpg", caption: "Queensland Performing Arts Centre" }
    ],
    highlights: [
      "Composed music for the production",
      "Conducted Brisbane Youth Orchestra",
      "Designed by Nigel Triffett",
      "Starred Diane Cilento"
    ],
    collaborators: ["Robyn Archer", "Nigel Triffett", "Diane Cilento", "Brisbane Youth Orchestra"]
  },
  {
    slug: "european-tours",
    title: "European Tours",
    year: "2005-2007",
    category: "touring",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-1/original/baz-slim-vaeroyEB4A320E-79DF-167F-E0F7-34BE941769D2.jpg",
    summary: "60+ gigs in Norway with Slim Pickens & Dr. Baz. Belfast, Amsterdam, Paris, Japan.",
    fullContent: [
      "The European tours of 2005-2007 represent one of the most exciting periods of Barry's performing career, taking Australian blues and roots music to appreciative audiences across the continent.",
      "With Slim Pickens, Barry performed 60+ gigs in Norway, building a strong following among Scandinavian music lovers who embraced their authentic sound.",
      "London performances connected them with the vibrant UK music scene, while the Northern Ireland tour introduced them to audiences in Belfast and beyond - playing at Madden's Bar and John Hewitt Hotel.",
      "The 2007 Poco Loco tour through Scandinavia was a particular highlight, featuring performances across multiple countries and establishing lasting connections with European promoters and audiences.",
      "These international experiences enriched Barry's musical perspective and demonstrated the universal appeal of genuine blues and roots music. The duo also toured Japan, riding the bullet train between gigs."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/baz-slim-vaeroyEB4A320E-79DF-167F-E0F7-34BE941769D2.jpg", caption: "Sjyrock Festival, Vaeroy" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-and-baz-in-paris2AFDBAF0-06D9-7B79-9093-753364F79E5E.jpg", caption: "Paris" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/belfast1CEB14C2E-1B0B-1D99-0624-48A66DA28C09.jpg", caption: "Madden's Bar Belfast" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/japan11885031F-27B3-C04E-1131-170A05D2FF8B.jpg", caption: "Japan" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/waiting93514A37-6D5A-667A-4A41-4D93EC912E33.jpg", caption: "Amsterdam" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/sjyrock192949A67-9975-F69C-ED30-2115D9826E7A.jpg", caption: "Sjyrock Festival Norway" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/bullettrain181143ED-DB7C-6742-380F-6147E87C4906.jpg", caption: "Bullet Train Japan" }
    ],
    highlights: [
      "60+ gigs in Norway",
      "London performances",
      "Northern Ireland tour",
      "2007 Poco Loco Scandinavia tour"
    ]
  },
  {
    slug: "festival-appearances",
    title: "Festival Circuit",
    year: "2000s-Present",
    category: "festivals",
    heroImage: "https://barryferrier.com/images/com_osgallery/gal-1/original/slimbaz-gympieA0CFAE6C-8FB1-F255-5E07-23C74884565D.jpg",
    summary: "Australia's premier music festivals featuring Doctor Baz.",
    fullContent: [
      "Doctor Baz has performed at Australia's most prestigious music festivals, cementing his reputation as one of the country's most versatile and beloved performers.",
      "Byron Bay Bluesfest, one of the world's great music festivals, has featured Barry multiple times, showcasing his authentic blues and roots sound to international audiences.",
      "Splendour in the Grass appearances in 2013 and 2018 connected him with younger audiences, demonstrating the timeless appeal of his music.",
      "The East Coast Blues Festival has welcomed Barry five times, recognizing his significant contribution to Australian blues music.",
      "Blues on Broadbeach, another five-time appearance, has been a consistent platform for his festival performances, reaching thousands of music lovers on the Gold Coast.",
      "Appearances at Gympie Muster and Tamworth Country Music Festival have showcased his country and roots credentials, proving his versatility across musical genres.",
      "Barry also performed at the Airlie Beach Music Festival with vocalist Fiona Walsh, bringing their dynamic duo sound to one of North Queensland's most popular live music events."
    ],
    images: [
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slimbaz-gympieA0CFAE6C-8FB1-F255-5E07-23C74884565D.jpg", caption: "Gympie Muster" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/slim-baz28D57D9FD-4E6E-BCFA-6578-739851C8EF17.jpg", caption: "Byron Blues Fest" },
      { url: "https://barryferrier.com/images/com_osgallery/gal-1/original/dolphin-awards-2009140E320B-B1F5-FF15-C42C-1FB821FF0663.jpg", caption: "Dolphin Awards" }
    ],
    highlights: [
      "Byron Bay Bluesfest",
      "Splendour in the Grass (2013, 2018)",
      "East Coast Blues Festival (5 times)",
      "Blues on Broadbeach (5 times)",
      "Gympie Muster",
      "Tamworth Country Music Festival",
      "Airlie Beach Music Festival (with Fiona Walsh)"
    ]
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "theatre": return Theater;
    case "recording": return Disc;
    case "touring": return Globe;
    case "festivals": return Star;
    case "composition": return Music;
    case "bands": return Music;
    case "local": return Star;
    default: return Music;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "theatre": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    case "recording": return "bg-red-500/10 text-red-400 border-red-500/30";
    case "touring": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case "festivals": return "bg-green-500/10 text-green-400 border-green-500/30";
    case "composition": return "bg-orange-500/10 text-orange-400 border-orange-500/30";
    case "bands": return "bg-pink-500/10 text-pink-400 border-pink-500/30";
    case "local": return "bg-teal-500/10 text-teal-400 border-teal-500/30";
    default: return "bg-gold/10 text-gold border-gold/30";
  }
};

interface HistoryItem {
  id: number;
  slug: string;
  title: string;
  year: string;
  category: string;
  description: string;
  fullDescription: string | null;
  imageUrl: string | null;
  galleryImages: string | null;
  youtubeVideos: string | null;
  order: number | null;
}

function useYouTubeSinglePlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://www.youtube.com") return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.event === "onStateChange" && data.info === 1) {
          const container = containerRef.current;
          if (!container) return;
          const iframes = container.querySelectorAll<HTMLIFrameElement>("iframe[src*='youtube.com']");
          iframes.forEach((iframe) => {
            if (iframe.contentWindow && iframe.contentWindow !== event.source) {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
                "https://www.youtube.com"
              );
            }
          });
        }
      } catch {}
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return containerRef;
}

export default function HistoryDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const hardcodedContent = historyContentData.find(h => h.slug === slug);

  const { data: dbItem, isLoading } = useQuery<HistoryItem>({
    queryKey: ['/api/history', slug],
    enabled: !hardcodedContent,
  });

  const content = hardcodedContent;
  const dbContent = dbItem;

  const videoContainerRef = useYouTubeSinglePlay();

  usePageTitle(content?.title || dbContent?.title || "History", content?.summary || dbContent?.description || "Career history and archives");

  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string } | null>(null);

  if (!hardcodedContent && isLoading) {
    return (
      <main className="pt-16 md:pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-muted rounded mb-4 mx-auto" />
          <div className="h-4 w-48 bg-muted rounded mx-auto" />
        </div>
      </main>
    );
  }

  if (!content && !dbContent) {
    return (
      <main className="pt-16 md:pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <p className="text-muted-foreground mb-8">This history item could not be found.</p>
          <Link href="/history">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to History
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (dbContent && !content) {
    let galleryImages: string[] = [];
    let youtubeVideos: { id: string; title: string; isPlaylist?: boolean }[] = [];
    
    try {
      galleryImages = dbContent.galleryImages ? JSON.parse(dbContent.galleryImages) : [];
    } catch (e) {
      console.error('Failed to parse galleryImages:', e);
    }
    
    try {
      youtubeVideos = dbContent.youtubeVideos ? JSON.parse(dbContent.youtubeVideos) : [];
    } catch (e) {
      console.error('Failed to parse youtubeVideos:', e);
    }
    
    const paragraphs = dbContent.fullDescription ? dbContent.fullDescription.split('\n\n').filter(p => p.trim()) : [dbContent.description];
    const Icon = getCategoryIcon(dbContent.category);

    return (
      <main className="min-h-screen" ref={videoContainerRef}>
        <SEO
          title={dbContent.title}
          description={dbContent.description}
          url={`/history/${slug}`}
          keywords="career history, performing arts, Doctor Baz, Lindsay Kemp, Johnny Cash, Jesus Christ Superstar, Giant Steps, Slim Pickens, CAAMA, Bill Davis"
          jsonLd={createBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "History", url: "/history" },
            { name: dbContent.title, url: `/history/${slug}` }
          ])}
        />
        <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
          <img
            src={dbContent.imageUrl || 'https://barryferrier.com/images/slideshow/Barry_Ferrier-7.jpg'}
            alt={dbContent.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          
          <div className="absolute inset-0 flex items-end justify-center z-10 pb-12">
            <FadeIn direction="up">
              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Badge className={`${getCategoryColor(dbContent.category)} text-sm px-3 py-1`}>
                    <Icon className="w-4 h-4 mr-2" />
                    {dbContent.category}
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white bg-black/30">
                    <Calendar className="w-3 h-3 mr-1" />
                    {dbContent.year}
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg" data-testid="text-history-detail-title">
                  {dbContent.title}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                  {dbContent.description}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {paragraphs.length === 1 && isHtmlContent(paragraphs[0]) ? (
                  <div className="text-lg text-foreground leading-relaxed rich-html-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraphs[0]) }} />
                ) : (
                  paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-lg text-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </FadeIn>

            {youtubeVideos.length > 0 && (
              <FadeIn direction="up" delay={0.1}>
                <div className="my-12">
                  <h3 className="text-xl font-semibold mb-6">{youtubeVideos.length > 1 ? 'Featured Videos' : 'Featured Video'}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {youtubeVideos.map((video, index) => (
                      <div key={index} className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={video.isPlaylist 
                              ? `https://www.youtube.com/embed/videoseries?list=${video.id}&enablejsapi=1&origin=${window.location.origin}`
                              : `https://www.youtube.com/embed/${video.id}?enablejsapi=1&origin=${window.location.origin}`}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">{video.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {galleryImages.length > 0 && (
              <FadeIn direction="up" delay={0.2}>
                <div className="my-12">
                  <h3 className="text-xl font-semibold mb-6">Gallery</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((imageUrl, index) => {
                      // Convert relative paths to API object storage URLs
                      const fullUrl = imageUrl.startsWith('http') || imageUrl.startsWith('/attached_assets/') ? imageUrl : `/api/objects/public/${imageUrl}`;
                      // Derive caption from filename
                      const filename = imageUrl.split('/').pop() || '';
                      const captionFromFile = filename
                        .replace(/\.[^/.]+$/, '') // Remove extension
                        .replace(/_\d+$/, '') // Remove trailing numbers like _1770242219265
                        .replace(/[_-]/g, ' ') // Replace underscores/hyphens with spaces
                        .replace(/\s+/g, ' ') // Normalize spaces
                        .trim();
                      const caption = captionFromFile || `Image ${index + 1}`;
                      return (
                        <button 
                          key={index} 
                          onClick={() => setLightboxImage({ url: fullUrl, caption })}
                          className="relative group overflow-hidden rounded-lg block text-left cursor-pointer"
                          data-testid={`gallery-image-${index}`}
                        >
                          <img
                            src={fullUrl}
                            alt={caption}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-sm drop-shadow-lg">
                              {caption}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            )}

            <FadeIn direction="up" delay={0.3}>
              <div className="mt-12 text-center">
                <Link href="/history">
                  <Button variant="outline" size="lg" className="group" data-testid="button-back-history">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to History
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Lightbox Overlay */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
            data-testid="lightbox-overlay"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              data-testid="lightbox-close"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <div 
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
              <p className="mt-4 text-white text-lg text-center drop-shadow-lg">
                {lightboxImage.caption}
              </p>
              <Button 
                variant="outline" 
                className="mt-6 group"
                onClick={() => setLightboxImage(null)}
                data-testid="lightbox-back"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Page
              </Button>
            </div>
          </div>
        )}
      </main>
    );
  }

  const Icon = getCategoryIcon(content.category);
  const isAfrica = content.slug === "africa-savage-musical";

  return (
    <main className="min-h-screen" ref={videoContainerRef}>
      <SEO
        title={content.title}
        description={content.summary}
        url={`/history/${slug}`}
        keywords="career history, performing arts, Doctor Baz, Lindsay Kemp, Johnny Cash, Jesus Christ Superstar, Giant Steps, Slim Pickens, CAAMA, Bill Davis"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "History", url: "/history" },
          { name: content.title, url: `/history/${slug}` }
        ])}
      />
      <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
        <img
          src={content.heroImage}
          alt={content.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        
        <div className="absolute inset-0 flex items-end justify-center z-10 pb-12">
          <FadeIn direction="up">
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Badge className={`${getCategoryColor(content.category)} text-sm px-3 py-1`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {content.category}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white bg-black/30">
                  <Calendar className="w-3 h-3 mr-1" />
                  {content.year}
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg" data-testid="text-history-detail-title">
                {content.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                {content.summary}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {content.fullContent.map((paragraph, index) => (
                <p key={index} className="text-lg text-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          {isAfrica && (
            <FadeIn direction="up">
              <section className="my-16 bg-muted/30 rounded-xl p-8 border border-gold/20">
                <figure className="space-y-6">
                  <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gold/10 group max-w-2xl mx-auto">
                    <img 
                      src="/attached_assets/IMG_2498_1770238858471.jpeg" 
                      alt="Felix B. Tonto (Rodney Bain) and Steve J. Spears" 
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
                  </div>
                  <figcaption className="text-center px-4 max-w-2xl mx-auto">
                    <p className="text-lg font-serif font-medium text-white mb-2">
                      Felix B. Tonto (aka Rodney Bain) and Steve J. Spears
                    </p>
                    <p className="text-muted-foreground italic leading-relaxed">
                      The late comedian and actor Rodney Bain was a featured artist in the show and later in life received an OBE for his service to Thai banking.
                    </p>
                  </figcaption>
                </figure>
              </section>
            </FadeIn>
          )}

          {content.youtubeVideos && content.youtubeVideos.length > 0 && (
            <FadeIn direction="up" delay={0.1}>
              <div className="my-12">
                <h3 className="text-xl font-semibold mb-6">{content.youtubeVideos.length > 1 ? 'Featured Videos' : 'Featured Video'}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.youtubeVideos.map((video, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={video.isPlaylist 
                            ? `https://www.youtube.com/embed/videoseries?list=${video.id}&enablejsapi=1&origin=${window.location.origin}`
                            : `https://www.youtube.com/embed/${video.id}?enablejsapi=1&origin=${window.location.origin}`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">{video.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {content.youtubeId && !content.youtubeVideos && (
            <FadeIn direction="up" delay={0.1}>
              <div className="my-12">
                <h3 className="text-xl font-semibold mb-6">Featured Video</h3>
                <div className="max-w-2xl aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${content.youtubeId}?enablejsapi=1&origin=${window.location.origin}`}
                    title={content.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </FadeIn>
          )}

          {content.externalLinks && content.externalLinks.length > 0 && (
            <FadeIn direction="up" delay={0.1}>
              <div className="my-8 flex flex-wrap gap-4">
                {content.externalLinks.map((link: any, index: number) => (
                  <Link key={index} href={link.url}>
                    <Button variant="outline" className="group">
                      {link.label}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}

          {content.quote && (
            <FadeIn direction="up" delay={0.1}>
              <Card className="my-12 bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-primary/50 mb-4" />
                  <blockquote className="text-xl font-serif italic text-foreground mb-4">
                    "{content.quote.text}"
                  </blockquote>
                  <p className="text-muted-foreground">— {content.quote.author}</p>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {content.highlights && content.highlights.length > 0 && (
            <FadeIn direction="up" delay={0.2}>
              <Card className="my-12">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-gold" />
                    Highlights
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {content.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3 text-foreground">
                        <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {content.collaborators && content.collaborators.length > 0 && (
            <FadeIn direction="up" delay={0.3}>
              <Card className="my-12">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-neon-cyan" />
                    Notable Collaborators
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {content.collaborators.map((collaborator, index) => (
                      <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                        {collaborator}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {content.images.length > 1 && (
            <FadeIn direction="up" delay={0.4}>
              <div className="my-12">
                <h3 className="text-xl font-semibold mb-6">Gallery</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.images.map((image, index) => (
                    <button 
                      key={index} 
                      onClick={() => setLightboxImage({ url: image.url, caption: image.caption })}
                      className="relative group overflow-hidden rounded-lg block text-left cursor-pointer"
                      data-testid={`gallery-image-${index}`}
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm drop-shadow-lg">
                          {image.caption}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn direction="up" delay={0.5}>
            <div className="mt-12 text-center">
              <Link href="/history">
                <Button variant="outline" size="lg" className="group" data-testid="button-back-history">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to History
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox-overlay"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            data-testid="lightbox-close"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <div 
            className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <p className="mt-4 text-white text-lg text-center drop-shadow-lg">
              {lightboxImage.caption}
            </p>
            <Button 
              variant="outline" 
              className="mt-6 group"
              onClick={() => setLightboxImage(null)}
              data-testid="lightbox-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Page
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
