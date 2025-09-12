import dayjs from 'dayjs'

type Payload =
  | string
  | ({
      executor?: string
      user?: string
      message?: string
    } & Record<string, any>)

type Colors = 'red' | 'green' | 'yellow' | 'purple' | 'blue' | 'white'

const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String
}

const isTestEnvironment = process.env.NODE_ENV === 'test'
class LoggerColors {
  public red(text: string) {
    console.log(`\x1b[31m${text}\x1b[0m`)
  }

  public green(text: string) {
    console.log(`\x1b[32m${text}\x1b[0m`)
  }

  public yellow(text: string) {
    console.log(`\x1b[33m${text}\x1b[0m`)
  }

  public purple(text: string) {
    console.log(`\x1b[34m${text}\x1b[0m`)
  }

  public blue(text: string) {
    console.log(`\x1b[36m${text}\x1b[0m`)
  }

  public white(text: string) {
    console.log(text)
  }
}

export class Logger extends LoggerColors {
  static debug = 'DEBUG'

  private suffix: string

  public constructor(private readonly context?: string) {
    super()

    this.suffix = context ? ` - ${context}` : ''
  }

  private get isDebug() {
    return this.context === Logger.debug
  }

  public now() {
    return dayjs().format('DD/MM/YY - HH:mm:ss')
  }

  public time(color: Colors = 'white') {
    return this.log(color, `[${this.now()}]${this.suffix}`)
  }

  public line() {
    return this.log('white', ' ')
  }

  private log(color: Colors, payload: Payload) {
    if (isTestEnvironment && !this.isDebug) return

    if (isString(payload)) return this[color](payload)

    const { executor, user, ...rest } = payload

    if (payload.executor) this[color](`[Executor] - ${executor}`)
    if (payload.user) this[color](`[User] - ${user}`)

    this[color](JSON.stringify(rest, null, 2))

    this.line()
  }

  public info(payload: Payload) {
    this.time('white')

    this.log('white', payload)
  }

  public success(payload: Payload) {
    this.time('green')

    this.log('green', payload)
  }

  public error(payload: Payload) {
    this.time('red')

    this.log('red', payload)
  }

  public warning(payload: Payload) {
    this.time('yellow')

    this.log('yellow', payload)
  }
}

export const Debug = new Logger()
