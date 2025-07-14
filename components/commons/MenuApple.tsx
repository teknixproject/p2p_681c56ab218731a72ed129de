/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler, useState } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  onClickChat?: MouseEventHandler<HTMLElement>;
  onClickContact?: MouseEventHandler<HTMLElement>;
  onClickUserInfo?: MouseEventHandler<HTMLElement>;
  onClickNotification?: MouseEventHandler<HTMLElement>;
  onSubmitMessage?: MouseEventHandler<HTMLFormElement>;
  onChangeMessage?: MouseEventHandler<HTMLInputElement>;
}

const ChatItem: React.FC<{
  chat: any;
  isActive?: boolean;
  onClickChat?: MouseEventHandler<HTMLElement>;
}> = ({ chat, isActive = false, onClickChat }) => {
  const name = _.get(chat, 'name', 'Unknown');
  const message = _.get(chat, 'lastMessage', '');
  const time = _.get(chat, 'time', '');
  const avatar = _.get(chat, 'avatar', '');
  const isOnline = _.get(chat, 'isOnline', false);
  const unreadCount = _.get(chat, 'unreadCount', 0);

  return (
    <div
      onClick={onClickChat}
      className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
        isActive ? 'bg-blue-50' : ''
      }`}
    >
      <div className="relative">
        <img
          src={avatar || '/api/placeholder/40/40'}
          alt={name}
          className="w-10 h-10 rounded-full"
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 ml-3 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{message}</p>
      </div>
      {unreadCount > 0 && (
        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </div>
      )}
    </div>
  );
};

const MessageBubble: React.FC<{ message: any; isOwn?: boolean }> = ({ message, isOwn = false }) => {
  const text = _.get(message, 'text', '');
  const time = _.get(message, 'time', '');
  const isForwarded = _.get(message, 'isForwarded', false);

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-green-500 text-white'
            : 'bg-white border border-gray-200'
        }`}
      >
        {isForwarded && (
          <div className="text-xs text-gray-400 mb-1">Forwarded from Nick Thompson</div>
        )}
        <p className="text-sm">{text}</p>
        <div className="flex justify-end items-center mt-1">
          <span className={`text-xs ${isOwn ? 'text-green-100' : 'text-gray-500'}`}>
            {time}
          </span>
          {isOwn && (
            <svg className="w-4 h-4 ml-1 text-green-100" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const UserInfoPanel: React.FC<{
  user: any;
  onClickUserInfo?: MouseEventHandler<HTMLElement>;
  onClickNotification?: MouseEventHandler<HTMLElement>;
}> = ({ user, onClickUserInfo, onClickNotification }) => {
  const name = _.get(user, 'name', 'Huy 🏮');
  const username = _.get(user, 'username', '@unclesdev');
  const avatar = _.get(user, 'avatar', '');
  const stats = _.get(user, 'stats', {});

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">User Info</h2>
        <button onClick={onClickUserInfo} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="text-center mb-6">
        <img
          src={avatar || '/api/placeholder/80/80'}
          alt={name}
          className="w-20 h-20 rounded-full mx-auto mb-3"
        />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">last seen recently</p>
        <p className="text-sm text-blue-500 mt-1">{username}</p>
        <button className="text-sm text-blue-500 mt-2 hover:underline">
          ADD TO CONTACTS
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 6v6c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V6l-7-4z" />
              </svg>
            </div>
            <span className="text-sm">Notifications</span>
          </div>
          <button
            onClick={onClickNotification}
            className="w-10 h-6 bg-blue-500 rounded-full relative transition-colors"
          >
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
          </button>
        </div>

        {[
          { icon: '📷', label: '10 photos' },
          { icon: '📹', label: '12 videos' },
          { icon: '📎', label: '33 files' },
          { icon: '🔗', label: '106 shared links' },
          { icon: '🎤', label: '1 voice message' },
          { icon: '🎭', label: '31 GIFs' }
        ].map((item, index) => (
          <div key={index} className="flex items-center py-2 cursor-pointer hover:bg-gray-50 rounded">
            <span className="text-lg mr-3">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatInterface: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickChat,
  onClickContact,
  onClickUserInfo,
  onClickNotification,
  onSubmitMessage,
  onChangeMessage,
  ...props
}) => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [message, setMessage] = useState('');

  const chats = _.isArray(items) ? items : [
    {
      id: 1,
      name: 'Website Development',
      lastMessage: 'Huyện: Đã em bước cầu... 📷',
      time: '17:30',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      unreadCount: 1
    },
    {
      id: 2,
      name: 'Huy 🏮',
      lastMessage: '🎯 meet.google.com/xzo-hpf...',
      time: '17:13',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      unreadCount: 0
    },
    {
      id: 3,
      name: 'XStudio',
      lastMessage: 'Dạng: Đã',
      time: '17:04',
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      unreadCount: 0
    }
  ];

  const messages = [
    { id: 1, text: 'Tui em xuống lầu 2 rồi á anh', time: '17:23', isOwn: true },
    { id: 2, text: 'Thứ 2 tuần sau em xin off nha anh', time: '10:07', isOwn: true },
    { id: 3, text: 'anh cho em xin mail đế cc qua nha anh', time: '10:07', isOwn: true },
    { id: 4, text: 'huy.lg@tekmx.vn ❤️💙', time: '10:08', isOwn: false },
    { id: 5, text: 'em mới gửi mail qua nha anh', time: '10:15', isOwn: true },
    {
      id: 6,
      text: 'Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.',
      time: '17:13',
      isOwn: false,
      isForwarded: true
    }
  ];

  const handleChatClick = (index: number) => (event: React.MouseEvent) => {
    setSelectedChat(index);
    onClickChat?.(event);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
    onSubmitMessage?.(event as any);
  };

  const currentUser = {
    name: 'Huy 🏮',
    username: '@unclesdev',
    avatar: '/api/placeholder/80/80',
    stats: {
      photos: 10,
      videos: 12,
      files: 33,
      links: 106,
      voiceMessages: 1,
      gifs: 31
    }
  };

  return (
    <div id={id} style={style} className={`flex h-screen bg-gray-100 ${className ?? ''}`}>
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="ml-2 text-lg font-semibold">All chats</span>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, index) => (
            <ChatItem
              key={_.get(chat, 'id', index)}
              chat={chat}
              isActive={selectedChat === index}
              onClickChat={handleChatClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="Huy"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">Huy 🏮</h3>
              <p className="text-sm text-gray-500">last seen recently</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-green-100 px-6 py-4 overflow-y-auto">
          <div className="text-center mb-4">
            <span className="bg-green-200 px-3 py-1 rounded-full text-sm">July 7</span>
          </div>
          {messages.slice(0, 1).map((msg) => (
            <MessageBubble key={_.get(msg, 'id')} message={msg} isOwn={_.get(msg, 'isOwn', false)} />
          ))}
          
          <div className="text-center mb-4">
            <span className="bg-green-200 px-3 py-1 rounded-full text-sm">July 14</span>
          </div>
          {messages.slice(1).map((msg) => (
            <MessageBubble key={_.get(msg, 'id')} message={msg} isOwn={_.get(msg, 'isOwn', false)} />
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                onChangeMessage?.(e as any);
              }}
              placeholder="Write a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* User Info Panel */}
      {showUserInfo && (
        <UserInfoPanel
          user={currentUser}
          onClickUserInfo={(e) => {
            setShowUserInfo(false);
            onClickUserInfo?.(e);
          }}
          onClickNotification={onClickNotification}
        />
      )}
    </div>
  );
};

export default ChatInterface;