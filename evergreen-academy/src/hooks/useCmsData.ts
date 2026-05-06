import { useState, useCallback } from 'react';

const CMS_KEY = 'school_cms_data';

export interface DesignSettings {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
  logoText: string;
  logoUrl: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface AdmissionData {
  title: string;
  subtitle: string;
  intro: string;
  requirements: string[];
  process: Array<{ step: string; description: string }>;
  fees: string;
  deadline: string;
  contactEmail: string;
}

export interface ContactData {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbed: string;
}

export interface CmsData {
  school: { name: string; tagline: string; founded: string; };
  design: DesignSettings;
  media: MediaItem[];
  hero: { title: string; subtitle: string; cta: string; backgroundImage: string; };
  stats: Array<{ label: string; value: string; }>;
  notices: Array<{ id: string; title: string; content: string; category: string; date: string; pinned: boolean; }>;
  news: Array<{ id: string; title: string; summary: string; content: string; date: string; image: string; featured: boolean; }>;
  events: Array<{ id: string; title: string; description: string; date: string; time: string; location: string; }>;
  gallery: Array<{ id: string; title: string; category: string; image: string; }>;
  team: Array<{ id: string; name: string; role: string; bio: string; image: string; }>;
  about: { history: string; mission: string; vision: string; historyImage: string; };
  admission: AdmissionData;
  contact: ContactData;
}

const defaultData: CmsData = {
  school: {
    name: "Evergreen Academy",
    tagline: "Excellence in Education Since 1924",
    founded: "1924",
  },
  design: {
    primaryColor: "#0a1628",
    accentColor: "#c9a84c",
    backgroundColor: "#f8f5f0",
    headingFont: "Playfair Display",
    bodyFont: "Inter",
    logoText: "EA",
    logoUrl: "",
  },
  media: [],
  hero: {
    title: "Cultivating Minds, Inspiring Futures",
    subtitle: "A world-class education nurturing the leaders of tomorrow in an environment of academic excellence and character development.",
    cta: "Discover Evergreen",
    backgroundImage: "https://picsum.photos/1920/1080?random=20",
  },
  stats: [
    { label: "Students", value: "850" },
    { label: "Faculty", value: "120" },
    { label: "Acres of Campus", value: "45" },
    { label: "University Placement", value: "100%" }
  ],
  notices: [
    { id: "1", title: "Term Dates 2024/25", content: "The updated term dates for the upcoming academic year are now available on the parent portal. Please log in to review the schedule.", category: "Academic", date: "2024-05-15", pinned: true },
    { id: "2", title: "Sports Day Registration", content: "Please register your children for the annual Sports Day by next Friday. Forms are available at the main office.", category: "Sports", date: "2024-05-10", pinned: true },
    { id: "3", title: "Choir Rehearsal Change", content: "Senior choir rehearsal has been moved to Thursday 4PM in the Music Hall.", category: "Arts", date: "2024-05-18", pinned: false },
    { id: "4", title: "Exam Timetables Published", content: "GCSE and A-Level timetables have been distributed via the parent portal and school email.", category: "Academic", date: "2024-05-12", pinned: false },
    { id: "5", title: "Updated Campus Visitor Policy", content: "Please review the updated visitor policy which takes effect next month. All visitors must sign in at Reception.", category: "General", date: "2024-05-01", pinned: false }
  ],
  news: [
    { id: "1", title: "Evergreen Students Win National Debate Championship", summary: "Our senior debate team took first place at the national championships held in Edinburgh.", content: "Full story here...", date: "2024-05-10", image: "https://picsum.photos/800/600?random=1", featured: true },
    { id: "2", title: "New Science Center Opening this September", summary: "The state-of-the-art facility will open its doors this September, featuring 12 modern laboratories.", content: "Full story here...", date: "2024-05-05", image: "https://picsum.photos/800/600?random=2", featured: false },
    { id: "3", title: "Alumni Spotlight: Dr. Sarah Jenkins", summary: "Class of '98 graduate makes breakthrough in medical research at Oxford University.", content: "Full story here...", date: "2024-04-28", image: "https://picsum.photos/800/600?random=3", featured: false },
    { id: "4", title: "Spring Concert a Resounding Success", summary: "Over 500 parents and guests attended our annual spring concert last Friday evening.", content: "Full story here...", date: "2024-04-15", image: "https://picsum.photos/800/600?random=4", featured: false },
    { id: "5", title: "Sustainability Initiative Launched", summary: "Evergreen Academy commits to being carbon neutral by 2030 with a new school-wide programme.", content: "Full story here...", date: "2024-04-02", image: "https://picsum.photos/800/600?random=5", featured: false }
  ],
  events: [
    { id: "1", title: "Open Morning", description: "Prospective parents and students are invited to tour the school and meet our staff.", date: "2024-06-15", time: "09:00", location: "Main Hall" },
    { id: "2", title: "Summer Play: A Midsummer Night's Dream", description: "The drama department presents their acclaimed summer production.", date: "2024-06-20", time: "19:00", location: "School Theatre" },
    { id: "3", title: "Annual Sports Day", description: "Athletics competition for all year groups with trophies and awards.", date: "2024-07-05", time: "10:00", location: "Athletics Track" },
    { id: "4", title: "Leavers' Ball", description: "Celebrating our graduating class of 2024 — a formal evening for Year 13 students.", date: "2024-07-12", time: "19:30", location: "Grand Hotel, Oxford" },
    { id: "5", title: "End of Term", description: "School closes at 12:00 PM for the summer holidays. Collection arrangements apply.", date: "2024-07-15", time: "12:00", location: "All Campus" },
    { id: "6", title: "Start of Autumn Term", description: "Welcome back for the new academic year. Assembly at 8:30 AM.", date: "2024-09-04", time: "08:30", location: "All Campus" }
  ],
  gallery: [
    { id: "1", title: "Main Building", category: "Campus", image: "https://picsum.photos/800/600?random=6" },
    { id: "2", title: "Science Lab", category: "Academic", image: "https://picsum.photos/800/600?random=7" },
    { id: "3", title: "Library", category: "Campus", image: "https://picsum.photos/800/600?random=8" },
    { id: "4", title: "Football Match", category: "Sports", image: "https://picsum.photos/800/600?random=9" },
    { id: "5", title: "Art Exhibition", category: "Arts", image: "https://picsum.photos/800/600?random=10" },
    { id: "6", title: "Choir Performance", category: "Arts", image: "https://picsum.photos/800/600?random=11" },
    { id: "7", title: "Graduation Ceremony", category: "Events", image: "https://picsum.photos/800/600?random=12" },
    { id: "8", title: "Dining Hall", category: "Campus", image: "https://picsum.photos/800/600?random=13" }
  ],
  team: [
    { id: "1", name: "Dr. Eleanor Vance", role: "Headmistress", bio: "Dr. Vance has been leading Evergreen since 2015, bringing 25 years of educational leadership experience.", image: "https://picsum.photos/400/400?random=14" },
    { id: "2", name: "James Sterling", role: "Deputy Head (Academic)", bio: "Mr. Sterling oversees our rigorous academic curriculum and maintains our high teaching standards.", image: "https://picsum.photos/400/400?random=15" },
    { id: "3", name: "Sarah Chen", role: "Head of Pastoral Care", bio: "Mrs. Chen ensures every student receives the support and guidance they need to thrive.", image: "https://picsum.photos/400/400?random=16" },
    { id: "4", name: "David Alaba", role: "Director of Sports", bio: "Mr. Alaba coordinates our extensive athletic programmes and competitive teams.", image: "https://picsum.photos/400/400?random=17" }
  ],
  about: {
    history: "Founded in 1924, Evergreen Academy was established with a vision to provide exceptional education that balances academic rigour with character development. Over the past century, we have grown from a small cohort of 50 students to a vibrant community of 850, while maintaining our foundational values.",
    mission: "To inspire a lifelong love of learning, cultivate intellectual curiosity, and develop compassionate, ethical leaders equipped to make a positive impact in a rapidly changing world.",
    vision: "To be globally recognised as a centre of educational excellence where tradition meets innovation, and every student reaches their full potential.",
    historyImage: "https://picsum.photos/800/600?random=18",
  },
  admission: {
    title: "Admissions",
    subtitle: "Begin your journey at Evergreen Academy",
    intro: "We welcome applications from motivated students who share our commitment to academic excellence and personal growth. Our admissions process is designed to identify students who will thrive in our unique environment.",
    requirements: [
      "Completed application form",
      "Previous school reports (last 2 years)",
      "Reference letter from current school",
      "Entrance examination results",
      "Interview with the Admissions Team"
    ],
    process: [
      { step: "1. Submit Application", description: "Complete the online application form and submit all required documents by the deadline." },
      { step: "2. Entrance Assessment", description: "Shortlisted applicants will be invited to sit our entrance examination on campus." },
      { step: "3. Interview", description: "Successful candidates will attend an informal interview with a member of our Admissions Team." },
      { step: "4. Offer", description: "Offers are made in writing within 2 weeks of the interview." },
    ],
    fees: "Annual tuition fees start from £18,500 for day pupils. Bursaries and scholarships are available for exceptional candidates. Please contact the Admissions Office for detailed fee information.",
    deadline: "Applications for September 2025 entry close on 31 January 2025.",
    contactEmail: "admissions@evergreen.edu",
  },
  contact: {
    address: "123 Academic Way, Oxford, OX1 2AB",
    phone: "+44 (0) 1865 123456",
    email: "admissions@evergreen.edu",
    hours: "Monday - Friday: 8:00 AM – 5:00 PM\nSaturday - Sunday: Closed",
    mapEmbed: "",
  },
};

export function useCmsData() {
  const [data, setData] = useState<CmsData>(() => {
    try {
      const stored = localStorage.getItem(CMS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults so new fields always exist
        return { ...defaultData, ...parsed, design: { ...defaultData.design, ...(parsed.design || {}) }, contact: { ...defaultData.contact, ...(parsed.contact || {}) }, admission: { ...defaultData.admission, ...(parsed.admission || {}) }, about: { ...defaultData.about, ...(parsed.about || {}) } };
      }
    } catch (e) {
      // ignore
    }
    localStorage.setItem(CMS_KEY, JSON.stringify(defaultData));
    return defaultData;
  });

  const save = useCallback((newData: CmsData) => {
    setData(newData);
    localStorage.setItem(CMS_KEY, JSON.stringify(newData));
  }, []);

  const updateSection = useCallback(<K extends keyof CmsData>(key: K, value: CmsData[K]) => {
    setData((prev) => {
      const newData = { ...prev, [key]: value };
      localStorage.setItem(CMS_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  const exportData = useCallback(() => {
    setData((current) => {
      const dataStr = JSON.stringify(current, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'evergreen_cms_backup.json');
      link.click();
      return current;
    });
  }, []);

  const importData = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      const merged = { ...defaultData, ...parsed };
      setData(merged);
      localStorage.setItem(CMS_KEY, JSON.stringify(merged));
      return true;
    } catch {
      return false;
    }
  }, []);

  return { data, updateSection, save, exportData, importData };
}
