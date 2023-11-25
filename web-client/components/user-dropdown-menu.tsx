import { signOut } from "@/firebase/firebase";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link as UILink
} from "@nextui-org/react";
import { User } from "firebase/auth";
import { User as UserIcon } from "lucide-react";

type TUserDropdownProps = {
  user: User;
};

const UserDropdown = ({ user }: TUserDropdownProps) => {
  return (
    <Dropdown placement="bottom-end">
      {/* --------------- Trigger ------------- */}
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          fallback={<UserIcon />}
          showFallback
          src={user?.photoURL || undefined}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {/* --------------- Signed In As ------------- */}
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email || "No email available"}</p>
        </DropdownItem>

        {/* --------------- Help & Feedback ------------- */}
        <DropdownItem key="help_and_feedback">
          <UILink
            href={"https://github.com/sebastian-nunez/cloud-video-uploader"}
            className="text-sm"
            isExternal
          >
            Help & Feedback
          </UILink>
        </DropdownItem>
        {/* --------------- Sign Out ------------- */}
        <DropdownItem key="logout" color="danger" onClick={signOut}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
