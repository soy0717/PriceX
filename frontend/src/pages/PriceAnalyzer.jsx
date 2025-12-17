// Price Analyzer page

import { useState } from 'react';
import { Upload, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const PREDEFINED_CATEGORIES = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Garden",
  "Collectibles & Art",
  "Sporting Goods",
  "Automotive Parts",
  "Books & Media",
  "Toys & Hobbies",
  "Other"
];

function PriceAnalyzer() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  
  // State for the actual value submitted
  const [category, setCategory] = useState(''); 
  // State to control the dropdown selection
  const [categorySelect, setCategorySelect] = useState(''); 
  
  const [brand, setBrand] = useState('');
  
  // Changed default from 'New' to '' to force user selection
  const [condition, setCondition] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelectChange = (e) => {
    const selected = e.target.value;
    setCategorySelect(selected);
    
    // If "Other" is selected, clear the main category state so the user must type it.
    // If a preset is selected, set the category state immediately.
    if (selected === 'Other') {
      setCategory('');
    } else {
      setCategory(selected);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate AI Processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockBasePrice = Math.floor(Math.random() * (500 - 50 + 1) + 50);

    setResults({
      recommendedMin: (mockBasePrice * 0.95).toFixed(2),
      recommendedMax: (mockBasePrice * 1.25).toFixed(2),
      recommendedPrice: (mockBasePrice * 1.10).toFixed(2),
      confidence: '89%',
      marketTrend: 'Upward',
      competitorAvg: (mockBasePrice * 1.05).toFixed(2),
      demandScore: 'High',
      estimatedValue: mockBasePrice.toFixed(2)
    });

    setIsAnalyzing(false);
  };

  return (
    <div className="analyzer-page">
      <div className="page-header">
        <h1>Price Analyzer</h1>
        <p>Get AI-powered pricing recommendations</p>
      </div>

      <div className="analyzer-container">
        <Card className="analyzer-form-card">
          <h2 className="card-title">Upload Product Details</h2>

          <form onSubmit={handleAnalyze} className="analyzer-form">
            <div className="form-group">
              <label className="form-label">Product Image</label>
              <div className="image-upload">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Product preview" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="image-remove"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="upload-zone">
                    <Upload size={32} />
                    <p>Click to upload or drag and drop</p>
                    <span>PNG, JPG, GIF up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Row for Category and Brand */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Product Category</label>
                <div className="input-container">
                  <select
                    className="input"
                    value={categorySelect}
                    onChange={handleCategorySelectChange}
                    disabled={isAnalyzing}
                  >
                    <option value="" disabled>Select a category</option>
                    {PREDEFINED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                {/* Conditionally render input if "Other" is selected */}
                {categorySelect === 'Other' && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <Input
                      type="text"
                      placeholder="Enter specific category..."
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={isAnalyzing}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <Input
                  label="Brand/Manufacturer"
                  type="text"
                  placeholder="Enter brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            {/* Condition Dropdown */}
            <div className="form-group">
              <label className="form-label">Item Condition</label>
              <div className="input-container">
                <select 
                  className="input"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  disabled={isAnalyzing}
                >
                  <option value="" disabled>Select condition</option>
                  <option value="New">New (Sealed)</option>
                  <option value="Like New">Like New (Open Box)</option>
                  <option value="Good">Good (Minor Wear)</option>
                  <option value="Fair">Fair (Visible Wear)</option>
                  <option value="Poor">Poor (Parts Only)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Description</label>
              <textarea
                className="textarea"
                placeholder="Describe features, defects, or specific model details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isAnalyzing}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="large"
                isLoading={isAnalyzing}
                // Added !condition to validation so user must pick one
                disabled={!image || !category || !brand || !description || !condition}
              >
                {isAnalyzing ? 'Analyzing Market...' : 'Analyze Price'}
              </Button>
            </div>
          </form>
        </Card>

        {results && (
          <Card className="analyzer-results-card">
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={24} className="text-primary" />
              AI Valuation
            </h2>

            <div className="results-grid">
              <div className="result-item">
                <p className="result-label">Recommended Price</p>
                <p className="result-value primary">${results.recommendedPrice}</p>
                <p className="result-meta">Optimal listing price</p>
              </div>

              <div className="result-item">
                <p className="result-label">Estimated Market Range</p>
                <p className="result-value">
                  ${results.recommendedMin} - ${results.recommendedMax}
                </p>
                <p className="result-meta">Min - Max</p>
              </div>

              <div className="result-item">
                <p className="result-label">Confidence Score</p>
                <p className="result-value accent">{results.confidence}</p>
                <p className="result-meta">Based on image & data</p>
              </div>

              <div className="result-item">
                <p className="result-label">Market Trend</p>
                <p className="result-value success">{results.marketTrend}</p>
                <p className="result-meta">Last 30 days</p>
              </div>

              <div className="result-item">
                <p className="result-label">Competitor Average</p>
                <p className="result-value">${results.competitorAvg}</p>
                <p className="result-meta">Similar items sold</p>
              </div>

              <div className="result-item">
                <p className="result-label">Demand Level</p>
                <p className="result-value success">{results.demandScore}</p>
                <p className="result-meta">Sales velocity</p>
              </div>
            </div>

            <div className="results-actions">
              <Button variant="primary">Use This Price</Button>
              <Button variant="secondary">Save Analysis</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default PriceAnalyzer;