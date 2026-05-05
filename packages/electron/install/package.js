const fs = require('fs')

const main = () => {
  const content = fs.readFileSync('../core/package.json')
  const contentJSON = JSON.parse(content)

  fs.writeFileSync(
    './dist-install/package.json',
    JSON.stringify({ version: contentJSON.version })
  )
}

main()
