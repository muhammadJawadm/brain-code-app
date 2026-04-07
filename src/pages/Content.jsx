import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FileAudio, FileVideo, FileText, FileImage, Target, UploadCloud, Edit3, Trash2, Plus, Bold, Italic, List, ListOrdered, Image as ImageIcon, X, CalendarDays } from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 border-b pb-2 mb-3">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      >
        <Italic size={16} />
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1.5 rounded hover:bg-gray-100 font-semibold ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-gray-100 font-semibold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      >
        H2
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
      >
        <ListOrdered size={16} />
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1"></div>
      <button
        onClick={() => {
           // For full implementation, use tiptap image extension and standard upload logic
           alert("Image upload dialog would open here.");
        }}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
        title="Add Image"
      >
        <ImageIcon size={16} />
      </button>
    </div>
  );
};

export default function Content() {
  const [activeTab, setActiveTab] = useState('audio');
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [categories, setCategories] = useState(['Focus', 'Sleep', 'Energy', 'Anxiety', 'Meditation']);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [audioTextFields, setAudioTextFields] = useState(['']);
  const [videoTextFields, setVideoTextFields] = useState(['']);
  const [textPageSections, setTextPageSections] = useState(['']);

  const createDayPlan = (day) => ({
    day,
    releaseDay: day,
    audioFile: '',
    videoFile: '',
    pdfFiles: [],
    imageFiles: [],
    audioTexts: [''],
    videoTexts: [''],
    freeTexts: [''],
  });

  const [programForm, setProgramForm] = useState({
    title: '',
    category: '',
    goal: '',
    description: '',
    totalDays: 5,
  });
  const [dayPlans, setDayPlans] = useState(() => Array.from({ length: 5 }, (_, idx) => createDayPlan(idx + 1)));
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: '30-Day Sleep Mastery',
      description: 'Unlocks standard content daily for 30 days.',
      category: 'Sleep',
      totalDays: 30,
      enrolled: '12k',
      linkedAssets: 35,
      dayPlans: Array.from({ length: 30 }, (_, idx) => createDayPlan(idx + 1)),
    },
  ]);

  useEffect(() => {
    const days = Math.max(1, Number(programForm.totalDays) || 1);
    setDayPlans((prev) => {
      const adjusted = Array.from({ length: days }, (_, idx) => prev[idx] ?? createDayPlan(idx + 1));
      return adjusted.map((plan, idx) => ({ ...plan, day: idx + 1, releaseDay: plan.releaseDay || idx + 1 }));
    });
  }, [programForm.totalDays]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your rich text content here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm xl:prose-base focus:outline-none min-h-[250px] p-4 text-gray-800',
      },
    },
  });

  const tabs = [
    { id: 'audio', label: 'Audio', icon: <FileAudio size={16} className="mr-2"/> },
    { id: 'video', label: 'Video', icon: <FileVideo size={16} className="mr-2"/> },
    { id: 'pdfs', label: 'PDFs', icon: <FileText size={16} className="mr-2"/> },
    { id: 'images', label: 'JPG Images', icon: <FileImage size={16} className="mr-2"/> },
    { id: 'text', label: 'Text Pages', icon: <FileText size={16} className="mr-2"/> },
    { id: 'programs', label: 'Programs', icon: <Target size={16} className="mr-2"/> },
    { id: 'categories', label: 'Categories', icon: <List size={16} className="mr-2"/> },
  ];

  const addCategory = () => {
    const value = newCategoryName.trim();
    if (!value || categories.includes(value)) {
      return;
    }
    setCategories((prev) => [...prev, value]);
    setNewCategoryName('');
  };

  const removeCategory = (index) => {
    setCategories((prev) => prev.filter((_, idx) => idx !== index));
  };

  const saveEditedCategory = () => {
    const value = editingCategoryName.trim();
    if (!value || editingCategoryIndex === null) {
      return;
    }
    setCategories((prev) => prev.map((cat, idx) => (idx === editingCategoryIndex ? value : cat)));
    setEditingCategoryIndex(null);
    setEditingCategoryName('');
  };

  const updateSimpleTextField = (setter, index, value) => {
    setter((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const addSimpleTextField = (setter) => {
    setter((prev) => [...prev, '']);
  };

  const removeSimpleTextField = (setter, index) => {
    setter((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateDayPlan = (dayIndex, updater) => {
    setDayPlans((prev) => prev.map((plan, idx) => (idx === dayIndex ? updater(plan) : plan)));
  };

  const updateNestedTextField = (dayIndex, key, textIndex, value) => {
    updateDayPlan(dayIndex, (plan) => ({
      ...plan,
      [key]: plan[key].map((item, idx) => (idx === textIndex ? value : item)),
    }));
  };

  const addNestedTextField = (dayIndex, key) => {
    updateDayPlan(dayIndex, (plan) => ({ ...plan, [key]: [...plan[key], ''] }));
  };

  const removeNestedTextField = (dayIndex, key, textIndex) => {
    updateDayPlan(dayIndex, (plan) => ({ ...plan, [key]: plan[key].filter((_, idx) => idx !== textIndex) }));
  };

  const handleDayFileChange = (dayIndex, key, files, multiple = false) => {
    const names = Array.from(files || []).map((file) => file.name);
    updateDayPlan(dayIndex, (plan) => ({
      ...plan,
      [key]: multiple ? [...plan[key], ...names] : (names[0] || ''),
    }));
  };

  const saveProgram = () => {
    if (!programForm.title.trim()) {
      return;
    }

    const nextProgram = {
      id: Date.now(),
      title: programForm.title.trim(),
      description: programForm.description.trim() || 'No description provided yet.',
      category: programForm.category || 'Uncategorized',
      totalDays: dayPlans.length,
      enrolled: '0',
      linkedAssets: dayPlans.reduce((count, day) => {
        const dayAssets = Number(Boolean(day.audioFile)) + Number(Boolean(day.videoFile)) + day.pdfFiles.length + day.imageFiles.length;
        return count + dayAssets;
      }, 0),
      dayPlans,
    };

    setPrograms((prev) => [nextProgram, ...prev]);
    setIsProgramModalOpen(false);
    setProgramForm({ title: '', category: '', goal: '', description: '', totalDays: 5 });
    setDayPlans(Array.from({ length: 5 }, (_, idx) => createDayPlan(idx + 1)));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
      </div>
      
      {/* Enhanced Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto scroolbar-hide">
        {tabs.map((tab) => (
          <button 
             key={tab.id} 
             onClick={() => setActiveTab(tab.id)}
             className={`flex flex-row items-center px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
               activeTab === tab.id 
                 ? 'border-[#C4963D] text-[#C4963D] bg-[#C4963D]/5' 
                 : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
             }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px]">
        {/* --- AUDIO TAB --- */}
        {activeTab === 'audio' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Manage Audio Sessions</h3>
                  <p className="text-gray-500 text-sm mt-1">Upload and manage audio files (MP3, WAV, AAC).</p>
               </div>
               <button className="bg-[#C4963D] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#C4963D]/90 flex items-center transition-all">
                 <Plus size={18} className="mr-2"/> Upload Audio
               </button>
            </div>
            
            {/* Upload Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                 <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <UploadCloud size={24} className="text-[#C4963D]" />
                 </div>
                 <p className="text-sm font-medium text-gray-900">Click to upload Audio</p>
                 <p className="text-xs text-gray-500 mt-1">MP3, WAV, or AAC up to 50MB</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                 <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <ImageIcon size={24} className="text-[#C4963D]" />
                 </div>
                 <p className="text-sm font-medium text-gray-900">Click to upload Thumbnail</p>
                 <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all">
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                <select className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all">
                  <option value="">Select a mood</option>
                  <option value="Happy">😊 Happy</option>
                  <option value="Relaxed">😌 Relaxed</option>
                  <option value="Focused">🎯 Focused</option>
                  <option value="Energetic">⚡ Energetic</option>
                  <option value="Calm">🧘 Calm</option>
                  <option value="Sleepy">😴 Sleepy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal / Objective</label>
                <input type="text" placeholder="e.g., Improve deep sleep, Reduce stress..." className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all" />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">Audio Description</label>
              <textarea 
                rows="3" 
                placeholder="Enter a brief description for this audio session..." 
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="mb-8 border border-amber-200 bg-amber-50/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-amber-900">Text Below Audio</h4>
                <button
                  onClick={() => addSimpleTextField(setAudioTextFields)}
                  className="text-xs px-3 py-1.5 rounded-md bg-amber-600 text-white hover:bg-amber-700 flex items-center"
                >
                  <Plus size={14} className="mr-1"/> Add Text Field
                </button>
              </div>
              <div className="space-y-3">
                {audioTextFields.map((field, idx) => (
                  <div key={`audio-field-${idx}`} className="flex gap-2">
                    <textarea
                      rows="2"
                      value={field}
                      onChange={(event) => updateSimpleTextField(setAudioTextFields, idx, event.target.value)}
                      placeholder={`Audio supporting text block ${idx + 1}`}
                      className="flex-1 border border-amber-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all resize-none"
                    />
                    {audioTextFields.length > 1 && (
                      <button
                        onClick={() => removeSimpleTextField(setAudioTextFields, idx)}
                        className="self-start p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center p-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                      <FileAudio size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Deep Focus Beta Session {item}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Category: Focus • 14.2 MB • MP3</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={18}/></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIDEO TAB --- */}
        {activeTab === 'video' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Manage Video Lessons</h3>
                  <p className="text-gray-500 text-sm mt-1">Upload MP4, MOV files for premium tutorials.</p>
               </div>
               <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 flex items-center transition-all">
                 <Plus size={18} className="mr-2"/> Upload Video
               </button>
            </div>

            {/* Upload Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                 <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <UploadCloud size={24} className="text-indigo-500" />
                 </div>
                 <p className="text-sm font-medium text-gray-900">Click to upload Video</p>
                 <p className="text-xs text-gray-500 mt-1">MP4 or MOV up to 500MB</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                 <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <ImageIcon size={24} className="text-indigo-500" />
                 </div>
                 <p className="text-sm font-medium text-gray-900">Click to upload Thumbnail</p>
                 <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all">
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                <select className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all">
                  <option value="">Select a mood</option>
                  <option value="Happy">😊 Happy</option>
                  <option value="Relaxed">😌 Relaxed</option>
                  <option value="Focused">🎯 Focused</option>
                  <option value="Energetic">⚡ Energetic</option>
                  <option value="Calm">🧘 Calm</option>
                  <option value="Sleepy">😴 Sleepy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal / Objective</label>
                <input type="text" placeholder="e.g., Guide for healthy eating, Improve posture..." className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Description</label>
              <textarea 
                rows="3" 
                placeholder="Enter a brief description for this video lesson..." 
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="mb-8 border border-indigo-200 bg-indigo-50/40 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-indigo-900">Text Below Video</h4>
                <button
                  onClick={() => addSimpleTextField(setVideoTextFields)}
                  className="text-xs px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 flex items-center"
                >
                  <Plus size={14} className="mr-1"/> Add Text Field
                </button>
              </div>
              <div className="space-y-3">
                {videoTextFields.map((field, idx) => (
                  <div key={`video-field-${idx}`} className="flex gap-2">
                    <textarea
                      rows="2"
                      value={field}
                      onChange={(event) => updateSimpleTextField(setVideoTextFields, idx, event.target.value)}
                      placeholder={`Video supporting text block ${idx + 1}`}
                      className="flex-1 border border-indigo-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all resize-none"
                    />
                    {videoTextFields.length > 1 && (
                      <button
                        onClick={() => removeSimpleTextField(setVideoTextFields, idx)}
                        className="self-start p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid for videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1,2,3].map(item => (
                 <div key={item} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                   <div className="h-32 bg-gray-900 relative flex items-center justify-center">
                     <FileVideo className="text-white/30" size={32} />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="bg-white/90 p-2 rounded text-gray-900 hover:bg-white"><Edit3 size={16}/></button>
                        <button className="bg-red-500/90 p-2 rounded text-white hover:bg-red-500"><Trash2 size={16}/></button>
                     </div>
                   </div>
                   <div className="p-4">
                     <h4 className="font-semibold text-gray-900 text-sm">Morning Routine Intro {item}</h4>
                     <p className="text-xs text-gray-500 mt-1">12:34 • 145 MB</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* --- PDF TAB --- */}
        {activeTab === 'pdfs' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Manage PDF Resources</h3>
                <p className="text-gray-500 text-sm mt-1">Upload PDF guides and worksheets to pair with media content.</p>
              </div>
              <button className="bg-slate-700 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-slate-800 flex items-center transition-all">
                <Plus size={18} className="mr-2"/> Upload PDF
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer mb-6">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <UploadCloud size={24} className="text-slate-700" />
              </div>
              <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF up to 30MB</p>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center p-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sleep Checklist {item}.pdf</p>
                      <p className="text-xs text-gray-500 mt-0.5">Category: Sleep • 2.4 MB • PDF</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={18}/></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- JPG IMAGES TAB --- */}
        {activeTab === 'images' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Manage JPG Images</h3>
                <p className="text-gray-500 text-sm mt-1">Upload visual assets to display alongside audio/video content.</p>
              </div>
              <button className="bg-rose-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-rose-700 flex items-center transition-all">
                <Plus size={18} className="mr-2"/> Upload JPG
              </button>
            </div>

            <div className="border-2 border-dashed border-rose-300 rounded-xl p-8 flex flex-col items-center justify-center bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer mb-6">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <UploadCloud size={24} className="text-rose-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">JPG up to 15MB</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="h-28 bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center">
                    <FileImage size={30} className="text-rose-600" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm text-gray-900 line-clamp-1">focus-visual-{item}.jpg</p>
                    <p className="text-xs text-gray-500 mt-1">1.8 MB</p>
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                      <button className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TEXT TAB WITH RICH EDITOR --- */}
        {activeTab === 'text' && (
          <div className="p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Create Text Content</h3>
                    <p className="text-gray-500 text-sm mt-1">Write articles, blog posts, or supplementary text lessons.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all">
                      <option value="">Select a category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Goal / Objective</label>
                    <input type="text" placeholder="e.g., Deepen understanding, Inform technique..." className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                  <input type="text" placeholder="Entering the Alpha State" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content Body</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-[#C4963D]/50 focus-within:border-[#C4963D] transition-all">
                    <div className="bg-white px-2 pt-2">
                       <MenuBar editor={editor} />
                    </div>
                    <div className="bg-white px-2 pb-2">
                      <EditorContent editor={editor} className="bg-white" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-green-700 font-medium transition-all">
                    Publish Page
                  </button>
                </div>

                <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-emerald-900">Flexible Page Text Sections</h4>
                    <button
                      onClick={() => addSimpleTextField(setTextPageSections)}
                      className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center"
                    >
                      <Plus size={14} className="mr-1"/> Add Text Block
                    </button>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">Use multiple text blocks to place content below video/audio sections in any order.</p>
                  <div className="space-y-3">
                    {textPageSections.map((section, idx) => (
                      <div key={`text-page-section-${idx}`} className="flex gap-2">
                        <textarea
                          rows="2"
                          value={section}
                          onChange={(event) => updateSimpleTextField(setTextPageSections, idx, event.target.value)}
                          placeholder={`Flexible text block ${idx + 1}`}
                          className="flex-1 border border-emerald-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all resize-none"
                        />
                        {textPageSections.length > 1 && (
                          <button
                            onClick={() => removeSimpleTextField(setTextPageSections, idx)}
                            className="self-start p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar for text items */}
            <div className="w-full lg:w-80 border-l border-gray-100 pl-0 lg:pl-6">
              <h4 className="font-semibold text-gray-900 mb-4">Published Pages</h4>
              <div className="space-y-3">
                {['Understanding Frequencies', 'Diet & Sleep', 'Guided Mediation Overview'].map((title, i) => (
                  <div key={i} className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium text-sm text-gray-800 line-clamp-1">{title}</h5>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">Live</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                       <span className="text-xs text-gray-500">Updated 2d ago</span>
                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Edit3 size={14} className="text-blue-500 hover:text-blue-700"/>
                         <Trash2 size={14} className="text-red-500 hover:text-red-700"/>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CATEGORIES TAB --- */}
        {activeTab === 'categories' && (
          <div className="p-6">
             <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Categories & Tags</h3>
                  <p className="text-gray-500 text-sm mt-1">Organize and tag content to improve discoverability.</p>
               </div>
               <button className="bg-[#C4963D] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#C4963D]/90 flex items-center transition-all">
                 <Plus size={18} className="mr-2"/> Add Category
               </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Create New Category</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(event) => setNewCategoryName(event.target.value)}
                  placeholder="e.g., Breathwork"
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none transition-all"
                />
                <button
                  onClick={addCategory}
                  className="bg-[#C4963D] text-white px-4 py-2 rounded-lg hover:bg-[#C4963D]/90"
                >
                  Save Category
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
               {categories.map((cat, index) => (
                 <div key={`${cat}-${index}`} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    {editingCategoryIndex === index ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(event) => setEditingCategoryName(event.target.value)}
                          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#C4963D]/50 focus:border-[#C4963D] outline-none"
                        />
                        <div className="flex gap-2">
                          <button onClick={saveEditedCategory} className="text-xs px-2.5 py-1.5 rounded-md bg-[#C4963D] text-white">Save</button>
                          <button onClick={() => setEditingCategoryIndex(null)} className="text-xs px-2.5 py-1.5 rounded-md bg-gray-100 text-gray-700">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{cat}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingCategoryIndex(index);
                              setEditingCategoryName(cat);
                            }}
                            className="text-gray-400 hover:text-blue-500"
                          >
                            <Edit3 size={16}/>
                          </button>
                          <button onClick={() => removeCategory(index)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* --- PROGRAMS TAB --- */}
        {activeTab === 'programs' && (
          <div className="p-6">
             <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Programs & Challenges</h3>
                  <p className="text-gray-500 text-sm mt-1">Define unlock logic, order content, and set milestones.</p>
               </div>
               <button 
                onClick={() => setIsProgramModalOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-purple-700 flex items-center transition-all"
               >
                 <Plus size={18} className="mr-2"/> Build Program
               </button>
            </div>
            
            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                       <h4 className="font-bold text-gray-900 text-lg">{program.title}</h4>
                       <p className="text-sm text-gray-500">{program.description}</p>
                     </div>
                     <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Drip Enabled</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                     <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm"><span className="font-bold text-gray-900">{program.totalDays}</span> Days</div>
                     <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm"><span className="font-bold text-gray-900">{program.enrolled}</span> Enrolled</div>
                     <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm"><span className="font-bold text-gray-900">{program.linkedAssets}</span> Assets Linked</div>
                     <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm"><span className="font-bold">{program.category}</span> Category</div>
                  </div>
                  <div className="border border-purple-100 rounded-lg p-3 bg-purple-50/40">
                    <p className="text-xs text-purple-700 mb-2 font-medium">Drip Schedule Preview</p>
                    <div className="flex flex-wrap gap-2">
                      {program.dayPlans.slice(0, 7).map((dayPlan) => (
                        <span key={`${program.id}-day-${dayPlan.day}`} className="text-[11px] px-2 py-1 bg-white border border-purple-200 rounded-full text-purple-700">
                          Day {dayPlan.day} {'->'} Release {dayPlan.releaseDay}
                        </span>
                      ))}
                      {program.dayPlans.length > 7 && (
                        <span className="text-[11px] px-2 py-1 bg-white border border-purple-200 rounded-full text-purple-700">
                          +{program.dayPlans.length - 7} more days
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- BUILD PROGRAM MODAL --- */}
      {isProgramModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl max-h-[90vh] overflow-y-auto w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Build New Program</h2>
              <button 
                onClick={() => setIsProgramModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
               >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
                <input
                  type="text"
                  value={programForm.title}
                  onChange={(event) => setProgramForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="e.g., 30-Day Sleep Mastery"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={programForm.category}
                    onChange={(event) => setProgramForm((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal / Objective</label>
                  <input
                    type="text"
                    value={programForm.goal}
                    onChange={(event) => setProgramForm((prev) => ({ ...prev, goal: event.target.value }))}
                    placeholder="e.g., Build consistent sleep habits..."
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Length (Days)</label>
                  <input
                    type="number"
                    min="1"
                    value={programForm.totalDays}
                    onChange={(event) => setProgramForm((prev) => ({ ...prev, totalDays: event.target.value }))}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Description</label>
                <textarea 
                  rows="3" 
                  value={programForm.description}
                  onChange={(event) => setProgramForm((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="Describe the program..." 
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/40">
                <h3 className="font-semibold text-purple-900 mb-3 border-b border-purple-200 pb-2">Drip Content by Day</h3>
                <p className="text-sm text-purple-700 mb-4">Set release day and attach audio/video/PDF/JPG per day. You can also add multiple text blocks below each media type.</p>

                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {dayPlans.map((plan, dayIndex) => (
                    <div key={`day-plan-${plan.day}`} className="border border-purple-200 bg-white rounded-xl p-4">
                      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <CalendarDays size={16} className="mr-2 text-purple-600" /> Day {plan.day}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Release on day</span>
                          <input
                            type="number"
                            min="1"
                            value={plan.releaseDay}
                            onChange={(event) => updateDayPlan(dayIndex, (currentPlan) => ({ ...currentPlan, releaseDay: Math.max(1, Number(event.target.value) || 1) }))}
                            className="w-20 border border-gray-300 px-2 py-1 rounded-md text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Audio</label>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(event) => handleDayFileChange(dayIndex, 'audioFile', event.target.files)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                          />
                          {plan.audioFile && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{plan.audioFile}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Video</label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(event) => handleDayFileChange(dayIndex, 'videoFile', event.target.files)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          {plan.videoFile && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{plan.videoFile}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">PDFs (Optional)</label>
                          <input
                            type="file"
                            multiple
                            accept=".pdf"
                            onChange={(event) => handleDayFileChange(dayIndex, 'pdfFiles', event.target.files, true)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
                          />
                          {plan.pdfFiles.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{plan.pdfFiles.join(', ')}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">JPG Images (Optional)</label>
                          <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg"
                            onChange={(event) => handleDayFileChange(dayIndex, 'imageFiles', event.target.files, true)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                          />
                          {plan.imageFiles.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{plan.imageFiles.join(', ')}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border border-amber-200 rounded-lg p-3 bg-amber-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-semibold text-amber-800">Text Below Audio</p>
                            <button onClick={() => addNestedTextField(dayIndex, 'audioTexts')} className="text-[11px] px-2 py-1 rounded bg-amber-600 text-white">+ Text</button>
                          </div>
                          <div className="space-y-2">
                            {plan.audioTexts.map((text, textIdx) => (
                              <div key={`day-${plan.day}-audio-text-${textIdx}`} className="flex gap-2">
                                <input
                                  type="text"
                                  value={text}
                                  onChange={(event) => updateNestedTextField(dayIndex, 'audioTexts', textIdx, event.target.value)}
                                  placeholder={`Audio text ${textIdx + 1}`}
                                  className="flex-1 border border-amber-200 px-3 py-1.5 rounded-md text-sm"
                                />
                                {plan.audioTexts.length > 1 && (
                                  <button onClick={() => removeNestedTextField(dayIndex, 'audioTexts', textIdx)} className="text-red-500 px-2">x</button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border border-indigo-200 rounded-lg p-3 bg-indigo-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-semibold text-indigo-800">Text Below Video</p>
                            <button onClick={() => addNestedTextField(dayIndex, 'videoTexts')} className="text-[11px] px-2 py-1 rounded bg-indigo-600 text-white">+ Text</button>
                          </div>
                          <div className="space-y-2">
                            {plan.videoTexts.map((text, textIdx) => (
                              <div key={`day-${plan.day}-video-text-${textIdx}`} className="flex gap-2">
                                <input
                                  type="text"
                                  value={text}
                                  onChange={(event) => updateNestedTextField(dayIndex, 'videoTexts', textIdx, event.target.value)}
                                  placeholder={`Video text ${textIdx + 1}`}
                                  className="flex-1 border border-indigo-200 px-3 py-1.5 rounded-md text-sm"
                                />
                                {plan.videoTexts.length > 1 && (
                                  <button onClick={() => removeNestedTextField(dayIndex, 'videoTexts', textIdx)} className="text-red-500 px-2">x</button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border border-emerald-200 rounded-lg p-3 bg-emerald-50/50">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-semibold text-emerald-800">Additional Free Text Blocks</p>
                            <button onClick={() => addNestedTextField(dayIndex, 'freeTexts')} className="text-[11px] px-2 py-1 rounded bg-emerald-600 text-white">+ Text</button>
                          </div>
                          <div className="space-y-2">
                            {plan.freeTexts.map((text, textIdx) => (
                              <div key={`day-${plan.day}-free-text-${textIdx}`} className="flex gap-2">
                                <input
                                  type="text"
                                  value={text}
                                  onChange={(event) => updateNestedTextField(dayIndex, 'freeTexts', textIdx, event.target.value)}
                                  placeholder={`Extra text ${textIdx + 1}`}
                                  className="flex-1 border border-emerald-200 px-3 py-1.5 rounded-md text-sm"
                                />
                                {plan.freeTexts.length > 1 && (
                                  <button onClick={() => removeNestedTextField(dayIndex, 'freeTexts', textIdx)} className="text-red-500 px-2">x</button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
              <button 
                onClick={() => setIsProgramModalOpen(false)}
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button onClick={saveProgram} className="px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm transition-all">
                Save Program
              </button>
            </div>
          </div>
        </div>, document.body
      )}
    </div>
  );
}
