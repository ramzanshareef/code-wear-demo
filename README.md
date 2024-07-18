# 📢 Code Wear

**Code Wear** is a modern e-commerce web application built with **_Next.js_**. It provides a seamless shopping experience, leveraging powerful technologies to ensure efficiency and scalability. The application uses _**Next.js**_ for server-side rendering, React for a smooth and interactive UI, and MongoDB for efficient data management.

Code Wear allows users to browse, purchase, and manage clothing items. With a secure authentication system, users can register, log in, and manage their accounts. The application also integrates with **_Razorpay_** for secure payment processing.

## 🚀 Features

- User authentication with **JWT**
- Secure password hashing with **bcryptjs**
- Product browsing and searching
- Shopping cart management
- Order placement and payment processing with **Razorpay**
- Real-time notifications with **react-toastify**
- Smooth loading experience with **next-top-loading-bar**
- Responsive design with **Tailwind CSS**

## 🛠️ Technologies Used

- **Next.js**: Framework for server-side rendering and static site generation
- **React**: Frontend library for building interactive user interfaces
- **MongoDB**: NoSQL database for efficient data storage
- **Razorpay**: Payment gateway integration
- **Tailwind CSS**: Utility-first CSS framework for styling
- **bcryptjs**: Library for password hashing
- **jsonwebtoken**: Library for authentication
- **react-icons**: Collection of popular icons
- **react-toastify**: Library for notifications
- **react-top-loading-bar**: Library for loading indicators

## ⬇️ Installation

To set up the project locally, follow these steps:

### Prerequisites

Ensure Node.js is installed on your system.

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ramzanshareef/code-wear-demo.git
    cd code-wear-demo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.local` file in the project root directory and add the following environment variables:
    ```env
    MONGO_URL=your_mongo_url
    JWT_SECRET=your_jwt_secret
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```
    This runs the app in development mode. Open `http://localhost:3000` to view it in your browser.

### Building for Production

To create a production build, run:
```sh
npm run build
npm start
```

## 📝 Usage
1. Log In / Sign Up: Create an account or log in to your existing account.
2. Browse Products: View the list of available clothing items.
3. Add to Cart: Select items and add them to your shopping cart.
4. Checkout: Proceed to checkout and complete the payment process using Razorpay.
5. Manage Orders: View your order history and manage your account settings.

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 👉 Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [ramzanshareef](https://github.com/ramzanshareef)
