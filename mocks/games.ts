import { Game, LoveNote, MemoryQuizQuestion } from '@/types';

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Memory Quiz',
    description: 'Test how well you know each other',
    icon: 'brain',
    route: '/games/memory-quiz',
  },
  {
    id: '2',
    title: 'Love Notes',
    description: 'Send and receive sweet messages',
    icon: 'heart',
    route: '/games/love-notes',
  },
  {
    id: '3',
    title: 'Would You Rather',
    description: 'Fun choices to learn more about each other',
    icon: 'split',
    route: '/games/would-you-rather',
  },
  {
    id: '4',
    title: 'Panda Match',
    description: 'A cute memory matching game',
    icon: 'layout-grid',
    route: '/games/panda-match',
  },
];

export const mockLoveNotes: LoveNote[] = [
  {
    id: '1',
    content: "Just wanted to remind you how much you mean to me. You make every day brighter!",
    date: "2023-10-15T14:30:00Z",
    isRead: true,
  },
  {
    id: '2',
    content: "Thinking of your smile right now and it's making my day better.",
    date: "2023-11-02T09:15:00Z",
    isRead: true,
  },
  {
    id: '3',
    content: "Can't wait to see you later! I have a surprise planned.",
    date: "2023-12-05T18:45:00Z",
    isRead: false,
  },
];

export const mockQuizQuestions: MemoryQuizQuestion[] = [
  {
    id: '1',
    question: "What was the name of the restaurant where we had our first date?",
    options: ["Cafe Delight", "The Garden Bistro", "Moonlight Diner", "Sunset Grill"],
    correctAnswer: 1,
    explanation: "We went to The Garden Bistro and sat by the window with the fairy lights."
  },
  {
    id: '2',
    question: "What color was the dress/shirt I wore on our first anniversary?",
    options: ["Blue", "Red", "Black", "Green"],
    correctAnswer: 0,
    explanation: "I wore that blue dress/shirt that you always say brings out my eyes."
  },
  {
    id: '3',
    question: "What's my favorite dessert?",
    options: ["Chocolate cake", "Strawberry cheesecake", "Tiramisu", "Ice cream"],
    correctAnswer: 2,
    explanation: "I always order tiramisu whenever it's on the menu!"
  },
  {
    id: '4',
    question: "Where did we go for our first vacation together?",
    options: ["Beach resort", "Mountain cabin", "City trip", "Camping"],
    correctAnswer: 1,
    explanation: "We stayed in that cozy mountain cabin with the fireplace."
  },
  {
    id: '5',
    question: "What's my favorite movie genre?",
    options: ["Romance", "Action", "Comedy", "Horror"],
    correctAnswer: 2,
    explanation: "I love comedies because I love laughing with you."
  },
  {
    id: '6',
    question: "What's my go-to comfort food?",
    options: ["Pizza", "Mac and cheese", "Chicken soup", "Ice cream"],
    correctAnswer: 1,
    explanation: "Nothing beats mac and cheese when I'm feeling down."
  },
  {
    id: '7',
    question: "What's my favorite season?",
    options: ["Spring", "Summer", "Fall", "Winter"],
    correctAnswer: 2,
    explanation: "I love fall with all the colorful leaves and cozy sweaters."
  },
  {
    id: '8',
    question: "What's my dream vacation destination?",
    options: ["Paris", "Bali", "New York", "Tokyo"],
    correctAnswer: 3,
    explanation: "I've always wanted to explore Tokyo and experience the culture."
  },
  {
    id: '9',
    question: "What's my favorite way to spend a weekend?",
    options: ["Outdoor adventures", "Movie marathon", "Shopping", "Reading at home"],
    correctAnswer: 0,
    explanation: "I love being outdoors and going on adventures with you."
  },
  {
    id: '10',
    question: "What's my favorite flower?",
    options: ["Roses", "Tulips", "Sunflowers", "Lilies"],
    correctAnswer: 2,
    explanation: "Sunflowers always make me smile because they're so bright and cheerful."
  }
];

export const wouldYouRatherQuestions = [
  {
    id: '1',
    option1: "Have a romantic picnic in the park",
    option2: "Have a cozy movie night at home"
  },
  {
    id: '2',
    option1: "Travel to a new country every year",
    option2: "Build a dream home together"
  },
  {
    id: '3',
    option1: "Have a small, intimate wedding",
    option2: "Have a big celebration with all friends and family"
  },
  {
    id: '4',
    option1: "Live in a bustling city",
    option2: "Live in a quiet countryside"
  },
  {
    id: '5',
    option1: "Have a spontaneous date night",
    option2: "Have a carefully planned special evening"
  },
  {
    id: '6',
    option1: "Adopt a dog",
    option2: "Adopt a cat"
  },
  {
    id: '7',
    option1: "Cook dinner together",
    option2: "Go out to a nice restaurant"
  },
  {
    id: '8',
    option1: "Spend the day at an amusement park",
    option2: "Spend the day at the beach"
  },
  {
    id: '9',
    option1: "Have a winter wedding",
    option2: "Have a summer wedding"
  },
  {
    id: '10',
    option1: "Receive thoughtful handmade gifts",
    option2: "Receive carefully chosen store-bought gifts"
  },
  {
    id: '11',
    option1: "Dance in the rain together",
    option2: "Watch the sunset together"
  },
  {
    id: '12',
    option1: "Go on a road trip with no set destination",
    option2: "Plan a detailed itinerary for a vacation"
  },
  {
    id: '13',
    option1: "Have breakfast in bed",
    option2: "Have a candlelit dinner"
  },
  {
    id: '14',
    option1: "Go hiking in the mountains",
    option2: "Go swimming in the ocean"
  },
  {
    id: '15',
    option1: "Have a game night with friends",
    option2: "Have a quiet evening just the two of us"
  }
];