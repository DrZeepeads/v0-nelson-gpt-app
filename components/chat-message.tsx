"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Copy, Check, RotateCcw, Edit2, User, Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const [showTimestamp, setShowTimestamp] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <div
      className={`group relative flex w-full gap-4 px-4 py-6 ${
        message.role === "assistant" ? "bg-[#f7f7f8] text-black" : "bg-transparent"
      }`}
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
    >
      <div className="mx-auto flex w-full max-w-3xl gap-4">
        {/* Avatar */}
        <Avatar className="size-8 shrink-0">
          <AvatarFallback
            className={message.role === "assistant" ? "bg-[#10a37f] text-white" : "bg-[#5436da] text-white"}
          >
            {message.role === "assistant" ? <Bot className="size-5" /> : <User className="size-5" />}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "")
                  const codeString = String(children).replace(/\n$/, "")

                  return !inline && match ? (
                    <div className="group/code relative my-4">
                      <div className="rounded-lg bg-[#1e1e1e] p-4 overflow-x-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400 font-mono">{match[1]}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-6 opacity-0 transition-opacity group-hover/code:opacity-100 hover:bg-white/10"
                            onClick={() => {
                              navigator.clipboard.writeText(codeString)
                            }}
                          >
                            <Copy className="size-3 text-gray-400" />
                          </Button>
                        </div>
                        <pre className="text-sm">
                          <code className="text-gray-100 font-mono">{codeString}</code>
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <code className="rounded bg-[#e5e5e5] px-1.5 py-0.5 text-sm text-[#1f1f1f] font-mono" {...props}>
                      {children}
                    </code>
                  )
                },
                p({ children }) {
                  return <p className="mb-4 leading-relaxed text-[#1f1f1f]">{children}</p>
                },
                ul({ children }) {
                  return <ul className="ml-6 list-disc space-y-2 text-[#1f1f1f]">{children}</ul>
                },
                ol({ children }) {
                  return <ol className="ml-6 list-decimal space-y-2 text-[#1f1f1f]">{children}</ol>
                },
                h1({ children }) {
                  return <h1 className="mb-4 text-3xl font-bold text-[#1f1f1f]">{children}</h1>
                },
                h2({ children }) {
                  return <h2 className="mb-3 text-2xl font-bold text-[#1f1f1f]">{children}</h2>
                },
                h3({ children }) {
                  return <h3 className="mb-2 text-xl font-bold text-[#1f1f1f]">{children}</h3>
                },
                strong({ children }) {
                  return <strong className="font-semibold text-[#1f1f1f]">{children}</strong>
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      className="text-blue-600 underline hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  )
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-2 text-xs text-[#6e6e80] hover:bg-[#e5e5e5]"
              onClick={handleCopy}
            >
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            {message.role === "user" && (
              <Button size="sm" variant="ghost" className="h-8 gap-2 text-xs text-[#6e6e80] hover:bg-[#e5e5e5]">
                <Edit2 className="size-3" />
                Edit
              </Button>
            )}
            {message.role === "assistant" && (
              <Button size="sm" variant="ghost" className="h-8 gap-2 text-xs text-[#6e6e80] hover:bg-[#e5e5e5]">
                <RotateCcw className="size-3" />
                Regenerate
              </Button>
            )}
            {showTimestamp && <span className="ml-2 text-xs text-[#8e8e8e]">{formatTimestamp(message.timestamp)}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
