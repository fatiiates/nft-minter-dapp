# Next.js Application Documentation

This documentation provides an overview of how to create and run a basic Next.js application. It also includes information on configuring essential environment variables.

## Prerequisites

Before you start building a Next.js application, make sure you have the following installed on your system:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).

## Getting Started

1. **Create a New Next.js App**

   Take this repository to your local:

   ```shell
   git clone https://github.com/fatiiates/nft-minter-dapp my-nextjs-app
   ```

   Replace \`my-nextjs-app\` with your desired project name.

2. **Navigate to the Project Directory**

   Change to the newly created project directory:

   ```shell
   cd my-nextjs-app
   ```

3. **Environment Variables Configuration**

   Next.js applications often require the use of environment variables for various settings, such as API keys, database URLs, and more. To configure environment variables:

   - Create a \`.env.local\` file from `.env-example` at the root of your project directory.
   - Add your environment variables to this file in the following format:


   Make sure to replace \`your-api-key\` and \`your-database-url\` with your actual values.

4. **Start the Development Server**

   To run your Next.js app in development mode, use the following command:

   ```shell
   yarn dev
   ```

   This command will start the development server, and your app will be available at \`http://localhost:3000\`.


6. **Build and Deploy**

   When you're ready to deploy your app, ensure that you set up environment variables in your deployment environment as well.

   - Build your app:

     ```shell
     yarn build
     ```

   - Start your app in production mode:

     ```shell
     npm start
     ```

## Folder Structure

Here's an overview of the project's folder structure:

- \`pages/\`: Contains your application's routes. Each \`.js\` file in this directory becomes a route.
- \`public/\`: Static assets such as images, fonts, and other files that can be accessed directly.
- \`styles/\`: CSS styles or style modules for your application.
- \`components/\`: Custom React components you create for your app.

## Customization

You can customize your Next.js app by modifying the following files:

- \`next.config.js\`: Configuration options for Next.js.
- \`package.json\`: Dependency and script configuration.
- \`styles/index.css\`: Global CSS styles for your app.

## Learn More

For more detailed information and advanced topics, you can refer to the official Next.js documentation:

- [Next.js Documentation](https://nextjs.org/docs)

## Additional Resources

Here are some additional resources to help you get started with Next.js:

- [Next.js GitHub Repository](https://github.com/vercel/next.js)
- [Next.js GitHub Examples](https://github.com/vercel/next.js/tree/canary/examples)

Happy coding with Next.js!