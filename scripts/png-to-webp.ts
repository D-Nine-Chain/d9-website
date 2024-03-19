import { basename, dirname, parse, resolve } from 'node:path'
import { Glob } from 'bun'
import sharp from 'sharp'

const glob = new Glob('**/*.png')

const pngs = glob.scan(resolve(import.meta.dir, '../public'))

for await (const png of pngs) {
  const pngFilePath = resolve(import.meta.dir, '../public', png)
  const webpFilePath = resolve(dirname(pngFilePath), `${parse(pngFilePath).name}.webp`)
  await sharp(pngFilePath).webp({
    quality: 100,
    alphaQuality: 100,
    lossless: true,
    nearLossless: true,
    smartSubsample: true,
  }).toFile(webpFilePath)
  await Bun.$`rm -f ${pngFilePath}`
  console.info(`${basename(pngFilePath)} --> ${basename(webpFilePath)}`)
}
