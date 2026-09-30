/**
 * Static landing-page content. Kept in one place so sections stay presentational and the data
 * could later come from a CMS or API without touching the components.
 */

export type Partner = { name: string; logo: string; width: number; height: number };

export const partners: Partner[] = [
  { name: "Logoipsum", logo: "/images/logos/partner-1.svg", width: 167, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-2.svg", width: 168, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-3.svg", width: 170, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-4.svg", width: 170, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-5.svg", width: 169, height: 42 },
];

/* ------------------------------------------------------------------------------------------ */
/* Courses                                                                                     */
/* ------------------------------------------------------------------------------------------ */

export type Course = {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  lessons: number;
  duration: string;
  comments: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  /** Extra enrolled students shown after the avatar stack ("26+"). */
  moreStudents: number;
  /** Category tabs this course appears under (all courses are "Featured"). */
  categories: string[];
};

/** Avatars of recently enrolled students, shown on every course card. */
export const courseStudents = [1, 2, 3, 4].map((n) => `/images/avatars/learner-${n}.png`);

const courseDefaults = {
  author: "purepearl studio",
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  level: "Beginner",
  price: 25,
  rating: 4.5,
  moreStudents: 26,
} as const;

export const courses: Course[] = [
  {
    ...courseDefaults,
    id: "learn-figma",
    title: "Learn Figma from Basic",
    thumbnail: "/images/courses/learn-figma.jpg",
    categories: ["UI/UX Design", "Graphic Design", "Web Development", "Digital Illustration"],
  },
  {
    ...courseDefaults,
    id: "build-digital-asset",
    title: "Build Digital Asset",
    thumbnail: "/images/courses/build-digital-asset.jpg",
    categories: [
      "Digital Illustration",
      "Graphic Design",
      "Drawing & Painting",
      "Animation",
      "Crafts",
    ],
  },
  {
    ...courseDefaults,
    id: "big-data",
    title: "the Power of Big Data",
    thumbnail: "/images/courses/big-data.jpg",
    categories: ["Data Science", "Marketing", "Productivity", "Web Development"],
  },
  {
    ...courseDefaults,
    id: "productivity",
    title: "Balancing Productivity and Self-Care",
    thumbnail: "/images/courses/productivity.jpg",
    categories: ["Productivity", "Freelance & Entrepreneurship", "Social Media"],
  },
  {
    ...courseDefaults,
    id: "money",
    title: "Mastering Money Management",
    thumbnail: "/images/courses/money.jpg",
    categories: ["Freelance & Entrepreneurship", "Marketing", "Productivity"],
  },
  {
    ...courseDefaults,
    id: "startup",
    title: "From Idea to Startup Success",
    thumbnail: "/images/courses/startup.jpg",
    categories: ["Freelance & Entrepreneurship", "Marketing", "Creative Marketing", "Social Media"],
  },
];

export const FEATURED = "Featured";

/** Category filter tabs, grouped in the three centered rows of the design. */
export const categoryTabRows: string[][] = [
  [
    FEATURED,
    "Music",
    "Drawing & Painting",
    "Marketing",
    "Animation",
    "Social Media",
    "UI/UX Design",
    "Creative Marketing",
  ],
  [
    "Digital Illustration",
    "Film & Video",
    "Crafts",
    "Freelance & Entrepreneurship",
    "Graphic Design",
    "Photography",
  ],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
];

/* ------------------------------------------------------------------------------------------ */
/* Learning paths                                                                              */
/* ------------------------------------------------------------------------------------------ */

export type LearningPath = {
  label: string;
  icon: string;
  /** Course tab to open when the path is clicked. */
  courseCategory: string;
};

export const learningPaths: LearningPath[] = [
  { label: "Design", icon: "/images/icons/categories/design.svg", courseCategory: "UI/UX Design" },
  {
    label: "Development",
    icon: "/images/icons/categories/development.svg",
    courseCategory: "Web Development",
  },
  {
    label: "IT & Software",
    icon: "/images/icons/categories/it-software.svg",
    courseCategory: "Data Science",
  },
  {
    label: "Business",
    icon: "/images/icons/categories/business.svg",
    courseCategory: "Freelance & Entrepreneurship",
  },
  {
    label: "Marketing",
    icon: "/images/icons/categories/marketing.svg",
    courseCategory: "Marketing",
  },
  {
    label: "Photography",
    icon: "/images/icons/categories/photography.svg",
    courseCategory: "Photography",
  },
];

/* ------------------------------------------------------------------------------------------ */
/* Growth & creators                                                                           */
/* ------------------------------------------------------------------------------------------ */

export const platformStats = [
  { value: 12, suffix: "K", label: "Students" },
  { value: 70, suffix: "+", label: "Courses" },
  { value: 16, suffix: "", label: "Creators" },
];

export const creatorBenefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

/* ------------------------------------------------------------------------------------------ */
/* Testimonials                                                                                */
/* ------------------------------------------------------------------------------------------ */

export type Testimonial = { name: string; role: string; avatar: string; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/images/avatars/learner-3.png",
    quote:
      '"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning."',
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/images/avatars/james.png",
    quote:
      '"I\'ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development."',
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/images/avatars/alex.png",
    quote:
      '"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It\'s fulfilling to see my courses making a positive impact on learners globally."',
  },
];
