declare interface FooterProps {
  type?: "desktop" | "mobile";
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user?: User;
}

declare interface SidebarProps {
  type?: "desktop" | "mobile";
}

declare interface getUserInfoProps {
  userId: string;
}

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare interface SignInProps {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  error?: string;
}

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  password: string;
};

// Actions
declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}
