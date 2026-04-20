import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Trees, 
  MessageCircle, 
  Users, 
  Music, 
  Gamepad2, 
  Share2, 
  Sparkles,
  ArrowRight,
  Activity,
  Instagram
} from 'lucide-react';

interface DiscordStats {
  name: string;
  presence_count: number;
  members: any[];
  channels: any[];
  instant_invite: string | null;
  icon_url?: string | null;
  banner_url?: string | null;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.8, 
      delay,
      ease: [0.21, 0.47, 0.32, 0.98] 
    }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="p-8 glass-card y2k-shadow transition-shadow hover:shadow-[10px_10px_0px_0px_#000] border-white/10 group cursor-default"
  >
    <motion.div 
      whileHover={{ rotate: 10, scale: 1.1 }}
      className="w-14 h-14 bg-mallu-amber/10 rounded-2xl flex items-center justify-center mb-6 border border-mallu-amber/20 group-hover:bg-mallu-amber/20 transition-colors transform-gpu"
    >
      <Icon className="text-mallu-amber" size={28} />
    </motion.div>
    <h3 className="text-2xl font-display font-bold mb-3 uppercase tracking-tight group-hover:text-mallu-amber transition-colors">{title}</h3>
    <p className="text-green-100/60 leading-relaxed font-sans font-light group-hover:text-green-100 transition-colors">{description}</p>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function App() {
  const [discordData, setDiscordData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const serverId = import.meta.env.VITE_DISCORD_SERVER_ID || "1127243450337734726";

  useEffect(() => {
    if (!serverId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Widget Data
        const widgetRes = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
        const widgetData = await widgetRes.json();
        
        // Fetch Invite Metadata for Icon/Banner
        let inviteAssetData = null;
        try {
          const inviteRes = await fetch(`https://discord.com/api/v9/invites/vaazha`);
          inviteAssetData = await inviteRes.json();
        } catch (e) {
          console.error("Failed to fetch invite assets", e);
        }

        setDiscordData({
          ...widgetData,
          approximate_member_count: inviteAssetData?.approximate_member_count,
          approximate_presence_count: inviteAssetData?.approximate_presence_count,
          icon_url: inviteAssetData?.guild?.icon 
            ? `https://cdn.discordapp.com/icons/${serverId}/${inviteAssetData.guild.icon}.png?size=256` 
            : null,
          banner_url: inviteAssetData?.guild?.banner 
            ? `https://cdn.discordapp.com/banners/${serverId}/${inviteAssetData.guild.banner}.png?size=1920` 
            : null
        });
      } catch (error) {
        console.error('Error fetching Discord data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [serverId]);

  useEffect(() => {
    if (discordData?.icon_url) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = discordData.icon_url;
    }
  }, [discordData?.icon_url]);

  const activeVCs = discordData?.channels?.filter(c => c.name.toLowerCase().includes('vc') || (c.members && c.members.length > 0)).length || 14;
  const onlineCount = discordData?.approximate_presence_count || discordData?.presence_count || 482;
  const totalMembers = discordData?.approximate_member_count || 6624;
  const inviteLink = "https://discord.gg/vaazha";

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-[#0d2c1d] text-white">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://cdn.discordapp.com/attachments/1494500725139705968/1495565131759882250/1000291081.gif?ex=69e6b511&is=69e56391&hm=34f550681ba6d5661fca6d789b44995801d7cfb107b57c489c1a4bc98799f4be&" 
          alt="" 
          className="w-full h-full object-cover opacity-60 transform-gpu"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[#0d2c1d]/90" />
      </div>

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 y2k-grid pointer-events-none opacity-30 z-1" />
      
      <div className="absolute top-[-100px] right-[-50px] w-80 h-[500px] opacity-10 rotate-12 pointer-events-none">
        <div className="banana-leaf w-full h-full"></div>
      </div>
      <div className="absolute bottom-[-150px] left-[-50px] w-96 h-[600px] opacity-10 -rotate-12 pointer-events-none">
        <div className="banana-leaf w-full h-full"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-12 h-12 bg-mallu-amber flex items-center justify-center border-2 border-black y2k-shadow transition-transform rounded-2xl overflow-hidden"
          >
            {discordData?.icon_url ? (
              <img src={discordData.icon_url} alt="Server Icon" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-deep-forest w-full h-full flex items-center justify-center font-black text-2xl text-mallu-amber italic">
                {discordData?.name?.[0] || 'V'}
              </div>
            )}
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold tracking-tighter uppercase leading-none">
              {discordData?.name || "VAAZHA"} 
            </span>
            <span className="text-[8px] font-mono text-green-500 uppercase tracking-[0.2em] mt-1 italic">Official Community</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 items-center text-xs font-medium uppercase tracking-[0.3em] text-white/60">
          <a href="#" className="hover:text-mallu-amber transition-colors">The Community</a>
          <a href="#" className="hover:text-mallu-amber transition-colors">Voice Channels</a>
          <a href="#" className="hover:text-mallu-amber transition-colors">Rules</a>
        </div>
        <motion.a 
          href={inviteLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-discord text-white px-6 py-2.5 border-2 border-black y2k-shadow text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-discord/90 transition-all"
        >
          Join Discord 
          <img 
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" 
            alt="" 
            className="w-[18px] h-[18px] brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </motion.a>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-32 px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95%] h-[400px] mt-10 rounded-[2rem] overflow-hidden border border-white/5 opacity-40 pointer-events-none transform-gpu">
          <img 
            src={discordData?.banner_url || "https://images.unsplash.com/photo-1590001158193-790dc47e3901?auto=format&fit=crop&q=80&w=1920"} 
            alt="" 
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d2c1d] via-transparent to-[#0d2c1d]" />
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-20 items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-block px-3 py-1 bg-green-900/50 border border-green-500/30 text-green-400 text-xs font-mono uppercase tracking-[0.1em]">
               {serverId ? '🔴 LIVE FROM DISCORD' : '🌴 The Official Kerala Community Hub'}
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-8 relative">
              {discordData?.name ? (
                <>
                  Welcome to<br/>
                  <span className="mallu-accent italic">{discordData.name} Community</span>
                </>
              ) : (
                <>
                  Welcome to<br/>
                  <span className="mallu-accent italic">Vaazha Community</span>
                </>
              )}
              {/* Banana Leaf SVG Accent */}
              <motion.div 
                animate={{ 
                  rotate: [0, 5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-16 w-24 h-24 text-mallu-amber/20 pointer-events-none hidden lg:block"
              >
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 10C30 30 20 60 50 90C80 60 70 30 50 10Z" />
                  <path d="M50 10L50 90" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
                </svg>
              </motion.div>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-green-100/70 font-sans font-medium mb-12 max-w-xl leading-relaxed">
              #1 Kerala's official Discord active Community !
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <motion.a 
                href={inviteLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "10px 10px 0px 0px #000" }}
                whileTap={{ scale: 0.98 }}
                className="bg-discord text-white px-10 py-5 text-xl font-bold border-2 border-black y2k-shadow flex items-center gap-3 active:shadow-none transition-shadow"
              >
                JOIN THE SERVER 
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" 
                  alt="" 
                  className="w-[24px] h-[24px] brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Stats Panels */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 transform-gpu"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="glass-card p-8 border-l-4 border-l-cyan-400 y2k-shadow relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-cyan-400 font-bold text-4xl mb-1 tracking-tight">
                {totalMembers.toLocaleString()}+
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold flex items-center gap-2">
                Total Members
              </div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="glass-card p-8 border-l-4 border-l-mallu-amber y2k-shadow relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mallu-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {discordData && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-green-400 tracking-tighter">Live</span>
                </div>
              )}
              <div className="text-mallu-amber font-bold text-4xl mb-1 tracking-tight">
                {onlineCount.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold flex items-center gap-2">
                Online Members
              </div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="glass-card p-8 border-l-4 border-l-green-400 y2k-shadow relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-green-400 font-bold text-4xl mb-1 tracking-tight">
                {activeVCs}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold">Voice Channels Active</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 bg-mallu-amber/10 border border-mallu-amber/30 text-mallu-amber text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
            Why Join Us
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6">Built for <span className="mallu-accent italic">the community.</span></h2>
          <p className="text-lg text-green-100/50 max-w-2xl mx-auto font-light">
            We have created this community to make you feel you are not alone , it's completely free to join. You can find girls and boys here. Meet new people !
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={MessageCircle} 
            title="Active Chat" 
            description="Our general chat is a non-stop river of conversations and sharing of Sadness , Happiness , even in late nights"
            delay={0.1}
          />
          <FeatureCard 
            icon={Activity} 
            title="Active Voice Chat" 
            description="Our voice channels are always buzzing. Jump in for late-night chittar-chattar, singing, or just chill vibes with the makkals."
            delay={0.2}
          />
          <FeatureCard 
            icon={Users} 
            title="Toxic-Free" 
            description="Our moderation team ensures the space stays respectful, safe, and welcoming for everyone."
            delay={0.3}
          />
          <FeatureCard 
            icon={Share2} 
            title="Events" 
            description="Weekly movie nights, talent shows, and community games keep the energy high every single week."
            delay={0.4}
          />
          <FeatureCard 
            icon={Sparkles} 
            title="Rewards" 
            description="Custom roles, real money, and exclusive perks for active contributors and boosters."
            delay={0.5}
          />
          <FeatureCard 
            icon={Music} 
            title="Music & Vibe" 
            description="High-quality music bots and dedicated jam channels for the audiophiles in the community."
            delay={0.6}
          />
        </div>

        {/* Liquid Glass Banana Leaf CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <motion.a 
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center p-1"
          >
            {/* The "Leaf" Shape with Liquid Glass Effect */}
            <div className="relative w-80 h-32 md:w-[450px] md:h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-[100px_4px_100px_4px] shadow-[0_20px_50px_rgba(34,197,94,0.1)] flex items-center justify-center overflow-hidden transform-gpu">
               {/* Inner Glossy Effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               
               {/* Leaf Vein */}
               <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                 <div className="w-[80%] h-[1px] bg-white rotate-[-15deg]" />
               </div>

               <div className="relative z-10 flex flex-col items-center">
                 <span className="font-display font-bold text-2xl md:text-4xl uppercase tracking-tighter text-white group-hover:text-mallu-amber transition-colors">
                   Join our community!
                 </span>
                 <div className="flex items-center gap-2 mt-2">
                   <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                   <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Enter the Backwaters</span>
                 </div>
               </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-green-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.a>
        </motion.div>

        {/* Liquid Glass Social Icons */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="mt-12 flex justify-center gap-6 transform-gpu"
        >
          {/* Instagram Icon */}
          <motion.a
            variants={itemVariants}
            href="https://instagram.com/vaazhaa.in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            className="w-13 h-13 rounded-full glass-card flex items-center justify-center border border-white/10 shadow-lg relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Instagram size={22} className="text-white group-hover:text-pink-400 transition-colors" />
          </motion.a>

          {/* Discord Icon */}
          <motion.a
            variants={itemVariants}
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            className="w-13 h-13 rounded-full glass-card flex items-center justify-center border border-white/10 shadow-lg relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" 
              alt="Discord" 
              className="w-6 h-6 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </motion.a>

          {/* Share Icon */}
          <motion.button
            variants={itemVariants}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Vaazha official discord community !',
                  text: 'Join the #1 Kerala community on Discord!',
                  url: window.location.href,
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="w-13 h-13 rounded-full glass-card flex items-center justify-center border border-white/10 shadow-lg relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Share2 size={22} className="text-white group-hover:text-green-400 transition-colors" />
          </motion.button>
        </motion.div>
      </section>


      {/* Footer */}
      <footer className="px-8 py-12 border-t border-white/5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 bg-[#0a2318]/50 mb-8 glass-card">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
             {(discordData?.members?.slice(0, 3) || [1,2,3]).map((m, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-deep-forest">
                {m.avatar_url ? (
                   <img src={m.avatar_url} alt="Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${i === 1 ? 'from-blue-500' : i === 2 ? 'from-green-500' : 'from-yellow-500'} to-white/20`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-green-100/50 font-light">
            {discordData?.members?.length > 0 ? (
              <>Join <span className="text-white font-bold">{discordData.members[0].username}</span> and <span className="text-white font-bold">{discordData.members.length}+ others</span> in the server right now</>
            ) : (
              <>Join Salman, Anjali, and <span className="text-white font-bold">50+ others</span> vibing in the server right now</>
            )}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-2">
            <Trees className="text-mallu-amber" size={20} />
            <span className="font-display font-bold text-lg tracking-tighter uppercase">
              {discordData?.name || "VAAZHA"} 
            </span>
          </div>
          <div className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest">
            © 2026 VAAZHA | ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}

