import { io, Socket } from 'socket.io-client'
import { Event, MessageNewEvent, MessageUnreadEvent } from '@/interfaces/socketio/event.interface'
import { useEffect, useMemo } from 'react'

const socketUrl = process.env.NEXT_PUBLIC_SOCKETIO_URL || ''
const isBrowser = typeof window !== 'undefined'

const createSocket = (): Socket =>
  io(`${socketUrl}/ws`, {
    withCredentials: true,
    autoConnect: false,
    transports: ['websocket'],
  })

export const useSocket = (): Socket | null => {
  const socket = useMemo(() => {
    if (!isBrowser) return null
    return createSocket()
  }, [])
  useEffect(() => {
    if (!socket) return
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [socket])
  return socket
}

export const useSocketEvent = <T extends MessageNewEvent | MessageUnreadEvent>(
  socket: Socket | null,
  event: Event,
  callback: (data: T) => void,
): void => {
  useEffect(() => {
    if (!socket) return
    socket.on(event, callback)
    return () => {
      socket.off(event, callback)
    }
  }, [socket, event, callback])
}
