# YETbet Application Documentation

## 1. Code Quality Analysis

### Project Structure Overview
The YETbet application follows a modern Next.js 15.1.4 architecture with a well-organized directory structure:

```
src/
├── __tests__/       # Test files
├── app/             # Next.js app router pages
├── components/      # React components
├── constants/       # Application constants
├── contexts/        # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Library code and utilities
├── services/        # Service layer for API calls
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Code Quality Assessment

#### Strengths:
1. **Modern Architecture**: Uses Next.js 15 app router for efficient routing and server components.
2. **TypeScript Integration**: Strong typing throughout the application enhances code reliability.
3. **Component Separation**: Clear separation between UI components and business logic.
4. **Context API Usage**: Well-implemented context providers for auth and wallet management.
5. **Styling System**: Uses Tailwind CSS with DaisyUI for consistent styling.
6. **Authentication Flow**: Comprehensive Solana wallet authentication system.

#### Areas for Improvement:
1. **Environment Variables**: Currently missing `.env` file which is causing deployment issues.
2. **Error Handling**: Some error handling could be more robust, especially in async functions.
3. **Testing Coverage**: Test directory exists but the extent of test coverage is unclear.
4. **Documentation**: Limited inline documentation in some complex areas of the codebase.

### Dependencies and Libraries
- **Frontend**: React 19, Next.js 15.1.4, Tailwind CSS, DaisyUI
- **Blockchain**: Solana Web3.js, Wallet Adapter libraries
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **UI Components**: Radix UI, Lucide React icons

## 2. Application Route Map

### Main Routes and Navigation Flow

```
Homepage (/)
├── Propositions (/propositions)
├── Dashboard (/dashboard) [Authenticated]
│   └── User Profile
├── Admin Panel (/admin) [Admin Only]
├── How It Works (/how-it-works)
└── External: Buy YET (Jupiter Link)
```

### Detailed Route Structure

#### Homepage (/)
- Entry point for the application
- Displays a counter component (likely a placeholder)
- Contains links to main app sections

#### Propositions (/propositions)
- Lists available betting propositions
- Allows users to view and place bets

#### Dashboard (/dashboard)
- **Authentication Required**
- User profile information
- Wallet balance display
- Transaction history
- User's active bets

#### Admin Panel (/admin)
- **Admin Access Required**
- Accessible only to users with isAdmin=true
- Management interface for the platform

#### How It Works (/how-it-works)
- Informational page explaining the platform

### Authentication Flows
1. **Connect Wallet**: Using Solana wallet adapter (Phantom, Solflare, etc.)
2. **Sign Message**: User signs a nonce message to verify wallet ownership
3. **Firebase Auth**: Creates/verifies user in Firebase
4. **Session Management**: Uses localStorage for maintaining session

## 3. Requirements to Run the Code

### Environment Setup Requirements

#### 1. Node.js Environment
- Node.js (v16 or higher recommended)
- PNPM package manager (v10.0.0-rc.2 or compatible)

#### 2. Firebase Configuration
A `.env` file must be created at the project root with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

These values must be obtained from a Firebase project console.

#### 3. Solana Configuration
Add the following to your `.env` file:

```
NEXT_PUBLIC_SOLANA_NETWORK=devnet  # or mainnet-beta for production
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=your_rpc_endpoint  # Optional custom RPC endpoint
NEXT_PUBLIC_YET_TOKEN_ADDRESS=your_token_address  # YET token mint address
```

#### 4. Required Packages
The project requires several key dependencies which are installed via PNPM:
- Firebase (`firebase`)
- Solana packages (`@solana/web3.js`, `@solana/wallet-adapter-*`)
- DaisyUI (`daisyui`)

### Installation and Running Instructions

1. **Clone the repository**
   ```bash
   git clone [repository_url]
   cd yetbet_app
   ```

2. **Create environment files**
   Create a `.env` file in the root directory with all required variables.

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Create workspace configuration**
   Create a `pnpm-workspace.yaml` file with:
   ```yaml
   packages:
     - "."
     - "worker"
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Build for production**
   ```bash
   pnpm build
   ```

### Troubleshooting Common Issues

1. **Firebase API Key Invalid**
   - Error: `FirebaseError: Firebase: Error (auth/invalid-api-key)`
   - Solution: Ensure Firebase configuration in `.env` file is correct

2. **Missing DaisyUI Classes**
   - Error: `The 'bg-base-100' class does not exist`
   - Solution: Ensure DaisyUI is properly installed and configured in `tailwind.config.js`

3. **Wallet Adapter Issues**
   - Error: `Can't resolve '@solana/wallet-adapter-react-ui'`
   - Solution: Ensure all Solana wallet adapter packages are installed

## 4. Architecture and Design

### Authentication System
The application uses a hybrid authentication system:
1. **Wallet-based authentication**: Uses Solana wallets for initial authentication
2. **Firebase backend**: Stores user data and manages sessions
3. **Message signing**: Verifies ownership of wallet through cryptographic signatures

### Data Flow
```
User Actions → React Components → Context API → Service Layer → Firebase/Solana
```

### State Management
- Uses React Context for global state (AuthContext, WalletProvider)
- Local component state for UI-specific state
- Firebase Firestore for persistent data storage

### Styling and UI
- Tailwind CSS for utility-first styling
- DaisyUI for component theming with a custom "yetbet_dark" theme
- Custom fonts: Inter, Russo One

## 5. Development Roadmap Recommendations

### Immediate Priorities
1. Fix environment variable configuration
2. Complete any missing API endpoints
3. Enhance error handling throughout the application

### Future Enhancements
1. Implement comprehensive testing
2. Add analytics tracking
3. Enhance mobile responsiveness
4. Expand admin functionality
5. Add leaderboard features (mentioned in code but not implemented)

---

This documentation provides a comprehensive overview of the YETbet application architecture, routing structure, and requirements. For further details on specific components or functionality, please refer to the source code and inline comments.
