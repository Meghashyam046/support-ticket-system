import { formatDistanceToNow } from 'date-fns'

export const formatDate = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  } catch (error) {
    return 'Invalid date'
  }
}

export const classifyTicket = (title, description) => {
  const text = `${title} ${description}`.toLowerCase()
  
  const keywords = {
    technical: ['login', 'password', 'access', 'error', 'bug', 'crash', 'integration', 'api', 'connection'],
    billing: ['invoice', 'charge', 'payment', 'refund', 'subscription', 'billing', 'price', 'cost'],
    feature: ['request', 'feature', 'add', 'new', 'would like', 'suggestion', 'enhancement'],
    bug: ['broken', 'not working', 'error', 'crash', 'issue', 'problem', 'fails', 'doesn\'t work'],
    account: ['profile', 'settings', 'account', 'update', 'change', 'delete'],
  }

  const urgencyKeywords = {
    critical: ['critical', 'urgent', 'emergency', 'immediately', 'asap', 'blocking', 'broken', 'down'],
    high: ['important', 'soon', 'high priority', 'affecting', 'multiple', 'cannot'],
    medium: ['should', 'would like', 'prefer', 'request'],
    low: ['minor', 'small', 'suggestion', 'nice to have', 'when possible'],
  }

  let category = 'other'
  let maxMatches = 0

  for (const [cat, words] of Object.entries(keywords)) {
    const matches = words.filter(word => text.includes(word)).length
    if (matches > maxMatches) {
      maxMatches = matches
      category = cat
    }
  }

  let priority = 'medium'
  for (const [level, words] of Object.entries(urgencyKeywords)) {
    if (words.some(word => text.includes(word))) {
      priority = level
      break
    }
  }

  const reasoning = `Based on keywords in your description, this appears to be a ${category} issue with ${priority} priority. The system detected relevant terms that suggest this classification.`

  return { category, priority, reasoning }
}

export const getStatusColor = (status) => {
  const colors = {
    open: 'blue',
    'in-progress': 'yellow',
    resolved: 'green',
    closed: 'gray',
  }
  return colors[status] || 'gray'
}

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'green',
    medium: 'blue',
    high: 'orange',
    critical: 'red',
  }
  return colors[priority] || 'gray'
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
