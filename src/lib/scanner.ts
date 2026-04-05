/**
 * File virus scanner using ClamAV.
 *
 * Requirements:
 * - Local dev: Install ClamAV (`brew install clamav`) and run `clamd`
 * - Production (Vercel): ClamAV is not available on serverless. Options:
 *   1. Use a cloud scanning API (e.g., VirusTotal, Cloudmersive, Scanii)
 *   2. Run ClamAV on a separate server and connect via TCP
 *   3. Use an S3 event trigger with ClamAV Lambda layer
 *
 * Set CLAMAV_ENABLED=true in env to enable scanning.
 * Set CLAMAV_HOST and CLAMAV_PORT for remote ClamAV daemon.
 */

interface ScanResult {
  isClean: boolean
  viruses: string[]
  error?: string
}

export async function scanBuffer(buffer: Buffer, fileName: string): Promise<ScanResult> {
  // Skip scanning if not enabled
  if (process.env.CLAMAV_ENABLED !== 'true') {
    return { isClean: true, viruses: [] }
  }

  try {
    const NodeClam = (await import('clamscan')).default
    const clamscan = await new NodeClam().init({
      clamdscan: {
        host: process.env.CLAMAV_HOST || '127.0.0.1',
        port: parseInt(process.env.CLAMAV_PORT || '3310'),
        timeout: 30000,
        localFallback: true,
      },
      preference: 'clamdscan',
    })

    const { Readable } = await import('stream')
    const stream = new Readable()
    stream.push(buffer)
    stream.push(null)

    const { isInfected, viruses } = await clamscan.scanStream(stream)

    return {
      isClean: !isInfected,
      viruses: viruses || [],
    }
  } catch (err: any) {
    console.error('ClamAV scan error:', err.message)
    // If ClamAV is unavailable, fail open with a warning
    // In high-security environments, change this to fail closed (isClean: false)
    return {
      isClean: true,
      viruses: [],
      error: 'Scanner unavailable — file accepted without scan',
    }
  }
}
