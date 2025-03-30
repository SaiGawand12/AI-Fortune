'use client';

import { useState } from 'react';
import { Sparkles, Share2, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const generateRoast = (name: string) => {
  const roasts = [
    `${name}, your future career is so bright, you'll need sunglasses... to hide your tears at work.`,
    `Oh ${name}, I see you becoming a millionaire! In Monopoly money, that is.`,
    `${name}, you'll find true love... in your food delivery app.`,
    `Congratulations ${name}! You'll finally move out of your parents' house... in 2045.`,
    `${name}, your fashion sense will improve dramatically... when you let a blind person dress you.`,
    `I see great success in your future, ${name}... at completing Netflix series.`,
    `${name}, you'll travel the world! In Google Street View.`,
    `Good news ${name}! You'll be famous... in your own imagination.`,
    `${name}, you'll make history... as the first person to achieve absolutely nothing spectacularly.`,
    `I see you winning an award, ${name}... for participation.`,
    `${name}, your cooking skills will improve... when you stop setting water on fire.`,
    `Congratulations ${name}! You'll finally get that promotion... in your mobile game.`,
    `${name}, you'll discover your true calling... it's called unemployment.`,
    `I see great wealth in your future, ${name}... Oh wait, that's just your student debt.`,
    `${name}, you'll become an influencer... of what not to do in life.`,
    `Your social media will go viral, ${name}... among your mom's friends.`,
    `${name}, you'll find your soulmate... in a mirror.`,
    `I see you starting a successful business, ${name}... selling air guitars.`,
    `${name}, you'll become a thought leader... of overthinking.`,
    `Your future holds many surprises, ${name}... mostly disappointments.`,
    `${name}, you'll master the art of... procrastination.`,
    `I see you breaking records, ${name}... of most pizza eaten during a Netflix marathon.`,
    `${name}, you'll become famous on TikTok... for tripping over nothing.`,
    `Your investment portfolio will soar, ${name}... in Monopoly properties.`,
    `${name}, you'll revolutionize the industry... of professional napping.`,
    `I see you winning competitions, ${name}... in your dreams.`,
    `${name}, you'll discover a new species... of mold in your fridge.`,
    `Your memoir will be a bestseller, ${name}... in your diary.`,
    `${name}, you'll master five languages... including gibberish and nonsense.`,
    `I see you becoming a trendsetter, ${name}... in wearing mismatched socks.`
  ];

  const gifs = [
    "https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",
    "https://media.giphy.com/media/l3fQf1OEAq0iri9RC/giphy.gif",
    "https://media.giphy.com/media/3o6Zt4HU9uwXmXSAuI/giphy.gif",
    "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
    "https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif",
    "https://media.giphy.com/media/wWue0rCDOphOE/giphy.gif",
    "https://media.giphy.com/media/T3Vx6sVAXzuG4/giphy.gif",
    "https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif"
  ];

  return {
    text: roasts[Math.floor(Math.random() * roasts.length)],
    gif: gifs[Math.floor(Math.random() * gifs.length)]
  };
};

const specialRoasts = {
  elon: (name: string) => `${name}, just because you own a Tesla doesn't make you Elon Musk. Try tweeting less and working more.`,
  mark: (name: string) => `${name}, collecting your family's data doesn't make you Zuckerberg. Try having real friends instead of Facebook friends.`,
  jeff: (name: string) => `${name}, ordering from Amazon Prime won't make you a billionaire. Maybe try building a rocket in your backyard?`,
  bill: (name: string) => `${name}, turning your computer off and on again doesn't make you Bill Gates. Try debugging your life first.`,
  steve: (name: string) => `${name}, wearing a black turtleneck doesn't make you Steve Jobs. Try inventing something other than excuses.`,
};

export default function Home() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState<{ text: string; gif: string } | null>(null);
  const { toast } = useToast();

  const generateFortune = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Enter your name, unless you're too embarrassed to!",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setFortune(null);

    // Simulate crystal ball thinking with random delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 2000));

    const lowercaseName = name.toLowerCase();
    let roast;

    // Check for special names
    const specialName = Object.keys(specialRoasts).find(key => lowercaseName.includes(key));
    if (specialName) {
      roast = {
        text: specialRoasts[specialName as keyof typeof specialRoasts](name),
        gif: "https://media.giphy.com/media/xUA7aM09ByyR1w5YWc/giphy.gif"
      };
    } else {
      roast = generateRoast(name);
    }

    setFortune(roast);
    setLoading(false);
  };

  const shareRoast = () => {
    if (fortune) {
      navigator.clipboard.writeText(`Got absolutely roasted by AI Fortune Teller! Here's what it said about me: "${fortune.text}" 🔮\n\nGet your own roast at https://ai-fortune-teller-roast.vercel.app (if you're brave enough to handle the truth) 😈`);
      toast({
        title: "Roast Copied!",
        description: "Share your humiliation with friends!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 pb-16">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            🔮 AI Fortune Teller
          </h1>
          <p className="text-muted-foreground">Prepare to get <span className="line-through">rich</span> <span className="font-bold text-destructive">roasted</span> by the all-seeing AI</p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name (if you dare)..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center"
          />

          <Button
            onClick={generateFortune}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={loading}
          >
            {loading ? (
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {loading ? "Consulting the stars..." : "Reveal my destiny"}
          </Button>
        </div>

        {fortune && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-card p-6 rounded-lg shadow-lg border border-purple-500/20">
              <p className="text-lg font-medium mb-4">{fortune.text}</p>
              <div className="relative h-48 overflow-hidden rounded-md">
                <img 
                  src={fortune.gif} 
                  alt="Laughing reaction" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <Button
              variant="outline"
              onClick={shareRoast}
              className="w-full"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share your humiliation
            </Button>
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 w-full py-2 px-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Made with 💔 by Sai Gawand
          </p>
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/SaiGawand12/AI-Fortune"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/saigawand"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/sai-gawand-aa719025b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}