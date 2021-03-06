import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
import moment from 'moment'

const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

const createNotification = () => {
  return {
    title: 'Did you study today?',
    body: 'Lets go practice!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export const scheduleNotification = () => {
  Notifications.cancelAllScheduledNotificationsAsync()
  
  const nextHour = moment().add(1, 'hours').valueOf()

  Notifications.scheduleLocalNotificationAsync(
    createNotification(),
    {
      time: nextHour,
      repeat: 'day'
    }
  )

  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              scheduleNotification()
            }
          })
      }
    })
}
