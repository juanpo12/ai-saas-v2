type Level = 'debug' | 'info' | 'warn' | 'error'

const levelOrder: Record<Level, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

function getEnvLevel(): Level {
  const raw = process.env.LOG_LEVEL?.toLowerCase()
  if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') return raw
  return 'info'
}

const currentLevel = getEnvLevel()

function shouldLog(level: Level) {
  return levelOrder[level] >= levelOrder[currentLevel]
}

function prefix(level: Level) {
  return `${new Date().toISOString()} [${level.toUpperCase()}]`
}

function emit(level: Level, ...args: unknown[]) {
  if (!shouldLog(level)) return
  const p = prefix(level)
  if (level === 'error' && typeof console.error === 'function') {
    console.error(p, ...args)
    return
  }
  if (level === 'warn' && typeof console.warn === 'function') {
    console.warn(p, ...args)
    return
  }
  if (level === 'info' && typeof console.info === 'function') {
    console.info(p, ...args)
    return
  }
  console.log(p, ...args)
}

export const logger = {
  debug: (...args: unknown[]) => emit('debug', ...args),
  info: (...args: unknown[]) => emit('info', ...args),
  warn: (...args: unknown[]) => emit('warn', ...args),
  error: (...args: unknown[]) => emit('error', ...args),
}

