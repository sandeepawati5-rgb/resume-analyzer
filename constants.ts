import { NavLink, Feature, DemoReport, PricingPlan, DashboardResume } from './types';
import { CheckIcon, KeywordIcon, ScoreIcon, ProIcon } from './components/IconComponents';

export const NAV_LINKS: NavLink[] = [
  { name: 'Features', href: '#features' },
  { name: 'Demo', href: '#demo' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export const FEATURES: Feature[] = [
  {
    icon: CheckIcon,
    title: 'ATS Compatibility Check',
    description: 'Our AI scans your resume for formatting and content that passes through modern Applicant Tracking Systems.',
  },
  {
    icon: KeywordIcon,
    title: 'Keyword Optimization',
    description: 'Get tailored keyword suggestions based on your target job descriptions to rank higher in recruiter searches.',
  },
  {
    icon: ScoreIcon,
    title: 'AI Score & Suggestions',
    description: 'Receive a score from 0-100 and actionable tips to improve clarity, impact, and overall effectiveness.',
  },
  {
    icon: ProIcon,
    title: 'Pro Plan for Unlimited Reports',
    description: 'Upgrade to our Pro plan for unlimited analyses, perfect for active job seekers tailoring multiple resumes.',
  },
];

export const DEMO_REPORTS: DemoReport[] = [
  {
    name: 'Software_Engineer_Resume.pdf',
    score: 88,
    missingSkills: ['Kubernetes', 'CI/CD', 'Terraform'],
    suggestions: 'Great experience, but adding specific DevOps keywords will improve your match rate for senior roles.',
  },
  {
    name: 'Marketing_Manager_v3.docx',
    score: 72,
    missingSkills: ['SEO', 'Google Analytics', 'Content Strategy'],
    suggestions: 'Quantify your achievements with metrics (e.g., "Increased lead generation by 25%") to show impact.',
  },
  {
    name: 'UX_Designer_Portfolio_Resume.pdf',
    score: 95,
    missingSkills: ['Figma', 'User Research'],
    suggestions: 'Excellent resume. Consider adding a direct link to your portfolio at the top for easy access.',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Free',
        price: '₹0',
        frequency: '/month',
        features: [
            '1 resume analysis per day',
            'Basic keyword check',
            'Standard ATS compatibility',
            'Email support'
        ],
        isFeatured: false,
    },
    {
        name: 'Pro',
        price: '₹499',
        frequency: '/month',
        features: [
            'Unlimited resume analyses',
            'Advanced keyword optimization',
            'In-depth AI suggestions',
            'Priority support',
            'Multiple resume versions'
        ],
        isFeatured: true,
    }
];

export const DASHBOARD_RESUMES: DashboardResume[] = [
    {
        id: 1,
        name: 'Senior_Frontend_Developer.pdf',
        score: 92,
        keywordsFound: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS'],
        improvementTips: 'Add metrics to your project descriptions, e.g., "Improved page load speed by 30%".',
        lastUpdated: '2 hours ago',
    },
    {
        id: 2,
        name: 'Product_Manager_Final.docx',
        score: 85,
        keywordsFound: ['Roadmap', 'Agile', 'JIRA', 'User Stories', 'Market Research'],
        improvementTips: 'Strengthen your "Leadership" section with a specific example of a cross-functional project you led.',
        lastUpdated: '1 day ago',
    },
    {
        id: 3,
        name: 'Data_Scientist_Resume.pdf',
        score: 78,
        keywordsFound: ['Python', 'TensorFlow', 'Scikit-learn', 'SQL'],
        improvementTips: 'Missing "Machine Learning" as a core keyword. Ensure it\'s prominently featured in your summary.',
        lastUpdated: '3 days ago',
    }
];

export const RANDOM_IMPROVEMENT_TIPS: string[] = [
    'Your summary section is strong, but could be more concise. Try to limit it to 3-4 impactful sentences.',
    'Quantify your achievements with numbers to demonstrate your impact. For example, "Increased efficiency by 15%".',
    'Ensure your skills section includes both hard and soft skills relevant to the job description.',
    'The resume format is clean, but consider using a more modern template to stand out.',
    'Add a "Projects" section to showcase your practical experience and specific contributions.'
];

export const ALL_KEYWORDS: string[] = ['JavaScript', 'Python', 'AWS', 'Agile Methodologies', 'Project Management', 'Data Analysis', 'SQL', 'Digital Marketing', 'SEO', 'Leadership', 'Communication', 'Problem Solving', 'Teamwork'];