
export type Skill = {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'mobile' | 'devops' | 'ai' | 'other';
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  location: string;
  skills: Skill[];
  bio: string;
  hackathons: string[];
  availableRemote: boolean;
};

export type Hackathon = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  isRemote: boolean;
  description: string;
  imageUrl: string;
};

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
};

export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend' },
  { id: '2', name: 'TypeScript', category: 'frontend' },
  { id: '3', name: 'Node.js', category: 'backend' },
  { id: '4', name: 'Python', category: 'backend' },
  { id: '5', name: 'UI/UX Design', category: 'design' },
  { id: '6', name: 'Figma', category: 'design' },
  { id: '7', name: 'React Native', category: 'mobile' },
  { id: '8', name: 'Flutter', category: 'mobile' },
  { id: '9', name: 'Docker', category: 'devops' },
  { id: '10', name: 'AWS', category: 'devops' },
  { id: '11', name: 'Machine Learning', category: 'ai' },
  { id: '12', name: 'TensorFlow', category: 'ai' },
  { id: '13', name: 'GraphQL', category: 'backend' },
  { id: '14', name: 'Next.js', category: 'frontend' },
  { id: '15', name: 'Tailwind CSS', category: 'frontend' },
  { id: '16', name: 'MongoDB', category: 'backend' },
  { id: '17', name: 'PostgreSQL', category: 'backend' },
  { id: '18', name: 'Firebase', category: 'backend' },
  { id: '19', name: 'Kubernetes', category: 'devops' },
  { id: '20', name: 'Swift', category: 'mobile' },
];

export const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'Global AI Hackathon',
    startDate: '2023-06-15',
    endDate: '2023-06-17',
    location: 'San Francisco, CA',
    isRemote: false,
    description: 'A hackathon focused on artificial intelligence and machine learning applications.',
    imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: '2',
    name: 'Web3 Developer Summit',
    startDate: '2023-07-22',
    endDate: '2023-07-24',
    location: 'Online',
    isRemote: true,
    description: 'Build the future of decentralized applications in this online hackathon.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: '3',
    name: 'HealthTech Innovation Challenge',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    location: 'Boston, MA',
    isRemote: false,
    description: 'Developing innovative solutions for healthcare challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: '4',
    name: 'Sustainability Code Jam',
    startDate: '2023-09-05',
    endDate: '2023-09-07',
    location: 'Online',
    isRemote: true,
    description: 'Creating technological solutions for environmental sustainability.',
    imageUrl: 'https://images.unsplash.com/photo-1497996541515-6549dae3d808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: '5',
    name: 'Mobile App Development Contest',
    startDate: '2023-10-18',
    endDate: '2023-10-20',
    location: 'Seattle, WA',
    isRemote: false,
    description: 'Showcase your mobile development skills and creativity.',
    imageUrl: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Frontend Developer',
    location: 'San Francisco, CA',
    skills: [skills[0], skills[1], skills[14]],
    bio: 'Passionate about creating beautiful and functional user interfaces. Looking to join a team for upcoming hackathons.',
    hackathons: ['1', '4'],
    availableRemote: true,
  },
  {
    id: '2',
    name: 'Sam Chen',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Full Stack Developer',
    location: 'New York, NY',
    skills: [skills[0], skills[2], skills[16]],
    bio: 'Experienced in building end-to-end applications. Excited to collaborate on innovative projects.',
    hackathons: ['2', '5'],
    availableRemote: true,
  },
  {
    id: '3',
    name: 'Taylor Williams',
    avatarUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
    title: 'UX/UI Designer',
    location: 'Chicago, IL',
    skills: [skills[4], skills[5]],
    bio: 'Designing intuitive and engaging user experiences. Looking for developers to bring designs to life.',
    hackathons: ['3', '4'],
    availableRemote: true,
  },
  {
    id: '4',
    name: 'Jordan Lee',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    title: 'Backend Developer',
    location: 'Austin, TX',
    skills: [skills[3], skills[16], skills[17]],
    bio: 'Specialized in building robust backend systems. Interested in working on data-intensive applications.',
    hackathons: ['1', '2'],
    availableRemote: false,
  },
  {
    id: '5',
    name: 'Casey Martinez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
    title: 'Mobile Developer',
    location: 'Seattle, WA',
    skills: [skills[6], skills[19]],
    bio: 'iOS and Android developer with a passion for creating seamless mobile experiences.',
    hackathons: ['5'],
    availableRemote: true,
  },
  {
    id: '6',
    name: 'Morgan Smith',
    avatarUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
    title: 'AI/ML Engineer',
    location: 'Boston, MA',
    skills: [skills[10], skills[11], skills[3]],
    bio: 'Working on machine learning solutions to solve real-world problems. Looking for collaborative projects.',
    hackathons: ['1', '3'],
    availableRemote: false,
  },
  {
    id: '7',
    name: 'Riley Johnson',
    avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    title: 'DevOps Engineer',
    location: 'Denver, CO',
    skills: [skills[8], skills[9], skills[18]],
    bio: 'Specializing in CI/CD pipelines and infrastructure automation. Eager to help teams with deployment strategies.',
    hackathons: ['2', '4'],
    availableRemote: true,
  },
  {
    id: '8',
    name: 'Jamie Wilson',
    avatarUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
    title: 'Full Stack Developer',
    location: 'Online',
    skills: [skills[13], skills[0], skills[16]],
    bio: 'Remote developer experienced in building web applications. Looking for innovative hackathon projects.',
    hackathons: ['2', '4'],
    availableRemote: true,
  },
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    recipientId: '2',
    content: 'Hi, I saw you\'re interested in the Web3 Developer Summit. Would you like to team up?',
    timestamp: '2023-05-10T14:30:00Z',
    read: true,
  },
  {
    id: '2',
    senderId: '2',
    recipientId: '1',
    content: 'Hey! Yes, I\'m looking for team members. What skills do you bring to the table?',
    timestamp: '2023-05-10T15:15:00Z',
    read: true,
  },
  {
    id: '3',
    senderId: '3',
    recipientId: '1',
    content: 'Hello! I noticed you\'re a frontend developer. I\'m a UX designer looking for someone to collaborate with for the Sustainability Code Jam. Interested?',
    timestamp: '2023-05-11T09:45:00Z',
    read: false,
  },
  {
    id: '4',
    senderId: '4',
    recipientId: '6',
    content: 'Hi there! I see we\'re both interested in the Global AI Hackathon. I\'m a backend developer and could use your AI expertise. Would you be interested in forming a team?',
    timestamp: '2023-05-12T11:20:00Z',
    read: true,
  },
  {
    id: '5',
    senderId: '6',
    recipientId: '4',
    content: 'Hello! Yes, I\'d be interested in collaborating. What kind of project did you have in mind?',
    timestamp: '2023-05-12T13:05:00Z',
    read: false,
  },
];
