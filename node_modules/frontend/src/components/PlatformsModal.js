import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Check, AlertCircle, Loader } from 'lucide-react';
import { api } from '@/utils/api';

const PlatformsModal = ({ stackId, stackTitle, onClose }) => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/stacks/outcomes/${stackId}/platforms`);
        
        if (!response.ok) {
          throw new Error('Failed to load platforms');
        }
        
        const data = await response.json();
        setPlatforms(data.platforms || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (stackId) {
      fetchPlatforms();
    }
  }, [stackId]);

  const affiliatePlatforms = platforms.filter(p => p.has_affiliate);
  const nonAffiliatePlatforms = platforms.filter(p => !p.has_affiliate);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Platforms for {stackTitle}</h2>
            <p className="text-sm text-slate-400">All tools & platforms you need with affiliate opportunities</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="animate-spin text-amber-400 mr-2" size={24} />
              <span className="text-slate-300">Loading platforms...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300 flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Platforms with Affiliate Links */}
              {affiliatePlatforms.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="text-green-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">
                      Platforms with Affiliate Programs ({affiliatePlatforms.length})
                    </h3>
                  </div>
                  
                  <div className="grid gap-3">
                    {affiliatePlatforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className="group bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 rounded-lg p-4 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-semibold text-lg">{platform.name}</h4>
                              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                                Has Affiliate
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">{platform.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-slate-800/50 text-slate-300 px-2 py-1 rounded">
                                {platform.category}
                              </span>
                              <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded font-semibold">
                                Commission: {platform.commission}
                              </span>
                            </div>
                          </div>
                          <a
                            href={platform.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all group-hover:shadow-lg group-hover:shadow-emerald-500/30"
                          >
                            Visit & Apply
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Platforms without Affiliate Links (for reference) */}
              {nonAffiliatePlatforms.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-slate-500" size={20} />
                    <h3 className="text-lg font-semibold text-slate-300">
                      Other Essential Tools ({nonAffiliatePlatforms.length})
                    </h3>
                  </div>
                  
                  <div className="grid gap-3">
                    {nonAffiliatePlatforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className="group bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 rounded-lg p-4 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-slate-200 font-semibold text-lg">{platform.name}</h4>
                              <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded-full">
                                No Affiliate
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-2">{platform.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-slate-800/50 text-slate-400 px-2 py-1 rounded">
                                {platform.category}
                              </span>
                            </div>
                          </div>
                          <a
                            href={platform.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 flex-shrink-0 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                          >
                            Visit
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4 mt-6">
                <p className="text-sm text-amber-100">
                  <strong>💡 Tip:</strong> Start with the platforms that have affiliate programs to earn commissions. Many of these offer generous referral bonuses for new affiliates!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformsModal;
