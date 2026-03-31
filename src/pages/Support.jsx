import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Send, CheckCircle, Clock, MoreVertical, User } from 'lucide-react';

const mockTickets = [
  {
    id: 'TKT-1042',
    user: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    subject: 'Cannot access premium audio sessions',
    message: 'Hi team, I just upgraded my account to the premium tier, but when I try to play the "Deep Focus Beta" session, it still says it is locked. Can you please help?',
    status: 'Open',
    time: '10 mins ago',
    date: 'Mar 31, 2026',
    history: [
      { sender: 'Sarah Jenkins', text: 'Hi team, I just upgraded my account to the premium tier, but when I try to play the "Deep Focus Beta" session, it still says it is locked. Can you please help?', time: '10:30 AM' }
    ]
  },
  {
    id: 'TKT-1041',
    user: 'Michael Chang',
    email: 'michael.c@example.com',
    subject: 'Bug in daily streak',
    message: 'My streak reset to 0 even though I logged in and completed a session yesterday. Please fix this!',
    status: 'Pending',
    time: '2 hours ago',
    date: 'Mar 31, 2026',
    history: [
      { sender: 'Michael Chang', text: 'My streak reset to 0 even though I logged in and completed a session yesterday. Please fix this!', time: '08:15 AM' },
      { sender: 'Support Team', text: 'Hi Michael, we are currently looking into our streak tracking database for your account. We will get back to you shortly.', time: '08:45 AM' }
    ]
  },
  {
    id: 'TKT-1040',
    user: 'Amanda Ross',
    email: 'amanda.r@example.com',
    subject: 'Refund request',
    message: 'I forgot to cancel my trial and got charged. I haven\'t used the app since the first day. Can I get a refund?',
    status: 'Resolved',
    time: '1 day ago',
    date: 'Mar 30, 2026',
    history: [
      { sender: 'Amanda Ross', text: 'I forgot to cancel my trial and got charged. I haven\'t used the app since the first day. Can I get a refund?', time: 'Mar 30, 09:20 AM' },
      { sender: 'Support Team', text: 'Hi Amanda, we have processed your refund. It should appear on your bank statement in 3-5 business days.', time: 'Mar 30, 11:10 AM' }
    ]
  }
];

export default function Support() {
  const [activeTicketId, setActiveTicketId] = useState(mockTickets[0].id);
  const [replyText, setReplyText] = useState('');

  const activeTicket = mockTickets.find(t => t.id === activeTicketId);

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user queries, technical issues, and support tickets.</p>
        </div>
      </div>

      <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 min-h-0">
        {/* Left pane: Ticket List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/30">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tickets or users..." 
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#C4963D]/20 focus:border-[#C4963D] outline-none transition-all bg-gray-50"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors">All</button>
              <button className="px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-md hover:bg-amber-200 transition-colors">Open</button>
              <button className="px-3 py-1.5 bg-green-100 text-green-800 text-xs font-medium rounded-md hover:bg-green-200 transition-colors">Resolved</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockTickets.map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => setActiveTicketId(ticket.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  activeTicketId === ticket.id ? 'bg-[#C4963D]/5 border-l-4 border-l-[#C4963D]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900 text-sm truncate pr-2">{ticket.user}</span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{ticket.time}</span>
                </div>
                <div className="text-sm text-gray-800 font-medium mb-1 truncate">{ticket.subject}</div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{ticket.message}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1
                    ${ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' : ''}
                    ${ticket.status === 'Pending' ? 'bg-blue-100 text-blue-700' : ''}
                    ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : ''}
                  `}>
                    {ticket.status === 'Open' && <Clock size={10} />}
                    {ticket.status === 'Resolved' && <CheckCircle size={10} />}
                    {ticket.status}
                  </span>
                  <span className="text-[10px] text-gray-400">{ticket.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right pane: Ticket Details & Chat */}
        {activeTicket ? (
          <div className="w-2/3 flex flex-col bg-white">
            {/* Ticket Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{activeTicket.subject}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><User size={14} /> {activeTicket.user}</span>
                  <span>•</span>
                  <span>{activeTicket.email}</span>
                  <span>•</span>
                  <span>{activeTicket.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeTicket.status !== 'Resolved' && (
                  <button className="px-4 py-2 border border-green-600 text-green-600 bg-green-50 hover:bg-green-600 hover:text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                    <CheckCircle size={16} /> Mark Resolved
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {activeTicket.history.map((msg, idx) => {
                const isSupport = msg.sender === 'Support Team';
                return (
                  <div key={idx} className={`flex flex-col ${isSupport ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-600">{msg.sender}</span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                      isSupport 
                        ? 'bg-[#C4963D] text-white rounded-tr-sm' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input Area */}
            {activeTicket.status !== 'Resolved' ? (
              <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#C4963D]/20 focus-within:border-[#C4963D] transition-all bg-gray-50">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..." 
                    className="w-full p-4 bg-transparent outline-none resize-none text-sm"
                    rows="3"
                  ></textarea>
                  <div className="px-4 py-3 bg-white border-t border-gray-200 flex justify-between items-center">
                    <div className="flex gap-2 text-gray-400">
                      {/* Attachments or quick replies could go here */}
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2 bg-[#C4963D] text-white text-sm font-semibold rounded-lg hover:bg-[#C4963D]/90 transition-colors shadow-sm">
                      Send Reply <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border-t border-gray-200 bg-gray-50 shrink-0 text-center">
                <p className="text-gray-500 text-sm">This ticket has been marked as resolved. <button className="text-[#C4963D] font-medium hover:underline ml-1">Reopen ticket</button></p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-2/3 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <MessageSquare size={48} className="mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">Select a ticket to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}