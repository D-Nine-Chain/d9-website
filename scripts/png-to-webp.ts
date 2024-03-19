import { basename, dirname, resolve } from 'node:path'
import { Glob } from 'bun'
import sharp from 'sharp'

const glob = new Glob('**/*.png')

const pngs = glob.scan(resolve(import.meta.dir, '../public'))

for await (const png of pngs) {
  const pngFilePath = resolve(import.meta.dir, '../public', png)
  sharp(pngFilePath).webp({
    quality: 100,
    alphaQuality: 100,
    lossless: true,
    nearLossless: true,
    smartSubsample: true,
  }).toFile(resolve(dirname(pngFilePath), `${basename(pngFilePath)}.webp`))
  console.info()
}
