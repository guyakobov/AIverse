import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface SubmitToolFormProps {
  onBack: () => void;
}

export const SubmitToolForm: React.FC<SubmitToolFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      url: formData.get('url') as string,
      description: formData.get('description') as string,
      pricing: 'Freemium', // Default for now
      tags: [] // Default empty array
    };

    try {
      const response = await fetch('/api/submit-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit suggestion');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(true);
      // Wait a bit to show the "Submitting..." state
      setTimeout(() => setIsSubmitting(false), 800);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-4 animate-fade-in">
        <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
        <p className="text-slate-400 text-lg mb-8">
          Your recommendation has been submitted successfully to our database. We'll review it and add it to the directory soon.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Submit a Tool</h2>
          <p className="text-slate-400">
            Know an amazing AI tool we're missing? Fill out the details below.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Tool Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-600"
                placeholder="e.g. ChatGPT"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-slate-300">Category</label>
              <select
                id="category"
                name="category"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-slate-300">Website URL</label>
            <input
              type="url"
              id="url"
              name="url"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-600"
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-300">Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none placeholder-slate-600"
              placeholder="Briefly describe what this tool does..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send size={20} /> Submit Recommendation
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};