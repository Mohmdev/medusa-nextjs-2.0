const requiredEnvs = [
  {
    key: 'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY',
    // TODO: we need a good doc to point this to
    // description:
    //   "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

// ANSI escape codes for colors and text styles
const colors = {
  reset: '\x1b[0m',
  redBold: '\x1b[31;1m',
  yellow: '\x1b[33m',
  yellowBold: '\x1b[33;1m',
  dim: '\x1b[2m',
}

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env.key])

  if (missingEnvs.length > 0) {
    console.error(
      `${colors.redBold}\n🚫 Error: Missing required environment variables\n${colors.reset}`
    )

    missingEnvs.forEach((env) => {
      console.error(`${colors.yellowBold}  ${env.key}${colors.reset}`)
      if (env.description) {
        console.error(`${colors.dim}    ${env.description}\n${colors.reset}`)
      }
    })

    console.error(
      `${colors.yellow}\nPlease set these variables in your .env file or environment before starting the application.\n${colors.reset}`
    )

    process.exit(1)
  }
}

module.exports = checkEnvVariables
