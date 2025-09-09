import { v4 as uuid } from "uuid";
import { LogoutIcon, DashboardIcon,AdminIcon,ChatBot,ShopifyIcon,AmazonIcon } from "../../components/icons";

export interface MenuItem {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
  key?: string;
}

const Menuitems: MenuItem[] = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
    key: "Dashboard",
  },
  {
    id: uuid(),
    title: "Chatbot",
    icon: ChatBot,
    href: "/chatbot",
    key: "Chatbot",
  },
  {
    id: uuid(),
    title: "Shopify",
    icon: ShopifyIcon,
    href: "/shopify",
    key: "Shopify",
  },
  {
    id: uuid(),
    title: "Amazon",
    icon: AmazonIcon,
    href: "/amazon",
    key: "Amazon",
  },
  {
    id: uuid(),
    title: "Profile",
    icon: AdminIcon,
    href: "/profile",
    key: "profile",
  },

  {
    id: uuid(),
    title: "Logout",
    icon: LogoutIcon,
    href: "/login",
  },
];

export default Menuitems;
