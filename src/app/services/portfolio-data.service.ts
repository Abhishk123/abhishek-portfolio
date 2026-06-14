import { Injectable, signal } from '@angular/core';

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  glowClass: string;
  skills: Skill[];
  visible: boolean;
}

export interface Achievement {
  title: string;
  text: string;
  tag: string;
  icon: string;
  visible: boolean;
}

export interface CompanyExperience {
  company: string;
  logoText: string;
  role: string;
  duration: string;
  location: string;
  summary: string;
  achievements: Achievement[];
  visible: boolean;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
  link: string;
  visible: boolean;
}

export interface PortfolioData {
  profile: {
    name: string;
    greeting: string;
    subtitles: string[];
    description: string;
    aboutTitle: string;
    aboutText1: string;
    aboutText2: string;
    email: string;
    phone: string;
    address: string;
    stats: { number: string; label: string }[];
  };
  experience: {
    visible: boolean;
    list: CompanyExperience[];
  };
  skills: {
    visible: boolean;
    categories: SkillCategory[];
  };
  projects: {
    visible: boolean;
    list: Project[];
  };
  sections: {
    about: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
    contact: boolean;
  };
}

const DEFAULT_DATA: PortfolioData = {
  profile: {
    name: 'Abhishek Urs C J',
    greeting: "Hello, World! I'm",
    subtitles: ['Software Engineer', 'Automation Architect', 'JavaScript Specialist', 'Lightning JS Expert'],
    description: 'A Senior Software Engineer with over 4 years of experience specializing in high-performance JavaScript-based application development, custom embedded frameworks (Lightning JS), and scalable test automation architectures using Cypress.',
    aboutTitle: 'Transforming ideas into high-performance software',
    aboutText1: 'I am a dynamic and results-driven Software Engineer with over 4 years of experience specializing in JavaScript-based application development and automation frameworks. My expertise lies in building high-performance applications for embedded systems and set-top boxes, as well as designing scalable verification platforms from scratch.',
    aboutText2: 'At <strong>Tata Elxsi</strong>, I have spent years bridging the gap between hardware limitations and software capability, using technologies like <strong>Lightning JS</strong> and <strong>WebSockets</strong>. I am passionate about engineering clean, maintainable code architectures and leading teams toward successful milestones.',
    email: 'abhishekurst@gmail.com',
    phone: '6361247286',
    address: 'Chikkanayakanahalli, Tumkur, KA, IN',
    stats: [
      { number: '4+', label: 'Years Experience' },
      { number: '10+', label: 'Automation Tools Built' },
      { number: '1', label: '"Extra Mile" Award' }
    ]
  },
  experience: {
    visible: true,
    list: [
      {
        company: 'Tata Elxsi Limited',
        logoText: 'TE',
        role: 'Senior Engineer',
        duration: '2021 - Present',
        location: 'Bengaluru, India',
        summary: 'Architecting and engineering critical software solutions, building high-performance embedded TV/STB apps, and designing robust, automated testing frameworks from scratch.',
        visible: true,
        achievements: [
          {
            title: 'Application Development (Lightning JS)',
            text: 'Architected and built a custom <strong>Certification App</strong> using <strong>Lightning JS</strong> designed for TV and set-top box platforms, ensuring high-performance execution.',
            tag: 'Lightning JS',
            icon: 'fa-solid fa-code',
            visible: true
          },
          {
            title: 'System Integration (WebSockets)',
            text: 'Engineered logic for the application to receive and execute complex commands via <strong>WebSockets</strong>, successfully bridging the gap between test suites and platform hardware capabilities.',
            tag: 'WebSockets',
            icon: 'fa-solid fa-network-wired',
            visible: true
          },
          {
            title: 'Framework Architecture (Cypress)',
            text: 'Designed a robust <strong>Cypress automation framework</strong> from the ground up to validate API support, system settings, and third-party application behaviors.',
            tag: 'Cypress',
            icon: 'fa-solid fa-vial',
            visible: true
          },
          {
            title: 'Technical Leadership & Mentorship',
            text: 'Developed custom glue code and modular JS commands, spearheaded peer code reviews to maintain code quality, and guided junior team members in framework design, effective script debugging, and clean coding practices.',
            tag: 'Leadership',
            icon: 'fa-solid fa-users-gear',
            visible: true
          },
          {
            title: '"Extra Mile" Award',
            text: 'Received the prestigious <strong>"Extra Mile" award</strong> for delivering high-quality, maintainable code under tight deadlines and meeting critical project milestones.',
            tag: 'Award',
            icon: 'fa-solid fa-trophy',
            visible: true
          }
        ]
      }
    ]
  },
  skills: {
    visible: true,
    categories: [
      {
        title: 'Languages',
        icon: 'fa-solid fa-code',
        glowClass: 'glow-lang',
        visible: true,
        skills: [
          { name: 'JavaScript (ES6+)', level: 95 },
          { name: 'Node.js', level: 85 }
        ]
      },
      {
        title: 'Frontend Development',
        icon: 'fa-solid fa-laptop-code',
        glowClass: 'glow-front',
        visible: true,
        skills: [
          { name: 'Lightning JS', level: 90 },
          { name: 'Angular', level: 80 },
          { name: 'HTML5 & CSS3', level: 95 }
        ]
      },
      {
        title: 'Automation & Testing',
        icon: 'fa-solid fa-bug-slash',
        glowClass: 'glow-auto',
        visible: true,
        skills: [
          { name: 'Cypress', level: 95 },
          { name: 'Cucumber', level: 85 }
        ]
      },
      {
        title: 'Database & API',
        icon: 'fa-solid fa-database',
        glowClass: 'glow-db',
        visible: true,
        skills: [
          { name: 'REST APIs', level: 90 },
          { name: 'WebSockets', level: 90 },
          { name: 'MySQL', level: 75 }
        ]
      }
    ]
  },
  projects: {
    visible: true,
    list: [
      {
        title: 'STB Certification Application',
        category: 'Professional Project',
        description: 'An embedded application architected using Lightning JS designed for set-top box (STB) certification workflows. Connects to test controllers for executing validation suites.',
        tags: ['Lightning JS', 'JavaScript (ES6)', 'WebSockets', 'Embedded Systems'],
        icon: 'fa-solid fa-tv',
        link: '#',
        visible: true
      },
      {
        title: 'Cypress E2E Automation Framework',
        category: 'Professional Project',
        description: 'A robust test automation platform designed from the ground up to validate API endpoints, system configuration settings, and third-party TV app behaviors.',
        tags: ['Cypress', 'JavaScript', 'REST APIs', 'Automation Framework'],
        icon: 'fa-solid fa-microchip',
        link: '#',
        visible: true
      },
      {
        title: 'Cloud Service Orchestration Engine',
        category: 'Academic Project',
        description: 'A cloud service orchestration platform designed to automate resource provisioning, coordinate multi-tenant APIs, and manage virtual network clusters.',
        tags: ['Cloud Computing', 'REST API', 'Node.js', 'Orchestration'],
        icon: 'fa-solid fa-cloud-arrow-up',
        link: '#',
        visible: true
      }
    ]
  },
  sections: {
    about: true,
    experience: true,
    skills: true,
    projects: true,
    contact: true
  }
};

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  private readonly storageKey = 'abhishek_portfolio_data';
  
  readonly data = signal<PortfolioData>(DEFAULT_DATA);

  constructor() {
    this.loadInitialDataAsync();
  }

  private async loadInitialDataAsync() {
    let baseData = DEFAULT_DATA;
    try {
      const response = await fetch('portfolio-data.json');
      if (response.ok) {
        baseData = await response.json();
      }
    } catch (e) {
      console.warn('Could not fetch portfolio-data.json from server. Using local defaults.', e);
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.data.set({
          ...baseData,
          ...parsed,
          profile: { ...baseData.profile, ...parsed.profile },
          experience: { ...baseData.experience, ...parsed.experience },
          skills: { ...baseData.skills, ...parsed.skills },
          projects: { ...baseData.projects, ...parsed.projects },
          sections: { ...baseData.sections, ...parsed.sections }
        });
        return;
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
    this.data.set(baseData);
  }

  saveData(newData: PortfolioData) {
    this.data.set(newData);
    localStorage.setItem(this.storageKey, JSON.stringify(newData));
  }

  resetData() {
    this.saveData(DEFAULT_DATA);
  }

  exportConfig() {
    const dataStr = JSON.stringify(this.data(), null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'portfolio-data.json');
    linkElement.click();
  }

  async syncToGitHub(username: string, repo: string, token: string, branch: string): Promise<void> {
    const path = 'public/portfolio-data.json';
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
    const content = JSON.stringify(this.data(), null, 2);
    
    // Safely encode to base64 keeping UTF-8 characters
    const base64Content = btoa(encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));

    let sha = '';
    try {
      const getRes = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
    } catch (e) {
      console.warn('Could not retrieve file SHA from GitHub. Assuming new file creation.', e);
    }

    const body: any = {
      message: 'chore: update portfolio configurations via web admin panel',
      content: base64Content,
      branch: branch
    };
    if (sha) {
      body.sha = sha;
    }

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(body)
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || 'Failed to sync with GitHub API.');
    }
  }
}
