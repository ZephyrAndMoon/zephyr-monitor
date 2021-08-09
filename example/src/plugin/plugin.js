const fs = require('fs')
const path = './sourcemap.zip'
const archiver = require('archiver')
const { readDir, uploadFile, deleteFile } = require('./utils')

class SourcemapUploadWebpackPlugin {
	constructor(options) {
		this.options = options
	}
	apply(compiler) {
		const { url, uploadPath } = this.options
		if (url && outputPath) {
			const archive = archiver('zip', {
				gzip: true,
				zlib: { level: 9 },
			})
			const timeStamp = new Date().getTime()

			// execute when packing error
			archive.on('error', function(err) {
				throw err
			})

			// execute when packing is complete
			archive.on('end', async () => {
				// upload files
				await uploadFile({ url, path, timeStamp })
				// delete files
				deleteFile(path)
			})

			archive.pipe(fs.createWriteStream(path))

			// execute on build completion
			compiler.hooks.done.tap('upload-sourcemap-plugin', status => {
				const sourceMapPaths = readDir(uploadPath)
				sourceMapPaths.forEach(p => {
					archive.append(fs.createReadStream(p), {
						name: p.replace(outputPath, ''),
					})
				})
				archive.finalize()
			})
		}
	}
}

module.exports = SourcemapUploadWebpackPlugin
