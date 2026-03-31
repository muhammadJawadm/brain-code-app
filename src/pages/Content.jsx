import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FileAudio, FileVideo, FileText, ListTree, Target, UploadCloud, Edit3, Trash2, Plus, Bold, Italic, Heading1, Heading2, List, ListOrdered } from 'lucide-react';

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
    </div>
  );
};

export default function Content() {
  const [activeTab, setActiveTab] = useState('audio');
  
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
    { id: 'text', label: 'Text Pages', icon: <FileText size={16} className="mr-2"/> },
    { id: 'categories', label: 'Categories', icon: <ListTree size={16} className="mr-2"/> },
    { id: 'programs', label: 'Programs', icon: <Target size={16} className="mr-2"/> },
  ];

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
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer mb-8">
               <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                  <UploadCloud size={24} className="text-[#C4963D]" />
               </div>
               <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
               <p className="text-xs text-gray-500 mt-1">MP3, WAV, or AAC up to 50MB</p>
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

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer mb-8">
               <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                  <UploadCloud size={24} className="text-indigo-500" />
               </div>
               <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
               <p className="text-xs text-gray-500 mt-1">MP4 or MOV up to 500MB</p>
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
            {/* simple layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
               {['Focus', 'Sleep', 'Energy', 'Anxiety', 'Meditation'].map(cat => (
                 <div key={cat} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    <span className="font-medium text-gray-900">{cat}</span>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
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
               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-purple-700 flex items-center transition-all">
                 <Plus size={18} className="mr-2"/> Build Program
               </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <h4 className="font-bold text-gray-900 text-lg">30-Day Sleep Mastery</h4>
                     <p className="text-sm text-gray-500">Unlocks standard content daily for 30 days.</p>
                   </div>
                   <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Active Challenge</span>
                </div>
                <div className="flex gap-4">
                   <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm"><span className="font-bold text-gray-900">30</span> Days</div>
                   <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm"><span className="font-bold text-gray-900">12k</span> Enrolled</div>
                   <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm"><span className="font-bold text-gray-900">35</span> Assets Linked</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
