'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Mic, MicOff, Video, VideoOff, Phone, Share2, MessageSquare,
  Clock, Users, Settings, Send, Smile
} from 'lucide-react'

export default function InterviewRoomContent() {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sarah Johnson', text: 'Let\'s start with your background', time: '2:00 PM' },
    { id: 2, sender: 'You', text: 'Sure! I have 5 years of experience in product management', time: '2:01 PM' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-4 h-screen gap-0">
        {/* Video area */}
        <div className="lg:col-span-3 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center">
          {/* Main video feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-5xl font-bold">
                    SJ
                  </div>
                  <p className="text-white font-semibold">Sarah Johnson</p>
                  <p className="text-gray-400 text-sm">Interviewer</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Camera Off</p>
              </div>
            )}
          </div>

          {/* Local video preview (bottom right) */}
          <div className="absolute bottom-4 right-4 w-24 h-24 rounded-lg bg-slate-800 border-2 border-primary overflow-hidden shadow-lg">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                YOU
              </div>
            ) : (
              <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                <VideoOff className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          {/* Header info */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Live</Badge>
              <div className="flex items-center gap-1 text-white text-sm">
                <Clock className="w-4 h-4" />
                <span>45:23</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="destructive"
              className="gap-2"
            >
              <Phone className="w-4 h-4" />
              End Interview
            </Button>
          </div>

          {/* Control bar */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20 bg-slate-800/80 backdrop-blur-sm p-4 rounded-full">
            <Button
              size="lg"
              variant="outline"
              className={`rounded-full w-14 h-14 ${isMicOn ? 'bg-muted' : 'bg-red-500/20 border-red-500'}`}
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5 text-red-500" />
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className={`rounded-full w-14 h-14 ${isVideoOn ? 'bg-muted' : 'bg-red-500/20 border-red-500'}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5 text-red-500" />
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-14 h-14 bg-transparent"
            >
              <Share2 className="w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-14 h-14 bg-transparent"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Chat/Details panel */}
        <div className="bg-background border-l border-border flex flex-col">
          {/* Chat tabs */}
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b border-border bg-transparent px-4 py-2">
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-2">
                <Users className="w-4 h-4" />
                Notes
              </TabsTrigger>
            </TabsList>

            {/* Chat content */}
            <TabsContent value="chat" className="flex-1 flex flex-col m-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs ${message.sender === 'You'
                        ? 'bg-primary text-primary-foreground rounded-lg rounded-tr-none'
                        : 'bg-muted text-foreground rounded-lg rounded-tl-none'
                        } p-3`}
                    >
                      <p className="text-xs font-semibold opacity-70 mb-1">
                        {message.sender}
                      </p>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    size="sm"
                    className="rounded-lg"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notes content */}
            <TabsContent value="notes" className="flex-1 flex flex-col m-0 overflow-y-auto">
              <div className="p-4 space-y-3">
                <div className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">TOPIC</p>
                  <p className="text-sm">Product Management Interview</p>
                </div>

                <div className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">COMPANY</p>
                  <p className="text-sm">Tech Startup</p>
                </div>

                <div className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">LEVEL</p>
                  <Badge className="bg-primary/20 text-primary border-primary/50">Senior</Badge>
                </div>

                <div className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-3">DURATION</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">27 of 45 minutes used</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
