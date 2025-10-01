"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Menu,
  PenSquare,
  Settings,
  User,
  MessageSquare,
  ChevronDown,
  Paperclip,
  Search,
  BookOpen,
  ArrowUp,
  Trash2,
  Edit2,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"
import { ChatMessage } from "@/components/chat-message"
import { LoadingDots } from "@/components/loading-dots"
import { SplashScreen } from "@/components/splash-screen"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InstallPrompt } from "@/components/install-prompt"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentChat = chats.find((chat) => chat.id === currentChatId)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentChat?.messages])

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("nelson-gpt-chats")
    if (savedChats) {
      const parsed = JSON.parse(savedChats)
      setChats(
        parsed.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        })),
      )
    }
  }, [])

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("nelson-gpt-chats", JSON.stringify(chats))
    }
  }, [chats])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    }
    setChats([newChat, ...chats])
    setCurrentChatId(newChat.id)
    setIsMenuOpen(false)
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter((chat) => chat.id !== chatId))
    if (currentChatId === chatId) {
      setCurrentChatId(null)
    }
  }

  const handleRenameChat = (chatId: string) => {
    const newTitle = prompt("Enter new chat title:")
    if (newTitle) {
      setChats(chats.map((chat) => (chat.id === chatId ? { ...chat, title: newTitle } : chat)))
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    let chatId = currentChatId
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: message.slice(0, 50),
        messages: [],
        createdAt: new Date(),
      }
      setChats([newChat, ...chats])
      chatId = newChat.id
      setCurrentChatId(chatId)
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    }

    setChats((prev) =>
      prev.map((chat) => (chat.id === chatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat)),
    )

    setMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response to: "${userMessage.content}"\n\nI'm Nelson-GPT, your Smart Pediatric Assistant. I can help with:\n\n- Pediatric health questions\n- Child development milestones\n- Common childhood illnesses\n- Vaccination schedules\n\n**Note:** This is a demo interface. Connect to a real AI backend for actual responses.`,
        role: "assistant",
        timestamp: new Date(),
      }

      setChats((prev) =>
        prev.map((chat) => (chat.id === chatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat)),
      )
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const groupChatsByDate = () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)

    const groups = {
      Today: [] as Chat[],
      Yesterday: [] as Chat[],
      "Last 7 Days": [] as Chat[],
      Older: [] as Chat[],
    }

    chats.forEach((chat) => {
      const chatDate = new Date(chat.createdAt)
      if (chatDate.toDateString() === today.toDateString()) {
        groups.Today.push(chat)
      } else if (chatDate.toDateString() === yesterday.toDateString()) {
        groups.Yesterday.push(chat)
      } else if (chatDate > lastWeek) {
        groups["Last 7 Days"].push(chat)
      } else {
        groups.Older.push(chat)
      }
    })

    return groups
  }

  const chatGroups = groupChatsByDate()

  return (
    <>
      {showSplash && <SplashScreen />}
      <InstallPrompt />

      <div className="flex h-screen flex-col bg-[#212121] text-white dark">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#2f2f2f] px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 hover:bg-[#2f2f2f]"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <div className="flex items-center gap-2">
              <PenSquare className="size-5" />
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-medium">Nelson-GPT</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <Button variant="outline" className="rounded-full border-white/20 bg-transparent px-5 hover:bg-white/10">
            Log in
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-y-auto">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-4">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-5xl font-semibold tracking-tight">Nelson-GPT</h1>
                <p className="text-lg text-muted-foreground">Smart Pediatric Assistant</p>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              {currentChat.messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex w-full gap-4 bg-[#2f2f2f] px-4 py-6">
                  <div className="mx-auto w-full max-w-3xl">
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {/* Bottom Input Area */}
        <div className="border-t border-[#2f2f2f] px-4 pb-6 pt-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-3xl bg-[#2f2f2f] shadow-lg">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Nelson-GPT..."
                className="w-full resize-none bg-transparent px-6 py-4 pr-14 text-base text-white placeholder:text-[#8e8e8e] focus:outline-none"
                rows={1}
                style={{
                  minHeight: "56px",
                  maxHeight: "200px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = `${Math.min(target.scrollHeight, 200)}px`
                }}
              />
              <Button
                size="icon"
                className="absolute bottom-2 right-2 size-10 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-30"
                disabled={!message.trim()}
                onClick={handleSendMessage}
              >
                <ArrowUp className="size-5" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2 rounded-full bg-[#2f2f2f] px-4 hover:bg-[#3f3f3f]">
                <Paperclip className="size-4" />
                <span className="text-sm">Attach</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 rounded-full bg-[#2f2f2f] px-4 hover:bg-[#3f3f3f]">
                <Search className="size-4" />
                <span className="text-sm">Search</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 rounded-full bg-[#2f2f2f] px-4 hover:bg-[#3f3f3f]">
                <BookOpen className="size-4" />
                <span className="text-sm">Study</span>
              </Button>
            </div>

            {/* Footer Text */}
            <p className="mt-4 text-center text-xs text-[#8e8e8e]">
              By messaging Nelson-GPT, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-white">
                Terms
              </Link>{" "}
              and have read our{" "}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Side Navigation Drawer */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent
            side="left"
            className="w-[280px] border-[#2f2f2f] bg-[#171717] p-0 transition-transform duration-250 ease-in-out sm:w-[320px]"
          >
            <SheetHeader className="border-b border-[#2f2f2f] p-4">
              <SheetTitle className="text-left text-lg font-semibold text-white">Nelson-GPT</SheetTitle>
            </SheetHeader>

            {/* New Chat Button */}
            <div className="border-b border-[#2f2f2f] p-2">
              <Button onClick={handleNewChat} className="w-full justify-start gap-3 bg-[#2f2f2f] hover:bg-[#3f3f3f]">
                <PenSquare className="size-5" />
                <span>New Chat</span>
              </Button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-2">
              {Object.entries(chatGroups).map(
                ([group, groupChats]) =>
                  groupChats.length > 0 && (
                    <div key={group} className="mb-4">
                      <h3 className="mb-2 px-3 text-xs font-semibold text-[#8e8e8e]">{group}</h3>
                      <div className="space-y-1">
                        {groupChats.map((chat) => (
                          <div
                            key={chat.id}
                            className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[#2f2f2f] ${
                              currentChatId === chat.id ? "bg-[#2f2f2f]" : ""
                            }`}
                          >
                            <button
                              onClick={() => {
                                setCurrentChatId(chat.id)
                                setIsMenuOpen(false)
                              }}
                              className="flex-1 truncate text-left"
                            >
                              <MessageSquare className="mr-2 inline size-4" />
                              {chat.title}
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-6 opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-[#2f2f2f] border-[#3f3f3f]">
                                <DropdownMenuItem onClick={() => handleRenameChat(chat.id)} className="gap-2">
                                  <Edit2 className="size-4" />
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteChat(chat.id)}
                                  className="gap-2 text-red-400"
                                >
                                  <Trash2 className="size-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>

            {/* Bottom Navigation */}
            <nav className="border-t border-[#2f2f2f] p-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-[#2f2f2f]">
                <User className="size-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => {
                  setIsSettingsOpen(true)
                  setIsMenuOpen(false)
                }}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-[#2f2f2f]"
              >
                <Settings className="size-5" />
                <span>Settings</span>
              </button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Settings Sheet */}
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetContent side="right" className="w-full border-[#2f2f2f] bg-[#171717] sm:max-w-md">
            <SheetHeader className="border-b border-[#2f2f2f] pb-4">
              <SheetTitle className="text-left text-xl font-semibold text-white">Settings</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <Link
                href="/settings/appearance"
                className="block rounded-lg border border-[#2f2f2f] p-4 transition-colors hover:bg-[#2f2f2f]"
              >
                <h3 className="font-semibold">Appearance</h3>
                <p className="mt-1 text-sm text-[#8e8e8e]">Theme, font size, and display options</p>
              </Link>
              <Link
                href="/settings/pwa"
                className="block rounded-lg border border-[#2f2f2f] p-4 transition-colors hover:bg-[#2f2f2f]"
              >
                <h3 className="font-semibold">PWA Settings</h3>
                <p className="mt-1 text-sm text-[#8e8e8e]">App installation, offline mode, and service worker</p>
              </Link>
              <Link
                href="/settings/notifications"
                className="block rounded-lg border border-[#2f2f2f] p-4 transition-colors hover:bg-[#2f2f2f]"
              >
                <h3 className="font-semibold">Notifications</h3>
                <p className="mt-1 text-sm text-[#8e8e8e]">Push notifications and sound preferences</p>
              </Link>
              <Link
                href="/settings/accessibility"
                className="block rounded-lg border border-[#2f2f2f] p-4 transition-colors hover:bg-[#2f2f2f]"
              >
                <h3 className="font-semibold">Accessibility</h3>
                <p className="mt-1 text-sm text-[#8e8e8e]">High contrast mode and keyboard navigation</p>
              </Link>
              <Link
                href="/settings/privacy"
                className="block rounded-lg border border-[#2f2f2f] p-4 transition-colors hover:bg-[#2f2f2f]"
              >
                <h3 className="font-semibold">Privacy</h3>
                <p className="mt-1 text-sm text-[#8e8e8e]">Data retention and conversation backup</p>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
