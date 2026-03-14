
import { Verb, Rule } from './types';

export const RULES: Rule[] = [
  {
    id: 's-1',
    type: 's-es',
    sound: '/s/',
    description: 'After voiceless sounds like p, k, f, t.',
    examples: ['stops', 'likes', 'cooks', 'helps'],
    color: 'bg-blue-500',
    voiceless: ['p', 'k', 'f', 't']
  },
  {
    id: 's-2',
    type: 's-es',
    sound: '/z/',
    description: 'After voiced sounds like vowels, b, g, l, m, n, r.',
    examples: ['plays', 'runs', 'cleans', 'reads'],
    color: 'bg-green-500'
  },
  {
    id: 's-3',
    type: 's-es',
    sound: '/ɪz/',
    description: 'After s, sh, ch, x, z.',
    examples: ['watches', 'washes', 'boxes', 'fixes'],
    color: 'bg-purple-500'
  },
  {
    id: 'ed-1',
    type: 'ed',
    sound: '/t/',
    description: 'After voiceless sounds like p, k, f, s, sh, ch, x.',
    examples: ['washed', 'helped', 'looked', 'laughed'],
    color: 'bg-orange-500'
  },
  {
    id: 'ed-2',
    type: 'ed',
    sound: '/d/',
    description: 'After voiced sounds (vowels and voiced consonants except /d/).',
    examples: ['played', 'cleaned', 'opened', 'smiled'],
    color: 'bg-indigo-500'
  },
  {
    id: 'ed-3',
    type: 'ed',
    sound: '/ɪd/',
    description: 'After verbs ending in /t/ or /d/.',
    examples: ['wanted', 'needed', 'started', 'decided'],
    color: 'bg-red-500'
  }
];

export const VERBS: Verb[] = [
  // -ed Verbs
  { id: '1', base: 'wash', modified: 'washed', type: 'ed', category: '/t/', example: 'I washed the dishes.' },
  { id: '2', base: 'help', modified: 'helped', type: 'ed', category: '/t/', example: 'She helped her brother.' },
  { id: '3', base: 'look', modified: 'looked', type: 'ed', category: '/t/', example: 'They looked at the cat.' },
  { id: '4', base: 'laugh', modified: 'laughed', type: 'ed', category: '/t/', example: 'We laughed at the joke.' },
  { id: '5', base: 'play', modified: 'played', type: 'ed', category: '/d/', example: 'He played soccer.' },
  { id: '6', base: 'clean', modified: 'cleaned', type: 'ed', category: '/d/', example: 'I cleaned my room.' },
  { id: '7', base: 'open', modified: 'opened', type: 'ed', category: '/d/', example: 'She opened the gift.' },
  { id: '8', base: 'smile', modified: 'smiled', type: 'ed', category: '/d/', example: 'The baby smiled at me.' },
  { id: '9', base: 'want', modified: 'wanted', type: 'ed', category: '/ɪd/', example: 'I wanted an ice cream.' },
  { id: '10', base: 'need', modified: 'needed', type: 'ed', category: '/ɪd/', example: 'She needed a pencil.' },
  { id: '11', base: 'visit', modified: 'visited', type: 'ed', category: '/ɪd/', example: 'They visited London.' },
  { id: '12', base: 'shout', modified: 'shouted', type: 'ed', category: '/ɪd/', example: 'The boy shouted loudly.' },
  // -s/-es Verbs
  { id: '13', base: 'stop', modified: 'stops', type: 's-es', category: '/s/', example: 'The car stops here.' },
  { id: '14', base: 'like', modified: 'likes', type: 's-es', category: '/s/', example: 'She likes apples.' },
  { id: '15', base: 'cook', modified: 'cooks', type: 's-es', category: '/s/', example: 'Dad cooks dinner.' },
  { id: '16', base: 'sit', modified: 'sits', type: 's-es', category: '/s/', example: 'The cat sits on the mat.' },
  { id: '17', base: 'run', modified: 'runs', type: 's-es', category: '/z/', example: 'He runs fast.' },
  { id: '18', base: 'clean', modified: 'cleans', type: 's-es', category: '/z/', example: 'She cleans the house.' },
  { id: '19', base: 'play', modified: 'plays', type: 's-es', category: '/z/', example: 'He plays piano.' },
  { id: '20', base: 'swim', modified: 'swims', type: 's-es', category: '/z/', example: 'The duck swims well.' },
  { id: '21', base: 'watch', modified: 'watches', type: 's-es', category: '/ɪz/', example: 'He watches TV.' },
  { id: '22', base: 'wash', modified: 'washes', type: 's-es', category: '/ɪz/', example: 'She washes the dog.' },
  { id: '23', base: 'mix', modified: 'mixes', type: 's-es', category: '/ɪz/', example: 'He mixes the colors.' },
  { id: '24', base: 'dance', modified: 'dances', type: 's-es', category: '/ɪz/', example: 'She dances nicely.' },
  // Adding more to reach a good count for practice
  { id: '25', base: 'fix', modified: 'fixed', type: 'ed', category: '/t/', example: 'He fixed the bike.' },
  { id: '26', base: 'jump', modified: 'jumped', type: 'ed', category: '/t/', example: 'She jumped over the fence.' },
  { id: '27', base: 'walk', modified: 'walked', type: 'ed', category: '/t/', example: 'They walked to school.' },
  { id: '28', base: 'dance', modified: 'danced', type: 'ed', category: '/t/', example: 'They danced all night.' },
  { id: '29', base: 'show', modified: 'showed', type: 'ed', category: '/d/', example: 'She showed me her toy.' },
  { id: '30', base: 'study', modified: 'studied', type: 'ed', category: '/d/', example: 'He studied hard.' },
  { id: '31', base: 'try', modified: 'tried', type: 'ed', category: '/d/', example: 'She tried her best.' },
  { id: '32', base: 'arrive', modified: 'arrived', type: 'ed', category: '/d/', example: 'The bus arrived.' },
  { id: '33', base: 'count', modified: 'counted', type: 'ed', category: '/ɪd/', example: 'I counted the stars.' },
  { id: '34', base: 'plant', modified: 'planted', type: 'ed', category: '/ɪd/', example: 'She planted flowers.' },
  { id: '35', base: 'wait', modified: 'waited', type: 'ed', category: '/ɪd/', example: 'We waited for him.' },
  { id: '36', base: 'add', modified: 'added', type: 'ed', category: '/ɪd/', example: 'She added some sugar.' },
];
