type LogLevel = 'info' | 'warn' | 'error';

export function log(
  event: string,
  meta: Record<string, unknown> = {},
  level: LogLevel = 'info',
): void {
  const entry = {
    level,
    event,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  console.log(JSON.stringify(entry));
}
