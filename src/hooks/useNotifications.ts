import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  type: 'emergency' | 'drill' | 'weather' | 'maintenance' | 'achievement';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isActive: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving notifications
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const mockNotification: Notification = {
          id: `notif-${Date.now()}`,
          type: 'drill',
          severity: 'medium',
          title: 'Upcoming Fire Drill',
          message: 'Fire drill scheduled for your building in 15 minutes.',
          timestamp: new Date().toISOString(),
          isRead: false,
          isActive: true,
          actions: [
            {
              label: 'Acknowledge',
              action: () => {
                toast.success('Drill notification acknowledged');
              }
            }
          ]
        };

        setNotifications(prev => [mockNotification, ...prev.slice(0, 19)]); // Keep last 20
        setUnreadCount(prev => prev + 1);
        
        // Show toast for high/critical notifications
        if (mockNotification.severity === 'high' || mockNotification.severity === 'critical') {
          toast.warning(mockNotification.title, {
            description: mockNotification.message,
            duration: 10000,
          });
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    setUnreadCount(0);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
    setUnreadCount(prev => prev + 1);

    // Auto-show important notifications
    if (notification.severity === 'high' || notification.severity === 'critical') {
      toast.error(notification.title, {
        description: notification.message,
        duration: notification.severity === 'critical' ? 0 : 10000, // Critical alerts stay until dismissed
      });
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    addNotification,
  };
};