import React, { useState, useEffect, useRef } from 'react';
import { 
 MessageCircle, 
 Send, 
 X,
 Loader,
 Bot,
 User
} from 'lucide-react';

interface Message {
 id: string;
 text: string;
 sender: 'user' | 'bot';
 timestamp: Date;
}

interface ChatbotProps {
 apiUrl: string;
 apiKey?: string;
 title?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ 
 apiUrl,
 apiKey,
 title = "Assistente Virtual"
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<Message[]>([]);
 const [inputMessage, setInputMessage] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const messagesEndRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
   scrollToBottom();
 }, [messages]);

 useEffect(() => {
   if (isOpen) {
     inputRef.current?.focus();
   }
 }, [isOpen]);

 const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 };

 const generateMessageId = () => {
   return Math.random().toString(36).substring(7);
 };

 const sendMessage = async () => {
   const messageText = inputMessage.trim();
   if (!messageText || isLoading) return;

   const userMessage: Message = {
     id: generateMessageId(),
     text: messageText,
     sender: 'user',
     timestamp: new Date()
   };
   
   setMessages(prev => [...prev, userMessage]);
   setInputMessage('');
   setIsLoading(true);

   try {
     const response = await fetch(apiUrl, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
       },
       body: JSON.stringify({
         message: messageText,
         response: getBotResponse(messageText),
         timestamp: new Date().toISOString()
       })
     });

     if (!response.ok) {
       console.error('Erro HTTP:', response.status);
       throw new Error('Erro na comunicação com a API');
     }

     const data = await response.json();
     console.log('Resposta da API:', data);

     const botMessage: Message = {
       id: generateMessageId(),
       text: getBotResponse(messageText),
       sender: 'bot',
       timestamp: new Date()
     };

     setMessages(prev => [...prev, botMessage]);
   } catch (error) {
     console.error('Erro detalhado:', error);
     const errorMessage: Message = {
       id: generateMessageId(),
       text: 'Erro de conexão. Tente novamente mais tarde.',
       sender: 'bot',
       timestamp: new Date()
     };
     setMessages(prev => [...prev, errorMessage]);
   } finally {
     setIsLoading(false);
   }
 };

 const getBotResponse = (message: string): string => {
   const lowerMessage = message.toLowerCase();
   
   if (lowerMessage.includes('olá') || lowerMessage.includes('oi')) {
     return "Olá! Como posso ajudar você hoje?";
   }
   
   if (lowerMessage.includes('ajuda')) {
     return "Claro! Estou aqui para ajudar. Qual é a sua dúvida?";
   }

   if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
     return "Para informações sobre preços, por favor entre em contato com nosso time comercial pelo email: comercial@empresa.com";
   }

   if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada')) {
     return "Por nada! Estou sempre à disposição para ajudar!";
   }

   if (lowerMessage.includes('tchau') || lowerMessage.includes('até')) {
     return "Até mais! Tenha um ótimo dia!";
   }

   return "Entendi sua mensagem. Em que mais posso ajudar?";
 };

 const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
   if (e.key === 'Enter' && !e.shiftKey) {
     e.preventDefault();
     sendMessage();
   }
 };

 const formatTime = (date: Date) => {
   return new Intl.DateTimeFormat('pt-BR', {
     hour: '2-digit',
     minute: '2-digit'
   }).format(date);
 };

 return (
   <div className="fixed bottom-4 right-4 z-50">
     {!isOpen && (
       <button
         onClick={() => setIsOpen(true)}
         className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110"
       >
         <MessageCircle size={24} />
       </button>
     )}

     {isOpen && (
       <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200">
         <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
           <div className="flex items-center gap-2">
             <Bot size={24} />
             <h3 className="font-semibold">{title}</h3>
           </div>
           <button 
             onClick={() => setIsOpen(false)}
             className="hover:bg-blue-700 p-1 rounded-full transition-colors"
           >
             <X size={20} />
           </button>
         </div>

         <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
           {messages.map((message) => (
             <div
               key={message.id}
               className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`
                 max-w-[80%] 
                 rounded-lg 
                 p-3 
                 ${message.sender === 'user' 
                   ? 'bg-blue-600 text-white rounded-br-none' 
                   : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                 }
               `}>
                 <div className="flex items-center gap-2 mb-1">
                   {message.sender === 'user' ? (
                     <User size={16} className="text-blue-200" />
                   ) : (
                     <Bot size={16} className="text-blue-600" />
                   )}
                   <span className="text-xs opacity-75">
                     {formatTime(message.timestamp)}
                   </span>
                 </div>
                 <p className="text-sm">{message.text}</p>
               </div>
             </div>
           ))}
           {isLoading && (
             <div className="flex justify-start mb-4">
               <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[80%] rounded-bl-none">
                 <div className="flex items-center gap-2">
                   <Loader className="w-4 h-4 animate-spin text-blue-600" />
                   <span className="text-sm text-gray-500">Digitando...</span>
                 </div>
               </div>
             </div>
           )}
           <div ref={messagesEndRef} />
         </div>

         <div className="p-4 bg-white border-t border-gray-200">
           <div className="flex gap-2">
             <input
               ref={inputRef}
               type="text"
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               onKeyPress={handleKeyPress}
               placeholder="Digite sua mensagem..."
               className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
               disabled={isLoading}
             />
             <button
               onClick={sendMessage}
               disabled={!inputMessage.trim() || isLoading}
               className={`
                 p-2 rounded-lg
                 ${!inputMessage.trim() || isLoading
                   ? 'bg-gray-300 cursor-not-allowed'
                   : 'bg-blue-600 hover:bg-blue-700'
                 }
                 text-white transition-colors
               `}
             >
               <Send size={20} />
             </button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default Chatbot;