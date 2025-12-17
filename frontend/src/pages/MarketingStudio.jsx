// Marketing Studio page

import { useState } from 'react';
import { 
  Zap, 
  Layout, 
  Mail, 
  Image as ImageIcon, 
  Clapperboard, 
  Copy, 
  RotateCw, 
  Check 
} from 'lucide-react';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// --- MOCK BACKEND SERVICE ---
const generateCampaignContent = async (payload) => {
  console.log("🚀 Sending payload to Backend:", payload);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock Logic based on templateId
  if (payload.templateId === 1) { // Social Media
    return {
      success: true,
      data: {
        "Viral Tweet": `🚨 ${payload.campaignName} is officially here! Don't miss out. ${payload.customFields.hashtags || '#trend'}`,
        "Instagram Caption": `POV: You just found the perfect solution for ${payload.targetAudience}. ✨ Link in bio!`,
        "LinkedIn Professional": `We are excited to announce ${payload.campaignName}, designed specifically to help ${payload.targetAudience} achieve more.`
      }
    };
  } 
  
  if (payload.templateId === 2) { // Email
    return {
      success: true,
      data: {
        "Subject Line A": `Question for ${payload.targetAudience}...`,
        "Subject Line B": `Unlock exclusive access to ${payload.campaignName}`,
        "Email Body Preview": `Hi ${payload.customFields.senderName || 'there'}, we noticed you've been looking for...`
      }
    };
  }

  // Fallback
  return {
    success: true,
    data: {
      "Variation A": `Get ${payload.campaignName} today for just $${payload.price}!`,
      "Variation B": `Attention ${payload.targetAudience}: The wait is over.`,
      "Variation C": `Minimalist ad copy focusing on ${payload.campaignName}.`
    }
  };
};

function MarketingStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [campaignName, setCampaignName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [price, setPrice] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState(null);
  const [customFields, setCustomFields] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);

  const templates = [
    { 
      id: 1, 
      name: 'Social Media', 
      icon: <Layout size={32} />, 
      description: 'Instagram & LinkedIn Posts',
      fields: [
        { name: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'LinkedIn', 'Twitter/X', 'Facebook'] },
        { name: 'hashtags', label: 'Focus Hashtags', type: 'text', placeholder: '#summer #sale' }
      ]
    },
    { 
      id: 2, 
      name: 'Email Campaign', 
      icon: <Mail size={32} />, 
      description: 'Newsletters & Cold Outreach',
      fields: [
        { name: 'subjectLine', label: 'Subject Line Idea', type: 'text', placeholder: 'Open for a surprise...' },
        { name: 'senderName', label: 'Sender Name', type: 'text', placeholder: 'John from Marketing' }
      ]
    },
    { 
      id: 3, 
      name: 'Banner Ad', 
      icon: <ImageIcon size={32} />, 
      description: 'Display Ads & Web Banners',
      fields: [
        { name: 'dimensions', label: 'Dimensions', type: 'select', options: ['300x250 (Medium Rec)', '728x90 (Leaderboard)', '1080x1080 (Square)'] },
        { name: 'ctaText', label: 'Call to Action (CTA)', type: 'text', placeholder: 'Shop Now' }
      ]
    },
    { 
      id: 4, 
      name: 'Video Script', 
      icon: <Clapperboard size={32} />, 
      description: 'TikTok & Reels Scripts',
      fields: [
        { name: 'duration', label: 'Duration', type: 'select', options: ['15 Seconds', '30 Seconds', '60 Seconds'] },
        { name: 'tone', label: 'Tone', type: 'select', options: ['Funny', 'Professional', 'Emotional', 'Hype'] }
      ]
    },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomFields({});
    setGeneratedAds(null);
  };

  const handleCustomFieldChange = (fieldName, value) => {
    setCustomFields(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedAds(null);

    const payload = {
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      campaignName,
      targetAudience,
      price,
      customFields
    };

    try {
      const response = await generateCampaignContent(payload);
      if (response.success) {
        setGeneratedAds(response.data);
      }
    } catch (error) {
      console.error("Failed to generate ads:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="studio-page">
      <div className="page-header">
        <h1>Marketing Studio</h1>
        <p>Generate compelling ad campaigns</p>
      </div>

      <div className="studio-container">
        {/* 1. Template Selection */}
        <Card className="templates-card">
          <h2 className="card-title">Select Template</h2>
          <div className="templates-grid">
            {templates.map(template => {
              const isSelected = selectedTemplate?.id === template.id;
              
              // Dynamic style to fix contrast issues in Dark/Light themes
              const itemStyle = {
                // If selected, use bright background but force DARK text (contrast fix)
                // If unselected, use Surface background and Theme text (light in dark mode)
                backgroundColor: isSelected ? 'var(--color-primary-lighter)' : 'var(--color-surface)',
                color: isSelected ? '#111827' : 'var(--color-text)', 
                borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                
                // Ensure layout properties are maintained
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--shadow-lg)' : 'none'
              };

              // Subtext needs to follow the parent text color to be visible
              const subtextStyle = {
                fontSize: '0.75rem',
                opacity: 0.8, // Use opacity instead of color to maintain contrast relative to parent
                margin: 0
              };

              return (
                <button
                  key={template.id}
                  type="button"
                  style={itemStyle}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="template-icon">{template.icon}</div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{template.name}</h3>
                  <p style={subtextStyle}>{template.description}</p>
                </button>
              );
            })}
          </div>
        </Card>

        {/* 2. Configuration Form */}
        {selectedTemplate && (
          <Card className="campaign-form-card">
            <h2 className="card-title">Configure {selectedTemplate.name}</h2>
            
            <form onSubmit={handleGenerate} className="campaign-form">
              <div className="form-group">
                <Input
                  label="Campaign Name"
                  placeholder="e.g., Summer Sale 2024"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Target Audience"
                  placeholder="e.g., Young professionals, Students"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              {/* Dynamic Fields Grid */}
              <div className="controls-row">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.name} className="form-group" style={{ width: '100%' }}>
                    {field.type === 'select' ? (
                      <div className="input-wrapper">
                        <label className="input-label">{field.label}</label>
                        <div className="input-container">
                          <select
                            className="input"
                            onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                            disabled={isGenerating}
                            defaultValue=""
                          >
                            <option value="" disabled>Select {field.label}</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <Input
                        label={field.label}
                        placeholder={field.placeholder}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                        disabled={isGenerating}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="form-group">
                <Input
                  label="Estimated Price / Budget"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="form-actions">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  isLoading={isGenerating}
                  disabled={!campaignName || !targetAudience || !price}
                >
                  {isGenerating ? 'Generating Ideas...' : `Generate ${selectedTemplate.name}`}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* 3. Loading State (Independent) */}
        {isGenerating && !generatedAds && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
             <LoadingSpinner size="large" />
          </div>
        )}

        {/* 4. Results Display */}
        {generatedAds && (
          <Card className="results-card">
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={24} className="text-warning" />
              Generated Results
            </h2>

            <div className="ads-list">
              {Object.entries(generatedAds).map(([key, ad], index) => (
                <div key={key} className="ad-item">
                  <div className="ad-preview">
                    <strong>{key}</strong>
                    <p>{ad}</p>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="small" 
                    onClick={() => handleCopy(ad, index)}
                    icon={copiedIndex === index ? Check : Copy}
                  >
                    {copiedIndex === index ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              ))}
            </div>

            <div className="results-actions">
              <Button variant="primary">Save Campaign</Button>
              <Button 
                variant="secondary" 
                onClick={() => setGeneratedAds(null)}
              >
                <RotateCw size={16} style={{ marginRight: '8px' }}/>
                Reset
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MarketingStudio;