enum LoggerLevel {
    VERBOSE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}

enum ConsoleMethod {
    log = 'log',
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
}

class Logger {
    private static tag: string = 'LIST-DIFF'
    private level: LoggerLevel

    constructor(level?: LoggerLevel) {
        this.level = level || LoggerLevel.VERBOSE
    }

    private getLevelText (level?: LoggerLevel): string {
        switch (level || this.level) {
            case LoggerLevel.DEBUG:
                return 'DEBUG'
            case LoggerLevel.INFO:
                return 'INFO'
            case LoggerLevel.WARN:
                return 'WARN'
            case LoggerLevel.ERROR:
                return 'ERROR'
            default:
                return 'VERBOSE'
        }
    }

    private getPrinter (level?: LoggerLevel): ConsoleMethod {
        switch (level || this.level) {
            case LoggerLevel.DEBUG:
                return ConsoleMethod.debug
            case LoggerLevel.INFO:
                return ConsoleMethod.info
            case LoggerLevel.WARN:
                return ConsoleMethod.warn
            case LoggerLevel.ERROR:
                return ConsoleMethod.error
            default:
                return ConsoleMethod.log
        }
    }

    private print(args: any[], level: LoggerLevel) {
        const prefix = `[${Logger.tag} - ${this.getLevelText(level)}]`
        const printer: ConsoleMethod = this.getPrinter(level)
        console[printer].call(this, prefix, ...args)
    }

    v(...args: any[]) {
        if (this.level <= LoggerLevel.VERBOSE) {
            this.print(args, LoggerLevel.VERBOSE)
        }
    }

    d(...args: any[]) {
        if (this.level <= LoggerLevel.DEBUG) {
            this.print(args, LoggerLevel.DEBUG)
        }
    }

    i(...args: any[]) {
        if (this.level <= LoggerLevel.INFO) {
            this.print(args, LoggerLevel.INFO)
        }
    }

    w(...args: any[]) {
        if (this.level <= LoggerLevel.WARN) {
            this.print(args, LoggerLevel.WARN)
        }
    }

    e(...args: any[]) {
        if (this.level <= LoggerLevel.ERROR) {
            this.print(args, LoggerLevel.ERROR)
        }
    }
}

export default new Logger()
