// Notifications.jsx
import React, { useState } from 'react';
import { Send, Clock, Users, Plus, Trash2, Target, Workflow, BellRing } from 'lucide-react';

export default function Notifications() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('All Users');
  const [customAudienceName, setCustomAudienceName] = useState('');
  const [newAudienceRule, setNewAudienceRule] = useState('');

  const [audiences, setAudiences] = useState([
    { id: 1, name: 'All Users', type: 'system', rules: ['Everyone'] },
    { id: 2, name: 'Active Subscribers', type: 'system', rules: ['subscription_status = active'] },
    { id: 3, name: 'Free Trial Users', type: 'system', rules: ['trial_status = active'] },
    { id: 4, name: 'Inactive Users (30+ days)', type: 'system', rules: ['last_active_at > 30 days'] },
    { id: 5, name: 'Program: Sleep Mastery', type: 'custom', rules: ['program = sleep mastery', 'trial_status = active'] },
  ]);

  const [funnels, setFunnels] = useState([
    {
      id: 1,
      name: 'Trial Starter Funnel',
      trigger: 'Trial Started',
      scope: 'global',
      program: '',
      audience: 'Free Trial Users',
      steps: [
        { id: 1, dayOffset: 3, title: 'How are you feeling so far?', message: 'Keep momentum. Try your first focus session today.' },
        { id: 2, dayOffset: 5, title: 'Unlock your next milestone', message: 'You are close to habit lock-in. Continue with day 5 content.' },
      ],
      status: 'Active',
    },
  ]);

  const [newFunnel, setNewFunnel] = useState({
    name: '',
    trigger: 'Trial Started',
    scope: 'global',
    program: '',
    audience: 'Free Trial Users',
  });
  const [newFunnelSteps, setNewFunnelSteps] = useState([{ id: 1, dayOffset: 3, title: '', message: '' }]);

  const addAudience = () => {
    const name = customAudienceName.trim();
    const rule = newAudienceRule.trim();

    if (!name || !rule) {
      return;
    }

    setAudiences((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        type: 'custom',
        rules: [rule],
      },
    ]);
    setCustomAudienceName('');
    setNewAudienceRule('');
  };

  const removeAudience = (audienceId) => {
    setAudiences((prev) => prev.filter((audience) => audience.id !== audienceId || audience.type === 'system'));
    if (selectedAudience === audiences.find((a) => a.id === audienceId)?.name) {
      setSelectedAudience('All Users');
    }
  };

  const addStep = () => {
    setNewFunnelSteps((prev) => [...prev, { id: Date.now(), dayOffset: prev.length + 1, title: '', message: '' }]);
  };

  const updateStep = (stepId, field, value) => {
    setNewFunnelSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)));
  };

  const removeStep = (stepId) => {
    setNewFunnelSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  const saveFunnel = () => {
    if (!newFunnel.name.trim() || newFunnelSteps.length === 0) {
      return;
    }

    const hasInvalidStep = newFunnelSteps.some((step) => !step.title.trim() || !step.message.trim());
    if (hasInvalidStep) {
      return;
    }

    setFunnels((prev) => [
      {
        id: Date.now(),
        ...newFunnel,
        steps: newFunnelSteps,
        status: 'Active',
      },
      ...prev,
    ]);

    setNewFunnel({
      name: '',
      trigger: 'Trial Started',
      scope: 'global',
      program: '',
      audience: 'Free Trial Users',
    });
    setNewFunnelSteps([{ id: Date.now(), dayOffset: 3, title: '', message: '' }]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Push Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Send New Notification</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full border p-2 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                {audiences.map((audience) => (
                  <option key={audience.id} value={audience.name}>{audience.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Define reusable audience filters below and target them instantly.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
                placeholder="New Program Available!" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
                rows="4" 
                placeholder="Unlock specific milestones today..."
              ></textarea>
            </div>

            <div className="flex space-x-3 pt-4">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Now</span>
              </button>
              <button className="flex-1 border text-gray-700 bg-gray-50 py-2 rounded-lg font-medium hover:bg-gray-100 flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Audience Builder</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Audience Name</label>
                  <input
                    type="text"
                    value={customAudienceName}
                    onChange={(e) => setCustomAudienceName(e.target.value)}
                    placeholder="e.g. Day 3 Trial Users"
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rule</label>
                  <input
                    type="text"
                    value={newAudienceRule}
                    onChange={(e) => setNewAudienceRule(e.target.value)}
                    placeholder="trial_day = 3 and program = sleep"
                    className="w-full border p-2 rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={addAudience}
                className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" /> Add Audience
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {audiences.map((audience) => (
                <div key={audience.id} className="p-3 border rounded-lg bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{audience.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{audience.rules.join(' • ')}</p>
                    </div>
                    {audience.type === 'custom' ? (
                      <button onClick={() => removeAudience(audience.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">System</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-purple-600" />
            Automated Funnel Builder
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Funnel Name</label>
              <input
                type="text"
                value={newFunnel.name}
                onChange={(e) => setNewFunnel((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Trial Nurture - Sleep Program"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Event</label>
                <select
                  value={newFunnel.trigger}
                  onChange={(e) => setNewFunnel((prev) => ({ ...prev, trigger: e.target.value }))}
                  className="w-full border p-2 rounded-md bg-gray-50"
                >
                  <option>Trial Started</option>
                  <option>Program Enrolled</option>
                  <option>No Activity 2 Days</option>
                  <option>Milestone Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <select
                  value={newFunnel.audience}
                  onChange={(e) => setNewFunnel((prev) => ({ ...prev, audience: e.target.value }))}
                  className="w-full border p-2 rounded-md bg-gray-50"
                >
                  {audiences.map((audience) => (
                    <option key={`funnel-aud-${audience.id}`}>{audience.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                <select
                  value={newFunnel.scope}
                  onChange={(e) => setNewFunnel((prev) => ({ ...prev, scope: e.target.value }))}
                  className="w-full border p-2 rounded-md bg-gray-50"
                >
                  <option value="global">Global Flow</option>
                  <option value="program">Program-specific Flow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program (optional)</label>
                <select
                  disabled={newFunnel.scope !== 'program'}
                  value={newFunnel.program}
                  onChange={(e) => setNewFunnel((prev) => ({ ...prev, program: e.target.value }))}
                  className="w-full border p-2 rounded-md bg-gray-50 disabled:opacity-60"
                >
                  <option value="">Select program</option>
                  <option value="30-Day Sleep Mastery">30-Day Sleep Mastery</option>
                  <option value="5-Day Focus Sprint">5-Day Focus Sprint</option>
                  <option value="21-Day Anxiety Reset">21-Day Anxiety Reset</option>
                </select>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-purple-50/50 border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-purple-900">Funnel Steps</h3>
                <button onClick={addStep} className="text-xs px-2.5 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700">+ Add Step</button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {newFunnelSteps.map((step, index) => (
                  <div key={step.id} className="border rounded-md bg-white p-3">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                      <div className="md:col-span-2">
                        <label className="text-xs text-gray-500">Day</label>
                        <input
                          type="number"
                          min="0"
                          value={step.dayOffset}
                          onChange={(e) => updateStep(step.id, 'dayOffset', Number(e.target.value))}
                          className="w-full border p-2 rounded-md text-sm"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="text-xs text-gray-500">Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                          placeholder={`Step ${index + 1} title`}
                          className="w-full border p-2 rounded-md text-sm"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label className="text-xs text-gray-500">Message</label>
                        <input
                          type="text"
                          value={step.message}
                          onChange={(e) => updateStep(step.id, 'message', e.target.value)}
                          placeholder="Message content"
                          className="w-full border p-2 rounded-md text-sm"
                        />
                      </div>
                      <div className="md:col-span-1 flex items-end justify-end">
                        {newFunnelSteps.length > 1 && (
                          <button onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-600 p-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={saveFunnel} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700">
              <BellRing className="w-4 h-4" /> Save Funnel
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Active Automated Funnels
          </h2>

          <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
            {funnels.map((funnel) => (
              <div key={funnel.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">{funnel.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Trigger: {funnel.trigger}</p>
                    <p className="text-xs text-gray-500">Audience: {funnel.audience}</p>
                    <p className="text-xs text-gray-500">
                      Scope: {funnel.scope === 'global' ? 'Global' : `Program - ${funnel.program || 'Not set'}`}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{funnel.status}</span>
                </div>

                <div className="mt-3 space-y-2">
                  {funnel.steps.map((step) => (
                    <div key={`${funnel.id}-step-${step.id}`} className="rounded-md border border-gray-200 bg-white p-2">
                      <p className="text-xs font-semibold text-gray-700">Day {step.dayOffset}: {step.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{step.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent History</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-800">New Feature Released ✨</h4>
              <span className="text-xs text-gray-500">2 hrs ago</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Check out our new text-based lessons in the app!</p>
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Sent to {selectedAudience}</span>
              </div>
              <div className="text-green-600 font-medium">98% Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
