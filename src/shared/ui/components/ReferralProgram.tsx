import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, Share2, Award, Crown } from 'lucide-react';
import type { ReferralTier } from '../../types/config';

interface ReferralProgramProps {
  referralCode: string;
  referralLink: string;
  currentReferrals: number;
  tiers: ReferralTier[];
  onShare?: (platform: 'facebook' | 'twitter' | 'instagram' | 'email') => void;
}

export function ReferralProgram({
  referralCode,
  referralLink,
  currentReferrals,
  tiers,
  onShare
}: ReferralProgramProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Find current tier based on referral count
  const currentTier = [...tiers].reverse().find(tier => 
    currentReferrals >= tier.referralsNeeded
  ) || tiers[0];

  // Find next tier to achieve
  const nextTier = tiers.find(tier => 
    currentReferrals < tier.referralsNeeded
  );

  const progressPercentage = nextTier
    ? (currentReferrals / nextTier.referralsNeeded) * 100
    : 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4"
        >
          <Gift size={20} className="text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            Referral Rewards Program
          </span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Earn Rewards for Spreading the Word
        </h2>
        <p className="text-lg text-gray-600">
          Refer friends, family, and colleagues. Everyone wins.
        </p>
      </div>

      {/* Current Status Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Your Current Tier</p>
            <div className="flex items-center space-x-3">
              {currentTier.id === 'bronze' && <Gift size={32} className="text-white" />}
              {currentTier.id === 'silver' && <Award size={32} className="text-white" />}
              {currentTier.id === 'gold' && <Crown size={32} className="text-white" />}
              <h3 className="text-3xl font-bold">{currentTier.name}</h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Total Referrals</p>
            <p className="text-5xl font-bold">{currentReferrals}</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentReferrals} referred</span>
              <span>{nextTier.referralsNeeded - currentReferrals} more to {nextTier.name}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        )}

        {/* Referral Code */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <p className="text-sm text-blue-100 mb-2">Your Referral Code</p>
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-2xl font-mono font-bold tracking-wider">
              {referralCode}
            </code>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tier Breakdown */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Referral Tiers & Rewards
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const isCurrentTier = currentTier.id === tier.id;
            const isAchieved = currentReferrals >= tier.referralsNeeded;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all
                  ${isCurrentTier 
                    ? `${tier.color} ${tier.bgColor} shadow-xl scale-105` 
                    : isAchieved
                      ? 'bg-gray-50 border-gray-300'
                      : 'bg-white border-gray-200'
                  }
                `}
              >
                {isCurrentTier && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                    Current Tier
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3
                    ${isCurrentTier ? 'bg-white' : tier.bgColor}
                  `}>
                    {tier.id === 'bronze' && (
                      <Gift 
                        size={32} 
                        className={isCurrentTier ? tier.color.replace('border-', 'text-') : 'text-gray-400'} 
                      />
                    )}
                    {tier.id === 'silver' && (
                      <Award 
                        size={32} 
                        className={isCurrentTier ? tier.color.replace('border-', 'text-') : 'text-gray-400'} 
                      />
                    )}
                    {tier.id === 'gold' && (
                      <Crown 
                        size={32} 
                        className={isCurrentTier ? tier.color.replace('border-', 'text-') : 'text-gray-400'} 
                      />
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {tier.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {tier.referralsNeeded} referral{tier.referralsNeeded !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="space-y-2">
                  {tier.rewards.map((reward, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{reward}</span>
                    </div>
                  ))}
                </div>

                {tier.currentUserCount && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      {tier.currentUserCount.toLocaleString()} members in this tier
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Share Buttons */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Share Your Referral Link
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { platform: 'facebook' as const, label: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
            { platform: 'twitter' as const, label: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600' },
            { platform: 'instagram' as const, label: 'Instagram', color: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600' },
            { platform: 'email' as const, label: 'Email', color: 'bg-gray-700 hover:bg-gray-800' }
          ].map(({ platform, label, color }) => (
            <button
              key={platform}
              onClick={() => onShare?.(platform)}
              className={`
                px-4 py-3 rounded-lg text-white font-semibold transition-colors
                flex items-center justify-center space-x-2 ${color}
              `}
            >
              <Share2 size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Share Your Code',
              description: 'Send your unique referral code or link to friends and family'
            },
            {
              step: '2',
              title: 'They Book a Service',
              description: 'When they schedule using your code, you both get rewarded'
            },
            {
              step: '3',
              title: 'Unlock Rewards',
              description: 'Earn credits, priority booking, and VIP perks as you refer more'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
